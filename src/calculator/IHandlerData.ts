import * as WhatToMine from "../apis/whattomine";
import { ICoin } from "./coins";

// This is the data that is passed onto handlers
export interface IHandlerData {
  coin: ICoin;
  revenue: number;
  rawRevenue: WhatToMine.IRevenueResponse;
  profit: number;
  price: number;
  returnOnInvestment: number;
  percentChange: number;
}
