import chalk from "chalk";
import { Algorithm } from "../Algorithm";
import { HashRateUnit } from "../HashRateUnit";
import * as NiceHash from "../apis/nicehash";
import * as WhatToMine from "../apis/whattomine";
import { AbstractHandler } from "../handlers";
import * as requestLib from "../lib/request";
import { logger } from "../logger";
import { IOptions } from "../options";
import { sleep } from "../utils";
import { IHandlerData } from "./IHandlerData";
import { ICoin, getCoins as getWhatToMineCoins } from "./coins";
import { filter as filterCoins } from "./filter";
import { listCoins } from "./listCoins";

export class NiceHashCalculator {
  public options: IOptions;
  private revenueCache: WhatToMine.IRevenueResponse[] = [];
  private priceCache: {[s: string]: number} = {};
  private outputHandler!: AbstractHandler;

  constructor(options: IOptions = {} as IOptions) {
    this.options = options;

    // everything else happens in start()
    // constructing a NiceHashCalculator should be possible without side effects so that testing can be done
  }

  //
  // Core
  //

  public async start() {
    // determine the output handler to be used
    const outputHandler = new this.options.outputHandler.class();
    this.outputHandler = outputHandler;

    this.initOptions();

    await this.initApis();

    // get all coins on whattomine
    const allCoins = await getWhatToMineCoins();
    // read the coins the user specified and get them
    const coins = filterCoins(allCoins, this.options.coins);

    // if --list-coins is used then just print coins enabled rather than profit data
    if (this.options.listCoins) {
      listCoins(coins);
      return;
    }

    await this.populateWhatToMineCache(coins);

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
    const data: IHandlerData = {
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

    // set the pretty print option of the request lib
    requestLib.config.pretty.enabled = this.outputHandler.pretty;

    // For each unrecognized option log a warning to the user
    for (const unrecognizedOption of this.options.unrecognized) {
      logger.warn("Unrecognized option: " + unrecognizedOption);
    }

    // --experimental-fees: attempt to include fees
    if (this.options.includeFees) {
      logger.warn("Accounting for NiceHash's 3% fee. This is experimental. Please be aware of the additional 0.0001 BTC fee that is not accounted for here.");
    }
  }

  private async initApis() {
    // Temporarily disabled until the API provides something actually equal to the old one.
    // if (this.options.prices === PricesOption.Average) {
    //   this.priceCache = await NiceHash.getGlobalPrices();
    // }

    // set some algorithm metadata
    const buyerInfo = await NiceHash.getBuyerInfo();
    const algorithms = buyerInfo.miningAlgorithms;
    for (const nhMeta of algorithms) {
      const hashrate = nhMeta.speed_text;
      const id = +nhMeta.algo;
      for (const algo of Algorithm.instances) {
        if (algo.idNum === id) {
          const algorithm = new NiceHash.Algorithm(algo.idEnum, HashRateUnit.fromString(hashrate));
          algo.niceHash = algorithm;
          logger.debug(`initApis(): set unit for ${algo.displayName} to ${algorithm.unit.displayName}`);
          break;
        }
      }
    }

    // error checking
    if (logger.debugEnabled) {
      for (const algo of Algorithm.instances) {
        if (!algo.niceHash) {
          logger.warn(`Missing metadata for algorithm ${algo.displayName} (${algo.idEnum})`);
        }
      }
    }
  }

  private async populateWhatToMineCache(coins: ICoin[]) {
    const activeAlgorithms = new Set(coins.map((coin) => coin.algorithm));

    const getOptions = () => {
      const result = [];
      for (const algo of activeAlgorithms) {
        if (!algo.whatToMine.cacheNames) {
          continue;
        }
        result.push({
          algorithm: algo.whatToMine,
          hashrate: this.getWhatToMineHashrate(algo),
        });
      }
      return result;
    };

    const algos = getOptions();
    // if no algorithms will benefit then don't waste time
    if (algos.length === 0) {
      return;
    }

    const cache = await WhatToMine.getListedCoins(algos);
    this.revenueCache = cache;
  }

  //
  // Utility
  //

  private getWhatToMineHashrate(algorithm: Algorithm) {
    return algorithm.niceHash.unit.hashes / algorithm.whatToMine.unit.hashes;
  }

  private async getPrice(algo: NiceHash.Algorithm): Promise<number> {
    if (this.priceCache[algo.id] !== undefined) {
      return this.priceCache[algo.id];
    } else {
      const price = await NiceHash.getPrice(algo, this.options.prices);
      this.priceCache[algo.id] = price;
      return price;
    }
  }

  private async getRevenue(coin: ICoin): Promise<WhatToMine.IRevenueResponse> {
    if (this.revenueCache[coin.id]) {
      return this.revenueCache[coin.id];
    } else {
      return await WhatToMine.getRevenue(coin.id, this.getWhatToMineHashrate(coin.algorithm));
    }
  }
}
