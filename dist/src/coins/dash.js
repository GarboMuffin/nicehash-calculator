"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../hash");
var algorithms_1 = require("../algorithms");
var index_1 = require("../index");
exports.coin = {
    name: "DASH",
    names: [],
    NiceHash: {
        hashrate: hash_1.Hash.GIGA,
        id: algorithms_1.Algorithms.X11,
    },
    WhatToMine: {
        hashrate: 1000,
        id: 34,
    },
    enabled: false,
};
var runningAsScript = require.main === module;
function run() {
    index_1.run(exports.coin);
}
if (runningAsScript) {
    run();
}
