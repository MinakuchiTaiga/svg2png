export const appTemplate = `
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
          <div class="bag-rain" aria-hidden="true">
            <span class="bag-drop" style="--x: 8%; --dur: 0.54s; --delay: 0.22s; --r: -7deg; --land: calc(100% - 52px);"></span>
            <span class="bag-drop" style="--x: 26%; --dur: 0.49s; --delay: 0.05s; --r: 5deg; --land: calc(100% - 54px);"></span>
            <span class="bag-drop" style="--x: 44%; --dur: 0.56s; --delay: 0.31s; --r: -6deg; --land: calc(100% - 52px);"></span>
            <span class="bag-drop" style="--x: 62%; --dur: 0.51s; --delay: 0.14s; --r: 7deg; --land: calc(100% - 55px);"></span>
            <span class="bag-drop" style="--x: 80%; --dur: 0.55s; --delay: 0.43s; --r: -5deg; --land: calc(100% - 53px);"></span>
            <span class="bag-drop" style="--x: 17%; --dur: 0.53s; --delay: 0.58s; --r: 6deg; --land: calc(100% - 76px);"></span>
            <span class="bag-drop" style="--x: 35%; --dur: 0.5s; --delay: 0.69s; --r: -4deg; --land: calc(100% - 78px);"></span>
            <span class="bag-drop" style="--x: 53%; --dur: 0.57s; --delay: 0.82s; --r: 8deg; --land: calc(100% - 74px);"></span>
            <span class="bag-drop" style="--x: 71%; --dur: 0.52s; --delay: 0.95s; --r: -6deg; --land: calc(100% - 79px);"></span>
            <span class="bag-drop" style="--x: 89%; --dur: 0.55s; --delay: 1.08s; --r: 5deg; --land: calc(100% - 75px);"></span>
          </div>
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
