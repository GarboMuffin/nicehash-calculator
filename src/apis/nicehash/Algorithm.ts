import { HashRateUnit } from "../../HashRateUnit";

export class Algorithm {
  public static algorithms: Algorithm[];

  public readonly id: number;
  public readonly unit: HashRateUnit;

  constructor(id: number, hashRateUnit: HashRateUnit) {
    this.id = id;
    this.unit = hashRateUnit;
  }
}
