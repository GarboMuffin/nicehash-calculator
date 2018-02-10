import chalk from "chalk";

import { NiceHashCalculator } from "./NiceHashCalculator";

async function start() {
  const calculator = new NiceHashCalculator();
  await calculator.start();
}

(async () => {
  // Provides better and more useful error messages than node normally does with promises
  try {
    await start();
  } catch (e) {
    console.error(chalk.red(" > !!! FATAL ERROR !!!"));
    console.error(chalk.red(" > This is a bug, please report it: https://github.com/GarboMuffin/nicehash-calculator/issues/new"));
    console.error(chalk.red(" > The exact error is below:"));
    console.error(e.stack);
  }
})();
