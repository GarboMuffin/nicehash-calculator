import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Soilcoin",
  names: [
    "soil",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 189,
  },
  enabled: false,
};
