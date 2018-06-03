import * as NiceHash from ".";
import { logger } from "../../logger";
import { request } from "../../utils";

interface IApiResult<T> {
  result: T;
  method: string;
}

interface IRawGlobalPricesCoin {
  price: string;
  algo: number;
}

interface IRawGlobalPrices {
  stats: IRawGlobalPricesCoin[];
}

interface IOrder {
  limit_speed: string;
  alive: boolean;
  price: string;
  id: number;
  type: number;
  workers: number;
  algo: number;
  accepted_speed: string;
}

interface IRawOrders {
  orders: IOrder[];
}

interface IAlgorithm {
  down_step: string;
  min_diff_working: string;
  min_limit: string;
  speed_text: string; // "TH";
  min_diff_initial: string;
  name: string;
  algo: number;
  multi: string;
}

interface IBuyerInfo {
  algorithms: IAlgorithm[];
  down_time: number;
  min_amount: string;
  static_fee: string;
  dynamic_fee: string;
}

export async function getRawGlobalPrices(): Promise<IApiResult<IRawGlobalPrices>> {
  const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
  const data = JSON.parse(rq.data) as IApiResult<IRawGlobalPrices>;
  return data;
}

/**
 * Gets the global average prices.
 */
export async function getGlobalPrices() {
  const data = await getRawGlobalPrices();
  const cache: number[] = [];
  for (const niceHashCost of data.result.stats) {
    cache[niceHashCost.algo] = Number(niceHashCost.price);
  }
  return cache;
}

/**
 * Returns generic information for buyers
 */
export async function getBuyerInfo(): Promise<IBuyerInfo> {
  const rq = await request("https://api.nicehash.com/api?method=buy.info");
  const data = JSON.parse(rq.data) as IApiResult<IBuyerInfo>;
  return data.result;
}

/**
 * Gets the existing orders for an algorithm
 * 
 * @param algo The algorithm
 */
export async function getOrders(algo: NiceHash.Algorithm): Promise<IApiResult<IRawOrders>> {
  const rq = await request(`https://api.nicehash.com/api?method=orders.get&algo=${algo.id}`);
  const data = JSON.parse(rq.data) as IApiResult<IRawOrders>;
  return data;
}

/**
 * Gets the minimum price to place an order for an algorithm.
 * By default searches for the lowest price order with some accepted speed but can be configured to use workers instead of accepted speed.
 * 
 * @param algo The algorithm
 * @param withWorkers If true, find the lowest price order with workers. If false or undefined, uses accepted speed as a comparison instead.
 */
export async function getPrice(algo: NiceHash.Algorithm, withWorkers?: boolean): Promise<number> {
  const data = await getOrders(algo);
  const orders = data.result.orders;

  // find the lowest order with workers
  let minimumOrder: IOrder = orders[0];
  for (const order of orders) {
    const price = Number(order.price);
    const comparison = withWorkers ? order.workers : order.accepted_speed;
    if (price < Number(minimumOrder.price) && comparison > 0) {
      minimumOrder = order;
    }
  }

  logger.debug("NiceHash.getPrice(): returned from web for " + algo.id);
  const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
  return minimumPrice;
}
