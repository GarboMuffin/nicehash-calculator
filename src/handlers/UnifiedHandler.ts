import * as chalk from "chalk";
import { underline } from "chalk";

import { AbstractHandler } from "./AbstractHandler";
import { ICoinData } from "../index";
import { IOptions } from "../options";

const PRECISION = 4;

function fancyFormatNumber(num: number): string {
  const isPositive = num > 0;
  const asString = (isPositive ? "+" : "") + num.toFixed(PRECISION);
  const color = isPositive ? chalk.green : chalk.red;
  return color(asString);
}

export class UnifiedHandler extends AbstractHandler {
  public handle(data: ICoinData, options: IOptions) {
    console.log(`${data.coin.displayName}:`);

    const hashRateUnit = data.coin.niceHashUnit.displayName;

    const price = data.price.toFixed(PRECISION);
    console.log(` Price: ${underline(price)} BTC/${hashRateUnit}/day`);

    const revenue = data.revenue.toFixed(PRECISION);
    console.log(` Revenue: ${underline(revenue)} BTC/${hashRateUnit}/day`);

    const profit = fancyFormatNumber(data.profit);
    const percentChange = fancyFormatNumber(((data.percentChange) - 1) * 100);
    console.log(` Profit: ${underline(profit)} BTC/${hashRateUnit}/day (${percentChange}%)`);
  }
}
