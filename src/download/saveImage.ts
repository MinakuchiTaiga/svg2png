export function saveImage(blob: Blob, fileName: string): void {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
