import * as OptionParser from ".";
import * as OptionLib from "../lib/options";
import { optionToObject } from "./optionToObject";

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
  prices: OptionParser.PricesOption;

  // what output handler to use?
  outputHandler: OptionParser.OutputHandlerOption;

  // attempt to include fees?
  includeFees: boolean;

  // list enabled coins instead of profit information?
  listCoins: boolean;
}

export function parseOptions(args: string[]) {
  const parsedOptions = OptionLib.parse(args, {
    arguments: {
      /* tslint:disable:object-literal-key-quotes */
      // used by chalk
      "no-color": {
        type: "boolean",
        default: false,
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
        default: "minimum",
      },
      "sleep-time": {
        type: "number",
        default: 1000,
      },
      "experimental-fees": {
        type: "boolean",
        default: false,
      },
      "list-coins": {
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
    prices: optionToObject(parsedOptions, {
      name: "prices",
      default: OptionParser.PricesOption.MinimumWithMiners,
      args: {
        average: OptionParser.PricesOption.Average,
        minimum: OptionParser.PricesOption.MinimumWithMiners,
        "minimum-with-speed": OptionParser.PricesOption.MinimumWithHashrate,
      },
    }),
    outputHandler: optionToObject<OptionParser.OutputHandlerOption>(parsedOptions, {
      name: "output",
      default: OptionParser.OutputHandlerOption.Pretty,
      args: {
        pretty: OptionParser.OutputHandlerOption.Pretty,
        json: OptionParser.OutputHandlerOption.JSON,
        "delayed-json": OptionParser.OutputHandlerOption.DelayedJSON,
      },
    }),
    includeFees: parsedOptions.arguments["experimental-fees"] as boolean,
    listCoins: parsedOptions.arguments["list-coins"] as boolean,
  };
  return options;
}
