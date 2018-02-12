export type TOptionType = "number" | "string" | "boolean" | "list";

export interface IOption {
  aliases?: string[];

  type: TOptionType;
  default: number | string | boolean;
}
