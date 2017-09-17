import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Smartcoin",
  names: [
    "smart",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Keccak,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 197,
  },
  enabled: false,
}
