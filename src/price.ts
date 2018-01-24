import { NiceHashCalculator } from "./NiceHashCalculator";

export async function getGlobalNiceHashPrices(calculator: NiceHashCalculator): Promise<number[]> {
  const data = await calculator.niceHash.getGlobalPrices();

  const result: number[] = [];
  for (const niceHashCost of data) {
    result[niceHashCost.algo] = Number(niceHashCost.price);
  }
  return result;
}
