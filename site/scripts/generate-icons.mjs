import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const html = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; }
  body { width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; background: #005CE8; border-radius: 36px; }
</style></head>
<body>
  <svg width="100" height="110" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="32" r="4" fill="none" stroke="white" stroke-width="2.8"/>
    <path d="M 6 28 C 6 22 10 16 18 12 C 24 9 28 8 30 8" stroke="white" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <circle cx="30" cy="8" r="6" fill="white"/>
    <circle cx="28" cy="6" r="1.8" fill="#005CE8" opacity="0.3"/>
  </svg>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: path.join(publicDir, 'apple-touch-icon.png'), type: 'png' });
await browser.close();
console.log('apple-touch-icon.png generated');
