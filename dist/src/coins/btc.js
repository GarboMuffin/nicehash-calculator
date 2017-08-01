"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../hash");
var algorithms_1 = require("../algorithms");
var index_1 = require("../index");
exports.coin = {
    name: "BTC",
    names: [
        "bitcoin",
    ],
    NiceHash: {
        hashrate: hash_1.Hash.PETA,
        id: algorithms_1.Algorithms.SHA256,
    },
    WhatToMine: {
        hashrate: 1000 * 1000,
        id: 1,
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
