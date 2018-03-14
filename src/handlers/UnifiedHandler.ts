import chalk from "chalk";

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
    // the unit of hashrate
    const hashRateUnit = data.coin.algorithm.niceHash.unit.displayName;
    let indent = 0;

    const log = (message: string) => {
      const spacing = " ".repeat(indent);
      const messageToPrint = spacing + message;
      console.log(messageToPrint);
    };

    const printTitle = () => {
      // output coin name & algo
      const algo = data.coin.algorithm.displayName;
      log(chalk`${data.coin.displayName}: {gray (${algo})}`);
    };

    const printPrice = () => {
      const price = data.price.toFixed(PRECISION);
      log(chalk`Price:   {underline ${price}} BTC/${hashRateUnit}/day`);
    };

    const printRevenue = () => {
      const revenue = data.revenue.toFixed(PRECISION);
      const time = (new Date(data.rawRevenue.timestamp)).toLocaleString();
      log(chalk`Revenue: {underline ${revenue}} BTC/${hashRateUnit}/day {gray (${time})}`);
    };

    const printProfit = () => {
      const profit = fancyFormatNumber(data.profit);
      const percentChange = fancyFormatNumber(data.percentChange * 100);
      log(chalk`Profit: {underline ${profit}} BTC/${hashRateUnit}/day (${percentChange}%)`);
    };

    const printWarnings = () => {
      // price of 0 means that there are no orders on nicehash
      if (data.price === 0) {
        log(chalk.red("Warning: NO ORDERS!"));
      }
      // profit of more than 1000% typically means some api unit has changed
      if (data.returnOnInvestment > 10) {
        log(chalk.yellow("Warning: Profit seems incredibly high, perhaps an API unit has changed?"));
      }
    };

    printTitle();
    indent++;
    printPrice();
    printRevenue();
    printProfit();
    printWarnings();

    console.log("");
  }
}
