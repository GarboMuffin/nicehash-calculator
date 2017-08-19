import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "PASC",
  names: [
    "pascal", "dual",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Pascal,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 172,
  },
  enabled: true,
}
