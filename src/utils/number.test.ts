import { describe, expect, test } from "vitest";
import { sanitizePositiveInt } from "./number";

describe("sanitizePositiveInt", () => {
  test("正の整数文字列を数値化する", () => {
    expect(sanitizePositiveInt("42")).toBe(42);
  });

  test("空文字や空白は null", () => {
    expect(sanitizePositiveInt("")).toBeNull();
    expect(sanitizePositiveInt("   ")).toBeNull();
  });

  test("0 以下や非数は null", () => {
    expect(sanitizePositiveInt("0")).toBeNull();
    expect(sanitizePositiveInt("-9")).toBeNull();
    expect(sanitizePositiveInt("abc")).toBeNull();
  });

  test("小数文字列は parseInt 相当で処理される", () => {
    expect(sanitizePositiveInt("10.9")).toBe(10);
  });
});
