import * as minimist from "minimist";

export interface IOptions {
  debug: boolean;
  showHeader: boolean;
  coins: string[];
  sleepTime: number;
  unrecognized: string[];
  userAgent: string;
  useMinimumPrices: boolean;
  useJsonOutput: boolean;
}

export function parse(args: string[]): IOptions {
  const unrecognizedOptions: string[] = [];

  // After getting used to using my own (terrible) option parser minimist is really weird
  // I looked into yargs/commander but minimist is the simplest it seems

  // I am still considering just creating my own that doesn't try to do any of the fancy parsing most things do
  // The old one:
  // Didn't try to turn --no-x into --x=false
  // Forced consistency by only supporting --x=x and not --x x (which likely causes many problems in this)

  const argv = minimist(args, {
    boolean: [
      "debug",
      "header",
      "json-output",
      "use-minimum",
    ],
    string: [
      "sleep-time",
      "user-agent",
    ],
    default: {
      header: true,
      debug: false,
      "sleep-time": 1000,
      "json-output": false,
      "use-minimum": false,
      "user-agent": "",
    },
    alias: {
      "use-minimum": ["find-min", "use-min"],
    },
    unknown: (arg) => {
      if (arg.startsWith("-")) {
        unrecognizedOptions.push(arg);
        return false;
      } else {
        return true;
      }
    },
  });

  const options: IOptions = {} as any;

  options.unrecognized = unrecognizedOptions;
  options.coins = argv._.map((i) => i.toString().toLowerCase());
  options.sleepTime = Number(argv["sleep-time"]);
  options.debug = argv.debug;
  options.showHeader = argv.header;
  options.useJsonOutput = argv["json-output"];
  options.userAgent = argv["user-agent"];
  options.useMinimumPrices = argv["use-minimum"];

  return options;
}
