import * as request from "request-promise";

import { Algorithm } from ".";

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
  private async getRawGlobalPrices(): Promise<INHApiResult<INHRawGlobalPrices>> {
    const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq) as INHApiResult<INHRawGlobalPrices>;
    return data;
  }

  public async getGlobalPrices(): Promise<INHRawGlobalPricesCoin[]> {
    const data = await this.getRawGlobalPrices();
    return data.result.stats;
  }

  private async getRawOrders(algo: Algorithm, location?: Location): Promise<INHApiResult<INHRawOrders>> {
    const getEndpoint = (): string => {
      let path = "https://api.nicehash.com/api?method=orders.get";
      path += "&algo=" + algo;
      if (location !== undefined) {
        path += "&location=" + location;
      }
      return path;
    };

    const rq = await request(getEndpoint());
    const data = JSON.parse(rq) as INHApiResult<INHRawOrders>;
    return data;
  }

  public async getAlgoMinimumPrice(algo: Algorithm, location?: Location): Promise<number> {
    const data = await this.getRawOrders(algo, location);
    const orders = data.result.orders;

    // find the lowest order with workers
    let minimum: INHOrder = orders[0];
    for (const order of orders) {
      const price = Number(order.price);
      const workers = order.workers;
      if (price < Number(minimum.price) && workers > 0) {
        minimum = order;
      }
    }
    return Number(minimum.price) || Infinity;
  }
}
