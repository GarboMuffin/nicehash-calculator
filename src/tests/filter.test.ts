import "mocha";

import { expect } from "chai";

import { getCoins, ICoin } from "../coins";
import { filter } from "../filter";
import { Algorithm } from "../Algorithm";

describe("Coin Filtering", () => {
  // a few select coins
  let coins: ICoin[] = [
    {
      displayName: "Bitcoin",
      abbreviation: "BTC",
      names: ["bitcoin", "btc"],
      id: 1,
      algorithm: Algorithm["SHA-256"],
    },
    {
      displayName: "Litecoin",
      abbreviation: "LTC",
      names: ["litecoin", "ltc"],
      id: 2,
      algorithm: Algorithm.Scrypt,
    },
    {
      displayName: "Vertcoin",
      abbreviation: "VTC",
      names: ["vertcoin", "vtc"],
      id: 3,
      algorithm: Algorithm.Lyra2REv2,
    },
    {
      displayName: "Dogecoin",
      abbreviation: "DOGE",
      names: ["dogecoin", "doge"],
      id: 6,
      algorithm: Algorithm.Scrypt,
    },
  ];

  it("should enable coins by name", () => {
    const result = filter(coins, ["bitcoin", "litecoin"]);
    expect(result).length(2);
    expect(result[0].displayName).to.equal("Bitcoin");
    expect(result[1].displayName).to.equal("Litecoin");
  });

  it("should enable coins by algorithm", () => {
    const result = filter(coins, ["scrypt"]);
    expect(result.length).to.equal(2); // litecoin and dogecoin
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.equal(0);
    }
  });

  it("should disable coins by name", () => {
    const result = filter(coins, ["scrypt", "-litecoin"]);
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.equal(0);
      expect(coin.displayName).to.not.equal("Litecoin");
    }
  });

  it("should disable coins by algorithm", () => {
    const result = filter(coins, ["-scrypt"]);
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.not.equal(0);
    }
  });
});
