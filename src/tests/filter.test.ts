import "mocha";

import { expect } from "chai";

import { Algorithm } from "../Algorithm";
import { ICoin } from "../calculator/coins";
import { filter } from "../calculator/filter";

describe("Coin Filtering", () => {
  // a few select coins for testing
  const coins: ICoin[] = [
    // So a few fields will probably be missing from these objects
    // mainly things like lagging that aren't used at all in filtering
    {
      displayName: "Bitcoin",
      abbreviation: "BTC",
      names: ["bitcoin", "btc"],
      id: 1,
      algorithm: Algorithm["SHA-256"],
      enabled: null,
    },
    {
      displayName: "Litecoin",
      abbreviation: "LTC",
      names: ["litecoin", "ltc"],
      id: 2,
      algorithm: Algorithm.Scrypt,
      enabled: null,
    },
    {
      displayName: "Vertcoin",
      abbreviation: "VTC",
      names: ["vertcoin", "vtc"],
      id: 3,
      algorithm: Algorithm.Lyra2REv2,
      enabled: null,
    },
    {
      displayName: "Dogecoin",
      abbreviation: "DOGE",
      names: ["dogecoin", "doge"],
      id: 6,
      algorithm: Algorithm.Scrypt,
      enabled: null,
    },
  ] as ICoin[];

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
      expect(coin.algorithm.niceHash.id).to.equal(Algorithm.Scrypt.niceHash.id);
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
      expect(coin.algorithm.niceHash.id).to.not.equal(Algorithm.Scrypt.niceHash.id);
    }
  });
});
