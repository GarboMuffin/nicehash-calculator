import {coins as AllCoins, Coin} from "./coins";
import {NiceHashLocation, Locations} from "./location";
import {NHOrderType} from "./order";
import {NHOptions} from "./nicehash";

import * as chalk from "chalk";

export enum Unit {
  Percent, BTC
}

export interface ProfitUnit {
  amount: number,
  unit: Unit
}

export interface Options extends NHOptions {
  showPrompt: boolean,
  showPercent: boolean,
  minProfit: ProfitUnit,
  priceOffset: ProfitUnit,
  onlyShowRevenue: boolean,
  locations: NiceHashLocation[],
  debug: boolean,
  showHeader: boolean,
  fixedSpeed: number,
}

export const DefaultOptions: Options = {
  showPrompt: false,
  showPercent: false,
  orderType: NHOrderType.Standard,
  minProfit: {
    amount: -Infinity,
    unit: Unit.BTC
  },
  priceOffset: {
    amount: 0,
    unit: Unit.BTC
  },
  onlyShowRevenue: false,
  locations: Locations,
  debug: false,
  showHeader: true,

  // inherited from NHOptions
  findMin: false,
  fixedSpeed: 1,
}

interface Occurences {
  [i: string]: number,
}

const ONLY_REVENUE_COMPATIBLE = [
  "--only-revenue",
  "--prompt",
  "--debug",
  "--no-color",
];
const USA_ALIASES = [
  "us", "usa", "westhash",
];
const EUROPE_ALIASES = [
  "eu", "europe",
];

/**
 * Parse a string for a number
 * Returns null if not a number
 * @param {string} str The string to be read
 * @returns The number or null
 */
function parseNumber(str: string): number|null {
  var match = str.match(/[1234567890\.-]*/g);
  if (match === null){
    return null;
  }
  var num = Number(match[0]);
  if (isNaN(num)){
    return null;
  }
  return num;
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

    arg = arg.toLowerCase();

    // for compatibilty checking, record the number of times an argument appears
    // this is good enough for what the checking does
    // TODO: only count occurence if valid arg
    this.occurences[arg] = (this.occurences[arg] || 0) + 1;

    switch (arg.toLowerCase()){
      case "--show-percent":
        this.options.showPercent = true;
        break;
      case "--min-profit":
        return this.minProfitParser(split);
      case "--only-revenue":
        this.options.onlyShowRevenue = true;
        break;
      case "--prompt":
        this.options.showPercent = true;
        break;
      case "--fixed":
        this.options.orderType = NHOrderType.Fixed;
        break;
      case "--debug":
        // output more things for debugging
        this.options.debug = true;
        break;
      case "--find-min":
        // use minimum prices at EU and US instead of global averages
        this.options.findMin = true;
        break;
      case "--location":
        return this.locationParser(split);
      case "--offset":
        return this.offsetParser(split);
      case "--fixed-speed":
        return this.fixedSpeedParser(split);
      case "--no-color":
        // --no-color is usually supplied by chalk
        // this manually disables color because arguments.txt
        (chalk as any).level = 0;
        break;
      case "--no-header":
        // header contains disclaimers and donation addresses
        this.options.showHeader = false;
        break;
      default:
        // unknown option
        return false;
    }

    return true;
  }

  private fixedSpeedParser(args: string[]){
    var value = parseNumber(args[1]);
    if (value === null){
      return false;
    }

    this.options.fixedSpeed = value;

    return true;
  }

  private minProfitParser(args: string[]){
    var value = parseNumber(args[1]);
    if (value === null){
      return false;
    }

    // TODO: move this into own function
    var unit;
    if (args[1].endsWith("%")){
      unit = Unit.Percent;
    }else{
      unit = Unit.BTC;
    }

    this.options.minProfit = {
      unit: unit,
      amount: value,
    };

    return true;
  }
  
  private offsetParser(args: string[]){
    var value = parseNumber(args[1]);
    if (value === null){
      return false;
    }

    var unit;
    if (args[1].endsWith("%")){
      unit = Unit.Percent;
    }else{
      unit = Unit.BTC;
    }

    this.options.priceOffset = {
      unit: unit,
      amount: value,
    };

    return true;
  }

  private locationParser(args: string[]){
    if (args.length === 2){
      var country = args[1];
      if (USA_ALIASES.indexOf(country) > -1){
        this.options.locations = [NiceHashLocation.US];
        return true;
      }else if (EUROPE_ALIASES.indexOf(country) > -1){
        this.options.locations = [NiceHashLocation.EU];
        return true;
      }
    }
    return false;
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
        warn(`Duplicate ${underline(arg)} arguments found!`);
      }

      if (ONLY_REVENUE_COMPATIBLE.indexOf(arg) === -1){
        onlyRevenueIncompatible.push(arg);
      }
    }

    // other edge cases

    // --only-revenue is not compatible with pretty much anything
    if (this.occurences["--only-revenue"] > 0){
      var ul = underline("--only-revenue");
      for (var arg of onlyRevenueIncompatible){
        warn(`${ul} is not compatible with ${underline(arg)}!`);
      }
    }
  }
}
