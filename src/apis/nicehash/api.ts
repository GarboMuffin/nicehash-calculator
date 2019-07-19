import * as NiceHash from ".";
import { logger } from "../../logger";
import { request } from "../../utils";
import { Algorithm } from "../../Algorithm";
import { PricesOption } from "../../options";

interface IRawGlobalPrices {
  algos: {
    a: number;
    p: number;
    s: number;
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
  const rq = await request("https://api2.nicehash.com/main/api/v2/public/stats/global/current/");
  const data = JSON.parse(rq.data) as IRawGlobalPrices;
  return data;
}

/**
 * Gets the global average prices.
 */
export async function getGlobalPrices() {
  const data = await getRawGlobalPrices();
  const cache: {[s: string]: number} = {};
  const algoMap = [];
  for (const algorithm of Algorithm.instances) {
    algoMap[algorithm.idNum] = algorithm;
  }
  for (const i of data.algos) {
    const algorithm = algoMap[i.a];
    if (!algorithm) {
      continue;
    }
    // TODO: This is very broken.
    // The API does not return unit adjusted units, or something.
    // I don't know, or care really.
    cache[algorithm.idEnum] = i.p;
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
 * By default searches for the lowest price order with some accepted speed but can be configured to use miners instead of accepted speed.
 */
export async function getPrice(algo: NiceHash.Algorithm, type: PricesOption): Promise<number> {
  const data = await getOrders(algo);
  const stats = data.stats;
  const orders = stats.EU.orders.concat(stats.USA.orders);

  logger.debug("NiceHash.getPrice(): returning from web for " + algo.id + " (type=" + type + ")");

  if (type === PricesOption.Average) {
    let totalPrice = 0;
    let totalHash = 0;
    for (const order of orders) {
      totalPrice += +order.price * +order.acceptedSpeed;
      totalHash += +order.acceptedSpeed;
    }
    return totalPrice / totalHash;
  } else {
    let minimumOrder = orders[0];
    for (const order of orders) {
      const price = Number(order.price);
      const comparison = type === PricesOption.MinimumWithMiners ? order.rigsCount : order.acceptedSpeed;
      if (price < Number(minimumOrder.price) && comparison > 0) {
        minimumOrder = order;
      }
    }
    const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
    return minimumPrice;
  }
}
