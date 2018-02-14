export type TOptionType = "number" | "string" | "boolean";

export interface IOption {
  aliases?: string[];
  type: TOptionType;
  default: number | string | boolean;
}
