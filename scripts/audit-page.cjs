/**
 * audit-page.cjs — memeriksa apakah halaman benar-benar ter-render tanpa
 * error konsol, dan mencatat metrik beban pada viewport mobile & desktop.
 */
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.AUDIT_URL || 'http://localhost:5199/';

const DEVICES = [
  { key: 'mobile', width: 390, height: 844, dpr: 3, mobile: true },
  { key: 'desktop', width: 1440, height: 900, dpr: 1, mobile: false },
];

(async () => {
  const out = [];
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const device of DEVICES) {
    const page = await browser.newPage();
    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: device.dpr,
      isMobile: device.mobile,
      hasTouch: device.mobile,
    });

    const errors = [];
    const warnings = [];
    const requests = [];

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') errors.push(text);
      else if (type === 'warning') warnings.push(text);
    });
    page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message));
    page.on('requestfailed', (req) =>
      errors.push(`REQFAIL ${req.url()} ${req.failure()?.errorText}`)
    );
    page.on('response', (res) => {
      const url = res.url();
      if (!url.includes('/node_modules/') && !url.includes('@vite') && !url.includes('@react-refresh')) {
        requests.push({ url, status: res.status(), type: res.request().resourceType() });
      }
    });

    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));

    const info = await page.evaluate(() => {
      const root = document.getElementById('root');
      const hero = document.querySelector('#hero');
      const nav = document.querySelector('header nav');
      const h1 = document.querySelector('h1');
      const style = h1 ? getComputedStyle(h1) : null;
      return {
        rootChildren: root ? root.children.length : 0,
        hasHero: Boolean(hero),
        heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : 0,
        hasNav: Boolean(nav),
        h1Text: h1 ? h1.textContent.trim().slice(0, 80) : null,
        h1Font: style ? style.fontFamily : null,
        bodyFont: getComputedStyle(document.body).fontFamily,
        scrollHeight: document.documentElement.scrollHeight,
        horizontalOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        projectsAnchor: Boolean(document.getElementById('projects')),
        imagesTotal: document.images.length,
        imagesBroken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
        fontFaces: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.weight + ' ' + f.style),
      };
    });

    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paints = performance.getEntriesByType('paint');
      const fcp = paints.find((p) => p.name === 'first-contentful-paint');
      const resources = performance.getEntriesByType('resource').map((r) => ({
        name: r.name.split('/').pop(),
        type: r.initiatorType,
        kb: +(r.transferSize / 1024).toFixed(1),
        ms: Math.round(r.duration),
      }));
      return {
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
        load: Math.round(nav.loadEventEnd || 0),
        fcp: fcp ? Math.round(fcp.startTime) : null,
        resourceCount: resources.length,
        totalTransferKB: resources.reduce((a, r) => a + r.kb, 0),
        resources,
      };
    });

    out.push({ device: device.key, info, perf, errors, warnings: warnings.slice(0, 8), requests });

    // Scroll through the page to trigger lazy sections
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
    });
    await new Promise((r) => setTimeout(r, 1500));

    const afterScroll = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      sections: ['hero', 'projects', 'about', 'arcade', 'experience', 'contact'].reduce(
        (acc, id) => ({ ...acc, [id]: Boolean(document.getElementById(id)) }),
        {}
      ),
      errorText: document.body.innerText.includes('Something went wrong') ||
        document.body.innerText.includes('Application error'),
      imagesBrokenAfter: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    }));

    out.push({ device: device.key, afterScroll, errorsAfterScroll: errors });

    await page.close();
  }

  await browser.close();

  const lines = [];
  lines.push('===== AUDIT RESULT =====');
  for (const entry of out) {
    if (entry.info) {
      lines.push(`\n--- ${entry.device} ---`);
      lines.push(`hero: ${entry.info.hasHero} h=${entry.info.heroHeight}  nav=${entry.info.hasNav}  rootChildren=${entry.info.rootChildren}`);
      lines.push(`h1: ${entry.info.h1Text}`);
      lines.push(`fonts: h1="${entry.info.h1Font}"`);
      lines.push(`body="${entry.info.bodyFont}"`);
      lines.push(`scrollHeight: ${entry.info.scrollHeight}  hOverflow: ${entry.info.horizontalOverflow}px`);
      lines.push(`images: ${entry.info.imagesTotal} total, ${entry.info.imagesBroken} broken`);
      lines.push(`loaded font faces: ${entry.info.fontFaces.length}`);
      entry.info.fontFaces.slice(0, 20).forEach((f) => lines.push('   ' + f));
      lines.push(`perf: FCP=${entry.perf.fcp}ms load=${entry.perf.load}ms resources=${entry.perf.resourceCount} transfer=${entry.perf.totalTransferKB}KB`);
      lines.push(`errors: ${entry.errors.length}`);
      entry.errors.slice(0, 10).forEach((e) => lines.push('   ERR ' + e.slice(0, 200)));
      lines.push(`warnings: ${entry.warnings.length}`);
      entry.warnings.slice(0, 6).forEach((w) => lines.push('   WARN ' + w.slice(0, 160)));
    } else {
      lines.push(`\n--- ${entry.device} (after scroll) ---`);
      lines.push(`sections: ${JSON.stringify(entry.afterScroll.sections)}`);
      lines.push(`scrollHeight: ${entry.afterScroll.scrollHeight}`);
      lines.push(`broken images: ${entry.afterScroll.imagesBrokenAfter}`);
      lines.push(`errors total: ${entry.errorsAfterScroll.length}`);
      entry.errorsAfterScroll.slice(0, 10).forEach((e) => lines.push('   ERR ' + e.slice(0, 200)));
    }
  }

  fs.writeFileSync('scripts/_audit-report.txt', lines.join('\n') + '\n', 'utf8');
})();
