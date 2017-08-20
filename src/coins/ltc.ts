import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Litecoin",
  names: [
    "ltc",
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
