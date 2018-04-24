import { IHandlerData } from "../calculator/IHandlerData";
import { AbstractHandler } from "./AbstractHandler";

// Enabled with --output=delayed-json, like JSONHandler
// Takes the raw data, but instead of logging each entry
// it will log an array once at the end

export class DelayedJSONHandler extends AbstractHandler {
  public pretty = false;
  private data: IHandlerData[] = [];

  public handle(data: IHandlerData) {
    // really advanced
    this.data.push(data);
  }

  public finished() {
    console.log(JSON.stringify(this.data));
  }
}
