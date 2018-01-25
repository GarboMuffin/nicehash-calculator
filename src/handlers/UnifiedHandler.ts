import * as chalk from "chalk";
import { underline } from "chalk";

import { ICoinData, NiceHashCalculator } from "../NiceHashCalculator";
import { AbstractHandler } from "./AbstractHandler";

const PRECISION = 4;

function fancyFormatNumber(num: number): string {
  const isPositive = num > 0;
  const asString = (isPositive ? "+" : "") + num.toFixed(PRECISION);
  const color = isPositive ? chalk.green : chalk.red;
  return color(asString);
}

export class UnifiedHandler extends AbstractHandler {
  public handle(data: ICoinData, calculator: NiceHashCalculator) {
    const algo = chalk.gray(`(${data.coin.niceHashAlgo.displayName})`);
    console.log(`${data.coin.displayName}: ${algo}`);

    const hashRateUnit = data.coin.niceHashUnit.displayName;

    const price = data.price.toFixed(PRECISION);
    console.log(` Price: ${underline(price)} BTC/${hashRateUnit}/day`);

    const revenue = data.revenue.toFixed(PRECISION);
    console.log(` Revenue: ${underline(revenue)} BTC/${hashRateUnit}/day`);

    const profit = fancyFormatNumber(data.profit);
    const percentChange = fancyFormatNumber(data.percentChange * 100);
    console.log(` Profit: ${underline(profit)} BTC/${hashRateUnit}/day (${percentChange}%)`);

    console.log("");
  }
}
