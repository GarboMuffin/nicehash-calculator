import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Pascal",
  names: [
    "pasc", "dual",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Pascal,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 172,
  },
  enabled: false,
};
