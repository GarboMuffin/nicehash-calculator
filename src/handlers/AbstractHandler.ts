import { ICoinData, NiceHashCalculator } from "../NiceHashCalculator";

// There will likely be more methods in the future
// Can't be abstract because that causes some other stange problems
export abstract class AbstractHandler {
  // ignored
  public readonly locationSpecific: boolean = false;

  // called when everything is finished
  public finished(calculator: NiceHashCalculator): void {

  }

  // called for each coin
  public abstract handle(data: ICoinData, calculator: NiceHashCalculator): void;
}
