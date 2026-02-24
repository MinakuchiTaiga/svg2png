import "./style.css";

type OutputFormat = "png" | "jpg";

interface LoadedSvg {
  name: string;
  text: string;
  blob: Blob;
  previewUrl: string;
  width: number;
  height: number;
}

const FALLBACK_SIZE = 1200;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりません");
}

app.innerHTML = `
  <main class="poster-page">
    <section class="hero reveal reveal-1">
      <p class="hero-kicker">VECTOR LAB / CLIENT SIDE CONVERTER / NO SERVER UPLOAD</p>
      <h1>SVG2PNG</h1>
      <p class="hero-sub">UPLOAD SVG, EXPORT PNG OR JPG.</p>
    </section>

    <section class="layout">
      <aside class="art-grid reveal reveal-2" aria-label="decorative vector illustrations">
        <article class="tile tile-checker" aria-hidden="true"></article>
        <article class="tile tile-can" aria-hidden="true">
          <svg viewBox="0 0 220 220" role="img" aria-label="sardine can">
            <rect x="52" y="30" width="116" height="162" rx="38" fill="#f7fbff" stroke="currentColor" stroke-width="5"/>
            <rect x="60" y="58" width="100" height="94" rx="10" fill="none" stroke="currentColor" stroke-width="4"/>
            <rect x="82" y="44" width="56" height="16" rx="8" fill="none" stroke="currentColor" stroke-width="4"/>
            <ellipse cx="110" cy="106" rx="25" ry="13" fill="none" stroke="currentColor" stroke-width="4"/>
            <path d="M88 106 c8 -10 24 -10 32 0 c-8 10 -24 10 -32 0Z" fill="currentColor"/>
            <circle cx="99" cy="104" r="2.8" fill="#f7fbff"/>
            <path d="M85 139 q8 -8 16 0 t16 0 t16 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
            <rect x="72" y="160" width="76" height="20" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
            <text x="110" y="174" text-anchor="middle" font-size="14" font-weight="800" letter-spacing="1">SARDINES</text>
          </svg>
        </article>
        <article class="tile tile-bag" aria-hidden="true">
          <svg viewBox="0 0 220 220" role="img" aria-label="bag illustration">
            <rect x="64" y="88" width="92" height="96" rx="6" fill="none" stroke="currentColor" stroke-width="5"/>
            <path d="M82 88 c0 -18 10 -28 28 -28 c18 0 28 10 28 28" fill="none" stroke="currentColor" stroke-width="5"/>
            <rect x="92" y="116" width="38" height="28" fill="currentColor"/>
          </svg>
        </article>
        <article class="tile tile-hand" aria-hidden="true">
          <svg viewBox="0 0 220 220" role="img" aria-label="hand and eye illustration">
            <path d="M56 188 c-3 -46 4 -82 21 -108 c7 -11 20 -7 20 7 v34 h8 v-40 c0 -10 14 -10 14 0 v40 h8 v-36 c0 -9 14 -9 14 0 v40 h8 v-30 c0 -9 14 -9 14 0 v68 c0 20 0 27 12 44" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="89" cy="146" rx="27" ry="16" fill="none" stroke="currentColor" stroke-width="4"/>
            <circle cx="89" cy="146" r="7" fill="currentColor"/>
          </svg>
        </article>
        <article class="tile tile-shirt" aria-hidden="true">
          <svg viewBox="0 0 220 220" role="img" aria-label="shirt illustration">
            <path d="M55 184 L72 70 L96 58 h28 l24 12 l17 114 z" fill="none" stroke="currentColor" stroke-width="5"/>
            <path d="M96 58 c0 9 7 16 14 16 c7 0 14 -7 14 -16" fill="none" stroke="currentColor" stroke-width="4"/>
            <text x="110" y="120" text-anchor="middle">BLUE CLUB</text>
          </svg>
        </article>
        <article class="tile tile-wave" aria-hidden="true"></article>
      </aside>

      <section class="panel reveal reveal-3" aria-label="converter panel">
        <h2>SVG TO RASTER CONVERTER</h2>

        <div class="field">
          <span>UPLOAD SVG FILE</span>
          <div class="file-row">
            <input id="svg-file" class="file-input" type="file" accept=".svg,image/svg+xml" />
            <label for="svg-file" class="file-trigger">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2H3V6Zm0 5h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z"
                  fill="currentColor"
                />
              </svg>
              <span>CHOOSE SVG</span>
            </label>
            <span id="file-name" class="file-name">NO FILE CHOSEN</span>
          </div>
        </div>

        <div class="options-row">
          <label class="field small">
            <span>FORMAT</span>
            <select id="format">
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </label>

          <label class="field small">
            <span>WIDTH</span>
            <input id="width" type="number" min="1" step="1" placeholder="auto" />
          </label>

          <label class="field small">
            <span>HEIGHT</span>
            <input id="height" type="number" min="1" step="1" placeholder="auto" />
          </label>
        </div>

        <label class="check-row">
          <input id="lock-ratio" type="checkbox" checked />
          <span>KEEP ASPECT RATIO</span>
        </label>

        <div id="png-options">
          <label class="check-row" id="png-alpha-wrap">
            <input id="png-transparent" type="checkbox" checked />
            <span>PNG BACKGROUND TRANSPARENT</span>
          </label>
        </div>

        <div id="jpg-options" hidden>
          <label class="field" id="quality-wrap">
            <span>JPG QUALITY: <b id="quality-value">0.92</b></span>
            <input id="quality" type="range" min="0.1" max="1" step="0.01" value="0.92" />
          </label>
        </div>

        <div class="preview-wrap" id="preview-wrap" data-empty="true">
          <img id="preview" alt="SVG preview" />
          <p id="meta">NO FILE SELECTED</p>
        </div>

        <div class="actions">
          <button id="download" type="button" disabled>DOWNLOAD</button>
        </div>
      </section>
    </section>

    <footer class="footer-note reveal reveal-4">
      <p>YOUR SVG, READY TO EXPORT</p>
      <small>ALL PROCESSING RUNS LOCALLY IN YOUR BROWSER.</small>
      <small class="copyright">© 2026 SVG2PNG. ALL RIGHTS RESERVED.</small>
    </footer>
  </main>
`;

