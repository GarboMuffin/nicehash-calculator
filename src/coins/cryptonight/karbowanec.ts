import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Karbowanec",
  names: [
    "krb",
  ],
  NiceHash: {
    hashrate: Hash.MEGA,
    id: Algorithms.CryptoNight,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 176,
  },
  enabled: false,
};
