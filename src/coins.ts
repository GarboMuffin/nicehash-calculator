import * as request from "request-promise";
import { WhatToMineAPI } from "./whattomine/WhatToMine";
import { NHAlgorithm } from "./nicehash/algorithm";
import { HashRate } from "./hashrate";

interface IAlgorithmMetadata {
  niceHashAlgo: NHAlgorithm;
  niceHashUnit: HashRate;
  whatToMineUnit: HashRate;
}

// We convert IWhatToMineCoin to this
export interface ICoin extends IAlgorithmMetadata {
  displayName: string;
  names: string[]; // more names
  abbreviation: string;
  id: number;
}

interface ICoinNames {
  displayName?: string;
  names?: string[];
}

function getAlgorithm(algo: string): IAlgorithmMetadata | null {
  // Some algorithms are missing from this list
  // To add: blake (so many weird variations) and sia (uses blake?)
  const ALGO_MAP: {[s: string]: IAlgorithmMetadata} = {
    LBRY: {
      niceHashAlgo: NHAlgorithm.Lbry,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    Ethash: {
      niceHashAlgo: NHAlgorithm.DaggerHashimoto,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.MEGA,
    },
    NeoScrypt: {
      niceHashAlgo: NHAlgorithm.NeoScrypt,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.KILO,
    },
    Skunkhash: {
      niceHashAlgo: NHAlgorithm.Skunk,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.MEGA,
    },
    Equihash: {
      niceHashAlgo: NHAlgorithm.Equihash,
      niceHashUnit: HashRate.MSOL,
      whatToMineUnit: HashRate.HASH,
    },
    CryptoNight: {
      niceHashAlgo: NHAlgorithm.CryptoNight,
      niceHashUnit: HashRate.MEGA,
      whatToMineUnit: HashRate.HASH,
    },
    // not to be confused with Lyra2RE
    Lyra2REv2: {
      niceHashAlgo: NHAlgorithm.Lyra2REv2,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.KILO,
    },
    Pascal: {
      niceHashAlgo: NHAlgorithm.Pascal,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    X11Gost: {
      niceHashAlgo: NHAlgorithm.X11,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.MEGA,
    },
    Keccak: {
      niceHashAlgo: NHAlgorithm.Keccak,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    X11: {
      niceHashAlgo: NHAlgorithm.X11,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    X13: {
      niceHashAlgo: NHAlgorithm.X13,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.MEGA,
    },
    Scrypt: {
      niceHashAlgo: NHAlgorithm.Scrypt,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    "SHA-256": {
      niceHashAlgo: NHAlgorithm.SHA256,
      niceHashUnit: HashRate.PETA,
      whatToMineUnit: HashRate.GIGA,
    },
    Quark: {
      niceHashAlgo: NHAlgorithm.Quark,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    NIST5: {
      niceHashAlgo: NHAlgorithm.Nist5,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.MEGA,
    },
    // not to be confused with Lyra2REv2
    Lyra2RE: {
      niceHashAlgo: NHAlgorithm.Lyra2RE,
      niceHashUnit: HashRate.GIGA,
      whatToMineUnit: HashRate.KILO,
    },
    Qubit: {
      niceHashAlgo: NHAlgorithm.Qubit,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    "Blake (2s)": {
      niceHashAlgo: NHAlgorithm.Blake2s,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    // These blake ones are just really weird.
    "Blake (2b)": {
      niceHashAlgo: NHAlgorithm.Sia,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
    "Blake (14r)": {
      niceHashAlgo: NHAlgorithm.Decred,
      niceHashUnit: HashRate.TERA,
      whatToMineUnit: HashRate.MEGA,
    },
  };

  const match = ALGO_MAP[algo];
  if (!match) {
    return null;
  } else {
    return match;
  }
}

function getAdditionalNames(coin: ICoin): ICoinNames {
  // Due to the switch to using whattomine to know coins we no longer have control over the data
  // And as a result some "less than good" work is done for this

  // WhatToMine doesn't always provide very good display names so some manual converting is done
  // some additional names may also be given

  switch (coin.displayName) {
    // don't kill me for using 'bcash', you don't have to use bcash but using bcash will enable bitcoin cash
    case "BitcoinCash": return {displayName: "Bitcoin Cash", names: ["bcash"]};
    case "BitcoinGold": return {displayName: "Bitcoin Gold"};
    case "EthereumClassic": return {displayName: "Ethereum Classic"};
    default: return {};
  }
}

export async function getWhatToMineCoins(): Promise<ICoin[]> {
  const whatToMine = new WhatToMineAPI();

  const whatToMineCalculators = await whatToMine.getCalculators();
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
      // console.warn(`Unknown algo: ${whatToMineCalculator.algorithm} (${whatToMineCalculator.name})`);
      continue;
    }
    coin.whatToMineUnit = algorithm.whatToMineUnit;
    coin.niceHashAlgo = algorithm.niceHashAlgo;
    coin.niceHashUnit = algorithm.niceHashUnit;

    coins.push(coin);
  }

  // Sort the coins, low ids first (Bitcoin, Litecoin, etc.)
  coins.sort((a, b) => a.id - b.id);

  return coins;
}
