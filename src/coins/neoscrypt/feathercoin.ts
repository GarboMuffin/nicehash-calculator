import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Feathercoin",
  names: [
    "ftc", "neoscrypt",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.NeoScrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 8,
  },
  enabled: false,
};
