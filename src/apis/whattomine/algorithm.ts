export interface IAlgorithm {
  defaultSpeed: number;
}

// Also see coins.ts in the root of src

export class Algorithm {
  /* tslint:disable:variable-name */
  public static LBRY = new Algorithm(315);
  public static Ethash = new Algorithm(84);
  public static NeoScrypt = new Algorithm(1950);
  public static Skunkhash = new Algorithm(48);
  public static Equihash = new Algorithm(870);
  public static CryptoNight = new Algorithm(2190);
  public static Lyra2REv2 = new Algorithm(14700);
  public static Pascal = new Algorithm(2100);
  public static X11Gost = new Algorithm(20.1);
  public static Keccak = new Algorithm(900);
  public static X11 = new Algorithm(15000);
  public static X13 = new Algorithm(4800);
  public static Scrypt = new Algorithm(115200);
  public static "SHA-256" = new Algorithm(14000);
  public static Quark = new Algorithm(150);
  public static NIST5 = new Algorithm(57);
  public static Lyra2RE = new Algorithm(13800);
  public static Qubit = new Algorithm(150);
  public static "Blake (2s)" = new Algorithm(100);
  public static "Blake (2b)" = new Algorithm(3450);
  public static "Blake (14r)" = new Algorithm(5910);
  /* tslint:enable:variable-name */

  public readonly defaultSpeed: number;
  constructor(defaultSpeed: number) {
    this.defaultSpeed = defaultSpeed;
  }
}
