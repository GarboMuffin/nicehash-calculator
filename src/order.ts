export interface NHOrder {
  limit_speed: number,
  alive: boolean,
  price: number,
  id: number,
  type: number,
  workers: number,
  algo: number,
  accepted_speed: number,
}

export enum NHOrderType {
  Standard = 0,
  Fixed = 1,
}
