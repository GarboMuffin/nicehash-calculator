import { JSONHandler, UnifiedHandler, AbstractHandler } from "../handlers";

// Support handlers
export class OutputHandlerOption {
  /* tslint:disable:variable-name */
  // The normal handler, "unified" or "pretty"
  public static Pretty = new OutputHandlerOption(() => new UnifiedHandler());

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  public static JSON = new OutputHandlerOption(() => new JSONHandler());
  /* tslint:enable:variable-name */

  public readonly getHandler: () => AbstractHandler;

  private constructor(getHandler: () => AbstractHandler) {
    this.getHandler = getHandler;
  }
}
