import { beforeEach, describe, expect, test, vi } from "vitest";
import { saveImage } from "./saveImage";

describe("saveImage", () => {
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

  test("Blob URL を作成してダウンロードを実行し解放する", () => {
    const click = vi.fn();
    const link = {
      href: "",
      download: "",
      click,
    } as unknown as HTMLAnchorElement;

    const documentMock = globalThis.document as unknown as {
      createElement: ReturnType<typeof vi.fn>;
    };
    const urlMock = globalThis.URL as unknown as {
      createObjectURL: ReturnType<typeof vi.fn>;
      revokeObjectURL: ReturnType<typeof vi.fn>;
    };

    documentMock.createElement.mockReturnValue(link);
    urlMock.createObjectURL.mockReturnValue("blob:download-url");

    saveImage(new Blob(["data"]), "result.png");

    expect(documentMock.createElement).toHaveBeenCalledWith("a");
    expect(urlMock.createObjectURL).toHaveBeenCalledTimes(1);
    expect(link.href).toBe("blob:download-url");
    expect(link.download).toBe("result.png");
    expect(click).toHaveBeenCalledTimes(1);
    expect(urlMock.revokeObjectURL).toHaveBeenCalledWith("blob:download-url");
  });
});
