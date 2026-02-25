import { describe, expect, test } from "vitest";
import { mountAppAndGetElements } from "./dom";

type FakeRoot = {
  innerHTML: string;
  querySelector: <TElement extends Element>(
    selector: string,
  ) => TElement | null;
};

describe("mountAppAndGetElements", () => {
  test("必要な要素をすべて取得して返す", () => {
    const elementsBySelector = new Map<string, Element>([
      ["#svg-file", {} as HTMLInputElement],
      ["#file-name", {} as HTMLSpanElement],
      ["#format", {} as HTMLSelectElement],
      ["#width", {} as HTMLInputElement],
      ["#height", {} as HTMLInputElement],
      ["#lock-ratio", {} as HTMLInputElement],
      ["#png-options", {} as HTMLDivElement],
      ["#png-alpha-wrap", {} as HTMLLabelElement],
      ["#png-transparent", {} as HTMLInputElement],
      ["#jpg-options", {} as HTMLDivElement],
      ["#quality-wrap", {} as HTMLLabelElement],
      ["#quality", {} as HTMLInputElement],
      ["#quality-value", {} as HTMLElement],
      ["#preview", {} as HTMLImageElement],
      ["#preview-wrap", {} as HTMLDivElement],
      ["#meta", {} as HTMLParagraphElement],
      ["#download", {} as HTMLButtonElement],
    ]);

    const root: FakeRoot = {
      innerHTML: "",
      querySelector: <TElement extends Element>(selector: string) =>
        (elementsBySelector.get(selector) as TElement | undefined) ?? null,
    };

    const result = mountAppAndGetElements(root as unknown as HTMLDivElement);

    expect(root.innerHTML).toContain("SVG2PNG");
    expect(result.fileInput).toBe(elementsBySelector.get("#svg-file"));
    expect(result.downloadButton).toBe(elementsBySelector.get("#download"));
  });

  test("必要要素が欠けていると例外を投げる", () => {
    const root: FakeRoot = {
      innerHTML: "",
      querySelector: () => null,
    };

    expect(() =>
      mountAppAndGetElements(root as unknown as HTMLDivElement),
    ).toThrow("#svg-file が見つかりません");
  });
});
