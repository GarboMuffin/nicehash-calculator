import { parse as _parseOptions } from "./options";
import { getWhatToMineCoins } from "./coins";
import { getWhatToMineRevenue } from "./revenue";
import { getGlobalNiceHashPrices } from "./price";

function parseOptions() {
  const options = _parseOptions(process.argv);
  return options;
}

async function start() {
  const options = parseOptions();
  const whatToMineCoins = await getWhatToMineCoins();
  const globalNiceHashCosts = await getGlobalNiceHashPrices();

  // console.log(options);
  // console.log(coins);
  // console.log(globalNiceHashCosts);

  for (const coin of whatToMineCoins) {
    // for debugging output bitcoin info
    if (coin.id === 1) {
      console.log(coin);
      console.log(await getWhatToMineRevenue(coin));
    }
  }
}

start();
