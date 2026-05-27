// OG image generator. Renders an inline HTML (1200×630, light mode) with the
// e-TMS positioning headline on the left and a layered web+mobile mockup on
// the right (owner dashboard browser + iPhone Driver Home peeking out of the
// bottom-right corner). Re-run after content changes:
//   node scripts/generate-og.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'og-image.png');
const logoPath = path.join(publicDir, 'logo', 'ios-icon-iOS-Default.png');
const dashboardPath = path.join(publicDir, 'screens', 'owner-dashboard-web.png');
const logoDataUrl = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
const dashboardDataUrl = `data:image/png;base64,${fs.readFileSync(dashboardPath).toString('base64')}`;

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; -webkit-font-smoothing: antialiased; }
  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #ffffff;
    color: #1D1D1F;
    position: relative;
    overflow: hidden;
  }
  /* Soft glows — same vibe as home hero */
  .glow-a {
    position: absolute;
    top: -200px; left: 30%; transform: translateX(-50%);
    width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,92,232,0.07) 0%, transparent 60%);
  }
  .glow-b {
    position: absolute;
    bottom: -160px; right: -120px;
    width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle, rgba(52,199,89,0.05) 0%, transparent 60%);
  }
  .wrap {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 540px;
    gap: 36px;
    align-items: center;
    height: 100%;
    padding: 24px 60px 24px 70px;
  }

  /* === Left column — logo + headline + eyebrow chip === */
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 22px;
    margin-top: -20px;
  }
  .logo-row { display: flex; align-items: center; gap: 10px; }
  .logo-mark {
    width: 52px;
    height: 52px;
    border-radius: 22%;
    display: block;
  }
  .logo-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #005CE8;
    line-height: 1;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    align-self: flex-start;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(0,92,232,0.18);
    background: rgba(0,92,232,0.05);
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #005CE8;
  }
  .eyebrow-dot {
    width: 6px; height: 6px; border-radius: 999px; background: #005CE8;
  }
  .headline {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 70px;
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: -2.6px;
    color: #1D1D1F;
  }
  .headline .gradient {
    background: linear-gradient(90deg, #005CE8 0%, #3380FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-bottom: 6px;
  }
  .subline {
    font-family: 'DM Sans', sans-serif;
    font-size: 19px;
    font-weight: 500;
    color: #4B5563;
    letter-spacing: -0.2px;
    line-height: 1.4;
    max-width: 520px;
  }
  .subline strong { color: #1D1D1F; font-weight: 600; }

  /* === Right column — layered web + phone mockup === */
  .stage {
    position: relative;
    width: 540px;
    height: 540px;
  }

  /* Browser frame (owner dashboard) */
  .browser {
    position: absolute;
    top: 60px;
    left: -10px;
    width: 470px;
    border-radius: 16px;
    background: #ffffff;
    overflow: hidden;
    box-shadow:
      0 30px 60px -22px rgba(0, 30, 80, 0.28),
      0 12px 28px -14px rgba(0, 30, 80, 0.18),
      0 0 0 1px rgba(0, 0, 0, 0.06);
  }
  .browser-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 36px;
    padding: 0 14px;
    background: linear-gradient(180deg, #fbfbfd 0%, #f3f4f7 100%);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  .traffic { display: flex; gap: 6px; }
  .traffic span {
    width: 11px; height: 11px; border-radius: 999px; display: block;
  }
  .traffic .r { background: #FF5F57; }
  .traffic .y { background: #FEBC2E; }
  .traffic .g { background: #28C840; }
  .url {
    flex: 1;
    height: 22px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #6b7280;
    letter-spacing: -0.1px;
  }
  .url svg { color: #34C759; }
  .browser-body {
    display: block;
    width: 100%;
    background: #ffffff;
  }
  .browser-body img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* iPhone mockup — overlapping bottom-right of the browser */
  .phone {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 210px;
    height: calc(210px * 19 / 9);
    border-radius: 36px;
    padding: 6px;
    background: linear-gradient(180deg, #1f1f24 0%, #0a0a0b 60%, #1a1a1f 100%);
    box-shadow:
      0 38px 70px -20px rgba(0, 0, 0, 0.38),
      0 14px 32px -14px rgba(0, 0, 0, 0.28),
      inset 0 0 0 1.2px rgba(255, 255, 255, 0.08);
  }
  .screen {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: #F5F5F7;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .island {
    position: absolute;
    top: 8px; left: 50%; transform: translateX(-50%);
    width: 70px; height: 18px;
    background: #0a0a0b;
    border-radius: 999px;
    z-index: 10;
  }
  .statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px 6px;
    font-family: 'DM Sans', sans-serif;
    color: #0a0a0b;
    font-size: 10px;
    font-weight: 600;
  }
  .statusbar-icons { display: inline-flex; align-items: center; gap: 4px; }
  .content {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
    padding: 8px 11px 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dh-hero {
    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
    border: 1px solid #e5e7eb;
    border-radius: 13px;
    padding: 11px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  }
  .dh-hero-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .dh-eyebrow { font-size: 9px; color: #4b5563; margin-bottom: 1px; }
  .dh-h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #111827;
    letter-spacing: -0.3px;
    line-height: 1.1;
  }
  .dh-orb {
    width: 30px; height: 30px;
    border-radius: 999px;
    background: #3b82f6;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 5px 11px rgba(59,130,246,0.4);
  }
  .dh-cta {
    width: 100%;
    background: #2563eb;
    color: white;
    border-radius: 9px;
    padding: 9px 12px;
    font-size: 10.5px;
    font-weight: 600;
    text-align: center;
    letter-spacing: -0.05px;
  }
  .dh-amber {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 9px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .dh-amber-icon { color: #d97706; flex-shrink: 0; margin-top: 1px; }
  .dh-amber-label { font-size: 9px; font-weight: 500; color: #78350f; }
  .dh-amber-big {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: #78350f;
    line-height: 1.05;
  }
  .dh-amber-sub { font-size: 8.5px; color: #92400e; margin-top: 1px; }
  .dh-section { font-size: 9.5px; font-weight: 600; color: #374151; margin-bottom: 5px; }
  .dh-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .dh-action {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 9px;
    padding: 9px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 8.5px;
    font-weight: 500;
    color: #111827;
    text-align: center;
  }
  .nav {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 7px 4px 10px;
    flex-shrink: 0;
  }
  .nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 4px 2px;
    border-radius: 9px;
    color: #6b7280;
  }
  .tab.active { color: #2563eb; background: #eff6ff; }
  .tab-label { font-size: 8px; font-weight: 500; letter-spacing: -0.05px; }
  .tab.active .tab-label { font-weight: 600; }
  .home-ind {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 78px;
    height: 3px;
    background: #0a0a0b;
    border-radius: 999px;
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="glow-a"></div>
  <div class="glow-b"></div>

  <div class="wrap">
    <!-- Left — logo + headline + subline -->
    <div class="left">
      <div class="logo-row">
        <img class="logo-mark" src="${logoDataUrl}" alt="" />
        <span class="logo-text">BusiKM</span>
      </div>

      <span class="eyebrow">
        <span class="eyebrow-dot"></span>
        Pierwszy e-TMS · nie dla TIRów
      </span>

      <h1 class="headline">
        e-TMS dla firm<br>
        z busami<br>
        <span class="gradient">2,5–3,5&nbsp;t</span>
      </h1>

      <p class="subline">
        <strong>Transport · AETR · księgowość</strong> w jednym narzędziu. Eksport do Insert, Comarch, Symfonia, KSeF.
      </p>
    </div>

    <!-- Right — layered web + phone mockup -->
    <div class="stage">
      <!-- Browser with owner dashboard screenshot -->
      <div class="browser">
        <div class="browser-bar">
          <div class="traffic">
            <span class="r"></span><span class="y"></span><span class="g"></span>
          </div>
          <div class="url">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            app.busikm.pl/dashboard
          </div>
        </div>
        <div class="browser-body">
          <img src="${dashboardDataUrl}" alt="" />
        </div>
      </div>

      <!-- iPhone mockup — Driver Home, peeking out of browser bottom-right -->
      <div class="phone">
        <div class="screen">
          <div class="island"></div>
          <div class="statusbar">
            <span>9:41</span>
            <span class="statusbar-icons">
              <svg width="12" height="8" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="2.5" height="4" rx="0.5"/><rect x="4" y="4" width="2.5" height="6" rx="0.5"/><rect x="8" y="2" width="2.5" height="8" rx="0.5"/><rect x="12" y="0" width="2.5" height="10" rx="0.5"/></svg>
              <svg width="10" height="7" viewBox="0 0 14 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 3.5C2.7 1.8 4.7 1 7 1s4.3.8 6 2.5"/><path d="M3 5.5C4.1 4.4 5.5 4 7 4s2.9.4 4 1.5"/><path d="M5 7.5C5.6 7 6.3 6.8 7 6.8s1.4.2 2 .7"/><circle cx="7" cy="9" r="0.8" fill="currentColor"/></svg>
              <svg width="18" height="8" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" stroke-opacity="0.55"/><rect x="2" y="2" width="16" height="7" rx="1.2" fill="currentColor"/><rect x="22.5" y="3.5" width="1.2" height="4" rx="0.5" fill="currentColor" fill-opacity="0.55"/></svg>
            </span>
          </div>

          <div class="content">
            <div class="dh-hero">
              <div class="dh-hero-row">
                <div>
                  <p class="dh-eyebrow">Status trasy</p>
                  <p class="dh-h1">Gotowy do jazdy</p>
                </div>
                <div class="dh-orb">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>
              <div class="dh-cta">Rozpocznij nową trasę</div>
            </div>

            <div class="dh-amber">
              <svg class="dh-amber-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div>
                <p class="dh-amber-label">Czas pracy AETR</p>
                <p class="dh-amber-big">6h 23min</p>
                <p class="dh-amber-sub">Pozostało 1h 37min</p>
              </div>
            </div>

            <div>
              <p class="dh-section">Szybkie akcje</p>
              <div class="dh-actions">
                <div class="dh-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3.586l-2-2H10.586l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <span>Paragon</span>
                </div>
                <div class="dh-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Historia</span>
                </div>
              </div>
            </div>
          </div>

          <div class="nav">
            <div class="nav-grid">
              <div class="tab active">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span class="tab-label">Start</span>
              </div>
              <div class="tab">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                <span class="tab-label">Trasa</span>
              </div>
              <div class="tab">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3.586l-2-2H10.586l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span class="tab-label">Paragony</span>
              </div>
              <div class="tab">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span class="tab-label">Konto</span>
              </div>
            </div>
          </div>

          <div class="home-ind"></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    // deviceScaleFactor MUST be 1 — WhatsApp validates og:image:width/height
    // against the actual file dimensions and enforces a <600 KB filesize limit.
    // Rendering @2x produced 2400×1260 / ~670 KB which WhatsApp rejected,
    // falling back to apple-touch-icon.
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: outputPath, type: 'png' });
  const sizeKb = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`OG image saved to ${outputPath} (${sizeKb} KB, 1200×630)`);
} finally {
  await browser.close();
}
