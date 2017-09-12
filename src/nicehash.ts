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

// see: https://www.nicehash.com/help/fixed-order
export function calculateFixedPrice(fixedHashrate: number, totalHashrate: number, price: number){
  function f(){
    return 2 - Math.cos(
      Math.asin(
        2 * (fixedHashrate / totalHashrate)
      )
    ) + 0.01;
  }

  console.log(f());

  return f() * price;
}

export class NiceHashAPI {
  private coinCosts: TCoinStats = new Map();
  async getCoinCosts(){
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

    var coinStats = (await this.getCoinCosts()).get(algo) as NHCoinStat;

    if (options.orderType === NHOrderType.Fixed){
      console.log("a");

      // make an api request to find the MINIMUM price
      var req = await request(createEndpoint(algo, location as NiceHashLocation));
      var json = JSON.parse(req as any);
      var orders: NHOrder[] = json.result.orders;

      if (options.orderType === NHOrderType.Fixed){
        var totalHashrate = coinStats.speed;
        var fixedHashrate = 0;
        var requestHashrate = 0; // TODO: nicehash uses this in their calculations, currently this doesn't account for it

        for (var o of orders){
          if (o.type === NHOrderType.Fixed){
            fixedHashrate += Number(o.limit_speed);
          }
        }

        var price = calculateFixedPrice(fixedHashrate, totalHashrate, coinStats.price);

        return price;
      }
    }else{
      var req = await request(createEndpoint(algo, location as NiceHashLocation));
      var json = JSON.parse(req as any);
      var orders: NHOrder[] = json.result.orders;

      var price = Infinity;

      for (var o of orders){
        if (o.price < price && o.workers > 0 && o.type === options.orderType){
          price = o.price;
        }
      }

      return price;
    }

    return coinStats;
  }
}

function createEndpoint(algo: Algorithm, location: NiceHashLocation){
  return `https://api.nicehash.com/api?method=orders.get&algo=${algo}&location=${location}`
}
