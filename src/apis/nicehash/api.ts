import * as request from "request-promise-native";

import * as NiceHash from ".";
import { logger } from "../../logger";

interface IApiResult<T> {
  result: T;
  method: string;
}

interface IRawGlobalPricesCoin {
  price: string;
  algo: number;
}

interface IRawGlobalPrices {
  stats: IRawGlobalPricesCoin[];
}

interface IOrder {
  limit_speed: string;
  alive: boolean;
  price: string;
  id: number;
  type: number;
  workers: number;
  algo: number;
  accepted_speed: string;
}

interface IRawOrders {
  orders: IOrder[];
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

  private async getRawGlobalPrices(): Promise<IApiResult<IRawGlobalPrices>> {
    const rq = await this.request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq) as IApiResult<IRawGlobalPrices>;
    return data;
  }

  public async getGlobalPrices(): Promise<IRawGlobalPricesCoin[]> {
    const data = await this.getRawGlobalPrices();
    return data.result.stats;
  }

  private async getRawOrders(algo: NiceHash.Algorithm): Promise<IApiResult<IRawOrders>> {
    const rq = await this.request(`https://api.nicehash.com/api?method=orders.get&algo=${algo.id}`);
    const data = JSON.parse(rq) as IApiResult<IRawOrders>;
    return data;
  }

  // withWorkers - find minimum with workers OR find minimum with some hashrate
  public async getAlgoMinimumPrice(algo: NiceHash.Algorithm, withWorkers: boolean): Promise<number> {
    if (this.cachedMinimumPrices[algo.id]) {
      logger.debug("NiceHash.getAlgoMinimumPrice(): returned from cache for " + algo.id);
      return this.cachedMinimumPrices[algo.id];
    }

    const data = await this.getRawOrders(algo);
    const orders = data.result.orders;

    // find the lowest order with workers
    let minimumOrder: IOrder = orders[0];
    for (const order of orders) {
      const price = Number(order.price);
      const comparison = withWorkers ? order.workers : order.accepted_speed;
      if (price < Number(minimumOrder.price) && comparison > 0) {
        minimumOrder = order;
      }
    }

    logger.debug("NiceHash.getAlgoMinimumPrice(): returned from web for " + algo.id);
    const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
    this.cachedMinimumPrices[algo.id] = minimumPrice;
    return minimumPrice;
  }
}
