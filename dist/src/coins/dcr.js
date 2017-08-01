"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../hash");
var algorithms_1 = require("../algorithms");
var index_1 = require("../index");
exports.coin = {
    name: "DCR",
    names: [
        "decred",
    ],
    NiceHash: {
        hashrate: hash_1.Hash.TERA,
        id: algorithms_1.Algorithms.Decred,
    },
    WhatToMine: {
        hashrate: 1000 * 1000,
        id: 152,
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
