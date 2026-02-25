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
- `pnpm test:e2e:install` (初回のみ)
- `pnpm test:e2e`
- `pnpm test:e2e:ui`

## GitHub Pages 公開
- 公開URL: `https://<your-github-username>.github.io/svg2png/`
- `main` ブランチへの push で `.github/workflows/pages.yml` が自動実行され、Pages にデプロイされます。

## GitHub Actions 設定
リポジトリの `Settings > Actions > General` で以下を推奨します。

- Policy:
  - `Allow OWNER, and select non-OWNER, actions and reusable workflows`
- チェック:
  - `Allow actions created by GitHub`
  - `Allow actions by Marketplace verified creators`
- Allow list:
  - `actions/checkout@v4`
  - `actions/setup-node@v4`
  - `actions/upload-pages-artifact@v3`
  - `actions/deploy-pages@v4`
  - `pnpm/action-setup@v4`
