import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Komodo",
  names: [
    "kmd",
  ],
  NiceHash: {
    hashrate: Hash.MSOL,
    id: Algorithms.Equihash,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 174,
  },
  enabled: false,
}
