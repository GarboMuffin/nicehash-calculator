import chalk from "chalk";

import { ICoin } from "./coins";
import { debug } from "./debug";
import { IOptions } from "./options";
import { clone } from "./utils";

export function filter(allCoins: ICoin[], options: IOptions): ICoin[] {
  // If a user types in an algorithm it enables all coins of that algorithm
  // If a user types in the ticker/abbrevation of a coin it will enable it
  // If a user types in the name of a coin it will enable it

  let result: ICoin[] = clone(allCoins);
  let userEnabledCoins = false;

  for (const coin of allCoins) {
    for (const str of options.coins) {
      // disabling a coin
      const isDisablingCoin = str.startsWith("-");

      let name: string = str;
      if (isDisablingCoin) {
        name = name.substr(1);
      }

      if (coin.names.indexOf(name) > -1 || coin.algorithm.names.indexOf(name) > -1) {
        if (isDisablingCoin) {
          const index = result.indexOf(coin);
          if (index === -1) {
            console.warn(chalk.yellow(`WARN: Can't disable coin '${name}': not found`));
          } else {
            debug(`Disabling coin ${coin.displayName} because of argument '${str}'`);
            result.splice(index, 1);
          }
        } else {
          debug(`Enabled coin ${coin.displayName} because of argument '${str}'`);
          if (!userEnabledCoins) {
            result = [];
          }
          userEnabledCoins = true;
          result.push(coin);
          break;
        }
      }
    }
  }

  if (!userEnabledCoins) {
    return allCoins;
  }

  return result;
}
