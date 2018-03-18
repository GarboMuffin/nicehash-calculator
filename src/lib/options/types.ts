export type TOptionType = "number" | "string" | "boolean";

export interface IOption {
  aliases?: string[];
  type: TOptionType;
  default: number | string | boolean;
}

export interface IOptions {
  arguments: {
    [s: string]: IOption;
  };
}

export interface IParsedOptions {
  // list of arguments provided but are unknown
  unrecognized: string[];

  // list of things provided that don't start with --, eg.
  // `node index --thing=3 somethingelse` would result in `somethingelse`
  plain: string[];

  arguments: {
    [s: string]: string | number | boolean;
  };
}
