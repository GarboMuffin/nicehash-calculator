export class Algorithm {
  /* tslint:disable:variable-name */
  public static readonly Scrypt = new Algorithm(0, "Scrypt", []);
  public static readonly SHA256 = new Algorithm(1, "SHA256", ["sha-256", "sha"]);
  public static readonly ScryptNf = new Algorithm(2, "ScryptNf", []);
  public static readonly X11 = new Algorithm(3, "X11", []);
  public static readonly X13 = new Algorithm(4, "X13", []);
  public static readonly Keccak = new Algorithm(5, "Keccak", []);
  public static readonly X15 = new Algorithm(6, "X15", []);
  public static readonly Nist5 = new Algorithm(7, "Nist5", []);
  public static readonly NeoScrypt = new Algorithm(8, "NeoScrypt", []);
  public static readonly Lyra2RE = new Algorithm(9, "Lyra2RE", []);
  public static readonly WhirlpoolX = new Algorithm(10, "WhirlpoolX", []);
  public static readonly Qubit = new Algorithm(11, "Qubit", []);
  public static readonly Quark = new Algorithm(12, "Quark", []);
  public static readonly Axiom = new Algorithm(13, "Axiom", []);
  public static readonly Lyra2REv2 = new Algorithm(14, "Lyra2REv2", ["lyra"]);
  public static readonly ScryptJaneNf16 = new Algorithm(15, "ScryptJaneNf16", []);
  public static readonly Blake256r8 = new Algorithm(16, "Blake256r8", []);
  public static readonly Blake256r14 = new Algorithm(17, "Blake256r14", []);
  public static readonly Blake256r8vnl = new Algorithm(18, "Blake256r8vnl", []);
  public static readonly Hodl = new Algorithm(19, "Hodl", []);
  public static readonly DaggerHashimoto = new Algorithm(20, "DaggerHashimoto", ["ethash"]);
  public static readonly Decred = new Algorithm(21, "Decred", []);
  public static readonly CryptoNight = new Algorithm(22, "CryptoNight", []);
  public static readonly Lbry = new Algorithm(23, "Lbry", []);
  public static readonly Equihash = new Algorithm(24, "Equihash", []);
  public static readonly Pascal = new Algorithm(25, "Pascal", []);
  public static readonly X11Gost = new Algorithm(26, "X11Gost", []);
  public static readonly Sia = new Algorithm(27, "Sia", []);
  public static readonly Blake2s = new Algorithm(28, "Blake2s", []);
  public static readonly Skunk = new Algorithm(29, "Skunk", ["skunkhash"]);
  /* tslint:enable:variable-name */

  public readonly id: number;
  public readonly displayName: string;
  public readonly names: string[];

  private constructor(id: number, displayName: string, additionalNames: string[]) {
    additionalNames.unshift(displayName.toLowerCase());
    this.id = id;
    this.displayName = displayName;
    this.names = additionalNames;
  }
}
