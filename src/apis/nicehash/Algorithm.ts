import { HashRateUnit } from "../../HashRateUnit";

export class Algorithm {
  /* tslint:disable:variable-name */
  public static readonly Scrypt = new Algorithm(0, HashRateUnit.TERA);
  public static readonly SHA256 = new Algorithm(1, HashRateUnit.PETA);
  public static readonly ScryptNf = new Algorithm(2, HashRateUnit.GIGA);
  public static readonly X11 = new Algorithm(3, HashRateUnit.TERA);
  public static readonly X13 = new Algorithm(4, HashRateUnit.GIGA);
  public static readonly Keccak = new Algorithm(5, HashRateUnit.TERA);
  public static readonly X15 = new Algorithm(6, HashRateUnit.GIGA);
  public static readonly Nist5 = new Algorithm(7, HashRateUnit.TERA);
  public static readonly NeoScrypt = new Algorithm(8, HashRateUnit.GIGA);
  public static readonly Lyra2RE = new Algorithm(9, HashRateUnit.GIGA);
  public static readonly WhirlpoolX = new Algorithm(10, HashRateUnit.GIGA);
  public static readonly Qubit = new Algorithm(11, HashRateUnit.TERA);
  public static readonly Quark = new Algorithm(12, HashRateUnit.TERA);
  public static readonly Axiom = new Algorithm(13, HashRateUnit.KILO);
  public static readonly Lyra2REv2 = new Algorithm(14, HashRateUnit.TERA);
  public static readonly ScryptJaneNf16 = new Algorithm(15, HashRateUnit.MEGA);
  public static readonly Blake256r8 = new Algorithm(16, HashRateUnit.TERA);
  public static readonly Blake256r14 = new Algorithm(17, HashRateUnit.TERA);
  public static readonly Blake256r8vnl = new Algorithm(18, HashRateUnit.TERA);
  public static readonly Hodl = new Algorithm(19, HashRateUnit.KILO);
  public static readonly DaggerHashimoto = new Algorithm(20, HashRateUnit.GIGA);
  public static readonly Decred = new Algorithm(21, HashRateUnit.TERA);
  public static readonly CryptoNight = new Algorithm(22, HashRateUnit.MEGA);
  public static readonly Lbry = new Algorithm(23, HashRateUnit.TERA);
  public static readonly Equihash = new Algorithm(24, HashRateUnit.MSOL);
  public static readonly Pascal = new Algorithm(25, HashRateUnit.TERA);
  public static readonly X11Gost = new Algorithm(26, HashRateUnit.GIGA);
  public static readonly Sia = new Algorithm(27, HashRateUnit.TERA);
  public static readonly Blake2s = new Algorithm(28, HashRateUnit.TERA);
  public static readonly Skunk = new Algorithm(29, HashRateUnit.GIGA);
  public static readonly CryptoNightV7 = new Algorithm(30, HashRateUnit.MEGA);
  /* tslint:enable:variable-name */

  public readonly id: number;
  public readonly unit: HashRateUnit;

  private constructor(id: number, hashRateUnit: HashRateUnit) {
    this.id = id;
    this.unit = hashRateUnit;
  }
}
