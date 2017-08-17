import {coins as AllCoins, Coin} from "./coins";
import {NiceHashLocation, Locations} from "./location";
import {OrderType} from "./order";

import * as chalk from "chalk";

export interface Options {
  prompt: boolean,
  percent: boolean,
  orderType: OrderType,
  minProfit: number,
  onlyRevenue: boolean,
  locations: NiceHashLocation[],
}

export const DefaultOptions: Options = {
  prompt: false,
  percent: false,
  orderType: OrderType.Standard,
  minProfit: -Infinity,
  onlyRevenue: false,
  locations: Locations
}

interface Occurences {
  [i: string]: number,
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

const ONLY_REVENUE_COMPATIBLE = [
  "--only-revenue",
  "--no-underline",
  "--no-color",
  "--no-colour",
]

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
  private occurences: Occurences = {};
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

    this.checkCompatibility();
  }

  private invalidOption(option: string){
    console.warn(chalk.red(`Invalid option: ${chalk.underline(option)}`));
  }

  private argParser(_arg: string): boolean{
    var split = _arg.split("=");
    var arg = split[0];

    var rawArg = arg;
    arg = arg.toLowerCase();

    // for compatibilty checking, record the number of times an argument appears
    // this is good enough for what the checking does
    this.occurences[arg] = (this.occurences[arg] || 0) + 1;

    // TODO: consider moving cases to their own functions?
    switch (arg.toLowerCase()){
      case "--percent":
        this.options.percent = true;
        break;
      case "--min-profit":
        this.options.minProfit = Number(split[1]);
        break;
      case "--only-revenue":
        this.options.onlyRevenue = true;
        break;
      case "--prompt":
        this.options.prompt = true;
        break;
      case "--fixed":
        this.options.orderType = OrderType.Fixed;
        break;
      case "--location":
        // oh god
        // switches inside switches
        if (split.length === 2){
          switch (split[1].toLowerCase()){
            case "us":
            case "usa":
            case "westhash":
              this.options.locations = [NiceHashLocation.US];
              break;
            case "eu":
            case "europe":
              this.options.locations = [NiceHashLocation.EU];
              break;
            default:
              return false;
          }
          return true;
        }
        return false;
      case "--no-color":
        // chalk supports --no-color
        // adding it here prevents invalid option warnings
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

  private checkCompatibility(){
    function warn(msg: string){
      console.warn(chalk.red(msg) + " Behavior may be unexpected!");
    }

    function underline(msg: string){
      return chalk.underline(msg);
    }

    // any arguments that are not --only-revenue
    // its not compatible with pretty much anything
    var onlyRevenueIncompatible = [];

    // catch duplicates
    for (var arg in this.occurences){
      var occurences = this.occurences[arg];

      if (occurences > 1){
        warn(`Too many ${underline(arg)} arguments specified!`);
      }

      if (ONLY_REVENUE_COMPATIBLE.indexOf(arg) === -1){
        onlyRevenueIncompatible.push(arg);
      }
    }

    // other edge cases

    // --only-revenue is not compatible with pretty much anything
    if (this.occurences["--only-revenue"] > 0){
      if (onlyRevenueIncompatible.length > 0){
        var ul = underline("--only-revenue");
        for (var arg of onlyRevenueIncompatible){
          warn(`${ul} is not compatible with ${underline(arg)}!`);
        }
      }
    }
  }
}
