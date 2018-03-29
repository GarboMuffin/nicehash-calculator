import { IHandlerData } from "../calculator/IHandlerData";
import { NiceHashCalculator } from "../calculator/NiceHashCalculator";

// There will likely be more methods in the future
export abstract class AbstractHandler {
  // called when everything is finished
  public finished(calculator: NiceHashCalculator): void {

  }

  // called for each coin
  public abstract handle(data: IHandlerData, calculator: NiceHashCalculator): void;
}
