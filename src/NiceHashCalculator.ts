import * as chalk from "chalk";
import * as fs from "fs";

import { getWhatToMineCoins, ICoin } from "./coins";
import { AbstractHandler } from "./handlers/AbstractHandler";
import { JSONHandler } from "./handlers/JSONHandler";
import { UnifiedHandler } from "./handlers/UnifiedHandler";
import { NiceHashAPI } from "./nicehash/NiceHash";
import { IOptions, parse as _parseOptions } from "./options";
import { getGlobalNiceHashPrices } from "./price";
import { getWhatToMineRevenue } from "./revenue";
import { sleep } from "./utils";
import { WhatToMineAPI } from "./whattomine/WhatToMine";

const BUG_REPORTS = "https://github.com/GarboMuffin/nicehash-calculator/issues/new";

export interface ICoinData {
  coin: ICoin;
  revenue: number;
  profit: number;
  price: number;
  returnOnInvestment: number;
  percentChange: number;
}

export class NiceHashCalculator {
  public options: IOptions;
  public whatToMine: WhatToMineAPI = new WhatToMineAPI();
  public niceHash: NiceHashAPI = new NiceHashAPI();

  constructor() {
    this.options = this.parseOptions();

    if (this.options.showHeader) {
      console.log(`This program ${chalk.bold("**estimates**")} the profitability of buying hashing power on NiceHash`);
      console.log(`Estimations are based on the NiceHash and WhatToMine APIs and have no guarantee of accuracy.`);
      console.log(`Only spend what you can afford to lose. I am not responsible for any losses.`);
      console.log("");
      console.log("BTC: " + chalk.underline("1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ"));
      console.log("");
      console.log("Please report bugs: " + chalk.underline(BUG_REPORTS));
      console.log("");
    }

    if (this.options.userAgent !== "") {
      this.whatToMine.USER_AGENT = this.options.userAgent;
    }

    for (const unrecognizedOption of this.options.unrecognized) {
      console.warn("Unrecognized option: " + unrecognizedOption);
    }
  }

  public async start() {
    const whatToMineCoins = await getWhatToMineCoins(this);
    const globalNiceHashCosts = await getGlobalNiceHashPrices(this);

    const coins = this.filterCoins(whatToMineCoins);
    const outputHandler = this.chooseHandler();

    for (const coin of coins) {
      // Calculate the numbers
      const revenue = await getWhatToMineRevenue(coin, this);
      const price = globalNiceHashCosts[coin.niceHashAlgo];
      const profit = revenue - price;

      const returnOnInvestment = revenue / price;
      const percentChange = 1 - returnOnInvestment;

      // data is now passed onto any handlers
      const data: ICoinData = {
        coin,
        revenue,
        price,
        profit,
        returnOnInvestment,
        percentChange,
      };

      outputHandler.handle(data, this);

      // TODO: don't wait after the last coin
      await sleep(this.options.sleepTime);
    }

    outputHandler.finished(this);
  }

  private filterCoins(allCoins: ICoin[]): ICoin[] {
    // I've worked on this a bit and it's complicated.

    // Here's what I want:
    // If a user types in an algorithm it enables all coins of that algorithm
    // If a user types in the ticker/abbrevation of a coin it will enable it
    // If a user types in the name of a coin it will enable it, maybe using levenshtein distance to be more safe?

    // If none are specified then return all of them
    // TODO: defaults to bitcoin, eth, ltc, equihash, etc.
    if (this.options.coins.length === 0) {
      return allCoins;
    }

    const result: ICoin[] = [];

    for (const coin of allCoins) {
      for (const str of this.options.coins) {
        if (coin.names.indexOf(str) > -1) {
          result.push(coin);
          break;
        }
      }
    }

    return result;
  }

  private parseOptions() {
    const readArgumentsFile = () => {
      const content = fs.readFileSync("arguments.txt");
      const lines = content.toString().split("\n");
      const result: string[] = [];

      for (const line of lines) {
        // Lines that starti with # are comments
        if (line.startsWith("#")) {
          continue;
        }
        // Trim it to avoid newlines and other characters
        const trimmed = line.trim();
        // Ignore empty lines
        if (trimmed === "") {
          continue;
        }
        result.push(trimmed);
      }

      return result;
    };

    // get the arguments to pass to the parser
    // remove the first 2 things from argv because that's node and this file
    let args = process.argv.splice(2);
    // append arguments.txt
    args = args.concat(readArgumentsFile());

    const options = _parseOptions(args);
    return options;
  }

  private chooseHandler(): AbstractHandler {
    if (this.options.useJsonOutput) {
      return new JSONHandler();
    }
    return new UnifiedHandler();
  }
}
