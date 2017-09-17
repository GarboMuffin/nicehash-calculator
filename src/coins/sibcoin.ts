import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Sibcoin",
  names: [
    "sib", "x11gost", "gost",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.X11Gost,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 169,
  },
  enabled: false,
}
