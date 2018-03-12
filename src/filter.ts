import { ICoin } from "./coins";
import { logger } from "./logger";
import { clone } from "./utils";

export function filter(allCoins: ICoin[], coins: string[]): ICoin[] {
  // If a user types in an algorithm it enables all coins of that algorithm
  // If a user types in the ticker/abbrevation of a coin it will enable it
  // If a user types in the name of a coin it will enable it

  let result: ICoin[] = clone(allCoins);
  let userDefinedCoins = false;

  for (const coin of allCoins) {
    for (const str of coins) {
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
            logger.warn(`Can't disable coin '${name}': not enabled`);
          } else {
            logger.debug(`Disabling coin ${coin.displayName} because of argument '${str}'`);
            result.splice(index, 1);
          }
        } else {
          logger.debug(`Enabled coin ${coin.displayName} because of argument '${str}'`);
          if (!userDefinedCoins) {
            result = [];
          }
          result.push(coin);
        }
        userDefinedCoins = true;
      }
    }
  }

  if (!userDefinedCoins) {
    return allCoins;
  }

  return result;
}
