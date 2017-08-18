import {NiceHashLocation, Locations} from "./location";
import {NiceHashCost, createEndpoint} from "./nicehash";
import {WhatToMine} from "./whattomine";
import {coins, Coin} from "./coins";
import {Hash} from "./hash";
import {Options, DefaultOptions, ProfitUnit, Unit} from "./options";
import {Algorithms} from "./algorithms";
import {OrderType} from "./order";

import * as chalk from "chalk";

const PRECISION = 6; // decimal places

function pad(text: string, i: number){
  // not exactly the fastest, but it works
  return " ".repeat(i) + text;
}

function minProfitCheck(options: ProfitUnit, btc: number, percent: number){
  if (options.unit === Unit.BTC){
    return options.amount <= btc;
  }
  if (options.unit === Unit.Percent){
    return options.amount <= percent;
  }
  return false;
}

function applyProfitOffset(options: ProfitUnit, profit: number){
  if (options.unit === Unit.BTC){
    profit += options.amount;
  }
  if (options.unit === Unit.Percent){
    profit *= (options.amount / 100) + 1;
  }
  return profit;
}

export async function run(i: Coin, options = DefaultOptions){
  function output(text: string){
    // chalk.white fixes invisible text in some terminals
    // eg. cmder and other terminal emulators
    // ironically windows command prompt works perfectly without this
    console.log(chalk.white(text));
  }

  var coinName = chalk.underline(i.name);
  var algoName = chalk.gray(`(${Algorithms[i.NiceHash.id]})`);

  output(`Report on ${coinName}: ${algoName}`);

  // calculate the revenue once, it won't change between locations so it doesn't belong to either
  var revenue = await WhatToMine.profit(i.WhatToMine.id, i.WhatToMine.hashrate);
  var hash = `BTC/${i.NiceHash.hashrate.name}`;

  output(pad(`Revenue: ${chalk.underline(revenue.toFixed(PRECISION))} ${hash}`, 1));

  // --only-revenue only outputs revenues
  if (options.onlyRevenue){
    return;
  }

  for (var l of options.locations){
    var coin = new NiceHashCost(createEndpoint(i.NiceHash.id, l), options.orderType);
    await coin.init();

    var totalOrders = coin.totalOrders;
    var price = applyProfitOffset(options.priceOffset, coin.price);
    var profit = revenue - price;
    var percent = profit / price * 100;

    var color = profit > 0 ? chalk.green : chalk.red;
    color = color.underline;

    if (!minProfitCheck(options.minProfit, profit, percent)){
      continue;
    }

    output(pad(`${NiceHashLocation[l]}:`, 1));

    if (totalOrders === 0){
      output(pad(chalk.red(`NO ORDERS`), 2));
      continue;
    }

    output(pad(`Price: ${color(price.toFixed(PRECISION))} ${hash}`, 2));
    output(pad(`Profit: ${color(profit.toFixed(PRECISION))} ${hash}`, 2));

    if (options.percent){
      output(pad(`%: ${color(percent.toFixed(PRECISION))}%`, 2));
    }
  }
}
