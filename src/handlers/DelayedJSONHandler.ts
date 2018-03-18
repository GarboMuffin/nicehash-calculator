import { ICoinData } from "../calculator/NiceHashCalculator";
import { AbstractHandler } from "./AbstractHandler";

// Enabled with --output=delayed-json, like JSONHandler
// Takes the raw data, but instead of logging each entry
// it will log an array once at the end

export class DelayedJSONHandler extends AbstractHandler {
  private data: any[] = [];

  public handle(data: ICoinData) {
    // really advanced
    this.data.push(data);
  }

  public finished() {
    console.log(JSON.stringify(this.data));
  }
}
