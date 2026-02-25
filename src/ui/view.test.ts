import { describe, expect, test, vi } from "vitest";
import type { ConverterElements } from "./dom";
import {
  showError,
  showLoadedSvg,
  syncFormatOptions,
  updateQualityLabel,
} from "./view";

function createElements(): ConverterElements {
  return {
    fileInput: {} as HTMLInputElement,
    fileNameText: { textContent: "" } as HTMLSpanElement,
    formatSelect: {} as HTMLSelectElement,
    widthInput: { value: "" } as HTMLInputElement,
    heightInput: { value: "" } as HTMLInputElement,
    lockRatioInput: {} as HTMLInputElement,
    pngOptions: { hidden: false } as HTMLDivElement,
    pngAlphaWrap: { hidden: false } as HTMLLabelElement,
    pngTransparentInput: { disabled: false } as HTMLInputElement,
    jpgOptions: { hidden: true } as HTMLDivElement,
    qualityWrap: { hidden: true } as HTMLLabelElement,
    qualityInput: { disabled: true } as HTMLInputElement,
    qualityValue: { textContent: "" } as HTMLElement,
    previewImage: {
      src: "",
      removeAttribute: () => {
        void 0;
      },
    } as HTMLImageElement,
    previewWrap: { dataset: { empty: "true" } } as HTMLDivElement,
    metaText: { textContent: "" } as HTMLParagraphElement,
    downloadButton: { disabled: true } as HTMLButtonElement,
  };
}

describe("view helpers", () => {
  test("フォーマットごとの表示切替ができる", () => {
    const elements = createElements();

    syncFormatOptions(elements, "jpg");
    expect(elements.pngOptions.hidden).toBe(true);
    expect(elements.jpgOptions.hidden).toBe(false);
    expect(elements.qualityInput.disabled).toBe(false);
    expect(elements.pngTransparentInput.disabled).toBe(true);

    syncFormatOptions(elements, "png");
    expect(elements.pngOptions.hidden).toBe(false);
    expect(elements.jpgOptions.hidden).toBe(true);
    expect(elements.qualityInput.disabled).toBe(true);
    expect(elements.pngTransparentInput.disabled).toBe(false);
  });

  test("品質ラベルを2桁小数で更新する", () => {
    const elements = createElements();
    updateQualityLabel(elements, 0.923);
    expect(elements.qualityValue.textContent).toBe("0.92");
  });

  test("読み込み成功状態を描画できる", () => {
    const elements = createElements();
    showLoadedSvg(elements, "sample.svg", "blob:preview", 320.4, 199.6);

    expect(elements.widthInput.value).toBe("320");
    expect(elements.heightInput.value).toBe("200");
    expect(elements.previewImage.src).toBe("blob:preview");
    expect(elements.previewWrap.dataset.empty).toBe("false");
    expect(elements.metaText.textContent).toBe("sample.svg / 320x200");
    expect(elements.fileNameText.textContent).toBe("sample.svg");
    expect(elements.downloadButton.disabled).toBe(false);
  });

  test("エラー状態を描画できる", () => {
    const elements = createElements();
    const removeAttribute = vi.fn();
    elements.previewImage.removeAttribute = removeAttribute;

    showError(elements, "失敗");

    expect(elements.metaText.textContent).toBe("失敗");
    expect(elements.previewWrap.dataset.empty).toBe("true");
    expect(removeAttribute).toHaveBeenCalledWith("src");
    expect(elements.fileNameText.textContent).toBe("NO FILE CHOSEN");
    expect(elements.downloadButton.disabled).toBe(true);
  });
});
