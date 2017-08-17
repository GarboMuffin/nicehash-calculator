import {HashRate} from "./hash";

import * as request from "request-promise";

export interface WhatToMineResponse {
  algorithm: string,
  block_reward: number,
  block_reward24: number,
  block_time: string,
  btc_revenue: string,
  cost: string,
  difficulty: number,
  difficulty24: number,
  estimated_rewards: string,
  exchange_rate: number,
  exchange_rate24: number,
  exchange_rate_curr: string,
  exchange_rate_vol: number,
  id: number,
  lagging: boolean,
  last_block: number,
  market_cap: string,
  name: string,
  nethash: string,
  pool_fee: string,
  profit: string,
  revenue: string,
  status: string,
  tag: string,
  timestamp: number,
}

/**
 * A simple wrapper for the WhatToMine API
 * @export
 * @class WhatToMine
 */
export class WhatToMine {
  static async profit(endpoint: number, hashrate: number){
    var profit = await request(
      `http://whattomine.com/coins/${endpoint}.json?utf8=%E2%9C%93&hr=${hashrate}&p=0&fee=0.0&cost=0.1&hcost=0.0&commit=Calculate`
    );

    var response: WhatToMineResponse = JSON.parse(profit as any);
    return Number(response.btc_revenue);
  }
}
