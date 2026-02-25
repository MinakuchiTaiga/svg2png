# AGENTS.md

## Project Goal
SVG 画像をブラウザで読み込み、**完全クライアントサイド**で PNG/JPG に変換してダウンロードできるWebアプリを実装・公開する。公開先は GitHub Pages。

## Tech Stack
- Runtime: Browser only (no backend)
- App: TypeScript + Vite
- UI: Vanilla TypeScript + semantic HTML + CSS
- Image conversion: Browser APIs (`FileReader`, `Blob`, `URL.createObjectURL`, `Canvas`)
- State: memory only
- Lint/Format: Biome
- Testing: Vitest
- CI/CD: GitHub Actions + GitHub Pages
- Package manager: pnpm
- Versioning policy: exact versions only (`^` / `~` を使わない)

## Architecture Rules
- サーバーサイド処理を実装しない。
- SVGデータを外部送信しない。
- 変換処理はブラウザ内で完結させる。
- ダウンロード生成は `Blob` と `a[download]` を使う。
- 可能な限り外部CDNに依存しない。
- `localStorage` / `sessionStorage` / `IndexedDB` は使わない。

## Privacy/Security Checklist
- [ ] SVG入力データが外部へ送信されない
- [ ] 変換処理が完全にブラウザ内で完結している
- [ ] 永続ストレージを使っていない
- [ ] タブを閉じるとデータが残らない

## Recommended Structure
- `src/main.ts`: bootstrapping
- `src/ui/*`: 入力・プレビュー・操作UI
- `src/convert/svgToRaster.ts`: SVG -> PNG/JPG 変換ロジック
- `src/download/saveImage.ts`: ダウンロード処理
- `src/types/*`: 型定義

## Development Commands
- install: `pnpm install --frozen-lockfile`
- dev: `pnpm run dev`
- lint: `pnpm run lint`
- format: `pnpm run format`
- test: `pnpm run test`
- build: `pnpm run build`
- preview: `pnpm run preview`

## Definition of Done
- SVGアップロードが動作する
- プレビュー表示ができる
- PNG/JPG変換ができる
- 画像サイズ指定（少なくとも元サイズ/任意サイズ）を扱える
- 変換後画像をダウンロードできる
- GitHub Pages 上で正常動作する

## Commit Rules
- コミットメッセージは日本語で記述すること

## Test Rules
- E2Eテストのテストケース名（`test(...)` のタイトル）は日本語で記述すること
