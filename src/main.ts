import "./style.css";
import { parseSvgSize, stripSvgExtension } from "./convert/svgMetadata";
import { renderRaster } from "./convert/svgToRaster";
import { saveImage } from "./download/saveImage";
import type { LoadedSvg, OutputFormat } from "./types/converter";
import { mountAppAndGetElements } from "./ui/dom";
import {
  showError,
  showLoadedSvg,
  syncFormatOptions,
  updateQualityLabel,
} from "./ui/view";
import { sanitizePositiveInt } from "./utils/number";

const FALLBACK_SIZE = 1200;

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("#app が見つかりません");
}

const elements = mountAppAndGetElements(app);
let loadedSvg: LoadedSvg | null = null;
let aspectRatio = 1;

elements.fileInput.addEventListener("change", async () => {
  const file = elements.fileInput.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.includes("svg") && !file.name.toLowerCase().endsWith(".svg")) {
    showError(elements, "SVGファイルを選択してください。");
    return;
  }

  try {
    const text = await file.text();
    const parsed = parseSvgSize(text, FALLBACK_SIZE);
    const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
    const previewUrl = URL.createObjectURL(blob);

    if (loadedSvg) {
      URL.revokeObjectURL(loadedSvg.previewUrl);
    }

    loadedSvg = {
      name: stripSvgExtension(file.name),
      text,
      blob,
      previewUrl,
      width: parsed.width,
      height: parsed.height,
    };

    aspectRatio = parsed.width / parsed.height;
    showLoadedSvg(elements, file.name, previewUrl, parsed.width, parsed.height);
  } catch {
    showError(elements, "SVGの読み込みに失敗しました。");
  }
});

elements.formatSelect.addEventListener("change", () => {
  syncFormatOptions(elements, elements.formatSelect.value as OutputFormat);
});

elements.qualityInput.addEventListener("input", () => {
  updateQualityLabel(elements, Number(elements.qualityInput.value));
});

elements.widthInput.addEventListener("input", () => {
  if (!elements.lockRatioInput.checked) {
    return;
  }

  const width = sanitizePositiveInt(elements.widthInput.value);
  if (!width) {
    return;
  }

  elements.heightInput.value = String(
    Math.max(1, Math.round(width / aspectRatio)),
  );
});

elements.heightInput.addEventListener("input", () => {
  if (!elements.lockRatioInput.checked) {
    return;
  }

  const height = sanitizePositiveInt(elements.heightInput.value);
  if (!height) {
    return;
  }

  elements.widthInput.value = String(
    Math.max(1, Math.round(height * aspectRatio)),
  );
});

elements.downloadButton.addEventListener("click", async () => {
  if (!loadedSvg) {
    return;
  }

  const width =
    sanitizePositiveInt(elements.widthInput.value) ?? loadedSvg.width;
  const height =
    sanitizePositiveInt(elements.heightInput.value) ?? loadedSvg.height;

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    showError(elements, "幅と高さには1以上の数値を指定してください。");
    return;
  }

  const format = elements.formatSelect.value as OutputFormat;
  const quality = Number(elements.qualityInput.value);
  const transparentBackground =
    format === "png" ? elements.pngTransparentInput.checked : false;

  elements.downloadButton.disabled = true;
  elements.downloadButton.textContent = "PROCESSING...";

  try {
    const outputWidth = Math.round(width);
    const outputHeight = Math.round(height);
    const blob = await renderRaster({
      svgBlob: loadedSvg.blob,
      width: outputWidth,
      height: outputHeight,
      format,
      quality,
      transparentBackground,
    });

    const extension = format === "png" ? "png" : "jpg";
    const fileName = `${loadedSvg.name}-${outputWidth}x${outputHeight}.${extension}`;
    saveImage(blob, fileName);
    elements.downloadButton.textContent = "DOWNLOAD AGAIN";
  } catch {
    showError(elements, "画像変換に失敗しました。SVGの内容をご確認ください。");
    elements.downloadButton.textContent = "DOWNLOAD";
  } finally {
    elements.downloadButton.disabled = false;
  }
});

window.addEventListener("beforeunload", () => {
  if (loadedSvg) {
    URL.revokeObjectURL(loadedSvg.previewUrl);
  }
});

syncFormatOptions(elements, elements.formatSelect.value as OutputFormat);
updateQualityLabel(elements, Number(elements.qualityInput.value));
