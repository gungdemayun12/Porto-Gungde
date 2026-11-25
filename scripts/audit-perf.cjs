const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.AUDIT_URL || 'http://localhost:5200/';

const CASES = [
  { key: 'mobile-390', width: 390, height: 844, dpr: 3, mobile: true },
  { key: 'mobile-360', width: 360, height: 800, dpr: 2, mobile: true },
  { key: 'tablet-768', width: 768, height: 1024, dpr: 2, mobile: true },
  { key: 'desktop-1440', width: 1440, height: 900, dpr: 1, mobile: false },
  { key: 'desktop-1920', width: 1920, height: 1080, dpr: 1, mobile: false },
];

(async () => {
  const lines = [];
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox'],
  });

  for (const c of CASES) {
    const page = await browser.newPage();
    await page.setViewport({
      width: c.width,
      height: c.height,
      deviceScaleFactor: c.dpr,
      isMobile: c.mobile,
      hasTouch: c.mobile,
    });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });

    let threeLoaded = false;
    page.on('response', (res) => {
      if (/three-vendor|Lanyard-/.test(res.url())) threeLoaded = true;
    });

    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 3500));

    const m = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const fcp = performance.getEntriesByType('paint').find((p) => p.name === 'first-contentful-paint');
      const hero = document.querySelector('#hero');
      const rect = hero ? hero.getBoundingClientRect() : null;
      const overflowEls = [];
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
          overflowEls.push(el.tagName + '.' + (el.className || '').toString().slice(0, 40));
        }
      });
      return {
        fcp: fcp ? Math.round(fcp.startTime) : null,
        dcl: Math.round(nav.domContentLoadedEventEnd || 0),
        load: Math.round(nav.loadEventEnd || 0),
        hOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        heroH: rect ? Math.round(rect.height) : 0,
        scrollH: document.documentElement.scrollHeight,
        overflowCount: overflowEls.length,
        overflowSample: overflowEls.slice(0, 5),
        hasCanvas: Boolean(document.querySelector('canvas')),
        hasStaticBadge: Boolean(document.querySelector('.static-badge')),
        ctas: [...document.querySelectorAll('#hero a, #hero button')].length,
        tapTargets: [...document.querySelectorAll('button, a')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.height < 40 && r.width < 40;
          })
          .length,
      };
    });

    lines.push(`\n--- ${c.key} (${c.width}x${c.height}) ---`);
    lines.push(
      `FCP ${m.fcp}ms · DCL ${m.dcl}ms · load ${m.load}ms · three.js loaded: ${threeLoaded}`
    );
    lines.push(
      `hero ${m.heroH}px · page ${m.scrollH}px · hOverflow ${m.hOverflow}px · overflowing els ${m.overflowCount}`
    );
    lines.push(
      `canvas: ${m.hasCanvas} · static-badge: ${m.hasStaticBadge} · hero CTAs: ${m.ctas} · small tap targets: ${m.tapTargets}`
    );
    if (m.overflowSample.length) lines.push(`  overflow: ${m.overflowSample.join(' | ')}`);
    lines.push(`errors: ${errors.length}${errors.length ? ' → ' + errors.slice(0, 3).join(' / ') : ''}`);

    await page.close();
  }

  await browser.close();
  fs.writeFileSync('scripts/_perf-report.txt', lines.join('\n') + '\n', 'utf8');
})();
