const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.AUDIT_URL || 'http://localhost:5200/';
const OUT = 'scripts/shots';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

  const shots = [
    { key: 'mobile-hero', w: 390, h: 844, dpr: 2, mobile: true, scrollTo: 0 },
    { key: 'mobile-projects', w: 390, h: 844, dpr: 2, mobile: true, anchor: 'projects' },
    { key: 'mobile-about', w: 390, h: 844, dpr: 2, mobile: true, anchor: 'about' },
    { key: 'mobile-contact', w: 390, h: 844, dpr: 2, mobile: true, anchor: 'contact' },
    { key: 'desktop-hero', w: 1440, h: 900, dpr: 1, mobile: false, scrollTo: 0 },
    { key: 'desktop-projects', w: 1440, h: 900, dpr: 1, mobile: false, anchor: 'projects' },
    { key: 'desktop-about', w: 1440, h: 900, dpr: 1, mobile: false, anchor: 'about' },
    { key: 'desktop-experience', w: 1440, h: 900, dpr: 1, mobile: false, anchor: 'experience' },
    { key: 'desktop-contact', w: 1440, h: 900, dpr: 1, mobile: false, anchor: 'contact' },
  ];

  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: s.dpr, isMobile: s.mobile, hasTouch: s.mobile });
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 2200));

    if (s.anchor) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, s.anchor);
    } else if (s.scrollTo !== undefined) {
      await page.evaluate((y) => window.scrollTo(0, y), s.scrollTo);
    }
    await new Promise((r) => setTimeout(r, 1800));
    await page.screenshot({ path: `${OUT}/${s.key}.png` });
    await page.close();
  }

  await browser.close();
  console.log('done');
})();
