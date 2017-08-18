import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "MAX",
  names: [
    "maxcoin", "keccak",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Keccak,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 73,
  },
  enabled: false,
}

if (require.main === module){
  index(coin);
}
