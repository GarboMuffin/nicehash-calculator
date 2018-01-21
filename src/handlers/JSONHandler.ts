import { AbstractHandler } from "./AbstractHandler";
import { ICoinData } from "../index";
import { IOptions } from "../options";

// Enabled with --json-output
// Allows access to just get the raw data and it's what you would use to read data from
// this program to use with another

export class JSONHandler extends AbstractHandler {
  public handle(data: ICoinData, options: IOptions) {
    // really advanced
    console.log(data);
  }
}
