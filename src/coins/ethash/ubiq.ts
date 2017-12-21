import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Ubiq",
  names: [
    "ubq",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 173,
  },
  enabled: false,
};
