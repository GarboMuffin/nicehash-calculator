"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../hash");
var algorithms_1 = require("../algorithms");
var index_1 = require("../index");
exports.coin = {
    name: "PASC",
    names: [
        "pascal",
    ],
    NiceHash: {
        hashrate: hash_1.Hash.TERA,
        id: algorithms_1.Algorithms.Pascal,
    },
    WhatToMine: {
        hashrate: 1000 * 1000,
        id: 172,
    },
    enabled: true,
};
var runningAsScript = require.main === module;
function run() {
    index_1.run(exports.coin);
}
if (runningAsScript) {
    run();
}
