"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../hash");
var algorithms_1 = require("../algorithms");
var index_1 = require("../index");
exports.coin = {
    name: "XMR",
    names: [
        "cryptonight", "monero",
    ],
    NiceHash: {
        hashrate: hash_1.Hash.MEGA,
        id: algorithms_1.Algorithms.CryptoNight,
    },
    WhatToMine: {
        hashrate: 1000 * 1000,
        id: 101,
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
