import {NiceHashLocation, Locations} from "./location";
import {NiceHashAPI, NHCoinStat} from "./nicehash";
import {WhatToMine} from "./whattomine";
import {coins, Coin} from "./coins";
import {Hash} from "./hash";
import {Options, DefaultOptions, ProfitUnit, Unit} from "./options";
import {Algorithms} from "./algorithms";
import {NHOrderType} from "./order";

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

export function shouldUseUnifiedOutput(options: Options){
  return !options.findMin && options.orderType === NHOrderType.Standard;
}

export async function run(i: Coin, options = DefaultOptions, nicehash: NiceHashAPI){
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
  if (options.onlyShowRevenue){
    return;
  }

  // var coin = new NiceHashCost(createEndpoint(i.NiceHash.id, l), options.orderType);

  // load the price details now

  var useUnifiedOutput = shouldUseUnifiedOutput(options);

  enum OutputMethod {Unified, Divided};
  interface OutputMethodMeta {
    padding: number,
    showLocation: boolean,
  }
  interface OutputOptions {
    location: NiceHashLocation
  }
  var methods = new Map<OutputMethod, OutputMethodMeta>();
  methods.set(OutputMethod.Unified, {
    padding: 1,
    showLocation: false,
  });
  methods.set(OutputMethod.Divided, {
    padding: 2,
    showLocation: true,
  });

  if (useUnifiedOutput){
    // if not --find-min or --fixed eu and us have the same details
    // and whatnot
    
    // NOTE: the location argument is IGNORED
    // this function always returns a NHCoinStat in this case
    var coin = await nicehash.get(i.NiceHash.id, NiceHashLocation.EU, options) as NHCoinStat;
    outputData(coin.price, OutputMethod.Unified);
  }else{
    for (var l of options.locations){
      var price = await nicehash.get(i.NiceHash.id, l, options) as number;
      outputData(price, OutputMethod.Divided, {
        location: l,
      });
    }
  }

  function outputData(price: number, method: OutputMethod, doptions?: OutputOptions){
    var methodMeta = methods.get(method) as OutputMethodMeta;
    var padding = methodMeta.padding;
    var showLocation = methodMeta.showLocation;

    price = applyProfitOffset(options.priceOffset, price);

    var profit = revenue - price;
    var percent = profit / price * 100

    var color = profit > 0 ? chalk.green : chalk.red;
    color = color.underline;

    if (!minProfitCheck(options.minProfit, profit, percent)){
      return;
    }

    if (showLocation){
      output(pad(`${NiceHashLocation[l]}:`, 1));
    }

    output(pad(`Price: ${color(price.toFixed(PRECISION))} ${hash}`, padding));
    output(pad(`Profit: ${color(profit.toFixed(PRECISION))} ${hash}`, padding));

    if (options.showPercent){
      output(pad(`%: ${color(percent.toFixed(PRECISION))}%`, padding));
    }
  }
}
