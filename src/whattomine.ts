import {HashRate} from "./hash";

import * as request from "request-promise";

/**
 * A simple wrapper for the WhatToMine API
 * @export
 * @class WhatToMine
 */
export class WhatToMine {
  static async profit(endpoint: number, hashrate: number){
    var profit: any = await request(
      `http://whattomine.com/coins/${endpoint}.json?utf8=%E2%9C%93&hr=${hashrate}&p=0&fee=0.0&cost=0.1&hcost=0.0&commit=Calculate`
    )

    return Number(JSON.parse(profit)["btc_revenue"]);
  }
}
