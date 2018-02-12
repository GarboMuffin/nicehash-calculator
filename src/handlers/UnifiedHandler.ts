import chalk from "chalk";

import { ICoinData, NiceHashCalculator } from "../NiceHashCalculator";
import { AbstractHandler } from "./AbstractHandler";

const PRECISION = 4;
const underline = chalk.underline;

function fancyFormatNumber(num: number): string {
  const isPositive = num > 0;
  const asString = (isPositive ? "+" : "") + num.toFixed(PRECISION);
  const color = isPositive ? chalk.green : chalk.red;
  return color(asString);
}

export class UnifiedHandler extends AbstractHandler {
  public handle(data: ICoinData, calculator: NiceHashCalculator) {
    // output coin name & algo
    const algo = chalk.gray(`(${data.coin.niceHashAlgo.displayName})`);
    console.log(`${data.coin.displayName}: ${algo}`);

    // the unit of hashrate
    const hashRateUnit = data.coin.niceHashUnit.displayName;

    // output price
    const price = underline(data.price.toFixed(PRECISION));
    // additional spaces make the output alligned
    console.log(` Price:   ${price} BTC/${hashRateUnit}/day`);

    const revenue = underline(data.revenue.revenue.toFixed(PRECISION));
    const revenueTimestamp = chalk.gray("(" + (new Date(data.revenue.timestamp)).toLocaleString() + ")");
    console.log(` Revenue: ${revenue} BTC/${hashRateUnit}/day ${revenueTimestamp}`);

    const profit = underline(fancyFormatNumber(data.profit));
    const percentChange = underline(fancyFormatNumber(data.percentChange * 100));
    console.log(` Profit: ${profit} BTC/${hashRateUnit}/day (${percentChange}%)`);

    console.log("");
  }
}
