import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { renderRaster } from "./svgToRaster";

interface MockCanvas {
  width: number;
  height: number;
  getContext: ReturnType<typeof vi.fn>;
  toBlob: ReturnType<typeof vi.fn>;
}

describe("renderRaster", () => {
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
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    globalThis.Image = originalImage;
  });

  test("PNG 透過維持時は背景塗りつぶしせずに変換する", async () => {
    const drawImage = vi.fn();
    const fillRect = vi.fn();

    const canvas = createCanvas({
      drawImage,
      fillRect,
      toBlobResult: new Blob(["ok"]),
    });

    const documentMock = globalThis.document as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockReturnValue(canvas);
    urlMock.createObjectURL.mockReturnValue("blob:ok");

    globalThis.Image = createMockImageClass();

    const result = await renderRaster({
      svgBlob: new Blob(["<svg></svg>"], { type: "image/svg+xml" }),
      width: 320,
      height: 200,
      format: "png",
      quality: 0.9,
      transparentBackground: true,
    });

    expect(result).toBeInstanceOf(Blob);
    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(fillRect).not.toHaveBeenCalled();
    expect(urlMock.revokeObjectURL).toHaveBeenCalledWith("blob:ok");
  });

  test("JPG は白背景で塗りつぶしてから変換する", async () => {
    const drawImage = vi.fn();
    const fillRect = vi.fn();

    const canvas = createCanvas({
      drawImage,
      fillRect,
      toBlobResult: new Blob(["ok"]),
    });
    const documentMock = globalThis.document as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockReturnValue(canvas);
    urlMock.createObjectURL.mockReturnValue("blob:ok");

    globalThis.Image = createMockImageClass();

    await renderRaster({
      svgBlob: new Blob(["<svg></svg>"], { type: "image/svg+xml" }),
      width: 400,
      height: 250,
      format: "jpg",
      quality: 0.8,
      transparentBackground: true,
    });

    expect(fillRect).toHaveBeenCalledWith(0, 0, 400, 250);
    expect(drawImage).toHaveBeenCalledTimes(1);
  });

  test("Canvas context が取れない場合は失敗する", async () => {
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn().mockReturnValue(null),
      toBlob: vi.fn(),
    } as unknown as HTMLCanvasElement;

    const documentMock = globalThis.document as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockReturnValue(canvas);
    urlMock.createObjectURL.mockReturnValue("blob:ok");
    globalThis.Image = createMockImageClass();

    await expect(
      renderRaster({
        svgBlob: new Blob(["<svg></svg>"], { type: "image/svg+xml" }),
        width: 10,
        height: 10,
        format: "png",
        quality: 1,
        transparentBackground: true,
      }),
    ).rejects.toThrow("Canvas context unavailable");
  });

  test("toBlob が null を返す場合は失敗する", async () => {
    const canvas = createCanvas({
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      toBlobResult: null,
    });

    const documentMock = globalThis.document as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockReturnValue(canvas);
    urlMock.createObjectURL.mockReturnValue("blob:ok");
    globalThis.Image = createMockImageClass();

    await expect(
      renderRaster({
        svgBlob: new Blob(["<svg></svg>"], { type: "image/svg+xml" }),
        width: 10,
        height: 10,
        format: "png",
        quality: 1,
        transparentBackground: false,
      }),
    ).rejects.toThrow("Unable to export blob");
  });
});

function createCanvas(params: {
  drawImage: ReturnType<typeof vi.fn>;
  fillRect: ReturnType<typeof vi.fn>;
  toBlobResult: Blob | null;
}): MockCanvas {
  const ctx = {
    fillStyle: "",
    fillRect: params.fillRect,
    drawImage: params.drawImage,
  };

  return {
    width: 0,
    height: 0,
    getContext: vi.fn().mockReturnValue(ctx),
    toBlob: vi.fn((callback: (blob: Blob | null) => void) => {
      callback(params.toBlobResult);
    }),
  };
}

function createMockImageClass(): typeof Image {
  return class MockImage {
    decoding = "";
    onload: null | (() => void) = null;
    onerror: null | (() => void) = null;

    set src(_value: string) {
      queueMicrotask(() => {
        this.onload?.();
      });
    }
  } as unknown as typeof Image;
}
