import * as chalk from "chalk";
import * as fs from "fs";

import { getWhatToMineCoins, ICoin } from "./coins";
import { parse as _parseOptions, IOptions } from "./options";
import { getGlobalNiceHashPrices } from "./price";
import { getWhatToMineRevenue } from "./revenue";
import { sleep } from "./utils";
import { BUG_REPORTS } from "./config";
import { AbstractHandler } from "./handlers/AbstractHandler";
import { UnifiedHandler } from "./handlers/UnifiedHandler";
import { JSONHandler } from "./handlers/JSONHandler";

export interface ICoinData {
  coin: ICoin;
  revenue: number;
  profit: number;
  price: number;

  percentChange: number;
}

function readArgumentFile(file: string): string[] {
  const content = fs.readFileSync(file);
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
}

function parseOptions() {
  // get the arguments to pass to the parser
  // remove the first 2 things from argv because that's node and this file
  let args = process.argv.splice(2);
  // append arguments.txt
  args = args.concat(readArgumentFile("arguments.txt"));

  const options = _parseOptions(args);
  return options;
}

function filterCoins(requested: string[], allCoins: ICoin[]): ICoin[] {
  // I've worked on this a bit and it's complicated.

  // Here's what I want:
  // If a user types in an algorithm it enables all coins of that algorithm
  // If a user types in the ticker/abbrevation of a coin it will enable it
  // If a user types in the name of a coin it will enable it, maybe using levenshtein distance to be more safe?

  // If none are specified then return all of them
  // TODO: defaults to bitcoin, eth, ltc, equihash, etc.
  if (requested.length === 0) {
    return allCoins;
  }

  const result: ICoin[] = [];

  for (const coin of allCoins) {
    for (const str of requested) {
      if (coin.names.indexOf(str) > -1) {
        result.push(coin);
        break;
      }
    }
  }

  return result;
}

function chooseHandler(options: IOptions): AbstractHandler {
  if (options.useJsonOutput) {
    return new JSONHandler();
  }
  return new UnifiedHandler();
}

async function start() {
  const options = parseOptions();

  if (options.showHeader) {
    console.log(`This program ${chalk.bold("**estimates**")} the profitability of buying hashing power on NiceHash`);
    console.log(`Estimations are based on the NiceHash and WhatToMine APIs and have no guarantee of accuracy.`);
    console.log(`Only spend what you can afford to lose. I am not responsible for any losses.`);
    console.log("");
    console.log("BTC: " + chalk.underline("1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ"));
    console.log("");
    console.log("Please report bugs: " + chalk.underline(BUG_REPORTS));
    console.log("");
  }

  for (const unrecognizedOption of options.unrecognized) {
    console.warn("Unrecognized option: " + unrecognizedOption);
  }

  const whatToMineCoins = await getWhatToMineCoins();
  const globalNiceHashCosts = await getGlobalNiceHashPrices();

  const coins = filterCoins(options.coins, whatToMineCoins);
  const outputHandler = chooseHandler(options);

  for (const coin of coins) {
    // Calculate the numbers
    const revenue = await getWhatToMineRevenue(coin);
    const price = globalNiceHashCosts[coin.niceHashAlgo];
    const profit = revenue - price;

    const percentChange = revenue / price;

    // data is now passed onto any handlers
    const data: ICoinData = {
      // Kinda important things to be included in the data
      coin,
      revenue,
      price,
      profit,

      // Other garbage
      percentChange,
    };

    outputHandler.handle(data, options);

    // TODO: don't wait after the last coin
    await sleep(options.sleepTime);
  }

  outputHandler.finished(options);
}

(async () => {
  // Provides better and more useful error messages than node normally does with promises
  try {
    await start();
  } catch (e) {
    console.error(chalk.red(" > Program crashed with error:"));
    console.error(chalk.red(" > Please report this: https://github.com/GarboMuffin/nicehash-calculator/issues/new"));
    console.error(chalk.red(" > Please provide details such as what you were doing, arguments, etc. in your report."));
    console.error(e.stack);
  }
})();
