import { ICoin } from "./coins";
import { NiceHashCalculator } from "./NiceHashCalculator";

export async function getWhatToMineRevenue(coin: ICoin, calculator: NiceHashCalculator): Promise<number> {
  const hashrate = coin.niceHashUnit.hashes / coin.whatToMineUnit.hashes;
  return await calculator.whatToMine.getProfit(coin.id, hashrate);
}
