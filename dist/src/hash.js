"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashRate = (function () {
    function HashRate(hashrate, name) {
        this.hashrate = hashrate;
        this.name = name;
    }
    return HashRate;
}());
exports.HashRate = HashRate;
var Hash = (function () {
    function Hash() {
    }
    Hash.MEGA = new HashRate(1, "MH");
    Hash.MSOL = new HashRate(1, "MSol");
    Hash.GIGA = new HashRate(1000, "GH");
    Hash.TERA = new HashRate(1000 * 1000, "TH");
    Hash.PETA = new HashRate(1000 * 1000 * 1000, "PH");
    return Hash;
}());
exports.Hash = Hash;
