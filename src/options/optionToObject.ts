import * as OptionLib from "../lib/options";
import { logger } from "../logger";

interface IOptionToObjectOptions<T = number> {
  name: string;
  default: T;
  args: {
    [s: string]: T;
  }
}

export function optionToObject<T>(parsedOptions: OptionLib.IParsedOptions, opts: IOptionToObjectOptions<T>): any {
  const value = parsedOptions.arguments[opts.name];
  for (const key of Object.keys(opts.args)) {
    if (value === key) {
      return opts.args[key];
    }
  }

  // Converts the list of accepted values to a human readable string in the format:
  // "'--default-thing` (default), `--another-thing`, and `--last-thing`"
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
