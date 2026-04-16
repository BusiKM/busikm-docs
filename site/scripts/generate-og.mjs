import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background: linear-gradient(135deg, #FAFBFF 0%, #F0F4FF 100%);
    position: relative; overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .glow {
    position: absolute; top: -100px; left: 400px;
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,92,232,0.08) 0%, transparent 70%);
  }
  .glow2 {
    position: absolute; bottom: -50px; right: -50px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(52,199,89,0.06) 0%, transparent 70%);
  }
  .content { position: relative; z-index: 1; padding: 60px 80px; height: 100%; display: flex; flex-direction: column; }
  .logo-row { display: flex; align-items: center; gap: 14px; margin-bottom: 50px; }
  .logo-mark { width: 48px; height: 54px; }
  .logo-text { font-size: 36px; letter-spacing: -1px; color: #1D1D1F; }
  .logo-text span { font-weight: 800; color: #005CE8; }
  .headline { font-size: 58px; font-weight: 700; color: #1D1D1F; letter-spacing: -2.5px; line-height: 1.1; margin-bottom: 20px; }
  .subtitle { font-size: 22px; color: #6E6E73; line-height: 1.5; margin-bottom: auto; max-width: 650px; }
  .stats { display: flex; gap: 16px; margin-bottom: 10px; }
  .stat { padding: 10px 20px; border-radius: 20px; font-size: 14px; font-weight: 700; }
  .stat-blue { background: rgba(0,92,232,0.08); color: #005CE8; }
  .stat-green { background: rgba(52,199,89,0.08); color: #34C759; }
  .stat-red { background: rgba(255,59,48,0.08); color: #FF3B30; }
  .domain { font-size: 16px; color: #86868B; letter-spacing: 0.5px; margin-top: 12px; }
  .bottom-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: #005CE8; }
  .route-bg {
    position: absolute; right: 40px; top: 50%; transform: translateY(-50%);
    opacity: 0.08;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="glow2"></div>

  <!-- Decorative route -->
  <svg class="route-bg" width="340" height="400" viewBox="0 0 340 400" fill="none">
    <path d="M 30 380 C 40 340 60 280 80 240 C 100 200 130 170 170 150 C 210 130 240 125 270 110 C 300 95 320 70 330 40" stroke="#005CE8" stroke-width="4" stroke-linecap="round"/>
    <circle cx="30" cy="380" r="10" fill="none" stroke="#005CE8" stroke-width="3"/>
    <circle cx="330" cy="40" r="14" fill="#005CE8"/>
    <circle cx="326" cy="35" r="4" fill="white" opacity="0.3"/>
    <path d="M 120 390 C 160 350 200 300 250 270 C 300 240 320 235 340 230" stroke="#34C759" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  </svg>

  <div class="content">
    <div class="logo-row">
      <svg class="logo-mark" viewBox="0 0 36 40" fill="none">
        <circle cx="6" cy="32" r="4" fill="none" stroke="#005CE8" stroke-width="2.8"/>
        <path d="M 6 28 C 6 22 10 16 18 12 C 24 9 28 8 30 8" stroke="#005CE8" stroke-width="2.8" stroke-linecap="round" fill="none"/>
        <circle cx="30" cy="8" r="6" fill="#005CE8"/>
        <circle cx="28" cy="6" r="1.8" fill="white" opacity="0.35"/>
      </svg>
      <div class="logo-text"><span style="font-weight:500">Busi</span><span>KM</span></div>
    </div>
    <div class="headline">Kilometrówka,<br>która prowadzi się sama.</div>
    <div class="subtitle">Automatyczna ewidencja przebiegu pojazdów 2,5–3,5 t.<br>GPS + AI + eksport do FK. Zgodna z przepisami MF 2026.</div>
    <div class="stats">
      <div class="stat stat-blue">300 000 pojazdów</div>
      <div class="stat stat-green">80 000 firm</div>
      <div class="stat stat-red">kara do 30 000 zł</div>
    </div>
    <div class="domain">busikm.pl</div>
  </div>
  <div class="bottom-bar"></div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();
console.log(`OG image saved to ${outputPath}`);
