import {Hash} from "./hash";
import {NiceHashLocation} from "./location";
import {Algorithms as Algorithm} from "./algorithms";
import {Order, OrderType} from "./order";

import * as request from "request-promise";

interface NiceHashApiResponse {
  result: {
    orders: Order[],
  },
}

export class NiceHashCost {
  constructor(endpoint: string, type: OrderType){
    this.endpoint = endpoint;
    this.type = type;
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
  private type: OrderType;

  async init(){
    var response: any = await request(this.endpoint);
    this.orders = JSON.parse(response).result.orders;
    this.filter();

    return this;
  }

  private filter(){
    var self = this;

    // remove dead orders and incorrect types
    this.orders = this.orders.filter(function(order){
      return order.workers > 0 && order.type === self.type;
    });

    // convert strings to numbers
    this.orders = this.orders.map(function(order){
      order.price = Number(order.price);
      return order;
    });
  }
};

export function createEndpoint(algo: Algorithm, location: NiceHashLocation){
  return `https://api.nicehash.com/api?method=orders.get&algo=${algo}&location=${location}`
}
