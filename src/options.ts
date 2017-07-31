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
  private coins: Coin[] = AllCoins;
  private customized: boolean = false;

  parse(options: Options, args: string[]): Coin[]{
    for (var i = 0; i < args.length; i++){
      var arg = args[i];

      if (arg.startsWith("--percent")){
        if (arg.includes(":")){
          options.percent = Number(arg.split(":")[1]);
        }else{
          options.percent = true;
        }
      }else if (arg === "--prompt"){
        options.prompt = true;
      }else if (arg === "--fixed"){
        options.fixed = true;
      }else{
        this.coinParser(arg);
      }
    }

    return this.coins;
  }

  private invalidOption(option: string){
    console.warn(chalk.red(`Invalid option: ${chalk.underline(option)}`));
  }

  private coinParser(_arg: string){
    var arg = _arg;

    enum Action {Show, Hide};

    var action;
    if (arg[0] === "-"){
      arg = arg.substring(1);
      action = Action.Hide;
    }else{
      action = Action.Show;
    }

    var coin = getCoin(_arg);

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
      coin.enabled = true;
    }else{
      coin.enabled = false;
    }
  }
}
