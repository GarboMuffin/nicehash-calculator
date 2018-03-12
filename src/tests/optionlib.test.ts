import "mocha";

import { expect } from "chai";

import * as OptionLib from "../lib/options";

// This tests the option parsing library in particular
// This does not test the option parsing specific to this program

describe("Option Parsing Library", () => {
  it("should work with string types", () => {
    const result = OptionLib.parse(["--arg=abc"], {
      arguments: {
        arg: {
          type: "string",
          default: "def",
        }
      }
    });
    expect(result.arguments.arg).to.equal("abc");
  });

  it("should work with number types", () => {
    const result = OptionLib.parse(["--arg=123"], {
      arguments: {
        arg: {
          type: "number",
          default: 456,
        }
      }
    });
    expect(result.arguments.arg).to.equal(123);
  });

  it("should work with boolean types", () => {
    const result = OptionLib.parse(["--arg"], {
      arguments: {
        arg: {
          type: "boolean",
          default: false,
        }
      }
    });
    expect(result.arguments.arg).to.equal(true);
  });

  it("should work with aliases", () => {
    const result = OptionLib.parse(["--arg-alias=abc"], {
      arguments: {
        arg: {
          type: "string",
          default: "def",
          aliases: ["arg-alias"],
        }
      }
    });
    expect(result.arguments.arg).to.equal("abc");
  });

  it("should recognize unrecognized", () => {
    const result = OptionLib.parse(["--arg", "--another-arg", "--and-more-args"], {
      arguments: {
        arg: {
          type: "boolean",
          default: false,
        }
      }
    });
    expect(result.unrecognized).to.have.ordered.members(["--another-arg", "--and-more-args"]);
  });
});
