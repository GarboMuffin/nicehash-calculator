"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = require("./location");
var nicehash_1 = require("./nicehash");
var whattomine_1 = require("./whattomine");
var options_1 = require("./options");
var chalk = require("chalk");
var PRECISION = 6;
function pad(text, i) {
    // not exactly the fastest, but it works
    return " ".repeat(i) + text;
}
function run(i, options) {
    return __awaiter(this, void 0, void 0, function () {
        function output(text) {
            console.log(text);
        }
        var revenue, hash, _i, Locations_1, l, coin, cost, profit, percent, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (options === undefined) {
                        options = options_1.DefaultOptions;
                    }
                    output("Report on " + chalk.underline(i.name) + ":");
                    return [4 /*yield*/, whattomine_1.WhatToMine.profit(i.WhatToMine.id, i.WhatToMine.hashrate)];
                case 1:
                    revenue = _a.sent();
                    hash = "BTC/" + i.NiceHash.hashrate.name;
                    output(pad("Revenue: " + chalk.underline(revenue.toFixed(PRECISION)) + " " + hash, 1));
                    _i = 0, Locations_1 = location_1.Locations;
                    _a.label = 2;
                case 2:
                    if (!(_i < Locations_1.length)) return [3 /*break*/, 5];
                    l = Locations_1[_i];
                    coin = new nicehash_1.NiceHashCost(nicehash_1.createEndpoint(i.NiceHash.id, l), options.fixed);
                    return [4 /*yield*/, coin.init()];
                case 3:
                    _a.sent();
                    cost = coin.price;
                    profit = revenue - cost;
                    percent = profit / cost * 100;
                    color = profit > 0 ? chalk.green : chalk.red;
                    color = color.underline;
                    if (typeof options.percent === "number" && percent < options.percent) {
                        return [3 /*break*/, 4];
                    }
                    output(pad(location_1.NiceHashLocation[l] + ":", 1));
                    output(pad("Cost: " + color(cost.toFixed(PRECISION)) + " " + hash, 2));
                    output(pad("Profit: " + color(profit.toFixed(PRECISION)) + " " + hash, 2));
                    if (options.percent !== false) {
                        output(pad("%: " + color(percent.toFixed(PRECISION)) + "%", 2));
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
