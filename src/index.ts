import chalk from "chalk";

import { BUG_REPORT_URL } from "./constants";
import { NiceHashCalculator } from "./NiceHashCalculator";
import * as OptionParser from "./options";

async function start() {
  const options = OptionParser.parseOptions(OptionParser.getArguments());
  const calculator = new NiceHashCalculator(options);
  await calculator.start();
}

(async () => {
  // Provides better and more useful error messages than node normally does with promises
  try {
    await start();
  } catch (e) {
    console.error(chalk.red(" > !!! FATAL ERROR !!!"));
    console.error(chalk.red(" > This is a bug, please report it: " + BUG_REPORT_URL));
    console.error(chalk.red(" > The exact error is below:"));
    console.error(e.stack);
  }
})();
