import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Vertcoin",
  names: [
    "vtc", "vert",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Lyra2REv2,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 5,
  },
  enabled: false,
}