const fileInput = query<HTMLInputElement>("#svg-file");
const fileNameText = query<HTMLSpanElement>("#file-name");
const formatSelect = query<HTMLSelectElement>("#format");
const widthInput = query<HTMLInputElement>("#width");
const heightInput = query<HTMLInputElement>("#height");
const lockRatioInput = query<HTMLInputElement>("#lock-ratio");
const pngOptions = query<HTMLDivElement>("#png-options");
const pngAlphaWrap = query<HTMLLabelElement>("#png-alpha-wrap");
const pngTransparentInput = query<HTMLInputElement>("#png-transparent");
const jpgOptions = query<HTMLDivElement>("#jpg-options");
const qualityWrap = query<HTMLLabelElement>("#quality-wrap");
const qualityInput = query<HTMLInputElement>("#quality");
const qualityValue = query<HTMLElement>("#quality-value");
const previewImage = query<HTMLImageElement>("#preview");
const previewWrap = query<HTMLDivElement>("#preview-wrap");
const metaText = query<HTMLParagraphElement>("#meta");
const downloadButton = query<HTMLButtonElement>("#download");

let loadedSvg: LoadedSvg | null = null;
let aspectRatio = 1;

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.includes("svg") && !file.name.toLowerCase().endsWith(".svg")) {
    setError("SVGファイルを選択してください。");
    return;
  }

  try {
    const text = await file.text();
    const parsed = parseSvgSize(text);
    const safeWidth = parsed.width > 0 ? parsed.width : FALLBACK_SIZE;
    const safeHeight = parsed.height > 0 ? parsed.height : FALLBACK_SIZE;
    const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
    const previewUrl = URL.createObjectURL(blob);

    if (loadedSvg) {
      URL.revokeObjectURL(loadedSvg.previewUrl);
    }

    loadedSvg = {
      name: stripExtension(file.name),
      text,
      blob,
      previewUrl,
      width: safeWidth,
      height: safeHeight,
    };

    aspectRatio = safeWidth / safeHeight;

    widthInput.value = String(Math.round(safeWidth));
    heightInput.value = String(Math.round(safeHeight));

    previewImage.src = previewUrl;
    previewWrap.dataset.empty = "false";
    metaText.textContent = `${file.name} / ${Math.round(safeWidth)}x${Math.round(safeHeight)}`;
    fileNameText.textContent = file.name;
    downloadButton.disabled = false;
  } catch {
    setError("SVGの読み込みに失敗しました。");
  }
});

formatSelect.addEventListener("change", () => {
  syncFormatOptions();
});

qualityInput.addEventListener("input", () => {
  qualityValue.textContent = Number(qualityInput.value).toFixed(2);
});

widthInput.addEventListener("input", () => {
  if (!lockRatioInput.checked) {
    return;
  }

  const width = sanitizeSize(widthInput.value);
  if (!width) {
    return;
  }

  heightInput.value = String(Math.max(1, Math.round(width / aspectRatio)));
});

