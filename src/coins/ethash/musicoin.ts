import {Hash} from "../../hash";
import {Algorithms} from "../../algorithms";

export var coin = {
  name: "Musicoin",
  names: [
    "music", "daggerhashimoto", "ethash", "dagger",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.DaggerHashimoto,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 178,
  },
  enabled: false,
}
