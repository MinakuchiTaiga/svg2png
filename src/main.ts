import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりません");
}

app.innerHTML = `
  <main class="container">
    <h1>SVG to PNG/JPG</h1>
    <p>環境構築完了。次にSVGアップロードと変換機能を実装します。</p>
  </main>
`;
