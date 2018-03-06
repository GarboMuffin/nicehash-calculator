import { HashRateUnit } from "../../HashRateUnit";

// WhatToMine algorithms

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm(HashRateUnit.MEGA, 315);
  public static Ethash = new Algorithm(HashRateUnit.MEGA, 84);
  public static NeoScrypt = new Algorithm(HashRateUnit.KILO, 1950);
  public static Skunkhash = new Algorithm(HashRateUnit.MEGA, 48);
  public static Equihash = new Algorithm(HashRateUnit.HASH, 870);
  public static CryptoNight = new Algorithm(HashRateUnit.HASH, 2190);
  public static Lyra2REv2 = new Algorithm(HashRateUnit.KILO, 14700);
  public static Pascal = new Algorithm(HashRateUnit.MEGA, 2100);
  public static X11Gost = new Algorithm(HashRateUnit.MEGA, 20.1);
  public static Keccak = new Algorithm(HashRateUnit.MEGA, 900);
  public static X11 = new Algorithm(HashRateUnit.MEGA, 15000);
  public static X13 = new Algorithm(HashRateUnit.MEGA, 4800);
  public static Scrypt = new Algorithm(HashRateUnit.MEGA, 115200);
  public static "SHA-256" = new Algorithm(HashRateUnit.GIGA, 14000);
  public static Quark = new Algorithm(HashRateUnit.MEGA, 150);
  public static NIST5 = new Algorithm(HashRateUnit.MEGA, 57);
  public static Lyra2RE = new Algorithm(HashRateUnit.KILO, 13800);
  public static Qubit = new Algorithm(HashRateUnit.MEGA, 150);
  public static "Blake (2s)" = new Algorithm(HashRateUnit.MEGA, 815);
  public static "Blake (2b)" = new Algorithm(HashRateUnit.GIGA, 3450);
  public static "Blake (14r)" = new Algorithm(HashRateUnit.MEGA, 5910);
  /* tslint:enable:variable-name */

  public readonly defaultSpeed: number;
  public readonly unit: HashRateUnit;

  constructor(unit: HashRateUnit, defaultSpeed: number) {
    this.unit = unit;
    this.defaultSpeed = defaultSpeed;
  }
}