heightInput.addEventListener("input", () => {
  if (!lockRatioInput.checked) {
    return;
  }

  const height = sanitizeSize(heightInput.value);
  if (!height) {
    return;
  }

  widthInput.value = String(Math.max(1, Math.round(height * aspectRatio)));
});

downloadButton.addEventListener("click", async () => {
  if (!loadedSvg) {
    return;
  }

  const width = sanitizeSize(widthInput.value) ?? loadedSvg.width;
  const height = sanitizeSize(heightInput.value) ?? loadedSvg.height;

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    setError("幅と高さには1以上の数値を指定してください。");
    return;
  }

  const format = formatSelect.value as OutputFormat;
  const quality = Number(qualityInput.value);
  const transparentBackground =
    format === "png" ? pngTransparentInput.checked : false;

  downloadButton.disabled = true;
  downloadButton.textContent = "PROCESSING...";

  try {
    const blob = await renderRaster({
      svgBlob: loadedSvg.blob,
      width: Math.round(width),
      height: Math.round(height),
      format,
      quality,
      transparentBackground,
    });

    const extension = format === "png" ? "png" : "jpg";
    const fileName = `${loadedSvg.name}-${Math.round(width)}x${Math.round(height)}.${extension}`;
    triggerDownload(blob, fileName);
    downloadButton.textContent = "DOWNLOAD AGAIN";
  } catch {
    setError("画像変換に失敗しました。SVGの内容をご確認ください。");
    downloadButton.textContent = "DOWNLOAD";
  } finally {
    downloadButton.disabled = false;
  }
});

window.addEventListener("beforeunload", () => {
  if (loadedSvg) {
    URL.revokeObjectURL(loadedSvg.previewUrl);
  }
});

syncFormatOptions();

function parseSvgSize(svgText: string): { width: number; height: number } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;

  if (!svg || svg.tagName.toLowerCase() !== "svg") {
    return { width: FALLBACK_SIZE, height: FALLBACK_SIZE };
  }

  const widthAttr = svg.getAttribute("width");
  const heightAttr = svg.getAttribute("height");
  const viewBox = svg.getAttribute("viewBox");

  const width = parseLength(widthAttr);
  const height = parseLength(heightAttr);

  if (width && height) {
    return { width, height };
  }

  if (viewBox) {
    const values = viewBox
      .trim()
      .split(/\s+/)
      .map((value) => Number(value));

    if (values.length === 4) {
      const viewWidth = values[2];
      const viewHeight = values[3];

      if (viewWidth > 0 && viewHeight > 0) {
        return { width: viewWidth, height: viewHeight };
      }
    }
  }

  return { width: FALLBACK_SIZE, height: FALLBACK_SIZE };
}

function parseLength(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value.replace("px", "").trim());

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function sanitizeSize(input: string): number | null {
  if (!input.trim()) {
    return null;
  }

  const parsed = Number.parseInt(input, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function stripExtension(fileName: string): string {
  return fileName.replace(/\.svg$/i, "") || "converted";
}

function query<TElement extends Element>(selector: string): TElement {
  const element = document.querySelector<TElement>(selector);

  if (!element) {
    throw new Error(`${selector} が見つかりません`);
  }

  return element;
}

async function renderRaster(options: {
  svgBlob: Blob;
  width: number;
  height: number;
  format: OutputFormat;
  quality: number;
  transparentBackground: boolean;
}): Promise<Blob> {
  const mimeType = options.format === "png" ? "image/png" : "image/jpeg";
  const url = URL.createObjectURL(options.svgBlob);

  try {
    const image = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = options.width;
    canvas.height = options.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context unavailable");
    }

    if (options.format === "jpg" || !options.transparentBackground) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await canvasToBlob(canvas, mimeType, options.quality);
    if (!blob) {
      throw new Error("Unable to export blob");
    }

    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image load failed"));
    image.src = src;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function triggerDownload(blob: Blob, fileName: string): void {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

function setError(message: string): void {
  metaText.textContent = message;
  previewWrap.dataset.empty = "true";
  previewImage.removeAttribute("src");
  fileNameText.textContent = "NO FILE CHOSEN";
  downloadButton.disabled = true;
}

function syncFormatOptions(): void {
  const isJpg = formatSelect.value === "jpg";
  pngOptions.hidden = isJpg;
  jpgOptions.hidden = !isJpg;
  qualityWrap.hidden = !isJpg;
  qualityInput.disabled = !isJpg;
  pngAlphaWrap.hidden = isJpg;
  pngTransparentInput.disabled = isJpg;
}
