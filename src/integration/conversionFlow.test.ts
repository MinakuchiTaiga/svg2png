import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { stripSvgExtension } from "../convert/svgMetadata";
import { renderRaster } from "../convert/svgToRaster";
import { saveImage } from "../download/saveImage";

describe("変換フロー結合", () => {
  const originalImage = globalThis.Image;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("document", {
      createElement: vi.fn(),
    });
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(),
      revokeObjectURL: vi.fn(),
    });

    globalThis.Image = class MockImage {
      decoding = "";
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      set src(_value: string) {
        queueMicrotask(() => {
          this.onload?.();
        });
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    globalThis.Image = originalImage;
  });

  test("SVG名から出力名を作り、ラスタライズ後に保存できる", async () => {
    const click = vi.fn();
    const link = {
      href: "",
      download: "",
      click,
    } as unknown as HTMLAnchorElement;

    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn().mockReturnValue({
        fillStyle: "",
        fillRect: vi.fn(),
        drawImage: vi.fn(),
      }),
      toBlob: vi.fn((callback: (blob: Blob | null) => void) => {
        callback(new Blob(["raster"]));
      }),
    };

    const documentMock = globalThis.document as unknown as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as unknown as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockImplementation((tagName: string) => {
      if (tagName === "canvas") {
        return canvas;
      }

      if (tagName === "a") {
        return link;
      }

      throw new Error(`unexpected tag: ${tagName}`);
    });

    urlMock.createObjectURL
      .mockReturnValueOnce("blob:svg")
      .mockReturnValueOnce("blob:download");

    const output = await renderRaster({
      svgBlob: new Blob([
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60"></svg>',
      ]),
      width: 100,
      height: 60,
      format: "png",
      quality: 0.92,
      transparentBackground: true,
    });

    const fileName = `${stripSvgExtension("sample.svg")}-100x60.png`;
    saveImage(output, fileName);

    expect(fileName).toBe("sample-100x60.png");
    expect(link.download).toBe("sample-100x60.png");
    expect(click).toHaveBeenCalledTimes(1);
    expect(urlMock.revokeObjectURL).toHaveBeenCalledWith("blob:svg");
    expect(urlMock.revokeObjectURL).toHaveBeenCalledWith("blob:download");
  });
});
