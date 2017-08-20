import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Maxcoin",
  names: [
    "max", "keccak",
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
