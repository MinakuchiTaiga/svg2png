import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const sampleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" fill="#0d47a1" />
  <circle cx="160" cy="100" r="60" fill="#ffffff" />
</svg>
`;

async function uploadSampleSvg(page: Page): Promise<void> {
  await page.setInputFiles("#svg-file", {
    name: "sample.svg",
    mimeType: "image/svg+xml",
    buffer: Buffer.from(sampleSvg),
  });
}

test("SVGをアップロードしてPNGをダウンロードできる", async ({ page }) => {
  await page.goto("/");
  await uploadSampleSvg(page);

  await expect(page.locator("#download")).toBeEnabled();

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#download").click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("sample-320x200.png");
});

test("SVGをアップロードしてJPGをダウンロードできる", async ({ page }) => {
  await page.goto("/");
  await uploadSampleSvg(page);
  await page.locator("#format").selectOption("jpg");

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#download").click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("sample-320x200.jpg");
});
