import * as minimist from "minimist";
import { clone } from "./utils";

export interface IOptions {
  debug: boolean;
  coins: string[];
}

const DEFAULT_OPTIONS: IOptions = {
  debug: false,
  coins: [],
};

export function parse(args: string[]): IOptions {
  // TODO: option parsing
  // return DEFAULT_OPTIONS;
  const argv = minimist(args, {
    boolean: [
      "only-revenue",
    ],
  });

  const options = clone(DEFAULT_OPTIONS);
  options.coins = options.coins.concat(argv._);

  return options;
}
