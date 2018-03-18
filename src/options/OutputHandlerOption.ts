import { AbstractHandler, JSONHandler, UnifiedHandler } from "../handlers";
import { DelayedJSONHandler } from "../handlers/DelayedJSONHandler";

// Support handlers
export class OutputHandlerOption {
  /* tslint:disable:variable-name */
  // The normal handler, "unified" or "pretty"
  public static readonly Pretty = new OutputHandlerOption(() => new UnifiedHandler());

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  public static readonly JSON = new OutputHandlerOption(() => new JSONHandler());

  // Like JSONHandler but logs once at the end
  public static readonly DelayedJSON = new OutputHandlerOption(() => new DelayedJSONHandler());
  /* tslint:enable:variable-name */

  public readonly getHandler: () => AbstractHandler;

  private constructor(getHandler: () => AbstractHandler) {
    this.getHandler = getHandler;
  }
}
