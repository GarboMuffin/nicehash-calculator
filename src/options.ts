import {coins as AllCoins, Coin} from "./coins";

import * as chalk from "chalk";

export interface Options {
  prompt: boolean,
  percent: boolean,
  fixed: boolean,
  onlyProfit: boolean|number,
}

export const DefaultOptions: Options = {
  prompt: false,
  percent: false,
  fixed: false,
  onlyProfit: false,
}

/**
 * Get coins with a given name
 * 
 * @param {string} c The name of the the coins.
 * @returns {Coin[]} The coins with that name, if any.
 */
function getCoins(c: string): Coin[]{
  if (c.startsWith("-")){
    c = c.substring(1);
  }

  c = c.toLowerCase();

  if (c === "all"){
    return AllCoins;
  }

  var ret = [];
  for (var coin of AllCoins){
    if (coin.name.toLowerCase() === c || (coin.names && coin.names.indexOf(c) > -1)){
      ret.push(coin);
    }
  }
  return ret;
}

/**
 * Parses command line arguments for coins, options, etc.
 * @export
 * @class OptionsParser
 */
export class OptionsParser{
  constructor(args: string[]){
    this.args = args;
  }

  private args: string[];
  private customized: boolean = false;
  coins: Coin[] = AllCoins;
  options: Options = DefaultOptions;

  parse(){
    for (var i = 0; i < this.args.length; i++){
      var arg = this.args[i];

      var result: boolean;

      if (arg.startsWith("--")){
        result = this.argParser(arg);
      }else{
        result = this.coinParser(arg);
      }

      if (!result){
        this.invalidOption(arg);
      }
    }
  }

  private invalidOption(option: string){
    console.warn(chalk.red(`Invalid option: ${chalk.underline(option)}`));
  }

  private argParser(_arg: string): boolean{
    var split = _arg.split(":");
    var arg = split[0];

    switch (arg){
      case "--percent":
        this.options.percent = true;
        break;
      case "--profit":
        if (split.length === 1){
          this.options.onlyProfit = true;
        }else{
          this.options.onlyProfit = Number(split[1]);
        }
        break;
      case "--prompt":
        this.options.prompt = true;
        break;
      case "--fixed":
        this.options.fixed = true;
        break;
      default:
        return false;
    }
    return true;
  }

  private coinParser(_arg: string): boolean{
    var arg = _arg;

    enum Action {Hide = 0, Show = 1};
    var action;
    if (arg[0] === "-"){
      arg = arg.substring(1);
      action = Action.Hide;
    }else{
      action = Action.Show;
    }

    var coins = getCoins(arg);

    if (coins.length === 0){
      return false;
    }

    if (action === Action.Show){
      if (!this.customized){
        this.customized = true;
        for (var i of this.coins){
          i.enabled = false;
        }
      } 
    }

    for (var coin of coins){
      coin.enabled = !!action;
    }

    return true;
  }
}
