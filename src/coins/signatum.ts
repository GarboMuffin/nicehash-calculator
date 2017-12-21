import { Hash } from "../hash";
import { Algorithms } from "../algorithms";

export var coin = {
  name: "Signatum",
  names: [
    "sigt", "skunk", "skunkhash",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Skunk,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 191,
  },
  enabled: false,
};
