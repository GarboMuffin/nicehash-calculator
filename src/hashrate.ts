export class HashRate {
  public static readonly HASH = new HashRate(1, "H");
  public static readonly KILO = new HashRate(1000, "KH");
  public static readonly MEGA = new HashRate(1000 * 1000, "MH");
  public static readonly MSOL = new HashRate(1000 * 1000, "MSol");
  public static readonly GIGA = new HashRate(1000 * 1000 * 1000, "GH");
  public static readonly TERA = new HashRate(1000 * 1000 * 1000 * 1000, "TH");
  public static readonly PETA = new HashRate(1000 * 1000 * 1000 * 1000 * 1000, "PH");

  public readonly hashes: number;
  public readonly displayName: string;

  constructor(hashes: number, displayName: string) {
    this.hashes = hashes;
    this.displayName = displayName;
  }
}
