import { NiceHashAPI } from "./nicehash/NiceHash";

interface IPrice {
  price: number;
}

export async function getGlobalNiceHashPrices(): Promise<IPrice[]> {
  const niceHash = new NiceHashAPI();
  const data = await niceHash.getGlobalProfit();

  const result: IPrice[] = [];
  for (const niceHashCost of data) {
    const price: IPrice = {} as any;
    price.price = Number(niceHashCost.price);
    result[niceHashCost.algo] = price;
  }
  return result;
}
