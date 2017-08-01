import {coins as AllCoins, Coin} from "./coins";

import * as chalk from "chalk";

export interface Options {
  prompt: boolean,
  percent: boolean|number,
  fixed: boolean,
}

export const DefaultOptions: Options = {
  prompt: false,
  percent: false,
  fixed: false,
}

function getCoin(c: string): Coin|null{
  for (var coin of AllCoins){
    if (coin.name.toLowerCase() === c || (coin.names && coin.names.indexOf(c) > -1)){
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

      if (arg.startsWith("--percent")){
        if (arg.includes(":")){
          this.options.percent = Number(arg.split(":")[1]);
        }else{
          this.options.percent = true;
        }
      }else if (arg === "--prompt"){
        this.options.prompt = true;
      }else if (arg === "--fixed"){
        this.options.fixed = true;
      }else{
        this.coinParser(arg);
      }
    }
  }

  private invalidOption(option: string){
    console.warn(chalk.red(`Invalid option: ${chalk.underline(option)}`));
  }

  private coinParser(_arg: string){
    var arg = _arg;

    enum Action {Hide = 0, Show = 1};
    var action;
    if (arg[0] === "-"){
      arg = arg.substring(1);
      action = Action.Hide;
    }else{
      action = Action.Show;
    }

    var coin = getCoin(arg);

    if (coin === null){
      this.invalidOption(_arg);
      return;
    }

    if (action === Action.Show){
      if (!this.customized){
        this.customized = true;
        for (var i of this.coins){
          i.enabled = false;
        }
      } 
    }
    coin.enabled = !!action;
  }
}
