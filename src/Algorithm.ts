import { HashRateUnit } from "./HashRateUnit";
import * as NiceHash from "./apis/nicehash";
import * as WhatToMine from "./apis/whattomine";

interface IAlgorithmOptions {
  name: string;
  aliases?: string[],
  whatToMine: WhatToMine.Algorithm;
  niceHash: NiceHash.Algorithm;
}

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    niceHash: NiceHash.Algorithm.Lbry,
  });
  public static Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    niceHash: NiceHash.Algorithm.DaggerHashimoto,
  });
  public static NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    niceHash: NiceHash.Algorithm.NeoScrypt,
  });
  public static Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    niceHash: NiceHash.Algorithm.Skunk,
  });
  public static Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    niceHash: NiceHash.Algorithm.Equihash,
  });
  public static CryptoNight = new Algorithm({
    name: "CryptoNight",
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    niceHash: NiceHash.Algorithm.CryptoNight,
  });
  public static Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    niceHash: NiceHash.Algorithm.Lyra2REv2,
  });
  public static Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    niceHash: NiceHash.Algorithm.Pascal,
  });
  public static X11Gost = new Algorithm({
    name: "X11Gost",
    whatToMine: WhatToMine.Algorithm.X11Gost,
    niceHash: NiceHash.Algorithm.X11Gost,
  });
  public static Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    niceHash: NiceHash.Algorithm.Keccak,
  });
  public static X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    niceHash: NiceHash.Algorithm.X11,
  });
  public static X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    niceHash: NiceHash.Algorithm.X13,
  });
  public static Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    niceHash: NiceHash.Algorithm.Scrypt,
  });
  public static "SHA-256" = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    niceHash: NiceHash.Algorithm.SHA256,
  });
  public static Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    niceHash: NiceHash.Algorithm.Quark,
  });
  public static Nist5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    niceHash: NiceHash.Algorithm.Nist5,
  });
  public static Lyra2RE = new Algorithm({
    name: "Lyra2RE",
    whatToMine: WhatToMine.Algorithm.Lyra2RE,
    niceHash: NiceHash.Algorithm.Lyra2RE,
  });
  public static Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    niceHash: NiceHash.Algorithm.Qubit,
  });
  public static "Blake (2s)" = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    niceHash: NiceHash.Algorithm.Blake2s,
  });
  public static "Blake (2b)" = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm["Blake (2b)"],
    niceHash: NiceHash.Algorithm.Sia,
  });
  public static "Blake (14r)" = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    niceHash: NiceHash.Algorithm.Decred,
  });
  /* tslint:enable:variable-name */

  public readonly displayName: string;
  public readonly names: string[];
  public readonly whatToMine: WhatToMine.Algorithm;
  public readonly niceHash: NiceHash.Algorithm;

  constructor(opts: IAlgorithmOptions) {
    this.displayName = opts.name;
    this.names = opts.aliases || [];
    this.names.unshift(this.displayName);
    this.whatToMine = opts.whatToMine;
    this.niceHash = opts.niceHash;
  }
}
