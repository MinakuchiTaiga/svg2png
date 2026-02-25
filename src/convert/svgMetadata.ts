const DEFAULT_FALLBACK_SIZE = 1200;

export function parseSvgSize(
  svgText: string,
  fallbackSize = DEFAULT_FALLBACK_SIZE,
): { width: number; height: number } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;

  if (!svg || svg.tagName.toLowerCase() !== "svg") {
    return { width: fallbackSize, height: fallbackSize };
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

  return { width: fallbackSize, height: fallbackSize };
}

export function stripSvgExtension(fileName: string): string {
  return fileName.replace(/\.svg$/i, "") || "converted";
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
