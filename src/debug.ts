/**
 * A reusable class for debugging.
 * Removes some useless boilerplate and expands objects passed to it.
 * (console.log has a depth limit, many objects in this reach that limit quickly)
 */

import { Options } from "./options";

import chalk from "chalk";
import * as util from "util";

export class Debug {
  static create(options: Options) {
    return function (msg: string, ...args: any[]) {
      if (options.debug) {
        var newline = args.length > 0;

        var newArgs = [];
        for (var arg of args) {
          if (typeof arg === "object") {
            newArgs.push(util.inspect(arg, false, null));
          } else {
            newArgs.push(arg);
          }
        }
        console.log(chalk.gray("DEBUG: ") + msg + (newline ? ":\n" : ""), ...newArgs);
      }
    };
  }
}
