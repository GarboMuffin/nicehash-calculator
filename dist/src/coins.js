"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var btc_1 = require("./coins/btc");
var eth_1 = require("./coins/eth");
var etc_1 = require("./coins/etc");
var zec_1 = require("./coins/zec");
var sia_1 = require("./coins/sia");
var dcr_1 = require("./coins/dcr");
var pascal_1 = require("./coins/pascal");
var dash_1 = require("./coins/dash");
var ltc_1 = require("./coins/ltc");
var monero_1 = require("./coins/monero");
var keccak_1 = require("./coins/keccak");
var lbry_1 = require("./coins/lbry");
exports.coins = [
    btc_1.coin,
    eth_1.coin,
    etc_1.coin,
    zec_1.coin,
    sia_1.coin,
    dcr_1.coin,
    pascal_1.coin,
    dash_1.coin,
    ltc_1.coin,
    monero_1.coin,
    keccak_1.coin,
    lbry_1.coin,
];
exports.coins.sort(function (a, b) {
    var atext = a.name.toUpperCase();
    var btext = b.name.toUpperCase();
    return (atext < btext) ? -1 : (atext > btext) ? 1 : 0;
});
