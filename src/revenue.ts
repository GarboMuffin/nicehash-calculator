import * as WhatToMine from "./apis/whattomine/";
import { ICoin } from "./coins";
import { NiceHashCalculator } from "./NiceHashCalculator";

export async function getWhatToMineRevenue(coin: ICoin, calculator: NiceHashCalculator): Promise<WhatToMine.IRevenueResponse> {
  const hashrate = coin.niceHashUnit.hashes / coin.whatToMineUnit.hashes;
  return await calculator.whatToMine.getRevenue(coin.id, hashrate);
}
