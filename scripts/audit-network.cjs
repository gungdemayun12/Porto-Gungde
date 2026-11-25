const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.AUDIT_URL || 'http://localhost:5199/';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

  // Track actual bytes over the wire via CDP
  const client = await page.createCDPSession();
  await client.send('Network.enable');
  const sizes = new Map();
  const mime = new Map();

  client.on('Network.responseReceived', (e) => {
    mime.set(e.requestId, { url: e.response.url, type: e.type, mime: e.response.mimeType, status: e.response.status });
  });
  client.on('Network.loadingFinished', (e) => {
    const info = mime.get(e.requestId);
    if (info && !info.url.includes('@vite') && !info.url.includes('@react-refresh')) {
      sizes.set(info.url, { ...info, bytes: e.encodedDataLength });
    }
  });

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3000));

  const rows = [...sizes.values()].sort((a, b) => b.bytes - a.bytes);
  const total = rows.reduce((a, r) => a + r.bytes, 0);

  const lines = [];
  lines.push(`total bytes: ${(total / 1024 / 1024).toFixed(2)} MB (${rows.length} requests)`);
  lines.push('top 20 by size:');
  rows.slice(0, 20).forEach((r) =>
    lines.push(`  ${(r.bytes / 1024).toFixed(0).padStart(8)} KB  ${r.type.padEnd(9)} ${r.status} ${r.url.replace('http://localhost:5199', '').slice(0, 90)}`)
  );

  const byType = {};
  rows.forEach((r) => {
    byType[r.type] = (byType[r.type] || 0) + r.bytes;
  });
  lines.push('\nby resource type:');
  Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([t, b]) => lines.push(`  ${t.padEnd(12)} ${(b / 1024).toFixed(0)} KB`));

  fs.writeFileSync('scripts/_network-report.txt', lines.join('\n') + '\n', 'utf8');
  await browser.close();
})();
