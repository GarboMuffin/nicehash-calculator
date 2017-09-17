import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Halcyon",
  names: [
    "hal",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.NeoScrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 122,
  },
  enabled: false,
}
