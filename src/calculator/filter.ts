import { ICoin } from "./coins";
import { logger } from "../logger";
import { clone } from "../utils";

// If a user types in the name of a coin it will enable it
// If a user types in the ticker/abbrevation of a coin it will enable it
// If a user types in an algorithm it enables all coins of that algorithm
// If a user types in the ID of a coin it will enable it
// If a user prepends any of this with a single '-' it will instead disable all coins it matches

function isMatch(coin: ICoin, str: string): boolean {
  return coin.names.indexOf(str) > -1 || coin.algorithm.names.indexOf(str) > -1 || str === coin.id.toString();
}

export function filter(allCoins: ICoin[], coins: string[]): ICoin[] {
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

      if (isMatch(coin, name)) {
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
