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

function disableCoin(coin: ICoin, trigger: string) {
  if (coin.enabled === false) {
    logger.warn(`Couldn't disable coin ${coin.displayName} because it's already disabled ('${trigger}')`);
    return;
  }
  logger.debug(`filter(): Disabled coin ${coin.displayName} because of argument '${trigger}'`);
  coin.enabled = false;
}

function enableCoin(coin: ICoin, trigger: string) {
  if (coin.enabled === true) {
    logger.warn(`Couldn't enable coin ${coin.displayName} because it's already enabled ('${trigger}')`);
    return;
  }
  logger.debug(`filter(): Enabled coin ${coin.displayName} because of argument '${trigger}'`);
  coin.enabled = true;
}

export function filter(coins: ICoin[], targets: string[]): ICoin[] {
  coins.forEach((coin) => coin.enabled = null);

  let hasEnabledCoins: boolean = false;

  for (const str of targets) {
    let foundMatch: boolean = false;
    for (const coin of coins) {
      const isDisablingCoin = str.startsWith("-");

      let name: string = str;
      if (isDisablingCoin) {
        name = name.substr(1);
      }

      if (isMatch(coin, name)) {
        if (isDisablingCoin) {
          disableCoin(coin, name);
        } else {
          enableCoin(coin, name);
          if (!hasEnabledCoins) {
            coins.filter((c) => c.enabled === null).forEach((c) => c.enabled = false);
          }
          hasEnabledCoins = true;
        }
        foundMatch = true;
      }
    }
    if (!foundMatch) {
      logger.warn(`Couldn't find coins that match argument '${str}'`);
    }
  }

  return coins.filter((coin) => coin.enabled === true || coin.enabled === null);
}
