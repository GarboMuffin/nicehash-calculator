import {Hash} from "../hash";
import {Algorithms} from "../algorithms";
import {run as index} from "../index";

export var coin = {
  name: "PASC",
  names: [
    "pascal", "dual",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Pascal,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 172,
  },
  enabled: true,
}

const runningAsScript = require.main === module;

function run(){
  index(coin);
}

if (runningAsScript){
  run();
}
