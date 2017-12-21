import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Vivo",
  names: [
    "vivo",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.NeoScrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 200,
  },
  enabled: false,
};
