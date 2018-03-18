import { Algorithm } from "../Algorithm";
import * as WhatToMine from "../apis/whattomine";
import { logger } from "../logger";

// We convert IWhatToMineCoin to this
export interface ICoin {
  displayName: string;
  names: string[]; // more names
  abbreviation: string;
  id: number;
  algorithm: Algorithm;
}

interface ICoinNames {
  displayName?: string;
  names?: string[];
}

function getAlgorithm(algo: string): Algorithm {
  const match = (Algorithm as any)[algo];
  return match || null;
}

function getAdditionalNames(coin: ICoin): ICoinNames {
  // Due to the switch to using whattomine to know coins we no longer have control over the data
  // And as a result some "less than good" work is done for this

  // WhatToMine doesn't always provide very good display names so some manual converting is done
  // some additional names may also be given

  switch (coin.displayName) {
    // don't kill me for using 'bcash', you don't have to use bcash but using bcash will enable bitcoin cash
    case "BitcoinCash": return {displayName: "Bitcoin Cash", names: ["bcash", "bcc"]};
    case "BitcoinGold": return {displayName: "Bitcoin Gold"};
    case "EthereumClassic": return {displayName: "Ethereum Classic"};
    default: return {};
  }
}

export async function getCoins(): Promise<ICoin[]> {
  const whatToMineCalculators = await WhatToMine.api.getCalculators();
  const coins: ICoin[] = [];

  // Convert the coins to our own thing
  for (const whatToMineCalculator of whatToMineCalculators) {
    const coin: ICoin = {} as any; // as any tricks typescript into ignoring all the errors

    coin.displayName = whatToMineCalculator.name;
    coin.abbreviation = whatToMineCalculator.tag;
    coin.names = [coin.displayName.toLowerCase(), coin.abbreviation.toLowerCase()]; // name and abbreviation

    // Additional names/User friendly display names
    const additionalNames = getAdditionalNames(coin);
    if (additionalNames.displayName) {
      coin.displayName = additionalNames.displayName;
      coin.names.push(coin.displayName.toLowerCase());
    }
    if (additionalNames.names) {
      coin.names = coin.names.concat(additionalNames.names);
    }

    coin.id = whatToMineCalculator.id;

    // set algo
    const algorithm = getAlgorithm(whatToMineCalculator.algorithm);
    if (algorithm === null) {
      // This coin doesn't have a matching algorithm on nicehash so don't add it
      logger.debug(`getCoins(): unknown algo: ${whatToMineCalculator.algorithm} (${whatToMineCalculator.name})`);
      continue;
    }
    coin.algorithm = algorithm;

    coins.push(coin);
  }

  // Sort the coins, low ids first (Bitcoin, Litecoin, etc.)
  coins.sort((a, b) => a.id - b.id);

  return coins;
}
