# svg2png

ブラウザ上で SVG 画像を読み込み、完全クライアントサイドで PNG/JPG に変換してダウンロードするツールです。

## 実装方針
- 変換処理はブラウザ内のみで実行
- SVG ファイルをサーバーへアップロードしない
- 変換結果（PNG/JPG）はユーザー端末にダウンロード

## 技術スタック
- Package manager: `pnpm`
- App: TypeScript + Vite
- Lint/Format: Biome
- Test: Vitest
- Deploy: GitHub Pages (GitHub Actions)

## 開発コマンド
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm lint`
- `pnpm format`
- `pnpm test`

## 公開予定
GitHub Pages で公開予定です（現時点では未公開）。
