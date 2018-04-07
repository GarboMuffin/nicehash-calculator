import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Monero",
  names: [
    "xmr", "cryptonightv7", "cryptonight7", "monero",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNightV7,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 101,
  },
  enabled: true,
};
