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
    // the unit of hashrate
    const hashRateUnit = data.coin.algorithm.niceHash.unit.displayName;
    let indent = 0;

    const log = (message: string, newLine: boolean = true) => {
      const spacing = " ".repeat(indent);
      const messageToPrint = spacing + message;
      if (newLine) {
        console.log(messageToPrint);
      } else {
        process.stdout.write(messageToPrint);
      }
    };

    const printTitle = () => {
      // output coin name & algo
      const algo = chalk.gray(`(${data.coin.algorithm.displayName})`);
      log(`${data.coin.displayName}: ${algo}`);
    };

    const printPrice = () => {
      const price = underline(data.price.toFixed(PRECISION));
      log(`Price:   ${price} BTC/${hashRateUnit}/day`);
    };

    const printRevenue = () => {
      const revenue = underline(data.revenue.revenue.toFixed(PRECISION));
      const revenueTimestamp = chalk.gray("(" + (new Date(data.revenue.timestamp)).toLocaleString() + ")");
      log(`Revenue: ${revenue} BTC/${hashRateUnit}/day ${revenueTimestamp}`);
    };

    const printProfit = () => {
      const profit = underline(fancyFormatNumber(data.profit));
      const percentChange = underline(fancyFormatNumber(data.percentChange * 100));
      log(`Profit: ${profit} BTC/${hashRateUnit}/day (${percentChange}%)`);
    };

    const printWarnings = () => {
      // price of 0 means that there are no orders on nicehash
      if (data.price === 0) {
        log(chalk.red("!!! WARNING: NO ORDERS !!!"));
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
