import { logger } from "./logger";

// Different units of hashrate

export class HashRateUnit {
  public static instances: HashRateUnit[] = [];

  public static readonly HASH = new HashRateUnit(1, "H");
  public static readonly KILO = new HashRateUnit(1000, "KH");
  public static readonly MEGA = new HashRateUnit(1000 * 1000, "MH");
  public static readonly MSOL = new HashRateUnit(1000 * 1000, "MSol");
  public static readonly GIGA = new HashRateUnit(1000 * 1000 * 1000, "GH");
  public static readonly TERA = new HashRateUnit(1000 * 1000 * 1000 * 1000, "TH");
  public static readonly PETA = new HashRateUnit(1000 * 1000 * 1000 * 1000 * 1000, "PH");

  public static fromString(str: string): HashRateUnit {
    str = str.toLowerCase();
    for (const algorithm of HashRateUnit.instances) {
      if (algorithm.displayName.toLowerCase() === str) {
        return algorithm;
      }
    }
    logger.warn("No hash rate unit named " + str);
    return HashRateUnit.HASH;
  }

  public readonly hashes: number;
  public readonly displayName: string;

  constructor(hashes: number, displayName: string) {
    this.hashes = hashes;
    this.displayName = displayName;
    HashRateUnit.instances.push(this);
  }
}
