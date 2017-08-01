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
var coins_1 = require("./src/coins");
var index_1 = require("./src/index");
var options_1 = require("./src/options");
var chalk = require("chalk");
var readline = require("readline");
console.log("The results of this program do not necessarily reflect real world results.");
console.log("The market is constantly changing and what is profitable now might not be in a couple minutes.");
console.log("Do your own math and don't spend what you can't afford to lose.");
console.log("");
console.log("BTC: " + chalk.underline("1P93PjYxTVPz2zqtfkgxxsqp9ZstdMpYJQ"));
console.log("ETH: " + chalk.underline("0x41a06D4b23E882D2093D2C2958Ed35265ff3d56E"));
console.log("");
function run(coins) {
    return __awaiter(this, void 0, void 0, function () {
        var i, coin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < coins.length)) return [3 /*break*/, 8];
                    coin = coins[i];
                    if (!coin.enabled) {
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, index_1.run(coin, options)];
                case 2:
                    _a.sent();
                    if (!(i + 1 < coins.length)) return [3 /*break*/, 6];
                    if (!options.prompt) return [3 /*break*/, 4];
                    return [4 /*yield*/, waitForInput()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: 
                // FIXME: sleep time too low?
                return [4 /*yield*/, sleep(1000)];
                case 5:
                    // FIXME: sleep time too low?
                    _a.sent();
                    _a.label = 6;
                case 6:
                    console.log(""); // newline
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Returns a promise that will resolve after ms milliseconds.
 * @param {number} ms
 */
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
/**
 * Returns a promise that will resolve after the enter key is pressed.
 * @param {number} ms
 */
function waitForInput() {
    return new Promise(function (resolve, reject) {
        process.stdin.resume();
        var msg = "Press enter to continue...";
        process.stdout.write(msg);
        process.stdin.on("data", function () {
            readline.moveCursor(process.stdout, 0, -1);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(Array(msg.length + 1).join(" "));
            process.stdin.removeAllListeners();
            process.stdin.pause();
            resolve();
        });
    });
}
function listCoins(showAliases) {
    function enabledText(coin) {
        if (!coin.enabled) {
            return chalk.gray("(disabled by default)");
        }
        else {
            return "";
        }
    }
    if (showAliases) {
        console.log("Supported coins and their aliases:");
    }
    else {
        console.log("Supported coins:");
    }
    for (var _i = 0, AllCoins_1 = coins_1.coins; _i < AllCoins_1.length; _i++) {
        var coin = AllCoins_1[_i];
        console.log(" " + chalk.gray("*") + " " + chalk.underline(coin.name) + " " + enabledText(coin));
        if (showAliases && typeof coin.names !== "undefined") {
            for (var _a = 0, _b = coin.names; _a < _b.length; _a++) {
                var name = _b[_a];
                console.log("  " + chalk.gray("*") + " " + name);
            }
        }
    }
}
var options = options_1.DefaultOptions;
var coins = coins_1.coins;
if (process.argv.length > 2) {
    // coin listing
    switch (process.argv[2]) {
        case "list":
        case "coins":
            listCoins(false);
            process.exit(0);
            break;
        case "aliases":
            listCoins(true);
            process.exit(0);
            break;
    }
    // options
    var parser = new options_1.OptionsParser(process.argv.splice(2));
    parser.parse();
    options = parser.options;
    coins = parser.coins;
}
run(coins);
