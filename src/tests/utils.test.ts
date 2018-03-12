import "mocha";

import { expect } from "chai";

import * as utils from "../utils";

describe("Utils", () => {
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
    });
  });
});
