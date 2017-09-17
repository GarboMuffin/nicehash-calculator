import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "PascalLite",
  names: [
    "pasl",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Pascal,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 177,
  },
  enabled: false,
}
