import chalk from "chalk";

import * as NiceHash from "./apis/nicehash";
import * as WhatToMine from "./apis/whattomine";
import { getCoins as getWhatToMineCoins, ICoin } from "./coins";
import { filter as filterCoins } from "./filter";
import * as Handlers from "./handlers";
import { IOptions, OutputHandlerOption, parseOptions, PricesOption } from "./options";
import { sleep } from "./utils";
import { Algorithm } from "./Algorithm";
import { logger } from "./logger";

export const BUG_REPORTS = "https://github.com/GarboMuffin/nicehash-calculator/issues/new";

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
  public options!: IOptions;
  private globalNiceHashPrices: number[] = [];
  // API objects
  public whatToMine: WhatToMine.API = new WhatToMine.API();
  public niceHash: NiceHash.API = new NiceHash.API();

  constructor() {
    // everything happens in start()
    // constructing a NiceHashCalculator should be possible without side effects
  }

  public async start() {
    // Parse options
    this.options = parseOptions();

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
      console.log(`This program ${chalk.bold("**estimates**")} the profitability of buying hashing power on NiceHash`);
      console.log(`Estimations are based on the NiceHash and WhatToMine APIs and have no guarantee of accuracy.`);
      console.log(`Only spend what you can afford to lose. I am not responsible for any losses.`);
      console.log("");
      // please do send me money that would be great
      console.log("BTC: " + chalk.underline("1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ"));
      console.log("");
      console.log("Please report bugs: " + chalk.underline(BUG_REPORTS));
      console.log("");
    }

    // using minimum prices is heavily discouraged so output a warning
    if (this.options.prices === PricesOption.MinimumWithWorkers) {
      logger.warn(chalk.yellow("Calculating prices using lowest order with some amount of workers. This is discouraged."));
    }
    if (this.options.prices === PricesOption.MinimumWithHashrate) {
      // this is more dangerous
      logger.warn(chalk.yellow("Calculating prices using lowest order with some amount of accepted speed. This is very discouraged."));
    }

    // get all coins on what to mine
    const whatToMineCoins = await getWhatToMineCoins(this);
    // only populate the cache if the max age wouldn't remove everything there's more than 2 coins active
    // with only 2 coins active it doesn't save any requests
    if (this.options.maxCacheAge > 0 && this.options.coins.length >= 2) {
      // load cache of many whattomine coins
      await this.whatToMine.populateCoinRevenueCache(this.options.maxCacheAge);
    }
    // get nicehash average prices
    // TODO: if options.prices !== minimum then don't do this?
    this.globalNiceHashPrices = await this.getGlobalNiceHashPrices();

    // read the coins the user specified and get them
    const coins = filterCoins(whatToMineCoins, this.options.coins);

    // determine the output handler to be used
    const outputHandler = this.chooseHandler();

    // TODO: other warnings

    // For every coin...
    for (const coin of coins) {
      // Calculate the numbers
      const revenueData = await this.getCoinRevenue(coin);
      const revenue = revenueData.revenue;
      const price = await this.getAlgoPrice(coin.algorithm.niceHash);
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

  private async getGlobalNiceHashPrices(): Promise<number[]> {
    const data = await this.niceHash.getGlobalPrices();

    const result: number[] = [];
    for (const niceHashCost of data) {
      result[niceHashCost.algo] = Number(niceHashCost.price);
    }
    return result;
  }

  private async getAlgoPrice(algo: NiceHash.Algorithm): Promise<number> {
    if (this.isUsingMinimumPrices) {
      const withWorkers = this.options.prices === PricesOption.MinimumWithWorkers;
      return await this.niceHash.getAlgoMinimumPrice(algo, withWorkers);
    } else {
      return this.globalNiceHashPrices[algo.id];
    }
  }

  private async getCoinRevenue(coin: ICoin): Promise<WhatToMine.IRevenueResponse> {
    const hashrate = coin.algorithm.niceHash.unit.hashes / coin.algorithm.whatToMine.unit.hashes;
    return await this.whatToMine.getRevenue(coin.id, hashrate);
  }

  private chooseHandler(): Handlers.AbstractHandler {
    if (this.options.outputHandler === OutputHandlerOption.JSON) {
      return new Handlers.JSONHandler();
    } else if (this.options.outputHandler === OutputHandlerOption.Pretty) {
      return new Handlers.UnifiedHandler();
    } else {
      logger.warn("chooseHandler(): unknown handler?");
      return new Handlers.UnifiedHandler();
    }
  }

  ///
  /// ACCESSORS
  ///

  get isUsingMinimumPrices(): boolean {
    return this.options.prices === PricesOption.MinimumWithWorkers || this.options.prices === PricesOption.MinimumWithHashrate;
  }
}
