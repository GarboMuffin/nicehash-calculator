import * as yargs from "yargs";

export interface IOptions {
  debug: boolean;
}

const DEFAULT_OPTIONS: IOptions = {
  debug: false,
};

export function parse(args: string[]): IOptions {
  // TODO: option parsing
  return DEFAULT_OPTIONS;
  // const argv = yargs.command("npm start -- [...arguments]", "starts the program", (yargs) => {
  //   yargs.positional("action", {

  //   })
  // }).option("debug", {
  //     default: false,
  //   })
  //   .argv;

  // return argv;
}
