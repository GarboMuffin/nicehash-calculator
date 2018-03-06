import * as fs from "fs";

import * as OptionLib from "./lib/options";

// Prices type
export enum PricesOption {
  // global nicehash averages
  Average,

  // minimum order with workers
  Minimum,

  // TODO: "MinimumWithWorkers" and "MinimumWithHashrate"
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
}

export function parseOptions() {
  const readArgumentsFile = () => {
    const content = fs.readFileSync("arguments.txt");
    const lines = content.toString().split("\n");
    const result: string[] = [];

    for (const line of lines) {
      // Lines that starti with # are comments
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

  // get the arguments to pass to the parser
  // remove the first 2 things from argv because that's node and this file
  let args = process.argv.splice(2);
  // append arguments.txt
  args = args.concat(readArgumentsFile());

  const parsedOptions = OptionLib.parse(args, {
    arguments: {
      /* tslint:disable:object-literal-key-quotes */
      "debug": {
        type: "boolean",
        default: false,
      },
      "no-header": {
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
      /* tslint:enable:object-literal-key-quotes */
    },
  });

  // TODO: remove some of this ugly duplication somehow?

  const getPricesOption = (): PricesOption => {
    const value = parsedOptions.arguments.prices;
    if (value === "average") {
      return PricesOption.Average;
    } else if (value === "minimum") {
      return PricesOption.Minimum;
    } else {
      console.warn("unknown value specified for --prices, accepted values are 'average' (default) and 'minimum'");
      return PricesOption.Average;
    }
  };

  const getOutputHandlerOption = (): OutputHandlerOption => {
    const value = parsedOptions.arguments.output;
    if (value === "pretty") {
      return OutputHandlerOption.Pretty;
    } else if (value === "json") {
      return OutputHandlerOption.JSON;
    } else {
      console.warn("unknown value specified for --output, accepted values are 'pretty' (default) and 'json'");
      return OutputHandlerOption.Pretty;
    }
  };

  const options: IOptions = {
    unrecognized: parsedOptions.unrecognized,
    coins: parsedOptions.plain,
    debug: parsedOptions.arguments.debug as boolean,
    showHeader: !parsedOptions.arguments["no-header"] as boolean,
    sleepTime: parsedOptions.arguments["sleep-time"] as number,
    prices: getPricesOption(),
    outputHandler: getOutputHandlerOption(),
    maxCacheAge: (parsedOptions.arguments["max-age"] as number) * 1000,
  };
  return options;
}
