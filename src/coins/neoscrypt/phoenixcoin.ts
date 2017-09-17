import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Phoenixcoin",
  names: [
    "pxc",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.NeoScrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 71,
  },
  enabled: false,
}
