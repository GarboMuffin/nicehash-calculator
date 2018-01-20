import { WhatToMineAPI } from "./whattomine/WhatToMine";
import { ICoin } from "./coins";

export async function getWhatToMineRevenue(coin: ICoin): Promise<number> {
  const whatToMine = new WhatToMineAPI();
  return await whatToMine.getProfit(coin.id);
}
