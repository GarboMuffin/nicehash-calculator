import * as NiceHash from ".";
import { logger } from "../../logger";
import { request } from "../../utils";

interface IRawGlobalPrices {
  miningAlgorithms: {
    algorithm: string;
    title: string;
    speed: string;
    paying: string;
  }[];
}

interface IRawMarket {
  orders: {
    payedAmount: number;
    myOrder: boolean;
    alive: boolean;
    miningStatus: string;
    payingSpeed: string;
    acceptedSpeed: string;
    rigsCount: number;
    limit: string;
    price: string;
    type: string;
    id: string;
  }[];
}

interface IRawOrders {
  stats: {
    EU: IRawMarket,
    USA: IRawMarket,
  }
}

interface IBuyerInfo {
  miningAlgorithms: {
    down_step: number;
    min_diff_working: number;
    min_limit: number;
    max_limit: number;
    speed_text: string;
    min_diff_initial: number;
    name: string;
    algo: string;
    multi: number;
    min_price: number;
    max_price: number;
    min_amount: number;
  }[];
}

export async function getRawGlobalPrices(): Promise<IRawGlobalPrices> {
  const rq = await request("https://api2.nicehash.com/main/api/v2/public/simplemultialgo/info/");
  const data = JSON.parse(rq.data) as IRawGlobalPrices;
  return data;
}

/**
 * Gets the global average prices.
 */
export async function getGlobalPrices() {
  const data = await getRawGlobalPrices();
  const cache: {[s: string]: number} = {};
  for (const niceHashCost of data.miningAlgorithms) {
    cache[niceHashCost.algorithm] = Number(niceHashCost.paying);
  }
  return cache;
}

/**
 * Returns generic information for buyers
 */
export async function getBuyerInfo(): Promise<IBuyerInfo> {
  const rq = await request("https://api2.nicehash.com/main/api/v2/public/buy/info/");
  const data = JSON.parse(rq.data) as IBuyerInfo;
  return data;
}

/**
 * Gets the existing orders for an algorithm
 * 
 * @param algo The algorithm
 */
export async function getOrders(algo: NiceHash.Algorithm): Promise<IRawOrders> {
  const rq = await request(`https://api2.nicehash.com/main/api/v2/hashpower/orderBook/?algorithm=${algo.id}`);
  const data = JSON.parse(rq.data) as IRawOrders;
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
  const stats = data.stats;
  const orders = stats.EU.orders.concat(stats.USA.orders);

  // find the lowest order with workers
  let minimumOrder = orders[0];
  for (const order of orders) {
    const price = Number(order.price);
    const comparison = withWorkers ? order.rigsCount : order.acceptedSpeed;
    if (price < Number(minimumOrder.price) && comparison > 0) {
      minimumOrder = order;
    }
  }

  logger.debug("NiceHash.getPrice(): returned from web for " + algo.id);
  const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
  return minimumPrice;
}
