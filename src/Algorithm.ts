import * as NiceHash from "./apis/nicehash";
import * as WhatToMine from "./apis/whattomine";

interface IAlgorithmOptions {
  name: string;
  aliases?: string[];
  whatToMine: WhatToMine.Algorithm;
  niceHash: NiceHash.Algorithm;
}

export class Algorithm {
  /* tslint:disable:variable-name */
  public static readonly LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    niceHash: NiceHash.Algorithm.Lbry,
  });
  public static readonly Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    niceHash: NiceHash.Algorithm.DaggerHashimoto,
  });
  public static readonly NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    niceHash: NiceHash.Algorithm.NeoScrypt,
  });
  public static readonly Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    niceHash: NiceHash.Algorithm.Skunk,
  });
  public static readonly Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    niceHash: NiceHash.Algorithm.Equihash,
  });
  public static readonly CryptoNight = new Algorithm({
    name: "CryptoNight",
    aliases: ["cn"],
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    niceHash: NiceHash.Algorithm.CryptoNight,
  });
  public static readonly Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    niceHash: NiceHash.Algorithm.Lyra2REv2,
  });
  public static readonly Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    niceHash: NiceHash.Algorithm.Pascal,
  });
  public static readonly X11Gost = new Algorithm({
    name: "X11Gost",
    whatToMine: WhatToMine.Algorithm.X11Gost,
    niceHash: NiceHash.Algorithm.X11Gost,
  });
  public static readonly Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    niceHash: NiceHash.Algorithm.Keccak,
  });
  public static readonly X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    niceHash: NiceHash.Algorithm.X11,
  });
  public static readonly X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    niceHash: NiceHash.Algorithm.X13,
  });
  public static readonly Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    niceHash: NiceHash.Algorithm.Scrypt,
  });
  public static readonly "SHA-256" = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    niceHash: NiceHash.Algorithm.SHA256,
  });
  public static readonly Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    niceHash: NiceHash.Algorithm.Quark,
  });
  public static readonly NIST5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    niceHash: NiceHash.Algorithm.Nist5,
  });
  public static readonly Lyra2RE = new Algorithm({
    name: "Lyra2RE",
    whatToMine: WhatToMine.Algorithm.Lyra2RE,
    niceHash: NiceHash.Algorithm.Lyra2RE,
  });
  public static readonly Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    niceHash: NiceHash.Algorithm.Qubit,
  });
  public static readonly "Blake (2s)" = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    niceHash: NiceHash.Algorithm.Blake2s,
  });
  public static readonly "Blake (2b)" = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm["Blake (2b)"],
    niceHash: NiceHash.Algorithm.Sia,
  });
  public static readonly "Blake (14r)" = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    niceHash: NiceHash.Algorithm.Decred,
  });
  public static readonly CryptoNightV7 = new Algorithm({
    name: "CryptoNightV7",
    aliases: ["cryptonight7", "cn7"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV7,
    niceHash: NiceHash.Algorithm.CryptoNightV7,
  });
  /* tslint:enable:variable-name */

  public readonly displayName: string;
  public readonly names: string[];
  public readonly whatToMine: WhatToMine.Algorithm;
  public readonly niceHash: NiceHash.Algorithm;

  constructor(opts: IAlgorithmOptions) {
    this.displayName = opts.name;
    this.names = opts.aliases || [];
    this.names.unshift(this.displayName.toLowerCase());
    this.whatToMine = opts.whatToMine;
    this.niceHash = opts.niceHash;
  }
}
