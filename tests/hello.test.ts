import { describe, expect, test } from "@jest/globals";
describe("Testing hello", () => {
  test("Testing hello world", () => {
    expect("Hello dataloom").toEqual("Hello dataloom");
  });
});
