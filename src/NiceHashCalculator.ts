import chalk from "chalk";
import * as fs from "fs";

import * as NiceHash from "./apis/nicehash";
import * as WhatToMine from "./apis/whattomine";
import { getCoins as getWhatToMineCoins, ICoin } from "./coins";
import { debug, state as _debugState } from "./debug";
import * as Handlers from "./handlers";
import * as OptionParser from "./options/";
import { sleep } from "./utils";

const BUG_REPORTS = "https://github.com/GarboMuffin/nicehash-calculator/issues/new";

// This is the data that is passed onto handlers
export interface ICoinData {
  coin: ICoin;
  revenue: WhatToMine.IRevenueResponse;
  profit: number;
  price: number;
  returnOnInvestment: number;
  percentChange: number;
}

// Prices type
export enum Prices {
  // global nicehash averages
  Average,

  // minimum order with workers
  Minimum,

  // TODO: "MinimumWithWorkers" and "MinimumWithHashrate"
}

// Support handlers
export enum OutputHandler {
  // The normal handler, "unified" or "pretty"
  Pretty,

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  JSON,
}

// Program config
export interface IOptions {
  // output debug messages?
  debug: boolean;

  // show the header at the start?
  showHeader: boolean;

  // user specified coins
  coins: string[];

  // how long to wait between each coin, ms
  sleepTime: number;

  // unrecognized options
  unrecognized: string[];

  // what type of prices to use?
  prices: Prices;

  // what output handler to use?
  outputHandler: OutputHandler;

  // max age of things loaded from https://whattomine.com/coins.json
  maxCacheAge: number;
}

export class NiceHashCalculator {
  public options: IOptions;
  private globalNiceHashPrices: number[] = [];
  // API objects
  public whatToMine: WhatToMine.API = new WhatToMine.API();
  public niceHash: NiceHash.API = new NiceHash.API();

  constructor() {
    // Parse options
    this.options = this.parseOptions();

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

    // If debug was enabled then tell the debug method to start outputting things
    if (this.options.debug) {
      _debugState.enabled = true;
      // and also print some things to debug right away
      debug("options", this.options);
    }

    // For each unrecognized option log a warning to the user
    for (const unrecognizedOption of this.options.unrecognized) {
      console.warn(chalk.red("Unrecognized option: " + unrecognizedOption));
    }
  }

