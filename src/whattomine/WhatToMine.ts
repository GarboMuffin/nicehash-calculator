import * as request from "request-promise";

// TODO: Move interfaces to another file
// If it's possible to do something like WhatToMineAPI.ICoin instead of IWhatToMineCoin that would be much preffered

///
/// for https://whattomine.com/calculators.json
///
interface IWhatToMineCalculator {
  // There's more properties that aren't one here
  tag: string;
  algorithm: string;
  id: number;
  lagging: boolean;
  listed: boolean;
  testing: boolean;

  // Not actually part of the response, just something this program needs to function
  name: string;
}

interface IWhatToMineCalculators {
  coins: {
    [s: string]: IWhatToMineCalculator;
  };
}

///
/// for https://whattomine.com/coins/1.json (and other coins)
///
interface IWhatToMineCoin {
  btc_revenue: string;
}

export class WhatToMineAPI {
  private async getRawCalculators(): Promise<IWhatToMineCalculators> {
    const rq = await request("https://whattomine.com/calculators.json");
    const data = JSON.parse(rq) as IWhatToMineCalculators;
    return data;
  }

  private async getRawProfit(id: number | string, hashrate: number): Promise<IWhatToMineCoin> {
    // https://whattomine.com/coins/1.json?cost=0
    const rq = await request(`https://whattomine.com/coins/${id}.json?hr=${hashrate}&cost=0`);
    const data = JSON.parse(rq) as IWhatToMineCoin;
    return data;
  }

  // Returns WhatToMine's list of coins in a more usable format
  public async getCalculators(): Promise<IWhatToMineCalculator[]> {
    // Get the raw data
    const data = (await this.getRawCalculators()).coins;

    // Convert to an array
    const coins = [];
    for (const key of Object.keys(data)) {
      const value = data[key];
      // Ignore Nicehash coins
      if (value.tag === "NICEHASH") {
        continue;
      }
      // Remove lagging coins (profitability calculating won't work)
      if (value.lagging) {
        continue;
      }
      // Set the name property
      value.name = key;
      coins.push(value);
    }

    return coins;
  }

  // Returns WhatToMine's list of coins in a more usable format
  public async getProfit(id: number, hashrate: number, allowCache: boolean = true): Promise<number> {
    const data = await this.getRawProfit(id, hashrate);
    return Number(data.btc_revenue);
  }
}
