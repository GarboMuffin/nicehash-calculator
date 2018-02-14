import chalk from "chalk";

import { ICoin } from "./coins";
import { IOptions } from "./options";
import { debug } from "./debug";

export class CoinFilterer {
  public filter(allCoins: ICoin[], options: IOptions): ICoin[] {
    // If a user types in an algorithm it enables all coins of that algorithm
    // If a user types in the ticker/abbrevation of a coin it will enable it
    // If a user types in the name of a coin it will enable it

    let result: ICoin[] = allCoins;
    let userEnabledCoins = false;

    for (const coin of allCoins) {
      for (const str of options.coins) {
        // disabling a coin
        const isDisablingCoin = str.startsWith("-");

        let name: string = "";
        if (isDisablingCoin) {
          name = str.substr(1);
        } else {
          name = str;
        }

        if (coin.names.indexOf(name) > -1 || coin.niceHashAlgo.names.indexOf(name) > -1) {
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
}
