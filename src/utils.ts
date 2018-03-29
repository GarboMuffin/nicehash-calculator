// returns a promise that will resolve after `ms` ms
import * as rp from "request-promise-native";

import { logger } from "./logger";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// returns whether or not a given input is a valid finite number
// typically `thing` is of type string or number
export function isNumber(thing: any): boolean {
  return Number.isFinite(+thing);
}

// returns a copy of a list
// javascript is pass by reference on almost all types which can mess things up in some cases
export function clone<T = any>(arr: T[]): T[] {
  let i = arr.length;
  const res = [];
  while (i--) {
    res[i] = arr[i];
  }
  return res;
}

export async function request(url: string): Promise<any> {
  logger.debug("request(): requested " + url);
  const rq = await rp(url, {
    headers: {
      // perhaps define a user-agent or referrer?
    },
  });
  return rq;
}
