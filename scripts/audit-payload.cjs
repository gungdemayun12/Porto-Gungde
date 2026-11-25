const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.AUDIT_URL || 'http://localhost:5200/';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const lines = [];

  for (const mobile of [true, false]) {
    const page = await browser.newPage();
    await page.setViewport({
      width: mobile ? 390 : 1440,
      height: mobile ? 844 : 900,
      deviceScaleFactor: mobile ? 3 : 1,
      isMobile: mobile,
      hasTouch: mobile,
    });
    const client = await page.createCDPSession();
    await client.send('Network.enable');
    const sizes = new Map();
    const meta = new Map();
    client.on('Network.responseReceived', (e) => meta.set(e.requestId, e.response.url));
    client.on('Network.loadingFinished', (e) => {
      const url = meta.get(e.requestId);
      if (url) sizes.set(url, e.encodedDataLength);
    });

    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
    // Desktop memuat Three.js setelah idle + IntersectionObserver; beri waktu cukup.
    await new Promise((r) => setTimeout(r, mobile ? 5000 : 12000));

    const rows = [...sizes.entries()].sort((a, b) => b[1] - a[1]);
    const total = rows.reduce((a, [, b]) => a + b, 0);
    const three = rows
      .filter(([u]) => /three-vendor|Lanyard-|\.glb/.test(u))
      .reduce((a, [, b]) => a + b, 0);

    lines.push(`\n=== ${mobile ? 'MOBILE 390' : 'DESKTOP 1440'} ===`);
    lines.push(`total: ${(total / 1024).toFixed(0)} KB across ${rows.length} requests`);
    lines.push(`three.js + lanyard: ${(three / 1024).toFixed(0)} KB`);
    lines.push('top 8:');
    rows.slice(0, 8).forEach(([u, b]) =>
      lines.push(`  ${(b / 1024).toFixed(0).padStart(6)} KB  ${u.split('/').pop().slice(0, 60)}`)
    );

    await page.close();
  }

  await browser.close();
  fs.writeFileSync('scripts/_payload-report.txt', lines.join('\n') + '\n', 'utf8');
})();
