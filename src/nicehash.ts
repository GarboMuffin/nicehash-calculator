import {Hash} from "./hash";
import {NiceHashLocation} from "./location";
import {Algorithms as Algorithm} from "./algorithms";

import * as request from "request-promise";

interface Order {
  limit_speed: number,
  alive: boolean,
  price: number,
  id: number,
  type: number,
  workers: number,
  algo: number,
  accepted_speed: number,
}

interface NiceHashApiResponse {
  result: {
    orders: Order[],
  },
}

export class NiceHashCost {
  constructor(endpoint: string, fixed: boolean){
    this.endpoint = endpoint;
    this.fixed = fixed;
  }

  get price(){
    if (this.orders.length === 0){
      return 0;
    }

    var min = Infinity;

    for (var order of this.orders){
      if (order.price < min){
        min = order.price;
      }
    }

    return min;
  }

  private orders: Order[];
  private endpoint: string;
  private fixed: boolean;

  async init(){
    var response: any = await request(this.endpoint);
    this.orders = JSON.parse(response).result.orders;
    this.filter();

    return this;
  }

  private filter(){
    this.orders = this.orders.map(function(order){
      order.price = Number(order.price);
      return order;
    });
    var self = this;
    this.orders = this.orders.filter(function(order){
      return order.workers > 0 && !!order.type === self.fixed;
    });
  }
};

export function createEndpoint(algo: Algorithm, location: NiceHashLocation){
  return `https://api.nicehash.com/api?method=orders.get&algo=${algo}&location=${location}`
}
