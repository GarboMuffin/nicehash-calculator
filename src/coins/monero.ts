import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "XMR",
  names: [
    "cryptonight", "monero",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNight,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 101,
  },
  enabled: false,
}
