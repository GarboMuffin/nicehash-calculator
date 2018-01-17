import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Litecoin",
  names: [
    "ltc", "scrypt",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Scrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 4,
  },
  enabled: true,
};
