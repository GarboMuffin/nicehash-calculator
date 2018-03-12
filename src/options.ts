import * as fs from "fs";

import * as OptionLib from "./lib/options";
import { logger } from "./logger";

// Prices type
export enum PricesOption {
  // global nicehash averages
  Average,

  // minimum order with workers
  MinimumWithWorkers,

  // minimum order with some amount of accepted speed
  MinimumWithHashrate
}

// Support handlers
export enum OutputHandlerOption {
  // The normal handler, "unified" or "pretty"
  Pretty,

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  JSON,
}

// Program config
export interface IOptions {
  // output debug messages?
  debug: boolean;

  // show the header at the start?
  showHeader: boolean;

  // show warnings?
  showWarnings: boolean;

  // user specified coins
  coins: string[];

  // how long to wait between each coin, ms
  sleepTime: number;

  // unrecognized options
  unrecognized: string[];

  // what type of prices to use?
  prices: PricesOption;

  // what output handler to use?
  outputHandler: OutputHandlerOption;

  // max age of things loaded from https://whattomine.com/coins.json
  maxCacheAge: number;

  // attempt to include fees?
  includeFees: boolean;
}

interface IEnumFromOptionOptions {
  name: string;
  default: number;
  args: {
    [s: string]: number;
  }
}

function enumFromOption<T>(parsedOptions: OptionLib.IParsedOptions, opts: IEnumFromOptionOptions): number {
  const value = parsedOptions.arguments[opts.name];
  for (const key of Object.keys(opts.args)) {
    if (value === key) {
      return opts.args[key];
    }
  }

  const getAcceptedValues = () => {
    const parsedArgs = [];
    for (const key of Object.keys(opts.args)) {
      const isDefault = opts.args[key] === opts.default;
      parsedArgs.push({
        name: key,
        isDefault,
      });
    }

    let result = "";
    for (const arg of parsedArgs) {
      const isLast = parsedArgs.indexOf(arg) === parsedArgs.length - 1;
      const isSecondToLast = parsedArgs.indexOf(arg) === parsedArgs.length - 2;

      let name = `'${arg.name}'`;
      if (arg.isDefault) {
        name += " (default)";
      }
      if (isLast) {
        name += ".";
      } else if (isSecondToLast) {
        name += ", and ";
      } else {
        name += ", ";
      }
      result += name;
    }
    return result;
  };

  logger.warn(`Unknown value specified for --${opts.name}. Accepted values are ${getAcceptedValues()}`);
  return opts.default;
};

function readArgumentsFile() {
  const content = fs.readFileSync("arguments.txt");
  const lines = content.toString().split("\n");
  const result: string[] = [];

  for (const line of lines) {
    // Lines that start with # are comments
    if (line.startsWith("#")) {
      continue;
    }
    // Trim it to avoid newlines and other characters
    const trimmed = line.trim();
    // Ignore empty lines
    if (trimmed === "") {
      continue;
    }
    result.push(trimmed);
  }

  return result;
};

export function parseOptions(args?: string[]) {
  if (!args) {
    args = process.argv.splice(2);
    args = args.concat(readArgumentsFile());
  }

  const parsedOptions = OptionLib.parse(args, {
    arguments: {
      /* tslint:disable:object-literal-key-quotes */
      // argument is used by chalk
      "no-color": {
        type: "boolean",
        default: false
      },
      "debug": {
        type: "boolean",
        default: false,
        aliases: ["verbose"],
      },
      "no-header": {
        type: "boolean",
        default: false,
      },
      "no-warnings": {
        type: "boolean",
        default: false,
      },
      "output": {
        type: "string",
        default: "pretty",
      },
      "prices": {
        type: "string",
        default: "average",
      },
      "sleep-time": {
        type: "number",
        default: 1000,
      },
      "max-age": {
        type: "number",
        default: 60 * 5, // 5 minutes
      },
      "experimental-fees": {
        type: "boolean",
        default: false,
      },
      /* tslint:enable:object-literal-key-quotes */
    },
  });

  const options: IOptions = {
    unrecognized: parsedOptions.unrecognized,
    coins: parsedOptions.plain,
    debug: parsedOptions.arguments.debug as boolean,
    showHeader: !parsedOptions.arguments["no-header"] as boolean,
    showWarnings: !parsedOptions.arguments["no-warnings"] as boolean,
    sleepTime: parsedOptions.arguments["sleep-time"] as number,
    prices: enumFromOption(parsedOptions, {
      name: "prices",
      default: PricesOption.Average,
      args: {
        average: PricesOption.Average,
        minimum: PricesOption.MinimumWithWorkers,
        "minimum-with-speed": PricesOption.MinimumWithHashrate,
      },
    }),
    outputHandler: enumFromOption(parsedOptions, {
      name: "output",
      default: OutputHandlerOption.Pretty,
      args: {
        pretty: OutputHandlerOption.Pretty,
        json: OutputHandlerOption.JSON,
      },
    }),
    maxCacheAge: (parsedOptions.arguments["max-age"] as number) * 1000,
    includeFees: parsedOptions.arguments["experimental-fees"] as boolean,
  };
  return options;
}
