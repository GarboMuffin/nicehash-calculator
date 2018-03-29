import chalk from "chalk";

import { ICoin } from "./coins";

export function listCoins(coins: ICoin[]) {
  console.log("Enabled coins:");
  for (const coin of coins) {
    console.log(chalk` * ${coin.displayName} (${coin.abbreviation}) {gray (${coin.algorithm.displayName})}`);
  }
}
