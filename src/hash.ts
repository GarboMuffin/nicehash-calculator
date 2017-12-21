/*
 * Defines reusable units of hashrates
 */

export class HashRate {
  constructor(hashrate: number, name: string) {
    this.hashrate = hashrate;
    this.name = name;
  }

  hashrate: number;
  name: string;
}

export class Hash {
  static MEGA = new HashRate(1, "MH");
  static MSOL = new HashRate(1, "MSol");
  static GIGA = new HashRate(1000, "GH");
  static TERA = new HashRate(1000 * 1000, "TH");
  static PETA = new HashRate(1000 * 1000 * 1000, "PH");
}
