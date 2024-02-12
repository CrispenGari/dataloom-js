import { describe, expect, test } from "@jest/globals";
import { hello } from "../src";

describe("Testing hello", () => {
  test("Testing hello world", () => {
    expect(hello()).toEqual("Hello dataloom");
  });
});
