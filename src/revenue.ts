import { WhatToMineAPI } from "./whattomine/WhatToMine";
import { ICoin } from "./coins";

export async function getWhatToMineRevenue(coin: ICoin): Promise<number> {
  const whatToMine = new WhatToMineAPI();
  const hashrate = coin.niceHashUnit.hashes / coin.whatToMineUnit.hashes;
  return await whatToMine.getProfit(coin.id, hashrate);
}
