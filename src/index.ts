import * as chalk from "chalk";

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
    console.error(chalk.red(" > Program crashed with error:"));
    console.error(chalk.red(" > Please report this: https://github.com/GarboMuffin/nicehash-calculator/issues/new"));
    console.error(chalk.red(" > Please provide details such as what you were doing, arguments, etc. in your report."));
    console.error(e.stack);
  }
})();
