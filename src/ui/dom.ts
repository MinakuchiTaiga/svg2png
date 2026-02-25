import { appTemplate } from "./template";

export interface ConverterElements {
  fileInput: HTMLInputElement;
  fileNameText: HTMLSpanElement;
  formatSelect: HTMLSelectElement;
  widthInput: HTMLInputElement;
  heightInput: HTMLInputElement;
  lockRatioInput: HTMLInputElement;
  pngOptions: HTMLDivElement;
  pngAlphaWrap: HTMLLabelElement;
  pngTransparentInput: HTMLInputElement;
  jpgOptions: HTMLDivElement;
  qualityWrap: HTMLLabelElement;
  qualityInput: HTMLInputElement;
  qualityValue: HTMLElement;
  previewImage: HTMLImageElement;
  previewWrap: HTMLDivElement;
  metaText: HTMLParagraphElement;
  downloadButton: HTMLButtonElement;
}

export function mountAppAndGetElements(
  root: HTMLDivElement,
): ConverterElements {
  root.innerHTML = appTemplate;

  return {
    fileInput: query(root, "#svg-file"),
    fileNameText: query(root, "#file-name"),
    formatSelect: query(root, "#format"),
    widthInput: query(root, "#width"),
    heightInput: query(root, "#height"),
    lockRatioInput: query(root, "#lock-ratio"),
    pngOptions: query(root, "#png-options"),
    pngAlphaWrap: query(root, "#png-alpha-wrap"),
    pngTransparentInput: query(root, "#png-transparent"),
    jpgOptions: query(root, "#jpg-options"),
    qualityWrap: query(root, "#quality-wrap"),
    qualityInput: query(root, "#quality"),
    qualityValue: query(root, "#quality-value"),
    previewImage: query(root, "#preview"),
    previewWrap: query(root, "#preview-wrap"),
    metaText: query(root, "#meta"),
    downloadButton: query(root, "#download"),
  };
}

function query<TElement extends Element>(
  root: ParentNode,
  selector: string,
): TElement {
  const element = root.querySelector<TElement>(selector);

  if (!element) {
    throw new Error(`${selector} が見つかりません`);
  }

  return element;
}
