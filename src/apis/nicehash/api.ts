import * as request from "request-promise-native";

import * as NiceHash from ".";
import { logger } from "../../logger";

interface INHApiResult<T> {
  result: T;
  method: string;
}

interface INHRawGlobalPricesCoin {
  price: string;
  algo: number;
}

interface INHRawGlobalPrices {
  stats: INHRawGlobalPricesCoin[];
}

interface INHOrder {
  limit_speed: string;
  alive: boolean;
  price: string;
  id: number;
  type: number;
  workers: number;
  algo: number;
  accepted_speed: string;
}

interface INHRawOrders {
  orders: INHOrder[];
}

export class API {
  private cachedMinimumPrices: number[] = [];

  // also see request() in apis/whattomine/api.ts
  private async request(url: string): Promise<any> {
    logger.debug("NiceHash.request(): requested " + url);
    const rq = await request(url, {
      headers: {
        // perhaps define a user-agent or referrer?
      },
    });
    return rq;
  }

  private async getRawGlobalPrices(): Promise<INHApiResult<INHRawGlobalPrices>> {
    const rq = await this.request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq) as INHApiResult<INHRawGlobalPrices>;
    return data;
  }

  public async getGlobalPrices(): Promise<INHRawGlobalPricesCoin[]> {
    const data = await this.getRawGlobalPrices();
    return data.result.stats;
  }

  private async getRawOrders(algo: NiceHash.Algorithm, location?: NiceHash.Location): Promise<INHApiResult<INHRawOrders>> {
    const getEndpoint = (): string => {
      let path = "https://api.nicehash.com/api?method=orders.get";
      path += "&algo=" + algo.id;
      if (location !== undefined) {
        path += "&location=" + location;
      }
      return path;
    };

    const rq = await this.request(getEndpoint());
    const data = JSON.parse(rq) as INHApiResult<INHRawOrders>;
    return data;
  }

  public async getAlgoMinimumPrice(algo: NiceHash.Algorithm, location?: NiceHash.Location): Promise<number> {
    if (this.cachedMinimumPrices[algo.id]) {
      logger.debug("NiceHash.getAlgoMinimumPrice(): returned from cache for " + algo.id);
      return this.cachedMinimumPrices[algo.id];
    }

    const data = await this.getRawOrders(algo, location);
    const orders = data.result.orders;

    // find the lowest order with workers
    let minimumOrder: INHOrder = orders[0];
    for (const order of orders) {
      const price = Number(order.price);
      const workers = order.workers;
      if (price < Number(minimumOrder.price) && workers > 0) {
        minimumOrder = order;
      }
    }

    logger.debug("NiceHash.getAlgoMinimumPrice(): returned from web for " + algo.id);
    const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
    this.cachedMinimumPrices[algo.id] = minimumPrice;
    return minimumPrice;
  }
}
