import "mocha";

import { expect } from "chai";

import { getCoins, ICoin } from "../coins";
import { filter } from "../filter";
import { NiceHashCalculator } from "../NiceHashCalculator";

describe("Coin filtering", async () => {
  let allCoins: ICoin[];

  before(async () => {
    const calculator = new NiceHashCalculator();
    allCoins = await getCoins(calculator);
  });

  it("should enable coins by name", () => {
    const result = filter(allCoins, ["bitcoin", "litecoin"]);
    expect(result).length(2);
    expect(result[0].displayName).to.equal("Bitcoin");
    expect(result[1].displayName).to.equal("Litecoin");
  });

  it("should enable coins by algorithm", () => {
    const result = filter(allCoins, ["scrypt"]);
    expect(result).length.greaterThan(10);
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.equal(0);
    }
  });

  it("should disable coins by name", () => {
    const result = filter(allCoins, ["scrypt", "-litecoin"]);
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.equal(0);
      expect(coin.displayName).to.not.equal("Litecoin");
    }
  });

  it("should disable coins by algorithm", () => {
    const result = filter(allCoins, ["-scrypt"]);
    for (const coin of result) {
      expect(coin.algorithm.niceHash.id).to.not.equal(0);
    }
  });
});
