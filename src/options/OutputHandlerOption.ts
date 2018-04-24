import { AbstractHandler, JSONHandler, UnifiedHandler } from "../handlers";
import { DelayedJSONHandler } from "../handlers/DelayedJSONHandler";

interface IHandlerConstructor {
  new(): AbstractHandler;
}

// Support handlers
export class OutputHandlerOption {
  /* tslint:disable:variable-name */
  // The normal handler, "unified" or "pretty"
  public static readonly Pretty = new OutputHandlerOption(UnifiedHandler);

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  public static readonly JSON = new OutputHandlerOption(JSONHandler);

  // Like JSONHandler but logs once at the end
  public static readonly DelayedJSON = new OutputHandlerOption(DelayedJSONHandler);
  /* tslint:enable:variable-name */

  public readonly class: IHandlerConstructor;

  private constructor(clazz: IHandlerConstructor) {
    this.class = clazz;
  }
}
