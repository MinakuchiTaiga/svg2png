(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();const u=1200,R=document.querySelector("#app");if(!R)throw new Error("#app が見つかりません");R.innerHTML=`
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
`;const E=l("#svg-file"),k=l("#file-name"),b=l("#format"),h=l("#width"),p=l("#height"),S=l("#lock-ratio"),G=l("#png-options"),P=l("#png-alpha-wrap"),C=l("#png-transparent"),T=l("#jpg-options"),M=l("#quality-wrap"),g=l("#quality"),B=l("#quality-value"),N=l("#preview"),A=l("#preview-wrap"),I=l("#meta"),c=l("#download");let s=null,y=1;E.addEventListener("change",async()=>{var r;const e=(r=E.files)==null?void 0:r[0];if(e){if(!e.type.includes("svg")&&!e.name.toLowerCase().endsWith(".svg")){m("SVGファイルを選択してください。");return}try{const a=await e.text(),i=D(a),t=i.width>0?i.width:u,n=i.height>0?i.height:u,o=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(o);s&&URL.revokeObjectURL(s.previewUrl),s={name:V(e.name),text:a,blob:o,previewUrl:d,width:t,height:n},y=t/n,h.value=String(Math.round(t)),p.value=String(Math.round(n)),N.src=d,A.dataset.empty="false",I.textContent=`${e.name} / ${Math.round(t)}x${Math.round(n)}`,k.textContent=e.name,c.disabled=!1}catch{m("SVGの読み込みに失敗しました。")}}});b.addEventListener("change",()=>{U()});g.addEventListener("input",()=>{B.textContent=Number(g.value).toFixed(2)});h.addEventListener("input",()=>{if(!S.checked)return;const e=v(h.value);e&&(p.value=String(Math.max(1,Math.round(e/y))))});p.addEventListener("input",()=>{if(!S.checked)return;const e=v(p.value);e&&(h.value=String(Math.max(1,Math.round(e*y))))});c.addEventListener("click",async()=>{if(!s)return;const e=v(h.value)??s.width,r=v(p.value)??s.height;if(!Number.isFinite(e)||!Number.isFinite(r)||e<=0||r<=0){m("幅と高さには1以上の数値を指定してください。");return}const a=b.value,i=Number(g.value),t=a==="png"?C.checked:!1;c.disabled=!0,c.textContent="PROCESSING...";try{const n=await q({svgBlob:s.blob,width:Math.round(e),height:Math.round(r),format:a,quality:i,transparentBackground:t}),o=a==="png"?"png":"jpg",d=`${s.name}-${Math.round(e)}x${Math.round(r)}.${o}`;H(n,d),c.textContent="DOWNLOAD AGAIN"}catch{m("画像変換に失敗しました。SVGの内容をご確認ください。"),c.textContent="DOWNLOAD"}finally{c.disabled=!1}});window.addEventListener("beforeunload",()=>{s&&URL.revokeObjectURL(s.previewUrl)});U();function D(e){const i=new DOMParser().parseFromString(e,"image/svg+xml").documentElement;if(!i||i.tagName.toLowerCase()!=="svg")return{width:u,height:u};const t=i.getAttribute("width"),n=i.getAttribute("height"),o=i.getAttribute("viewBox"),d=O(t),x=O(n);if(d&&x)return{width:d,height:x};if(o){const w=o.trim().split(/\s+/).map(f=>Number(f));if(w.length===4){const f=w[2],L=w[3];if(f>0&&L>0)return{width:f,height:L}}}return{width:u,height:u}}function O(e){if(!e)return null;const r=Number.parseFloat(e.replace("px","").trim());return!Number.isFinite(r)||r<=0?null:r}function v(e){if(!e.trim())return null;const r=Number.parseInt(e,10);return!Number.isFinite(r)||r<=0?null:r}function V(e){return e.replace(/\.svg$/i,"")||"converted"}function l(e){const r=document.querySelector(e);if(!r)throw new Error(`${e} が見つかりません`);return r}async function q(e){const r=e.format==="png"?"image/png":"image/jpeg",a=URL.createObjectURL(e.svgBlob);try{const i=await j(a),t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Canvas context unavailable");(e.format==="jpg"||!e.transparentBackground)&&(n.fillStyle="#ffffff",n.fillRect(0,0,t.width,t.height)),n.drawImage(i,0,0,t.width,t.height);const o=await F(t,r,e.quality);if(!o)throw new Error("Unable to export blob");return o}finally{URL.revokeObjectURL(a)}}function j(e){return new Promise((r,a)=>{const i=new Image;i.decoding="async",i.onload=()=>r(i),i.onerror=()=>a(new Error("Image load failed")),i.src=e})}function F(e,r,a){return new Promise(i=>{e.toBlob(t=>i(t),r,a)})}function H(e,r){const a=document.createElement("a"),i=URL.createObjectURL(e);a.href=i,a.download=r,a.click(),URL.revokeObjectURL(i)}function m(e){I.textContent=e,A.dataset.empty="true",N.removeAttribute("src"),k.textContent="NO FILE CHOSEN",c.disabled=!0}function U(){const e=b.value==="jpg";G.hidden=e,T.hidden=!e,M.hidden=!e,g.disabled=!e,P.hidden=e,C.disabled=e}
