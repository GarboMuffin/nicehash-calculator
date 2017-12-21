import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Zencash",
  names: [
    "zen",
  ],
  NiceHash: {
    hashrate: Hash.MSOL,
    id: Algorithms.Equihash,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 185,
  },
  enabled: false,
};
