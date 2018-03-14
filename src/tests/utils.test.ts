import "mocha";

import { expect } from "chai";

import * as utils from "../utils";

describe("Utils", () => {
  // describe("sleep()", function() {
  //   this.slow(1000);

  //   it("should wait 100 ms before returning", async () => {
  //     const startingTime = Date.now();
  //     await utils.sleep(100);
  //     const endingTime = Date.now();
  //     const totalTime = endingTime - startingTime;
  //     expect(totalTime).to.be.gte(100);
  //   });
  // });

  describe("isNumber()", () => {
    it("should return true for actual numbers", () => {
      expect(utils.isNumber(123)).to.equal(true);
    });

    it("should return true for strings that are numbers", () => {
      expect(utils.isNumber("123")).to.equal(true);
    });

    it("should return false for NaN", () => {
      expect(utils.isNumber(NaN)).to.equal(false);
    });

    it("should return false for strings that aren't numbers", () => {
      expect(utils.isNumber("abc")).to.equal(false);
    });
  });

  describe("clone()", () => {
    it("should copy an array", () => {
      const array = ["a", "b", "c"];
      const clonedArray = utils.clone(array);
      expect(clonedArray).to.not.equal(array);
      expect(clonedArray).to.have.ordered.members(array);
      clonedArray.shift();
      // if these were the same array the shift would also affect the source array
      expect(clonedArray.length).to.equal(array.length - 1);
    });
  });
});
