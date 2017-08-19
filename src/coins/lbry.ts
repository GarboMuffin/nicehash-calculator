import {Hash} from "../hash";
import {Algorithms} from "../algorithms";

export var coin = {
  name: "LBC",
  names: [
    "lbry", "dual",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Lbry,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 73,
  },
  enabled: false,
}