  // Has to be seperate from constructor to use async
  // Asnyc constructors would be terrible
  public async start() {
    // get all coins on what to mine
    const whatToMineCoins = await getWhatToMineCoins(this);
    if (this.options.maxCacheAge > 0) {
      // load cache of many whattomine coins
      await this.whatToMine.populateCoinRevenueCache(this.options.maxCacheAge);
    }
    // get nicehash average prices
    // TODO: if options.prices !== minimum then don't do this?
    this.globalNiceHashPrices = await this.getGlobalNiceHashPrices();

    // read the coins the user specified and get them
    const coins = this.filterCoins(whatToMineCoins);

    // determine the output handler to be used
    const outputHandler = this.chooseHandler();

    // using minimum prices is heavily discouraged
    // so output a warning
    if (this.usingMinimumPrices) {
      console.log(chalk.yellow("Calculating prices using lowest order with workers. This is discouraged."));
      console.log("");
    }

    // TODO: other warnings

    // For every coin...
    for (const coin of coins) {
      // Calculate the numbers
      const revenueData = await this.getCoinRevenue(coin);
      const revenue = revenueData.revenue;
      const price = await this.getAlgoPrice(coin.niceHashAlgo);
      const profit = revenue - price;

      const returnOnInvestment = revenue / price;
      const percentChange = returnOnInvestment - 1;

      // create the data structure
      const data: ICoinData = {
        coin,
        revenue: revenueData,
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
    if (this.usingMinimumPrices) {
      return await this.niceHash.getAlgoMinimumPrice(algo);
    } else {
      return this.globalNiceHashPrices[algo.id];
    }
  }

  private async getCoinRevenue(coin: ICoin): Promise<WhatToMine.IRevenueResponse> {
    const hashrate = coin.niceHashUnit.hashes / coin.whatToMineUnit.hashes;
    return await this.whatToMine.getRevenue(coin.id, hashrate);
  }

  ///
  /// OPTIONS (parsing, filtering, anything directly doing things with options)
  ///

  // Option related things
  private filterCoins(allCoins: ICoin[]): ICoin[] {
    // If a user types in an algorithm it enables all coins of that algorithm
    // If a user types in the ticker/abbrevation of a coin it will enable it
    // If a user types in the name of a coin it will enable it

    let result: ICoin[] = allCoins;
    let userEnabledCoins = false;

    for (const coin of allCoins) {
      for (const str of this.options.coins) {
        // disabling a coin
        const isDisablingCoin = str.startsWith("-");

        let name: string = "";
        if (isDisablingCoin) {
          name = str.substr(1);
        } else {
          name = str;
        }

        if (coin.names.indexOf(name) > -1 || coin.niceHashAlgo.names.indexOf(name) > -1) {
          if (isDisablingCoin) {
            const index = result.indexOf(coin);
            if (index === -1) {
              console.warn(chalk.yellow(`WARN: Can't disable coin '${name}': not found`));
            } else {
              debug(`Disabling coin ${coin.displayName} because of argument '${str}'`);
              result.splice(index, 1);
            }
          } else {
            debug(`Enabled coin ${coin.displayName} because of argument '${str}'`);
            if (!userEnabledCoins) {
              result = [];
            }
            userEnabledCoins = true;
            result.push(coin);
            break;
          }
        }
      }
    }

    if (!userEnabledCoins) {
      return allCoins;
    }

    return result;
  }

  private chooseHandler(): Handlers.AbstractHandler {
    if (this.options.outputHandler === OutputHandler.JSON) {
      return new Handlers.JSONHandler();
    } else if (this.options.outputHandler === OutputHandler.Pretty) {
      return new Handlers.UnifiedHandler();
    } else {
      console.warn("chooseHandler(): unknown handler?");
      return new Handlers.UnifiedHandler();
    }
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

    const parsedOptions = OptionParser.parse(args, {
      arguments: {
        /* tslint:disable:object-literal-key-quotes */
        "debug": {
          type: "boolean",
          default: false,
        },
        "no-header": {
          type: "boolean",
          default: false,
        },
        "output": {
          type: "string",
          default: "pretty",
        },
        "prices": {
          type: "string",
          default: "average",
        },
        "sleep-time": {
          type: "number",
          default: 1000,
        },
        "max-age": {
          type: "number",
          default: 60 * 5, // 5 minutes
        },
        /* tslint:enable:object-literal-key-quotes */
      },
    });

    // TODO: remove some of this ugly duplication somehow?

    const getPricesOption = (): Prices => {
      const value = parsedOptions.arguments.prices;
      if (value === "average") {
        return Prices.Average;
      } else if (value === "minimum") {
        return Prices.Minimum;
      } else {
        console.warn("unknown value specified for --prices, accepted values are 'average' (default) and 'minimum'");
        return Prices.Average;
      }
    };

    const getOutputHandlerOption = (): OutputHandler => {
      const value = parsedOptions.arguments.output;
      if (value === "pretty") {
        return OutputHandler.Pretty;
      } else if (value === "json") {
        return OutputHandler.JSON;
      } else {
        console.warn("unknown value specified for --output, accepted values are 'pretty' (default) and 'json'");
        return OutputHandler.Pretty;
      }
    };

    const options: IOptions = {
      unrecognized: parsedOptions.unrecognized,
      coins: parsedOptions.plain,
      debug: parsedOptions.arguments.debug as boolean,
      showHeader: !parsedOptions.arguments["no-header"] as boolean,
      sleepTime: parsedOptions.arguments["sleep-time"] as number,
      prices: getPricesOption(),
      outputHandler: getOutputHandlerOption(),
      maxCacheAge: (parsedOptions.arguments["max-age"] as number) * 1000,
    };
    return options;
  }

  ///
  /// ACCESSORS
  ///

  get usingMinimumPrices(): boolean {
    return this.options.prices === Prices.Minimum;
  }
}
