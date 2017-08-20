import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Ethereum Classic",
  names: [
    "etc", "daggerhashimoto", "ethash",
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
