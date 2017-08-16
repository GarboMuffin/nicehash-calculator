import {coins as AllCoins, Coin} from "./src/coins";
import {run as index} from "./src/index";
import {Options, DefaultOptions, OptionsParser} from "./src/options";
import {Algorithms} from "./src/algorithms";

import * as chalk from "chalk";
import * as readline from "readline";

console.log("The results of this program do not necessarily reflect real world results.");
console.log("The market is constantly changing and what is profitable now might not be in a couple minutes.");
console.log("Do your own research and don't spend what you can't afford to lose.");
console.log("I am not responsible for any losses.");

console.log("");
console.log(chalk.reset(`BTC: ${chalk.underline("1EecFw5Nq8ACAUKVptUPkakgXb2sbPQa7Z")}`));
console.log(chalk.reset(`ETH: ${chalk.underline("0x41a06D4b23E882D2093D2C2958Ed35265ff3d56E")}`));
console.log("");

async function run(coins: Coin[]){
  for (var i = 0; i < coins.length; i++){
    var coin = coins[i];
    if (!coin.enabled){
      continue;
    }

    await index(coin, options);

    if (i + 1 < coins.length){
      if (options.prompt){
        await waitForInput();
      }else{
        // FIXME: sleep time too low/too high?
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

    var enabledText = "";
    if (!coin.enabled){
      enabledText = chalk.gray("(disabled by default)");
    }

    // not used rn, but could be
    var algoName = chalk.gray(`(${Algorithms[coin.NiceHash.id]})`);

    console.log(` ${chalk.gray("*")} ${coinName} ${enabledText}`);

    if (showAliases && typeof coin.names !== "undefined"){
      for (var name of coin.names){
        console.log(`  ${chalk.gray("*")} ${name}`);
      }
    }
  }
}

var options: Options = DefaultOptions;
var coins: Coin[] = AllCoins;

if (process.argv.length > 2){

  // coin listing
  switch (process.argv[2]){
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
  var parser = new OptionsParser(process.argv.splice(2));
  parser.parse();
  options = parser.options;
  coins = parser.coins;
}

run(coins);
