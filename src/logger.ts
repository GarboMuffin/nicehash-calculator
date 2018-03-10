import chalk from "chalk";

class Logger {
  public debugEnabled: boolean = false;

  // logs warning text
  warn(...args: any[]) {
    args.unshift("Warning:");
    args = args.map((str) => chalk.yellow(str));
    console.warn.apply(console, args);
  }

  // logs debug text, only if debug is enabled
  debug(...args: any[]) {
    if (this.debugEnabled) {
      args.unshift(chalk.gray("debug"));
      console.log.apply(console, args);
    }
  }
}

export const logger = new Logger();
