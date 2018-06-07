import * as NiceHash from "./apis/nicehash";
import * as WhatToMine from "./apis/whattomine";

interface IAlgorithmOptions {
  name: string;
  aliases?: string[];
  whatToMine: WhatToMine.Algorithm;
  id: number;
}

export class Algorithm {
  public static instances: Algorithm[] = [];

  /* tslint:disable:variable-name */
  public static readonly LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    id: 23,
  });
  public static readonly Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    id: 20,
  });
  public static readonly NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    id: 8,
  });
  public static readonly Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    id: 29,
  });
  public static readonly Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    id: 24,
  });
  public static readonly CryptoNight = new Algorithm({
    name: "CryptoNight",
    aliases: ["cn"],
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    id: 22,
  });
  public static readonly Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    id: 14,
  });
  public static readonly Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    id: 25,
  });
  public static readonly X11Gost = new Algorithm({
    name: "X11Gost",
    whatToMine: WhatToMine.Algorithm.X11Gost,
    id: 26,
  });
  public static readonly Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    id: 5,
  });
  public static readonly X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    id: 3,
  });
  public static readonly X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    id: 4,
  });
  public static readonly Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    id: 0,
  });
  public static readonly "SHA-256" = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    id: 1,
  });
  public static readonly Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    id: 12,
  });
  public static readonly NIST5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    id: 7,
  });
  public static readonly Lyra2RE = new Algorithm({
    name: "Lyra2RE",
    whatToMine: WhatToMine.Algorithm.Lyra2RE,
    id: 9,
  });
  public static readonly Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    id: 11,
  });
  public static readonly "Blake (2s)" = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    id: 28,
  });
  public static readonly "Blake (2b)" = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm["Blake (2b)"],
    id: 27,
  });
  public static readonly "Blake (14r)" = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    id: 21,
  });
  public static readonly CryptoNightV7 = new Algorithm({
    name: "CryptoNightV7",
    aliases: ["cryptonight7", "cn7"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV7,
    id: 30,
  });
  public static readonly CryptoNightHeavy = new Algorithm({
    name: "CryptoNightHeavy",
    whatToMine: WhatToMine.Algorithm.CryptoNightHeavy,
    id: 31,
  });
  public static readonly Lyra2z = new Algorithm({
    name: "Lyra2Z",
    whatToMine: WhatToMine.Algorithm.Lyra2z,
    id: 32,
  });
  /* tslint:enable:variable-name */

  public displayName: string;
  public names: string[];
  public id: number;
  public whatToMine: WhatToMine.Algorithm;
  public niceHash!: NiceHash.Algorithm;

  constructor(opts: IAlgorithmOptions) {
    this.displayName = opts.name;
    this.names = opts.aliases || [];
    this.names.unshift(this.displayName.toLowerCase());
    this.whatToMine = opts.whatToMine;
    this.id = opts.id;
    Algorithm.instances.push(this);
  }
}
