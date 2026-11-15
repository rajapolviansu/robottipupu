// Ajo: node tests/game.test.js  (vaatii playwrightin)
// Pelaa jokaisen aiheen läpi usealla näytön koolla ja tarkistaa, ettei asettelu rikkoonnu.
const { chromium } = require("playwright");
const path = require("path");
const assert = require("assert");

const url = "file://" + path.resolve(__dirname, "../index.html");
const sizes = [[360, 740], [412, 915], [768, 1024], [1280, 800]];
const D = (() => { global.window = {}; require("../data.js"); return global.window.NUUTTI_DATA; })();

// Data on kunnossa
D.topics.forEach((t) => t.quiz.forEach((q, i) => {
  const id = `${t.id}#${i + 1}`;
  assert(q.why, `${id}: puuttuu selitys`);
  if (q.t === "choice") assert(q.a.length >= 2 && q.correct >= 0 && q.correct < q.a.length, `${id}: vaihtoehdot`);
  if (q.t === "compare") assert(q.items.length === 2 && q.items[0].v !== q.items[1].v, `${id}: vertailu`);
  if (q.t === "order") assert(new Set(q.items.map((x) => x.v)).size === q.items.length, `${id}: järjestys`);
  if (q.t === "map") assert(D.finland.regions.some((r) => r.id === q.correct), `${id}: tuntematon alue`);
}));

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const [width, height] of sizes) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url);
    try {
      assert.strictEqual(await page.locator(".topic").count(), D.topics.length, "aihekortit");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "vaakasuuntainen vieritys");
      for (let ti = 0; ti < D.topics.length; ti++) {
        await page.locator(".topic").nth(ti).click();
        await page.click("#go");
        for (const q of D.topics[ti].quiz) {
          if (q.t === "choice") {
            await page.locator(".opts button").first().click();
          } else if (q.t === "compare") {
            const best = q.items.reduce((a, b) => (b.v > a.v ? b : a)).n;
            await page.locator(".opts button", { hasText: best }).click();
          } else if (q.t === "order") {
            for (const it of [...q.items].sort((a, b) => a.v - b.v))
              await page.locator(".opts button:not([disabled])", { hasText: it.n }).first().click();
            assert.strictEqual(await page.locator(".opts button.right").count(), q.items.length, "järjestys oikein");
          } else if (q.t === "map") {
            await page.locator(`.reg[data-id="${q.correct}"]`).dispatchEvent("click");
            assert.strictEqual(await page.locator(".reg.right").count(), 1, "kartta");
          }
          assert((await page.locator("#fb").innerText()).length > 20, "selitys näkyy");
          const box = await page.locator("#modalCard").boundingBox();
          assert(box.x >= 0 && box.x + box.width <= width + 1, "kortti ylittää näytön");
          await page.click("#next button");
        }
        await page.click(".reward button");
      }
      assert.strictEqual(await page.locator("#friendCount").innerText(), String(D.topics.length), "ystävät");
      assert(errors.length === 0, "virheitä: " + errors.join("; "));
      console.log(`ok   ${width}x${height}`);
    } catch (e) { failed++; console.error(`FAIL ${width}x${height}: ${e.message}`); }
    await page.close();
  }
  // Pokaali: kaikki muut oikein tallennettuna, viimeinen aihe pelataan läpi
  try {
    const page = await browser.newPage({ viewport: { width: 412, height: 915 } });
    const save = { carrots: 0, done: {}, seenQ: {}, rightQ: {} };
    D.topics.forEach((t) => t.quiz.forEach((_, i) => { save.rightQ[t.id + ":" + i] = true; save.seenQ[t.id + ":" + i] = true; }));
    await page.addInitScript((v) => { if (!localStorage.getItem("nuutti-save-v2")) localStorage.setItem("nuutti-save-v2", JSON.stringify(v)); }, save);
    await page.goto(url);
    assert(await page.locator("#trophy").isHidden(), "pokaali piilossa ennen suoritusta");
    await page.locator(".topic").first().click();
    await page.click("#go");
    for (const q of D.topics[0].quiz) { // vastaukset voivat olla väärin, tallennus on jo täynnä
      if (q.t === "choice") await page.locator(".opts button").first().click();
      else if (q.t === "compare") await page.locator(".opts button").first().click();
      else if (q.t === "order") for (const it of [...q.items].sort((a, b) => a.v - b.v)) await page.locator(".opts button:not([disabled])", { hasText: it.n }).first().click();
      else if (q.t === "map") await page.locator(".reg").first().dispatchEvent("click");
      await page.click("#next button");
    }
    await page.click(".reward button");
    assert((await page.locator(".reward").innerText()).includes("Kiitos, kun autoit minua!"), "pokaalin teksti");
    assert((await page.locator("#bubble").innerText()).includes("Kiitos, kun autoit minua!"), "Nuutti kiittää");
    await page.click(".reward button");
    assert(await page.locator("#trophy").isVisible(), "pokaali otsikossa");
    console.log("ok   pokaali");
    await page.close();
  } catch (e) { failed++; console.error("FAIL pokaali: " + e.message); }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
