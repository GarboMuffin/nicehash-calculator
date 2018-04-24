import { IHandlerData } from "../calculator/IHandlerData";
import { AbstractHandler } from "./AbstractHandler";

// Enabled with --output=json
// Allows access to just get the raw data and it's what you would use to read data from
// this program to use with another

export class JSONHandler extends AbstractHandler {
  public pretty = false;

  public handle(data: IHandlerData) {
    // really advanced
    console.log(JSON.stringify(data));
  }
}
