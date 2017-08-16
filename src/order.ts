export interface Order {
  limit_speed: number,
  alive: boolean,
  price: number,
  id: number,
  type: number,
  workers: number,
  algo: number,
  accepted_speed: number,
}

export enum OrderType {
  Standard = 0,
  Fixed = 1,
}
