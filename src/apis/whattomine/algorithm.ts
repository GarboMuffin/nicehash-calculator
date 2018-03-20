import { HashRateUnit } from "../../HashRateUnit";

// WhatToMine algorithms

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm(HashRateUnit.MEGA, "lbry");
  public static Ethash = new Algorithm(HashRateUnit.MEGA, "eth");
  public static NeoScrypt = new Algorithm(HashRateUnit.KILO, null);
  public static Skunkhash = new Algorithm(HashRateUnit.MEGA, "skh");
  public static Equihash = new Algorithm(HashRateUnit.HASH, "eq");
  public static CryptoNight = new Algorithm(HashRateUnit.HASH, "cn");
  public static Lyra2REv2 = new Algorithm(HashRateUnit.KILO, null);
  public static Pascal = new Algorithm(HashRateUnit.MEGA, "pas");
  public static X11Gost = new Algorithm(HashRateUnit.MEGA, null);
  public static Keccak = new Algorithm(HashRateUnit.MEGA, null);
  public static X11 = new Algorithm(HashRateUnit.MEGA, null);
  public static X13 = new Algorithm(HashRateUnit.MEGA, null);
  public static Scrypt = new Algorithm(HashRateUnit.MEGA, null);
  public static "SHA-256" = new Algorithm(HashRateUnit.GIGA, null);
  public static Quark = new Algorithm(HashRateUnit.MEGA, null);
  public static NIST5 = new Algorithm(HashRateUnit.MEGA, null);
  public static Lyra2RE = new Algorithm(HashRateUnit.KILO, null);
  public static Qubit = new Algorithm(HashRateUnit.MEGA, null);
  public static "Blake (2s)" = new Algorithm(HashRateUnit.MEGA, null);
  public static "Blake (2b)" = new Algorithm(HashRateUnit.GIGA, null);
  public static "Blake (14r)" = new Algorithm(HashRateUnit.MEGA, "bk14");
  /* tslint:enable:variable-name */

  public readonly unit: HashRateUnit;
  public readonly cacheInternalName: string | null;

  constructor(unit: HashRateUnit, cacheInternalName: string | null) {
    this.unit = unit;
    this.cacheInternalName = cacheInternalName;
  }
}
