import chalk from "chalk";

import { Algorithm } from "../Algorithm";
import * as NiceHash from "../apis/nicehash";
import * as WhatToMine from "../apis/whattomine";
import { BUG_REPORT_URL } from "../constants";
import { logger } from "../logger";
import { IOptions, PricesOption } from "../options";
import { sleep } from "../utils";
import { getCoins as getWhatToMineCoins, ICoin } from "./coins";
import { filter as filterCoins } from "./filter";

// This is the data that is passed onto handlers
export interface ICoinData {
  coin: ICoin;
  revenue: number;
  rawRevenue: WhatToMine.IRevenueResponse;
  profit: number;
  price: number;
  returnOnInvestment: number;
  percentChange: number;
}

export class NiceHashCalculator {
  public options: IOptions;
  private revenueCache: WhatToMine.IRevenueResponse[] = [];

  constructor(options: IOptions = {} as IOptions) {
    this.options = options;

    // everything else happens in start()
    // constructing a NiceHashCalculator should be possible without side effects so that testing can be done
  }

  //
  // Core
  //

  public async start() {
    this.initOptions();
    await this.initApis();

    // get all coins on whattomine
    const allCoins = await getWhatToMineCoins();
    // read the coins the user specified and get them
    const coins = filterCoins(allCoins, this.options.coins);
    // await this.populateWhatToMineCache(coins);

    // determine the output handler to be used
    const outputHandler = this.options.outputHandler.getHandler();

    // For every coin...
    for (const coin of coins) {
      // get the data
      const data = await this.handleCoin(coin);

      // pass it onto the handler
      outputHandler.handle(data, this);

      // wait before going onto the next coin unless this is the last coin
      const isLastCoin = coins.indexOf(coin) === coins.length - 1;
      if (!isLastCoin) {
        await sleep(this.options.sleepTime);
      }
    }

    // tell the output handler that everything has finished
    // nothing uses this yet but it may be used in the future
    // (eg. "summarizing" results)
    outputHandler.finished(this);
  }

  // given a coin it will return the data structure that is then passed onto handlers
  private async handleCoin(coin: ICoin) {
    // estimate revenue from whattomine
    const revenueData = await this.getRevenue(coin);
    // optionally account for 3% fee on nicehash
    if (this.options.includeFees) {
      revenueData.revenue *= 0.97;
    }
    const revenue = revenueData.revenue;

    // get the price from nicehash
    const price = await this.getPrice(coin.algorithm.niceHash);
    const profit = revenue - price;

    // if the price is 0 (no orders) then ROI should also be 0
    const returnOnInvestment = price === 0 ? 0 : revenue / price;
    const percentChange = returnOnInvestment - 1;

    // create the data structure
    const data: ICoinData = {
      coin,
      revenue,
      rawRevenue: revenueData,
      price,
      profit,
      returnOnInvestment,
      percentChange,
    };
    return data;
  }

  //
  // Init
  //

  private initOptions() {
    logger.showWarnings = this.options.showWarnings;
    logger.debugEnabled = this.options.debug;
    logger.debug("options", this.options);

    // For each unrecognized option log a warning to the user
    for (const unrecognizedOption of this.options.unrecognized) {
      logger.warn("Unrecognized option: " + unrecognizedOption);
    }

    // Conditionally output a header
    // Disclaimer, donation addresses, etc.
    if (this.options.showHeader) {
      this.printHeader();
    }

    // using minimum prices is heavily discouraged so output a warning
    if (this.options.prices === PricesOption.MinimumWithWorkers) {
      logger.warn("Calculating prices using lowest order with some amount of workers. This is discouraged.");
    }
    // minimumw with hashrate is more dangerous
    if (this.options.prices === PricesOption.MinimumWithHashrate) {
      logger.warn("Calculating prices using lowest order with some amount of accepted speed. This is very discouraged.");
    }
    // --experimental-fees: attempt to include fees
    if (this.options.includeFees) {
      logger.warn("Accounting for NiceHash's 3% fee. This is experimental. Please be aware of the additional 0.0001 BTC fee that is not accounted for here.");
    }
  }

  private printHeader() {
    console.log(chalk`This program {bold estimates} the profitability of buying hashing power on NiceHash.`);
    console.log(chalk`Estimations have no guarantee of accuracy.`);
    console.log(chalk`NiceHash is not affiliated with this project. {bold I am not responsible for any losses}.`);
    console.log("");
    // please do send me money that would be great
    console.log(chalk`BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ {gray (more addresses in the readme!)}`);
    console.log(chalk`Referral link: {underline https://www.nicehash.com/?refby=258346}`);
    console.log("");
    console.log(chalk`Report bugs or suggest ideas: {underline ${BUG_REPORT_URL}}`);
    console.log("");
  }

  private async initApis() {
    if (this.options.prices === PricesOption.Average) {
      await NiceHash.api.cacheGlobalPrices();
    }
  }

  private async populateWhatToMineCache(coins: ICoin[]) {
    const activeAlgorithms = new Set(coins.map((coin) => coin.algorithm));

    const getOptions = () => {
      const result: any = {};
      for (const algo of activeAlgorithms) {
        if (!algo.whatToMine.cacheInternalName) {
          continue;
        }
        result[algo.whatToMine.cacheInternalName] = {
          hashrate: this.getWhatToMineHashrate(algo),
        };
      }
      return result;
    };

    const cache = await WhatToMine.api.getMassRevenueCache({
      algos: getOptions(),
    });
    this.revenueCache = cache;
  }

  //
  // Utility
  //

  private getWhatToMineHashrate(algorithm: Algorithm) {
    return algorithm.niceHash.unit.hashes / algorithm.whatToMine.unit.hashes;
  }

  private async getPrice(algo: NiceHash.Algorithm): Promise<number> {
    const withWorkers = this.options.prices === PricesOption.MinimumWithWorkers;
    return await NiceHash.api.getPrice(algo, withWorkers);
  }

  private async getRevenue(coin: ICoin): Promise<WhatToMine.IRevenueResponse> {
    if (this.revenueCache[coin.id]) {
      return this.revenueCache[coin.id];
    } else {
      return await WhatToMine.api.getRevenue(coin.id, this.getWhatToMineHashrate(coin.algorithm));
    }
  }
}
