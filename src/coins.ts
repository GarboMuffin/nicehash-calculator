import * as NiceHash from "./apis/nicehash/";
import { HashRateUnit } from "./HashRateUnit";
import { NiceHashCalculator } from "./NiceHashCalculator";

interface IAlgorithmMetadata {
  niceHashAlgo: NiceHash.Algorithm;
  niceHashUnit: HashRateUnit;
  whatToMineUnit: HashRateUnit;
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
      niceHashAlgo: NiceHash.Algorithm.Lbry,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    Ethash: {
      niceHashAlgo: NiceHash.Algorithm.DaggerHashimoto,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    NeoScrypt: {
      niceHashAlgo: NiceHash.Algorithm.NeoScrypt,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.KILO,
    },
    Skunkhash: {
      niceHashAlgo: NiceHash.Algorithm.Skunk,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    Equihash: {
      niceHashAlgo: NiceHash.Algorithm.Equihash,
      niceHashUnit: HashRateUnit.MSOL,
      whatToMineUnit: HashRateUnit.HASH,
    },
    CryptoNight: {
      niceHashAlgo: NiceHash.Algorithm.CryptoNight,
      niceHashUnit: HashRateUnit.MEGA,
      whatToMineUnit: HashRateUnit.HASH,
    },
    // not to be confused with Lyra2RE
    Lyra2REv2: {
      niceHashAlgo: NiceHash.Algorithm.Lyra2REv2,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.KILO,
    },
    Pascal: {
      niceHashAlgo: NiceHash.Algorithm.Pascal,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    X11Gost: {
      niceHashAlgo: NiceHash.Algorithm.X11,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    Keccak: {
      niceHashAlgo: NiceHash.Algorithm.Keccak,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    X11: {
      niceHashAlgo: NiceHash.Algorithm.X11,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    X13: {
      niceHashAlgo: NiceHash.Algorithm.X13,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    Scrypt: {
      niceHashAlgo: NiceHash.Algorithm.Scrypt,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    "SHA-256": {
      niceHashAlgo: NiceHash.Algorithm.SHA256,
      niceHashUnit: HashRateUnit.PETA,
      whatToMineUnit: HashRateUnit.GIGA,
    },
    Quark: {
      niceHashAlgo: NiceHash.Algorithm.Quark,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    NIST5: {
      niceHashAlgo: NiceHash.Algorithm.Nist5,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    // not to be confused with Lyra2REv2
    Lyra2RE: {
      niceHashAlgo: NiceHash.Algorithm.Lyra2RE,
      niceHashUnit: HashRateUnit.GIGA,
      whatToMineUnit: HashRateUnit.KILO,
    },
    Qubit: {
      niceHashAlgo: NiceHash.Algorithm.Qubit,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    "Blake (2s)": {
      niceHashAlgo: NiceHash.Algorithm.Blake2s,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    // These blake ones are just really weird.
    "Blake (2b)": {
      niceHashAlgo: NiceHash.Algorithm.Sia,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
    "Blake (14r)": {
      niceHashAlgo: NiceHash.Algorithm.Decred,
      niceHashUnit: HashRateUnit.TERA,
      whatToMineUnit: HashRateUnit.MEGA,
    },
  };

  const match = ALGO_MAP[algo];
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

export async function getCoins(calculator: NiceHashCalculator): Promise<ICoin[]> {
  const whatToMineCalculators = await calculator.whatToMine.getCalculators();
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
