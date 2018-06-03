import * as WhatToMine from ".";
import { logger } from "../../logger";
import { request } from "../../utils";

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
interface IGetMassRevenueCacheAlgo {
  algorithm: WhatToMine.Algorithm;
  hashrate: number;
}

/**
 * Get the raw calculator list JSON
 * https://whattomine.com/calculators.json
 */
export async function getRawCalculators(): Promise<IAPICalculators> {
  const raw = await request("https://whattomine.com/calculators.json");
  const data = JSON.parse(raw.data) as IAPICalculators;
  return data;
}

/**
 * Gets raw revenue JSON for a coin
 * https://whattomine.com/coins/1.json?hr=999
 * 
 * @param id The coin
 * @param hashrate The hashrate
 */
export async function getRawRevenue(id: number, hashrate: number): Promise<IAPICoin> {
  const raw = await request(`https://whattomine.com/coins/${id}.json?hr=${hashrate}`);
  const data = JSON.parse(raw.data) as IAPICoin;
  return data;
}

/**
 * Returns raw listed coins JSON
 * 
 * http://whattomine.com/coins.json
 * http://whattomine.com/coins.json?cn=true&factor[cn_hr]=999
 * 
 * @param algos Algorithms to include
 */
export async function getRawListedCoins(algos: IGetMassRevenueCacheAlgo[]) {
  let url = "http://whattomine.com/coins.json?";
  for (const algo of algos) {
    if (algo.algorithm.cacheNames === null) {
      continue;
    }
    const names = algo.algorithm.cacheNames;
    url += `&${names[0]}=true&factor[${names[1]}_hr]=${algo.hashrate}`;
  }

  const raw = await request(url);
  const data = JSON.parse(raw.data) as IAPICoins;
  return data;
}

/**
 * Gets coins listed on the home page of what to mine
 * 
 * @param opts Algorithms to include
 */
export async function getListedCoins(algos: IGetMassRevenueCacheAlgo[]): Promise<IRevenueResponse[]> {
  const data = await getRawListedCoins(algos);

  const result = [];
  for (const key of Object.keys(data.coins)) {
    const value = data.coins[key];
    // skip lagging coins
    if (value.lagging) {
      continue;
    }
    // skip nicehash coins
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
export async function getCalculators(): Promise<IAPICalculator[]> {
  // Get the raw data
  const data = (await getRawCalculators()).coins;

  // Convert to an array
  const coins = [];
  for (const key of Object.keys(data)) {
    const value = data[key];

    const logSkip = (reason: string) => {
      logger.debug(`WhatToMine.getCalculators(): skipping ${key} (${value.id}): ${reason}`);
    };

    // Ignore Nicehash coins
    if (value.tag === "NICEHASH") {
      logSkip("nicehash");
      continue;
    }
    // Remove coins that aren't active (profitability calculating won't work)
    if (value.status !== "Active") {
      logSkip("inactive");
      continue;
    }

    // Set the name property
    value.name = key;
    coins.push(value);
  }

  return coins;
}

// Returns BTC revenue of mining coin id with hashrate hashrate
export async function getRevenue(id: number, hashrate: number): Promise<IRevenueResponse> {
  logger.debug("WhatToMine.getRevenue(): returning from web for " + id);
  const data = await getRawRevenue(id, hashrate);
  const revenue = Number(data.btc_revenue);
  return {
    timestamp: data.timestamp * 1000,
    revenue,
  };
}
