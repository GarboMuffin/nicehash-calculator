import * as request from "request-promise";

export enum NHLocation {
  EU = 0,
  US = 1,
}

interface INHApiResult<T> {
  result: T;
  method: string;
}

interface INHRawGlobalProfitCoin {
  price: string;
  algo: number;
}

interface INHRawGlobalProfit {
  stats: INHRawGlobalProfitCoin[];
}

export class NiceHashAPI {
  private async getRawGlobalProfit() {
    const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq) as INHApiResult<INHRawGlobalProfit>;
    return data;
  }

  public async getGlobalProfit(): Promise<INHRawGlobalProfitCoin[]> {
    const data = await this.getRawGlobalProfit();
    return data.result.stats;
  }
}
