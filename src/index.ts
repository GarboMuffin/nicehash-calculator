import { parse as _parseOptions } from "./options";
import { getWhatToMineCoins } from "./coins";
import { getWhatToMineRevenue } from "./revenue";
import { getGlobalNiceHashPrices } from "./price";
import { sleep } from "./utils";

import * as chalk from "chalk";

function parseOptions() {
  const options = _parseOptions(process.argv.splice(2));
  return options;
}

function filterCoins() {

}

async function start() {
  console.log(`This program ${chalk.bold("**estimates**")} the profitability of buying hashing power on NiceHash`);
  console.log(`Estimations are based on the NiceHash and WhatToMine APIs and have no guarantee of accuracy.`);
  console.log(`Only spend what you can afford to lose. I am not responsible for any losses.`);

  console.log("");

  console.log("If this is useful then consider sending me a few tips:");
  console.log("BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ");
  console.log("LTC: LfRV8T392L7M2n3pLk2DAus6bFhtqcfAht");
  console.log("ETH: 0x86dd805eb129Bfb268F21455451cD3C4dAA1c5F9");

  console.log("");

  const options = parseOptions();
  const whatToMineCoins = await getWhatToMineCoins();
  const globalNiceHashCosts = await getGlobalNiceHashPrices();

  // console.log(options);
  // console.log(coins);
  // console.log(globalNiceHashCosts);

  for (const coin of whatToMineCoins) {
    // Calculate the numbers
    const revenue = await getWhatToMineRevenue(coin);
    const cost = globalNiceHashCosts[coin.niceHashAlgo];

    // data is now passed onto any handlers
    const data = {coin, revenue, cost};

    console.log(data);

    await sleep(1000);
  }
}

start();
