export type OutputFormat = "png" | "jpg";

export interface LoadedSvg {
  name: string;
  text: string;
  blob: Blob;
  previewUrl: string;
  width: number;
  height: number;
}

export interface RenderRasterOptions {
  svgBlob: Blob;
  width: number;
  height: number;
  format: OutputFormat;
  quality: number;
  transparentBackground: boolean;
}
