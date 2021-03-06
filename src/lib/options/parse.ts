import * as OptionParser from ".";

function handleArgument(result: OptionParser.IParsedOptions, opts: OptionParser.IOptions, rawArg: string) {
  // remove leading --
  const arg = rawArg.substr(2);

  // divide the argument into two pieces, key and value
  // regex here makes it only split at the first occurrence
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

  // returns the associated IOption for the argument or null if there isn't one
  // returns a tuple:
  // [0]: the name of the option
  // [1]: the option
  const getOption = (): [string, OptionParser.IOption] | null => {
    // if the argument is directly defined then simply use that
    const directLookup = opts.arguments[name];
    if (directLookup) {
      return [name, directLookup];
    }

    for (const key of Object.keys(opts.arguments)) {
      const value = opts.arguments[key];
      // aliases is not always present
      if (value.aliases && value.aliases.includes(name)) {
        return [key, value];
      }
    }
    return null;
  };

  const setResult = (value: any) => {
    result.arguments[option![0]] = value;
  };

  const name = getName();
  const option = getOption();
  if (option === null) {
    result.unrecognized.push(rawArg);
    return;
  }

  const type = option[1].type;
  if (type === "string") {
    setResult(getValue());
  } else if (type === "number") {
    // TODO: verify is number
    setResult(Number(getValue()));
  } else if (type === "boolean") {
    setResult(true);
  }
}

export function parse(argv: string[], opts: OptionParser.IOptions): OptionParser.IParsedOptions {
  const result: OptionParser.IParsedOptions = {
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
