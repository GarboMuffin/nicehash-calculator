import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "LTC",
  names: [
    "litecoin", "lite",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Scrypt,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 4,
  },
  enabled: false,
}

if (require.main === module){
  index(coin);
}
