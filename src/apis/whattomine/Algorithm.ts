import { HashRateUnit } from "../../HashRateUnit";

// WhatToMine algorithms

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm(HashRateUnit.MEGA, "lbry");
  public static Ethash = new Algorithm(HashRateUnit.MEGA, "eth");
  public static NeoScrypt = new Algorithm(HashRateUnit.KILO, "ns");
  public static Skunkhash = new Algorithm(HashRateUnit.MEGA, "skh");
  public static Equihash = new Algorithm(HashRateUnit.HASH, "eq");
  public static CryptoNight = new Algorithm(HashRateUnit.HASH, "cn");
  public static Lyra2REv2 = new Algorithm(HashRateUnit.KILO, ["lre", "lrev2"]);
  public static Pascal = new Algorithm(HashRateUnit.MEGA, "pas");
  public static X11Gost = new Algorithm(HashRateUnit.GIGA, "x11g");
  public static Keccak = new Algorithm(HashRateUnit.MEGA, null);
  public static X11 = new Algorithm(HashRateUnit.MEGA, null);
  public static X13 = new Algorithm(HashRateUnit.MEGA, null);
  public static Scrypt = new Algorithm(HashRateUnit.MEGA, null);
  public static "SHA-256" = new Algorithm(HashRateUnit.GIGA, null);
  public static Quark = new Algorithm(HashRateUnit.MEGA, null);
  public static NIST5 = new Algorithm(HashRateUnit.MEGA, "ns");
  public static Lyra2RE = new Algorithm(HashRateUnit.KILO, null);
  public static Qubit = new Algorithm(HashRateUnit.MEGA, null);
  public static "Blake (2s)" = new Algorithm(HashRateUnit.MEGA, null);
  public static "Blake (2b)" = new Algorithm(HashRateUnit.GIGA, null);
  public static "Blake (14r)" = new Algorithm(HashRateUnit.MEGA, "bk14");
  public static CryptoNightV7 = new Algorithm(HashRateUnit.HASH, "cn7");
  public static CryptoNightHeavy = new Algorithm(HashRateUnit.HASH, null);
  public static Lyra2z = new Algorithm(HashRateUnit.MEGA, null);
  public static X16R = new Algorithm(HashRateUnit.MEGA, "x16r");
  /* tslint:enable:variable-name */

  public readonly unit: HashRateUnit;
  public readonly cacheNames: [string | null, string | null] | null;

  constructor(unit: HashRateUnit, cacheNames: (string | null) | [string | null, string | null]) {
    this.unit = unit;
    if (typeof cacheNames === "string") {
      this.cacheNames = [cacheNames, cacheNames];
    } else {
      this.cacheNames = cacheNames;
    }
  }
}
