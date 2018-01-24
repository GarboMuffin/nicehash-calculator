import * as request from "request-promise";

interface INHApiResult<T> {
  result: T;
  method: string;
}

interface INHRawGlobalPricesCoin {
  price: string;
  algo: number;
}

interface INHRawGlobalPrices {
  stats: INHRawGlobalPricesCoin[];
}

interface INHOrder {
  limit_speed: string;
  alive: boolean;
  price: string;
  id: number;
  type: number;
  workers: number;
  algo: number;
  accepted_speed: string;
}

interface INHRawOrders {
  orders: INHOrder[];
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
    private async getRawGlobalPrices(): Promise<INHApiResult<INHRawGlobalPrices>> {
      const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
      const data = JSON.parse(rq) as INHApiResult<INHRawGlobalPrices>;
      return data;
    }

    public async getGlobalPrices(): Promise<INHRawGlobalPricesCoin[]> {
      const data = await this.getRawGlobalPrices();
      return data.result.stats;
    }

    private async getRawOrders(algo: NiceHash.Algorithm, location?: NiceHash.Location): Promise<INHApiResult<INHRawOrders>> {
      const getEndpoint = (): string => {
        let path = "https://api.nicehash.com/api?method=orders.get";
        path += "&algo=" + algo;
        if (location !== undefined) {
          path += "&location=" + location;
        }
        return path;
      };

      const rq = await request(getEndpoint());
      const data = JSON.parse(rq) as INHApiResult<INHRawOrders>;
      return data;
    }

    public async getAlgoMinimumPrice(algo: NiceHash.Algorithm, location?: NiceHash.Location): Promise<number> {
      const data = await this.getRawOrders(algo, location);
      const orders = data.result.orders;

      // find the lowest order with workers
      let minimum: INHOrder = orders[0];
      for (const order of orders) {
        const price = Number(order.price);
        const workers = order.workers;
        if (price < Number(minimum.price) && workers > 0) {
          minimum = order;
        }
      }
      return Number(minimum.price) || Infinity;
    }
  }
}
