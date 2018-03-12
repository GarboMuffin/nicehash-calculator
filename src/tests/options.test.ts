import "mocha";

import { expect } from "chai";

import { OutputHandlerOption, parseOptions, PricesOption } from "../options";

describe("Option parsing", () => {
  it("should recognize --debug", () => {
    const result = parseOptions(["--debug"]);
    expect(result.debug).to.equal(true);
  });

  it("should recognize --no-header", () => {
    const result = parseOptions(["--no-header"]);
    expect(result.showHeader).to.equal(false);
  });

  it("should recognize --no-warnings", () => {
    const result = parseOptions(["--no-warnings"]);
    expect(result.showWarnings).to.equal(false);
  });

  it("should recognize --sleep-time=123", () => {
    const result = parseOptions(["--sleep-time=123"]);
    expect(result.sleepTime).to.equal(123);
  });

  it("should recognize --max-age=123", () => {
    const result = parseOptions(["--max-age=123"]);
    expect(result.maxCacheAge).to.equal(123 * 1000);
  });

  it("should recognize --prices=average", () => {
    const result = parseOptions(["--prices=average"]);
    expect(result.prices).to.equal(PricesOption.Average);
  });

  it("should recognize --prices=minimum", () => {
    const result = parseOptions(["--prices=minimum"]);
    expect(result.prices).to.equal(PricesOption.MinimumWithWorkers);
  });

  it("should recognize --prices=minimum-with-speed", () => {
    const result = parseOptions(["--prices=minimum-with-speed"]);
    expect(result.prices).to.equal(PricesOption.MinimumWithHashrate);
  });

  it("should recognize --output=pretty", () => {
    const result = parseOptions(["--output=pretty"]);
    expect(result.outputHandler).to.equal(OutputHandlerOption.Pretty);
  });

  it("should recognize --output=json", () => {
    const result = parseOptions(["--output=json"]);
    expect(result.outputHandler).to.equal(OutputHandlerOption.JSON);
  });

  it("should recognize coins", () => {
    const result = parseOptions(["--arg", "bitcoin", "litecoin", "-vertcoin", "--thing=2", "-decred"]);
    expect(result.coins).to.have.ordered.members(["bitcoin", "litecoin", "-vertcoin", "-decred"]);
  });

  it("should recognize unrecognized options", () => {
    const result = parseOptions(["--abc", "--debug", "--def", "--ghi"]);
    expect(result.unrecognized).to.have.ordered.members(["--abc", "--def", "--ghi"])
      .and.not.include("--debug");
  });
});
