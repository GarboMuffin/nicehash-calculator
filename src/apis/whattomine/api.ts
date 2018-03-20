import * as request from "request-promise-native";

import * as WhatToMine from ".";
import { logger } from "../../logger";

interface IBaseCoin {
  id: number;
  tag: string;
  algorithm: string;
  lagging: boolean;
  status: string;
}

// for https://whattomine.com/calculators.json
interface IAPICalculator extends IBaseCoin {
  // There's more properties that aren't one here
  listed: boolean;
  testing: boolean;

  // Not actually part of the response, just something this program needs to function
  name: string;
}

interface IAPICalculators {
  coins: {
    [s: string]: IAPICalculator;
  };
}

// for https://whattomine.com/coins.json and https://whattomine.com/coins/1.json
interface IAPICoin extends IBaseCoin {
  name: string;
  block_time: string;
  block_reward: number;
  block_reward24: number;
  block_reward3: number;
  block_reward7: number;
  last_block: number;
  difficulty: number;
  difficulty24: number;
  difficulty3: number;
  difficulty7: number;
  nethash: number;
  exchange_rate: number;
  exchange_rate24: number;
  exchange_rate3: number;
  exchange_rate7: number;
  exchange_rate_vol: number;
  exchange_rate_curr: string;
  market_cap: string;
  pool_fee: string;
  estimated_rewards: string;
  btc_revenue: string;
  btc_revenue24: string;
  revenue: string;
  cost: string;
  profit: string;
  timestamp: number;
}

interface IAPICoins {
  coins: {
    [s: string]: IAPICoin;
  };
}

// getRevenue()
export interface IRevenueResponse {
  revenue: number;
  timestamp: number;
}

// getCache()
export interface IGetMassRevenueCacheOptions {
  algos: {
    [s: string]: {
      hashrate: number;
    };
  };
}

// To be clear:
// This is not a standalone What To Mine API wrapper

class API {
  private async request(url: string): Promise<any> {
    logger.debug("WhatToMine.request(): requested " + url);
    const rq = await request(url, {
      headers: {
        // perhaps define a user-agent or referrer?
      },
    });
    return rq;
  }

  private async getRawCoins(): Promise<IAPICoins> {
    const raw = await this.request("https://whattomine.com/coins.json");
    const data = JSON.parse(raw) as IAPICoins;
    return data;
  }

  private async getRawCalculators(): Promise<IAPICalculators> {
    const raw = await this.request("https://whattomine.com/calculators.json");
    const data = JSON.parse(raw) as IAPICalculators;
    return data;
  }

  private async getRawRevenue(id: number, hashrate: number): Promise<IAPICoin> {
    // https://whattomine.com/coins/1.json
    const raw = await this.request(`https://whattomine.com/coins/${id}.json?hr=${hashrate}`);
    const data = JSON.parse(raw) as IAPICoin;
    return data;
  }

  private async getRawMassRevenueCache(opts: IGetMassRevenueCacheOptions) {
    let url = "http://whattomine.com/coins.json?";
    for (const algoName of Object.keys(opts.algos)) {
      const algo = opts.algos[algoName];
      url += `&${algoName}=true&factor[${algoName}_hr]=${algo.hashrate}`;
    }

    const raw = await this.request(url);
    const data = JSON.parse(raw) as IAPICoins;
    return data;
  }

  //
  // Wrappers
  //

  // populates the local cache
  public async getMassRevenueCache(opts: IGetMassRevenueCacheOptions): Promise<IRevenueResponse[]> {
    const data = await this.getRawMassRevenueCache(opts);

    const result = [];
    for (const key of Object.keys(data.coins)) {
      const value = data.coins[key];
      if (value.lagging) {
        continue;
      }
      if (key.startsWith("Nicehash")) {
        continue;
      }
      result[value.id] = {
        timestamp: value.timestamp * 1000,
        revenue: +value.btc_revenue24,
      };
    }
    return result;
  }

  // Returns WhatToMine's list of calculators in a more usable format
  public async getCalculators(): Promise<IAPICalculator[]> {
    // Get the raw data
    const data = (await this.getRawCalculators()).coins;

    // Convert to an array
    const coins = [];
    for (const key of Object.keys(data)) {
      const value = data[key];
      // Ignore Nicehash coins
      if (value.tag === "NICEHASH") {
        logger.debug(`WhatToMine.getCalculators(): skipping ${value.id}: nicehash`);
        continue;
      }
      // Remove coins that aren't active (profitability calculating won't work)
      if (value.status !== "Active") {
        logger.debug(`WhatToMine.getCalculators(): skipping ${value.id}: inactive`);
        continue;
      }
      // Remove coins that are lagging
      if (value.lagging) {
        logger.debug(`WhatToMine.getCalculators(): skipping ${value.id}: lagging`);
        continue;
      }

      // Set the name property
      value.name = key;
      coins.push(value);
    }

    return coins;
  }

  // Returns BTC revenue of mining coin id with hashrate hashrate
  public async getRevenue(id: number, hashrate: number): Promise<IRevenueResponse> {
    logger.debug("WhatToMine.getRevenue(): returning from web for " + id);
    const data = await this.getRawRevenue(id, hashrate);
    const revenue = Number(data.btc_revenue);
    return {
      timestamp: data.timestamp * 1000,
      revenue,
    };
  }
}

export const api = new API();
