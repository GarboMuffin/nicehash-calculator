import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "ETH",
  names: [
    "ethereum", "daggerhashimoto", "ethash",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 151,
  },
  enabled: true,
}
