import { beforeAll, describe, expect, test, vi } from "vitest";
import { parseSvgSize, stripSvgExtension } from "./svgMetadata";

type AttrMap = Record<string, string>;

class MockDOMParser {
  parseFromString(svgText: string): { documentElement: Element | null } {
    const tagMatch = svgText.match(/<\s*([a-zA-Z0-9:-]+)/);
    if (!tagMatch) {
      return { documentElement: null };
    }

    const tagName = tagMatch[1];
    if (tagName.toLowerCase() !== "svg") {
      return {
        documentElement: {
          tagName,
          getAttribute: () => null,
        } as unknown as Element,
      };
    }

    const attrs: AttrMap = {
      width: findAttr(svgText, "width") ?? "",
      height: findAttr(svgText, "height") ?? "",
      viewBox: findAttr(svgText, "viewBox") ?? "",
    };

    return {
      documentElement: {
        tagName: "svg",
        getAttribute: (name: string) => attrs[name] || null,
      } as unknown as Element,
    };
  }
}

function findAttr(svgText: string, name: string): string | null {
  const regex = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = svgText.match(regex);
  return match ? match[1] : null;
}

beforeAll(() => {
  vi.stubGlobal("DOMParser", MockDOMParser);
});

describe("parseSvgSize", () => {
  test("width/height 属性がある場合はその値を返す", () => {
    const svg = '<svg width="320" height="200"></svg>';
    expect(parseSvgSize(svg)).toEqual({ width: 320, height: 200 });
  });

  test("px付きのサイズを解釈できる", () => {
    const svg = '<svg width="640px" height="360px"></svg>';
    expect(parseSvgSize(svg)).toEqual({ width: 640, height: 360 });
  });

  test("width/height が不正でも viewBox があれば viewBox を使う", () => {
    const svg = '<svg width="-1" height="0" viewBox="0 0 500 300"></svg>';
    expect(parseSvgSize(svg)).toEqual({ width: 500, height: 300 });
  });

  test("svg でない入力はフォールバックを返す", () => {
    const notSvg = "<html><body>nope</body></html>";
    expect(parseSvgSize(notSvg, 777)).toEqual({ width: 777, height: 777 });
  });

  test("サイズが取得できない場合はデフォルトフォールバックを返す", () => {
    const svg = "<svg></svg>";
    expect(parseSvgSize(svg)).toEqual({ width: 1200, height: 1200 });
  });
});

describe("stripSvgExtension", () => {
  test(".svg 拡張子を取り除く", () => {
    expect(stripSvgExtension("logo.svg")).toBe("logo");
    expect(stripSvgExtension("ICON.SVG")).toBe("ICON");
  });

  test("名前が空になる場合は converted を返す", () => {
    expect(stripSvgExtension(".svg")).toBe("converted");
  });
});
