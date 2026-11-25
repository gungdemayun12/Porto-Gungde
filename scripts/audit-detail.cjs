const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.AUDIT_URL || 'http://localhost:5200';
const OUT = 'scripts/shots';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const lines = [];

  const cases = [
    { key: 'detail-desktop', url: '/projects/bali-play-golf', w: 1440, h: 900, dpr: 1, mobile: false },
    { key: 'detail-mobile', url: '/projects/bali-play-golf', w: 390, h: 844, dpr: 2, mobile: true },
    { key: 'detail-video', url: '/projects/absensi-online-qr-code', w: 1440, h: 900, dpr: 1, mobile: false },
    { key: 'hero-light', url: '/', w: 1440, h: 900, dpr: 1, mobile: false, light: true },
    { key: 'projects-light', url: '/', w: 1440, h: 900, dpr: 1, mobile: false, light: true, anchor: 'projects' },
    { key: 'mobile-menu', url: '/', w: 390, h: 844, dpr: 2, mobile: true, openMenu: true },
    { key: 'notfound', url: '/does-not-exist', w: 1440, h: 900, dpr: 1, mobile: false },
  ];

  for (const c of cases) {
    const page = await browser.newPage();
    await page.setViewport({ width: c.w, height: c.h, deviceScaleFactor: c.dpr, isMobile: c.mobile, hasTouch: c.mobile });

    const errors = [];
    page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });

    if (c.light) {
      await page.evaluateOnNewDocument(() => localStorage.setItem('theme', 'light'));
    }

    await page.goto(BASE + c.url, { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 2500));

    if (c.anchor) {
      await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), c.anchor);
      await new Promise((r) => setTimeout(r, 1200));
    }

    if (c.openMenu) {
      const btn = await page.$('header button[aria-label*="menu" i], header button[aria-label*="Menu"]');
      if (btn) {
        await btn.click();
        await new Promise((r) => setTimeout(r, 900));
      } else {
        lines.push('menu button not found');
      }
    }

    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim().slice(0, 60) || null,
      h2: document.querySelector('h2')?.textContent.trim().slice(0, 60) || null,
      brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
      imgCount: document.images.length,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      isDark: document.documentElement.classList.contains('dark'),
    }));

    await page.screenshot({ path: `${OUT}/${c.key}.png` });
    lines.push(`${c.key}: h1="${info.h1}" imgs=${info.imgCount} broken=${info.brokenImgs} dark=${info.isDark} errors=${errors.length}`);
    if (errors.length) errors.slice(0, 3).forEach((e) => lines.push('   ' + e.slice(0, 150)));
    await page.close();
  }

  await browser.close();
  fs.writeFileSync('scripts/_detail-report.txt', lines.join('\n') + '\n', 'utf8');
})();
