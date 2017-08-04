import {NiceHashLocation, Locations} from "./location";
import {NiceHashCost, createEndpoint} from "./nicehash";
import {WhatToMine} from "./whattomine";
import {coins, Coin} from "./coins";
import {Hash} from "./hash";
import {Options, DefaultOptions} from "./options";

import * as chalk from "chalk";

const PRECISION = 6;

function pad(text: string, i: number){
  // not exactly the fastest, but it works
  return " ".repeat(i) + text;
}

export async function run(i: Coin, options?: Options){
  if (options === undefined){
    options = DefaultOptions;
  }

  function output(text: string){
    // chalk.white fixes invisible text in some terminals
    // eg. cmder and maybe some unix ones
    // ironically windows command prompt works perfectly without this
    // this may use options at some point in the future
    console.log(chalk.white(text));
  }

  output(`Report on ${chalk.underline(i.name)}:`);

  var revenue = await WhatToMine.profit(i.WhatToMine.id, i.WhatToMine.hashrate);
  var hash = `BTC/${i.NiceHash.hashrate.name}`;

  output(pad(`Revenue: ${chalk.underline(revenue.toFixed(PRECISION))} ${hash}`, 1));

  for (var l of Locations){
    var coin = new NiceHashCost(createEndpoint(i.NiceHash.id, l), options.fixed);
    await coin.init();

    var cost = coin.price;
    var profit = revenue - cost;
    var percent = profit / cost * 100;

    var color = profit > 0 ? chalk.green : chalk.red;
    color = color.underline;

    if (typeof options.percent === "number" && percent < options.percent){
      continue;
    }

    output(pad(`${NiceHashLocation[l]}:`, 1));
    output(pad(`Cost: ${color(cost.toFixed(PRECISION))} ${hash}`, 2));
    output(pad(`Profit: ${color(profit.toFixed(PRECISION))} ${hash}`, 2));

    if (options.percent !== false){
      output(pad(`%: ${color(percent.toFixed(PRECISION))}%`, 2));
    }
  }
}
