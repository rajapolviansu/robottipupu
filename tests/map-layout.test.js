// Ajo: node tests/map-layout.test.js  (vaatii playwrightin)
const { chromium } = require("playwright");
const path = require("path");
const assert = require("assert");

const url = "file://" + path.resolve(__dirname, "../index.html");
const sizes = [[360, 740], [390, 844], [412, 915], [768, 1024], [1280, 800]];

const overlap = (a, b) =>
  a.x < b.x + b.width - 1 && b.x < a.x + a.width - 1 && a.y < b.y + b.height - 1 && b.y < a.y + a.height - 1;

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const [width, height] of sizes) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(url);
    const pins = page.locator("#map .pin");
    const n = await pins.count();
    try {
      assert.strictEqual(n, 7, "7 maanosaa");
      const boxes = [];
      for (let i = 0; i < n; i++) boxes.push(await pins.nth(i).boundingBox());
      for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
          assert(!overlap(boxes[i], boxes[j]), `${width}px: maanosat ${i} ja ${j} ovat päällekkäin`);
      const map = await page.locator("#map").boundingBox();
      boxes.forEach((b, i) => assert(b.x >= map.x - 1 && b.x + b.width <= map.x + map.width + 1 &&
        b.y >= map.y - 1 && b.y + b.height <= map.y + map.height + 1, `${width}px: maanosa ${i} karttaruudun ulkopuolella`));
      const scroll = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
      assert(scroll, `${width}px: vaakasuuntainen vieritys`);
      // jokaista maanosaa voi klikata
      await pins.last().click();
      assert(await page.locator("#modal:not(.hidden)").count() === 1, `${width}px: maanosan klikkaus ei avaa korttia`);
      console.log(`ok   ${width}x${height}`);
    } catch (e) { failed++; console.error(`FAIL ${width}x${height}: ${e.message}`); }
    await page.close();
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
