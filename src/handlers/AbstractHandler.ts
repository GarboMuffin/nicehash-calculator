import { ICoinData, NiceHashCalculator } from "../NiceHashCalculator";

// There will likely be more methods in the future
export abstract class AbstractHandler {
  // called when everything is finished
  public finished(calculator: NiceHashCalculator): void {

  }

  // called for each coin
  public abstract handle(data: ICoinData, calculator: NiceHashCalculator): void;
}
