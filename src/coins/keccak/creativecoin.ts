import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Creativecoin",
  names: [
    "crea",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Keccak,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 199,
  },
  enabled: false,
};
