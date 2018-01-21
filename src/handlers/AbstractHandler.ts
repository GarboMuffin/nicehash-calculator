import { ICoinData } from "../index";
import { IOptions } from "../options";

// There will likely be more methods in the future
// Can't be abstract because that causes some other stange problems
export abstract class AbstractHandler {
  // ignored
  public readonly locationSpecific: boolean = false;

  // called when everything is finished
  public finished(options: IOptions): void {

  }

  // called for each coin
  public abstract handle(data: ICoinData, options: IOptions): void;
}
