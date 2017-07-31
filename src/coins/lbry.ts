import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "LBC",
  names: [
    "lbry",
  ],
  NiceHash: {
    hashrate: Hash.GIGA,
    id: Algorithms.Keccak,
  },
  WhatToMine: {
    hashrate: 1000,
    id: 73,
  },
  enabled: false,
}

const runningAsScript = require.main === module;

function run(){
  index(coin);
}

if (runningAsScript){
  run();
}
