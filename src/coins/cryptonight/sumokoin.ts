import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Sumokoin",
  names: [
    "sumo",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNight,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 196,
  },
  enabled: false,
};
