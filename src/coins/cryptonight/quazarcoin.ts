import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Quazarcoin",
  names: [
    "qcn",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNight,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 105,
  },
  enabled: false,
};
