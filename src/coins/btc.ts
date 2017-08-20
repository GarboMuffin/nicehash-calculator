import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Bitcoin",
  names: [
    "btc",
  ],
  NiceHash: {
    hashrate: Hash.PETA,
    id: Algorithms.SHA256,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 1,
  },
  enabled: true,
}
