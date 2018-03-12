import chalk from "chalk";

import { BUG_REPORTS, NiceHashCalculator } from "./NiceHashCalculator";
import { parseOptions } from "./options";

async function start() {
  const options = parseOptions();
  const calculator = new NiceHashCalculator(options);
  await calculator.start();
}

(async () => {
  // Provides better and more useful error messages than node normally does with promises
  try {
    await start();
  } catch (e) {
    console.error(chalk.red(" > !!! FATAL ERROR !!!"));
    console.error(chalk.red(" > This is a bug, please report it: " + BUG_REPORTS));
    console.error(chalk.red(" > The exact error is below:"));
    console.error(e.stack);
  }
})();
