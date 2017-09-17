import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Orbitcoin",
  names: [
    "orb",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.NeoScrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 72,
  },
  enabled: false,
}
