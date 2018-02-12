import chalk from "chalk";

// enabled is set to true by NiceHashCalculator if --debug is enabled
// pretty dirty solution but it works
export const state = {enabled: false};

export function debug(...args: any[]) {
  if (state.enabled) {
    // insert a "debug" message at the start
    args.unshift(chalk.gray("debug"));
    console.log.apply(console, args);
  }
}
