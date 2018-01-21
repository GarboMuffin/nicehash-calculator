import { NiceHashAPI } from "./nicehash/NiceHash";

export async function getGlobalNiceHashPrices(): Promise<number[]> {
  const niceHash = new NiceHashAPI();
  const data = await niceHash.getGlobalProfit();

  const result: number[] = [];
  for (const niceHashCost of data) {
    result[niceHashCost.algo] = Number(niceHashCost.price);
  }
  return result;
}
