import * as request from "request-promise";

interface INHApiResult<T> {
  result: T;
  method: string;
}

interface INHRawGlobalProfitCoin {
  price: string;
  algo: number;
}

interface INHRawGlobalProfit {
  stats: INHRawGlobalProfitCoin[];
}

export namespace NiceHash {
  export enum Location {
    EU = 0,
    US = 1,
  }

  export enum Algorithm {
    Scrypt = 0,
    SHA256 = 1,
    ScryptNf = 2,
    X11 = 3,
    X13 = 4,
    Keccak = 5,
    X15 = 6,
    Nist5 = 7,
    NeoScrypt = 8,
    Lyra2RE = 9,
    WhirlpoolX = 10,
    Qubit = 11,
    Quark = 12,
    Axiom = 13,
    Lyra2REv2 = 14,
    ScryptJaneNf16 = 15,
    Blake256r8 = 16,
    Blake256r14 = 17,
    Blake256r8vnl = 18,
    Hodl = 19,
    DaggerHashimoto = 20,
    Decred = 21,
    CryptoNight = 22,
    Lbry = 23,
    Equihash = 24,
    Pascal = 25,
    X11Gost = 26,
    Sia = 27,
    Blake2s = 28,
    Skunk = 29,
  }

  export class API {
    private async getRawGlobalProfit() {
      const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
      const data = JSON.parse(rq) as INHApiResult<INHRawGlobalProfit>;
      return data;
    }

    public async getGlobalProfit(): Promise<INHRawGlobalProfitCoin[]> {
      const data = await this.getRawGlobalProfit();
      return data.result.stats;
    }
  }
}
