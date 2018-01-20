import * as chalk from "chalk";
import * as fs from "fs";

import { getWhatToMineCoins, ICoin } from "./coins";
import { parse as _parseOptions } from "./options";
import { getGlobalNiceHashPrices } from "./price";
import { getWhatToMineRevenue } from "./revenue";
import { sleep } from "./utils";

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

  return allCoins;
}

async function start() {
  const options = parseOptions();

  if (options.showHeader) {
    console.log(`This program ${chalk.bold("**estimates**")} the profitability of buying hashing power on NiceHash`);
    console.log(`Estimations are based on the NiceHash and WhatToMine APIs and have no guarantee of accuracy.`);
    console.log(`Only spend what you can afford to lose. I am not responsible for any losses.`);
    console.log("");
    console.log("If this is useful then consider sending me a few tips:");
    console.log("BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ");
    console.log("LTC: LfRV8T392L7M2n3pLk2DAus6bFhtqcfAht");
    console.log("ETH: 0x86dd805eb129Bfb268F21455451cD3C4dAA1c5F9");
    console.log("");
    console.log("Please report bugs: https://github.com/GarboMuffin/nicehash-calculator/issues/new");
    console.log("");
  }

  for (const unrecognizedOption of options.unrecognized) {
    console.warn("Unrecognized option: " + unrecognizedOption);
  }

  const whatToMineCoins = await getWhatToMineCoins();
  const globalNiceHashCosts = await getGlobalNiceHashPrices();

  const coins = filterCoins(options.coins, whatToMineCoins);

  for (const coin of coins) {
    // Calculate the numbers
    const revenue = await getWhatToMineRevenue(coin);
    const cost = globalNiceHashCosts[coin.niceHashAlgo];
    const profit = revenue - cost.price;

    // data is now passed onto any handlers
    const data = {coin, revenue, cost, profit};

    console.log(data);

    await sleep(options.sleepTime);
  }
}

(async () => {
  // Provides better and more useful error messages than node normally does it promises
  try {
    await start();
  } catch (e) {
    console.error(e.stack);
  }
})();
