import * as minimist from "minimist";

export interface IOptions {
  debug: boolean;
  showHeader: boolean;
  coins: string[];
  sleepTime: number;
  unrecognized: string[];
  userAgent: string;

  useJsonOutput: boolean;
}

export function parse(args: string[]): IOptions {
  const unrecognizedOptions: string[] = [];

  // After getting used to using my own (terrible) option parser minimist is really weird
  // I looked into yargs/commander but minimist is the easiest

  // TODO: option parsing
  // return DEFAULT_OPTIONS;
  const argv = minimist(args, {
    boolean: [
      "debug",
      "header",
      "json-output",
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
      "user-agent": "",
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

  return options;
}
