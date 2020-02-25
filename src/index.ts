import chalk from "chalk";

import { NiceHashCalculator } from "./calculator/NiceHashCalculator";
import { BUG_REPORT_URL } from "./constants";
import * as OptionParser from "./options";
import { sleep } from "./utils";

async function start() {
  const options = OptionParser.parseOptions(OptionParser.getArguments());

  if (options.showHeader) {
    console.log(chalk`NiceHash is not affiliated with this project. {bold I am not responsible for any losses.}`);
    console.log('');
  }

  do {
    const calculator = new NiceHashCalculator(options);
    await calculator.start();

    if (options.watch) {
      await sleep(options.watchDelay);
    }
  } while (options.watch);
}

(async () => {
  // Provides better and more useful error messages than node normally does with promises
  try {
    await start();
  } catch (e) {
    console.error(chalk`{red {bgYellow !!!} FATAL ERROR {bgYellow !!!}}`);
    console.error(chalk.red("This is a bug, please report it: " + BUG_REPORT_URL));
    console.error(chalk.red("Please include the stack trace below:"));
    console.error(e.stack);
  }
})();
