import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Krypton",
  names: [
    "kr",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 163,
  },
  enabled: false,
};
