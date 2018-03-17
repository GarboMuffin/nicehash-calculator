import { HashRateUnit } from "../../HashRateUnit";

// WhatToMine algorithms

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm(HashRateUnit.MEGA);
  public static Ethash = new Algorithm(HashRateUnit.MEGA);
  public static NeoScrypt = new Algorithm(HashRateUnit.KILO);
  public static Skunkhash = new Algorithm(HashRateUnit.MEGA);
  public static Equihash = new Algorithm(HashRateUnit.HASH);
  public static CryptoNight = new Algorithm(HashRateUnit.HASH);
  public static Lyra2REv2 = new Algorithm(HashRateUnit.KILO);
  public static Pascal = new Algorithm(HashRateUnit.MEGA);
  public static X11Gost = new Algorithm(HashRateUnit.MEGA);
  public static Keccak = new Algorithm(HashRateUnit.MEGA);
  public static X11 = new Algorithm(HashRateUnit.MEGA);
  public static X13 = new Algorithm(HashRateUnit.MEGA);
  public static Scrypt = new Algorithm(HashRateUnit.MEGA);
  public static "SHA-256" = new Algorithm(HashRateUnit.GIGA);
  public static Quark = new Algorithm(HashRateUnit.MEGA);
  public static NIST5 = new Algorithm(HashRateUnit.MEGA);
  public static Lyra2RE = new Algorithm(HashRateUnit.KILO);
  public static Qubit = new Algorithm(HashRateUnit.MEGA);
  public static "Blake (2s)" = new Algorithm(HashRateUnit.MEGA);
  public static "Blake (2b)" = new Algorithm(HashRateUnit.GIGA);
  public static "Blake (14r)" = new Algorithm(HashRateUnit.MEGA);
  /* tslint:enable:variable-name */

  public readonly unit: HashRateUnit;

  constructor(unit: HashRateUnit) {
    this.unit = unit;
  }
}
