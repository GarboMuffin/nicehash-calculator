import chalk from "chalk";

class Logger {
  public debugEnabled: boolean = false;
  public showWarnings: boolean = true;

  // logs warning text
  public warn(...args: any[]) {
    if (this.showWarnings) {
      args.unshift("Warning:");
      args = args.map((str) => chalk.yellow(str));
      console.warn.apply(console, args as any);
    }
  }

  // logs debug text, only if debug is enabled
  public debug(...args: any[]) {
    if (this.debugEnabled) {
      args.unshift(chalk.gray("debug"));
      console.log.apply(console, args as any);
    }
  }
}

export const logger = new Logger();
