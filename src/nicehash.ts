/*
 * A simple wrapper for the NiceHash API
 * Currently only gets prices, could be expanded.
 */

import {Hash} from "./hash";
import {NiceHashLocation} from "./location";
import {Algorithms as Algorithm} from "./algorithms";
import {NHOrder, NHOrderType} from "./order";

import * as request from "request-promise";

interface NHGlobalCoin {
  price: string,
  algo: number,
  speed: string,
}
interface NHGlobalCosts {
  result: {
    stats: NHGlobalCoin[],
  }
}
export interface NHOptions {
  findMin: boolean,
  orderType: NHOrderType,
}

export interface NHCoinStat {
  price: number,
  speed: number,
}

type TCoinStats = Map<Algorithm, NHCoinStat>;

export class NiceHashAPI {
  private coinCosts: TCoinStats = new Map();
  async getCoinCosts() {
    if (this.coinCosts.size === 0){
      // load the statistics
      var req = await request(`https://api.nicehash.com/api?method=stats.global.current`);

      var json: NHGlobalCosts = JSON.parse(req as any);

      var stats: TCoinStats = new Map();
      for (var c of json.result.stats){
        this.coinCosts.set(c.algo, {
          price: Number(c.price),
          speed: Number(c.speed),
        });
      }
    }

    return this.coinCosts as TCoinStats;
  }

  async get(algo: Algorithm, location: NiceHashLocation|null, options: NHOptions){
    // note: in most cases (not --find-min or --fixed) the location argument is IGNORED

    if (options.orderType === NHOrderType.Fixed || options.findMin){
      // make an api request to find the MINIMUM price
      var req = await request(createEndpoint(algo, location as NiceHashLocation));
      var json = JSON.parse(req as any);
      var orders: NHOrder[] = json.result.orders;

      var min = Infinity;
      for (var o of orders){
        if (o.price < min && o.workers > 0 && o.type === options.orderType){
          min = o.price;
        }
      }

      return Number(min);
    }

    return (await this.getCoinCosts()).get(algo) || 0;
  }
}

function createEndpoint(algo: Algorithm, location: NiceHashLocation){
  return `https://api.nicehash.com/api?method=orders.get&algo=${algo}&location=${location}`
}
