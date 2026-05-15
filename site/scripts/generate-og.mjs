// OG image generator. Renders an inline HTML (1200×630, light mode) with the
// home hero headline on the left and an iPhone mockup of the Driver Home
// screen on the right. Re-run after content changes:  `node scripts/generate-og.mjs`.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'og-image.png');
const logoPath = path.join(publicDir, 'logo', 'ios-icon-iOS-Default.png');
const logoDataUrl = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

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
    top: -180px; left: 50%; transform: translateX(-50%);
    width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,92,232,0.06) 0%, transparent 60%);
  }
  .glow-b {
    position: absolute;
    bottom: -120px; right: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(52,199,89,0.05) 0%, transparent 60%);
  }
  .wrap {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 56px;
    align-items: start;
    height: 100%;
    padding: 36px 70px 60px;
  }

  /* === Left column — logo + headline, anchored top === */
  .left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
  }
  .logo-row { display: flex; align-items: center; gap: 10px; }
  .logo-mark {
    width: 56px;
    height: 56px;
    border-radius: 22%;
    display: block;
  }
  .logo-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #005CE8;
    line-height: 1;
  }
  .headline {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 72px;
    font-weight: 700;
    line-height: 1.06;
    letter-spacing: -2.8px;
    color: #1D1D1F;
  }
  .headline .gradient {
    background: linear-gradient(90deg, #005CE8 0%, #3380FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-bottom: 8px;
  }

  /* === Right column — iPhone mockup === */
  .phone {
    width: 320px;
    height: calc(320px * 19 / 9);
    margin: 0 auto;
    border-radius: 50px;
    padding: 8px;
    background: linear-gradient(180deg, #1f1f24 0%, #0a0a0b 60%, #1a1a1f 100%);
    box-shadow:
      0 30px 80px -20px rgba(0, 0, 0, 0.35),
      0 12px 30px -12px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1.5px rgba(255, 255, 255, 0.08);
    position: relative;
  }
  .screen {
    width: 100%;
    height: 100%;
    border-radius: 42px;
    background: #F5F5F7;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .island {
    position: absolute;
    top: 11px; left: 50%; transform: translateX(-50%);
    width: 100px; height: 26px;
    background: #0a0a0b;
    border-radius: 999px;
    z-index: 10;
  }
  .statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px 8px;
    font-family: 'DM Sans', sans-serif;
    color: #0a0a0b;
    font-size: 13px;
    font-weight: 600;
  }
  .statusbar-icons { display: inline-flex; align-items: center; gap: 6px; }
  .content {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
    padding: 14px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .dh-hero {
    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  }
  .dh-hero-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .dh-eyebrow { font-size: 12px; color: #4b5563; margin-bottom: 2px; }
  .dh-h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #111827;
    letter-spacing: -0.4px;
    line-height: 1.15;
  }
  .dh-orb {
    width: 42px; height: 42px;
    border-radius: 999px;
    background: #3b82f6;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 14px rgba(59,130,246,0.4);
  }
  .dh-cta {
    width: 100%;
    background: #2563eb;
    color: white;
    border-radius: 12px;
    padding: 13px 16px;
    font-size: 14.5px;
    font-weight: 600;
    text-align: center;
    letter-spacing: -0.1px;
  }
  .dh-amber {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .dh-amber-icon { color: #d97706; flex-shrink: 0; margin-top: 1px; }
  .dh-amber-label { font-size: 12px; font-weight: 500; color: #78350f; }
  .dh-amber-big {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #78350f;
    line-height: 1.1;
  }
  .dh-amber-sub { font-size: 11px; color: #92400e; margin-top: 2px; }
  .dh-section { font-size: 12.5px; font-weight: 600; color: #374151; margin-bottom: 6px; }
  .dh-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .dh-action {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 500;
    color: #111827;
    text-align: center;
  }
  .nav {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 10px 4px 16px;
    flex-shrink: 0;
  }
  .nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 6px 4px;
    border-radius: 12px;
    color: #6b7280;
  }
  .tab.active { color: #2563eb; background: #eff6ff; }
  .tab-label { font-size: 10.5px; font-weight: 500; letter-spacing: -0.05px; }
  .tab.active .tab-label { font-weight: 600; }
  .home-ind {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 4px;
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
    <!-- Left — logo + headline, vertically centered -->
    <div class="left">
      <div class="logo-row">
        <img class="logo-mark" src="${logoDataUrl}" alt="" />
        <span class="logo-text">BusiKM</span>
      </div>

      <h1 class="headline">
        Europejski system integrujący<br>
        <span class="gradient">transport i&nbsp;księgowość</span>
      </h1>
    </div>

    <!-- Right — iPhone mockup with Driver Home screen -->
    <div class="phone">
      <div class="screen">
        <div class="island"></div>
        <div class="statusbar">
          <span>9:41</span>
          <span class="statusbar-icons">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="2.5" height="4" rx="0.5"/><rect x="4" y="4" width="2.5" height="6" rx="0.5"/><rect x="8" y="2" width="2.5" height="8" rx="0.5"/><rect x="12" y="0" width="2.5" height="10" rx="0.5"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 3.5C2.7 1.8 4.7 1 7 1s4.3.8 6 2.5"/><path d="M3 5.5C4.1 4.4 5.5 4 7 4s2.9.4 4 1.5"/><path d="M5 7.5C5.6 7 6.3 6.8 7 6.8s1.4.2 2 .7"/><circle cx="7" cy="9" r="0.8" fill="currentColor"/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" stroke-opacity="0.55"/><rect x="2" y="2" width="16" height="7" rx="1.2" fill="currentColor"/><rect x="22.5" y="3.5" width="1.2" height="4" rx="0.5" fill="currentColor" fill-opacity="0.55"/></svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </div>
            </div>
            <div class="dh-cta">Rozpocznij nową trasę</div>
          </div>

          <div class="dh-amber">
            <svg class="dh-amber-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <p class="dh-amber-label">Czas pracy dzisiaj</p>
              <p class="dh-amber-big">6h 23min</p>
              <p class="dh-amber-sub">Pozostało 1h 37min do limitu</p>
            </div>
          </div>

          <div>
            <p class="dh-section">Szybkie akcje</p>
            <div class="dh-actions">
              <div class="dh-action">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3.586l-2-2H10.586l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>Zeskanuj paragon</span>
              </div>
              <div class="dh-action">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Historia tras</span>
              </div>
            </div>
          </div>
        </div>

        <div class="nav">
          <div class="nav-grid">
            <div class="tab active">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span class="tab-label">Start</span>
            </div>
            <div class="tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
              <span class="tab-label">Trasa</span>
            </div>
            <div class="tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3.586l-2-2H10.586l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span class="tab-label">Paragony</span>
            </div>
            <div class="tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span class="tab-label">Konto</span>
            </div>
          </div>
        </div>

        <div class="home-ind"></div>
      </div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`OG image saved to ${outputPath}`);
} finally {
  await browser.close();
}
