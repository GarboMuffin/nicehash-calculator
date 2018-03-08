import * as OptionParser from ".";

export interface IOptions {
  arguments: {
    [s: string]: OptionParser.IOption;
  };
}

export interface IParsedOptions {
  // list of arguments provided but are unknown
  unrecognized: string[];

  // list of things provided that don't start with --, eg.
  // `node index --thing=3 somethingelse` would result in `somethingelse`
  plain: string[];

  arguments: {
    [s: string]: string | number | boolean;
  };
}

function handleArgument(result: IParsedOptions, opts: IOptions, rawArg: string) {
  // remove leading --
  const arg = rawArg.substr(2);

  // divide the argument into two pieces, key and value
  // regex here makes it only split at the first occurence
  const argSplit = arg.split(/=/);

  // returns the "name" of the argument provided. eg.
  // `--thing=3` will return `thing` and `--another-thing` will return `another-thing`
  const getName = (): string => {
    if (arg.includes("=")) {
      return argSplit[0];
    } else {
      return arg;
    }
  };

  // returns the "value" of the argument provided or empty string. eg.
  // `--thing=3` will return `3` but `--boolean-arg` will return ``
  const getValue = (): string | null => {
    if (arg.includes("=")) {
      return argSplit[1];
    } else {
      return "";
    }
  };

  const getOption = (): OptionParser.IOption | null => {
    // if the argument is directly defined then simply use that
    const directLookup = opts.arguments[name];
    if (!directLookup) {
      // otherwise look for aliases
      for (const value of Object.values(opts.arguments)) {
        // aliases is not always present
        if (value.aliases && value.aliases.includes(name)) {
          return option;
        }
      }
      return null;
    } else {
      return directLookup;
    }
  };

  const setResult = (value: any) => {
    result.arguments[name] = value;
  };

  const name = getName();
  const option = getOption();
  if (option === null) {
    result.unrecognized.push(rawArg);
    return;
  }

  const type = option.type;
  if (type === "string") {
    setResult(getValue());
  } else if (type === "number") {
    // TODO: verify is number
    setResult(Number(getValue()));
  } else if (type === "boolean") {
    setResult(true);
  }
}

export function parse(argv: string[], opts: IOptions): IParsedOptions {
  const result: IParsedOptions = {
    unrecognized: [],
    plain: [],
    arguments: {},
  };

  // set default values
  for (const key of Object.keys(opts.arguments)) {
    const val = opts.arguments[key];
    result.arguments[key] = val.default;
  }

  for (const str of argv) {
    // arguments (starts with --) are more complicated so the majority of the work is done elsewhere
    if (str.startsWith("--")) {
      handleArgument(result, opts, str);
    } else {
      result.plain.push(str);
    }
  }
  return result;
}
