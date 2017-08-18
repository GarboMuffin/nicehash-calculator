import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "ETC",
  names: [
    "daggerhashimoto", "ethash",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 162,
  },
  enabled: true,
}

if (require.main === module){
  index(coin);
}
