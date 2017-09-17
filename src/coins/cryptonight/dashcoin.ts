import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Dashcoin",
  names: [
    "dsh",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNight,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 129,
  },
  enabled: false,
}
