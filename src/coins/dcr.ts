import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "DCR",
  names: [
    "decred", "dual",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Decred,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 152,
  },
  enabled: true,
}

if (require.main === module){
  index(coin);
}
