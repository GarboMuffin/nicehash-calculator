import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "Sia",
  names: [
    "sc", "siacoin", "dual",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Sia,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 161,
  },
  enabled: true,
}
