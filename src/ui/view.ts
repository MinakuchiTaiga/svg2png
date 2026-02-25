import type { ConverterElements } from "./dom";

export function syncFormatOptions(
  elements: ConverterElements,
  format: "png" | "jpg",
): void {
  const isJpg = format === "jpg";
  elements.pngOptions.hidden = isJpg;
  elements.jpgOptions.hidden = !isJpg;
  elements.qualityWrap.hidden = !isJpg;
  elements.qualityInput.disabled = !isJpg;
  elements.pngAlphaWrap.hidden = isJpg;
  elements.pngTransparentInput.disabled = isJpg;
}

export function updateQualityLabel(
  elements: ConverterElements,
  quality: number,
): void {
  elements.qualityValue.textContent = quality.toFixed(2);
}

export function showLoadedSvg(
  elements: ConverterElements,
  fileName: string,
  previewUrl: string,
  width: number,
  height: number,
): void {
  elements.widthInput.value = String(Math.round(width));
  elements.heightInput.value = String(Math.round(height));
  elements.previewImage.src = previewUrl;
  elements.previewWrap.dataset.empty = "false";
  elements.metaText.textContent = `${fileName} / ${Math.round(width)}x${Math.round(height)}`;
  elements.fileNameText.textContent = fileName;
  elements.downloadButton.disabled = false;
}

export function showError(elements: ConverterElements, message: string): void {
  elements.metaText.textContent = message;
  elements.previewWrap.dataset.empty = "true";
  elements.previewImage.removeAttribute("src");
  elements.fileNameText.textContent = "NO FILE CHOSEN";
  elements.downloadButton.disabled = true;
}
