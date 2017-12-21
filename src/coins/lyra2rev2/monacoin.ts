import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Monacoin",
  names: [
    "mona",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Lyra2REv2,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 148,
  },
  enabled: false,
};
