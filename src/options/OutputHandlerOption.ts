import { JSONHandler, UnifiedHandler, AbstractHandler } from "../handlers";

// Support handlers
export class OutputHandlerOption {
  // The normal handler, "unified" or "pretty"
  public static Pretty = new OutputHandlerOption(() => new UnifiedHandler());

  // Outputs formatted JSON, can be parsed by anything
  // Best used with --no-header
  public static JSON = new OutputHandlerOption(() => new JSONHandler());

  public readonly getHandler: () => AbstractHandler;

  private constructor(getHandler: () => AbstractHandler) {
    this.getHandler = getHandler;
  }
}
