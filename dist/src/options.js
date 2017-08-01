"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coins_1 = require("./coins");
var chalk = require("chalk");
exports.DefaultOptions = {
    prompt: false,
    percent: false,
    fixed: false,
};
function getCoin(c) {
    for (var _i = 0, AllCoins_1 = coins_1.coins; _i < AllCoins_1.length; _i++) {
        var coin = AllCoins_1[_i];
        if (coin.name.toLowerCase() === c || (coin.names && coin.names.indexOf(c) > -1)) {
            return coin;
        }
    }
    return null;
}
/**
 * Parses command line arguments for coins, options, etc.
 * @export
 * @class OptionsParser
 */
var OptionsParser = (function () {
    function OptionsParser(args) {
        this.customized = false;
        this.coins = coins_1.coins;
        this.options = exports.DefaultOptions;
        this.args = args;
    }
    OptionsParser.prototype.parse = function () {
        for (var i = 0; i < this.args.length; i++) {
            var arg = this.args[i];
            if (arg.startsWith("--percent")) {
                if (arg.includes(":")) {
                    this.options.percent = Number(arg.split(":")[1]);
                }
                else {
                    this.options.percent = true;
                }
            }
            else if (arg === "--prompt") {
                this.options.prompt = true;
            }
            else if (arg === "--fixed") {
                this.options.fixed = true;
            }
            else {
                this.coinParser(arg);
            }
        }
    };
    OptionsParser.prototype.invalidOption = function (option) {
        console.warn(chalk.red("Invalid option: " + chalk.underline(option)));
    };
    OptionsParser.prototype.coinParser = function (_arg) {
        var arg = _arg;
        var Action;
        (function (Action) {
            Action[Action["Hide"] = 0] = "Hide";
            Action[Action["Show"] = 1] = "Show";
        })(Action || (Action = {}));
        ;
        var action;
        if (arg[0] === "-") {
            arg = arg.substring(1);
            action = Action.Hide;
        }
        else {
            action = Action.Show;
        }
        var coin = getCoin(_arg);
        if (coin === null) {
            this.invalidOption(_arg);
            return;
        }
        if (action === Action.Show) {
            if (!this.customized) {
                this.customized = true;
                for (var _i = 0, _a = this.coins; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.enabled = false;
                }
            }
        }
        coin.enabled = !!action;
    };
    return OptionsParser;
}());
exports.OptionsParser = OptionsParser;
