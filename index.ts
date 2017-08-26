import {coins as AllCoins, Coin} from "./src/coins";
import {run as index, shouldUseUnifiedOutput} from "./src/index";
import {Options, DefaultOptions, OptionsParser} from "./src/options";
import {Algorithms} from "./src/algorithms";
import {Debug} from "./src/debug";
import {NHOrderType} from "./src/order";
import {NiceHashAPI} from "./src/nicehash";
import {NiceHashLocation} from "./src/location";

import * as chalk from "chalk";
import * as readline from "readline";
import * as fs from "fs";

async function run(coins: Coin[], options: Options){
  var debug = Debug.create(options);
  debug("DEBUG ENABLED");
  debug("Arguments", process.argv);
  debug("Options", options);
  debug("Coins", coins);

  if (options.showHeader){
    console.log("The results of this program do not necessarily reflect real world results and fees.");
    console.log("The market is constantly changing and what is profitable now might not be in a couple minutes.");
    console.log("Do your own research and don't spend what you can't afford to lose.");
    console.log("I am not responsible for any losses.");
  
    console.log("");
    console.log(chalk.reset(`BTC: ${chalk.underline("1EecFw5Nq8ACAUKVptUPkakgXb2sbPQa7Z")}`));
    console.log(chalk.reset(`ETH: ${chalk.underline("0x41a06D4b23E882D2093D2C2958Ed35265ff3d56E")}`));
    console.log("");
  }

  // --fixed only uses existing fixed orders to determine price
  // this is not how nicehash chooses prices so any results are complete lies
  if (options.orderType === NHOrderType.Fixed){
    var ul = chalk.underline("--fixed");
    console.warn(chalk.red(`${ul} is experimental and its results are VERY inaccurate!`) + " Its use is discouraged!");
  }

  // get our api wrapper and load it
  var nicehash = new NiceHashAPI();
  if (shouldUseUnifiedOutput(options)){
    try{
      await nicehash.getCoinCosts();
    }catch(e){
      console.error(chalk.red(`Failed to load price data from NiceHash. Aborting.`));
      console.error(chalk.red("Error received:"));
      console.error(e);
      exit(1);
    }
  }

  // remove disabled coins
  coins = coins.filter(coin => coin.enabled);

  console.log(`Using ${options.findMin ? "MINIMUM" : "AVERAGE"} prices.`);
  console.log("");

  for (var i = 0; i < coins.length; i++){
    var coin = coins[i];

    await index(coin, options, nicehash);

    if (i + 1 < coins.length){
      if (options.showPrompt){
        await waitForInput();
      }else{
        await sleep(1000);
      }
    }

    console.log(""); // newline
  }
}

/**
 * Returns a promise that will resolve after ms milliseconds.
 * @param {number} ms
 */
function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns a promise that will resolve after the enter key is pressed.
 * @param {number} ms
 */
function waitForInput(){
  return new Promise(function(resolve, reject){
    process.stdin.resume();

    var msg = "Press enter to continue...";
    process.stdout.write(msg);

    process.stdin.on("data", function(){
      readline.moveCursor(process.stdout, 0, -1);
      readline.cursorTo(process.stdout, 0);

      process.stdout.write(Array(msg.length + 1).join(" "));
      process.stdin.removeAllListeners();
      process.stdin.pause();

      resolve();
    })
  });
}

function listCoins(showAliases: boolean){
  if (showAliases){
    console.log("Supported coins and their aliases:");
  }else{
    console.log("Supported coins:");
  }

  for (var coin of AllCoins){
    var coinName = chalk.underline(coin.name);

    var enabledText = coin.enabled ? "" : chalk.gray("(disabled by default)");

    var algoName = chalk.gray(`(${Algorithms[coin.NiceHash.id]})`);

    console.log(` ${chalk.gray("*")} ${coinName} ${algoName} ${enabledText}`);

    if (showAliases && typeof coin.names !== "undefined"){
      for (var name of coin.names){
        console.log(`  ${chalk.gray("*")} ${name}`);
      }
    }
  }
}

function exit(code: number = 0){
  process.exit(code);
}

var options: Options = DefaultOptions;
var coins: Coin[] = AllCoins;

// clone the list
var args = process.argv;

try{
  var argumentsFile = fs.readFileSync("arguments.txt");
  for (var line of argumentsFile.toString().split("\n")){
    if (line.startsWith("#")){
      continue;
    }

    line = line.trim();
    if (line === ""){
      continue;
    }

    args.push(line);
  }
}catch(e){
  // if it doesn't exist then just create an empty file
  fs.writeFileSync("arguments.txt", "");
}


if (args.length > 2){

  // coin listing
  switch (args[2]){
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
  var parser = new OptionsParser(args.splice(2));
  parser.parse();
  options = parser.options;
  coins = parser.coins;
}

run(coins, options);
