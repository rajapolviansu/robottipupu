(() => {
  const D = window.NUUTTI_DATA;
  const KEY = "nuutti-save-v1";
  const $ = (s) => document.querySelector(s);
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  // ---------- Tallennus ----------
  let S = { carrots: 0, visited: {}, done: {}, rightQ: {} };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  // ---------- Nuutti (SVG) ----------
  const nuuttiSVG = (mood = "happy") => `
  <svg viewBox="0 0 100 115" fill="none" stroke="#2b2b3a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="30" y="68" width="40" height="36" rx="5" fill="#cfd8ff"/>
    <circle cx="40" cy="108" r="5" fill="#fff"/><circle cx="60" cy="108" r="5" fill="#fff"/>
    <circle cx="50" cy="78" r="1.6" fill="#2b2b3a"/><circle cx="50" cy="84" r="1.6" fill="#2b2b3a"/><circle cx="50" cy="90" r="1.6" fill="#2b2b3a"/>
    <path d="M70 76 q12 4 8 18" stroke-dasharray="4 3"/><path d="M30 78 q-12 6 -8 20 M18 98 l4 -6 l4 6"/>
    <path d="M35 40 C28 20 30 4 36 4 C43 4 43 24 44 40 M65 40 C72 20 70 4 64 4 C57 4 57 24 56 40" fill="#fff"/>
    <rect x="22" y="36" width="56" height="38" rx="14" fill="#fff"/>
    <ellipse cx="24" cy="52" rx="3" ry="6" fill="#ffd27a"/><ellipse cx="76" cy="52" rx="3" ry="6" fill="#ffd27a"/>
    <path d="M10 50 l12 2 M10 60 l12 -2 M90 50 l-12 2 M90 60 l-12 -2"/>
    ${mood === "wow"
      ? `<circle cx="40" cy="52" r="4" fill="#2b2b3a"/><circle cx="60" cy="52" r="4" fill="#2b2b3a"/><ellipse cx="50" cy="66" rx="4" ry="5" fill="#2b2b3a"/>`
      : mood === "sad"
      ? `<circle cx="40" cy="54" r="3" fill="#2b2b3a"/><circle cx="60" cy="54" r="3" fill="#2b2b3a"/><path d="M43 67 q7 -5 14 0"/>`
      : `<circle cx="40" cy="52" r="3" fill="#2b2b3a"/><circle cx="60" cy="52" r="3" fill="#2b2b3a"/><path d="M42 62 q4 5 8 0 q4 5 8 0"/>`}
    <path d="M46 57 h8 l-4 4 z" fill="#ff9aa8"/>
  </svg>`;
  const setMood = (mood) => {
    const m = $("#mascot"); m.innerHTML = nuuttiSVG(mood);
    m.classList.remove("hop"); void m.offsetWidth; m.classList.add("hop");
  };
  const say = (text, mood = "happy") => {
    $("#bubble").innerHTML = `<span>${text}</span>`; setMood(mood);
  };

  // ---------- Apu ----------
  const level = () => [...D.levels].reverse().find((l) => S.carrots >= l.min);
  const friendsCount = () => Object.keys(S.done).length;
  const addCarrots = (n) => {
    const before = level().title; S.carrots += n; save(); renderHeader();
    if (level().title !== before) say(`Hurraa! Nyt olen ${level().title}! 🎉`, "wow");
  };
  function renderHeader() {
    $("#carrotCount").textContent = S.carrots;
    $("#friendCount").textContent = friendsCount();
    $("#levelTitle").textContent = `Taso: ${level().title}`;
  }

  // ---------- Välilehdet ----------
  document.querySelectorAll(".tabs button").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((x) => x.classList.toggle("active", x === b));
      document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.id === "tab-" + b.dataset.tab));
      if (b.dataset.tab === "friends") renderFriends();
      if (b.dataset.tab === "book") renderBook();
      if (b.dataset.tab === "carrots") renderGameIntro();
      if (b.dataset.tab === "map") renderMap();
    }));

  // ---------- Kartta ----------
  function renderMap() {
    const t = $("#tab-map");
    t.innerHTML = `<h2>Tutki maapalloa</h2><p class="hint">Valitse maanosa, lue faktat ja vastaa Nuutin tietovisaan. Oikeista vastauksista saat 🥕 ja lopuksi uuden ystävän!</p>
      <div class="map" id="map"></div><p class="map-note">Tähdellä merkityt maanosat olet jo tutkinut: ${friendsCount()}/${D.regions.length}.</p>`;
    const map = $("#map");
    for (let i = 0; i < 18; i++) map.append(el(`<div class="dots"><i style="left:${(i * 37) % 97}%;top:${(i * 53) % 93}%"></i></div>`));
    map.append(el(`<div class="map-nuutti">${nuuttiSVG()}</div>`));
    D.regions.forEach((r) => {
      const b = el(`<button class="pin ${S.done[r.id] ? "done" : ""}" style="left:${r.pos.x}%;top:${r.pos.y}%;border-color:${r.color}"><span class="em">${r.emoji}</span>${r.name}</button>`);
      b.addEventListener("click", () => openRegion(r));
      map.append(b);
    });
    if (friendsCount() === 0) say(`Hei, olen Nuutti! ${D.dailyFacts[new Date().getDate() % D.dailyFacts.length]}`);
  }

  // ---------- Modal ----------
  const modal = $("#modal"), card = $("#modalCard");
  const openModal = (node) => { card.replaceChildren(node); modal.classList.remove("hidden"); };
  const closeModal = () => { modal.classList.add("hidden"); card.replaceChildren(); renderMap(); renderHeader(); };
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  function openRegion(r) {
    S.visited[r.id] = true; save();
    say(`Tervetuloa: ${r.name}! ${r.intro}`, "wow");
    const n = el(`<div><h2>${r.emoji} ${r.name}</h2><p class="hint">${r.intro}</p>
      <ul>${r.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
      <div class="row"><button class="btn" id="go">Tietovisaan! 🥕</button><button class="btn alt" id="close">Takaisin kartalle</button></div></div>`);
    n.querySelector("#go").onclick = () => quiz(r, 0, 0);
    n.querySelector("#close").onclick = closeModal;
    openModal(n);
  }

  function quiz(r, i, right) {
    if (i >= r.quiz.length) return finish(r, right);
    const q = r.quiz[i];
    const n = el(`<div><h2>${r.emoji} Kysymys ${i + 1}/${r.quiz.length}</h2><p class="big">${q.q}</p><div class="opts"></div><p id="fb" class="hint"></p><div class="row" id="next"></div></div>`);
    const opts = n.querySelector(".opts");
    q.a.forEach((txt, idx) => {
      const b = el(`<button>${txt}</button>`);
      b.onclick = () => {
        opts.querySelectorAll("button").forEach((x) => (x.disabled = true));
        opts.children[q.correct].classList.add("right");
        const ok = idx === q.correct;
        if (!ok) b.classList.add("wrong");
        const key = r.id + ":" + i;
        if (ok) {
          const first = !S.rightQ[key];
          if (first) { S.rightQ[key] = true; addCarrots(2); }
          n.querySelector("#fb").textContent = first ? "Oikein! 🥕🥕 Sait 2 porkkanaa." : "Oikein! (Porkkanat olet jo saanut tästä.)";
          say("Mahtavaa, osasit!", "happy");
        } else {
          n.querySelector("#fb").textContent = "Ei haittaa! Oikea vastaus on merkitty vihreällä. Nyt tiedät sen.";
          say("Ei hätää, opitaan yhdessä!", "sad");
        }
        const nx = el(`<button class="btn">${i + 1 < r.quiz.length ? "Seuraava" : "Valmis"}</button>`);
        nx.onclick = () => quiz(r, i + 1, right + (ok ? 1 : 0));
        n.querySelector("#next").append(nx);
      };
      opts.append(b);
    });
    openModal(n);
  }

  function finish(r, right) {
    const isNew = !S.done[r.id];
    S.done[r.id] = true; save(); renderHeader();
    const n = el(`<div class="reward"><div class="em">${r.friend.emoji}</div>
      <h2>${isNew ? "Uusi ystävä!" : "Ystäväsi " + r.friend.name}</h2>
      <p><b>${r.friend.name}</b><br>${r.friend.about}</p>
      <p class="hint">Vastasit oikein ${right}/${r.quiz.length}.${friendsCount() === D.regions.length ? " 🎉 Olet tutkinut koko maapallon!" : ""}</p>
      <button class="btn">Jatketaan!</button></div>`);
    n.querySelector("button").onclick = closeModal;
    say(isNew ? `${r.friend.name} liittyi seuraani!` : "Hienoa kertausta!", "wow");
    openModal(n);
  }

  // ---------- Porkkanapeli ----------
  let gameTimer = null;
  function renderGameIntro() {
    clearInterval(gameTimer);
    $("#tab-carrots").innerHTML = `<h2>Porkkanasade</h2><p class="hint">Taivaalta sataa porkkanoita! Napsauta tai napauta niitä ennen kuin ne putoavat maahan. Kokeile 20 sekuntia.</p>
      <div class="arena" id="arena"><div class="ground"></div></div>
      <div class="row"><button class="btn" id="start">Aloita ▶</button><span class="big" id="score"></span></div>`;
    $("#start").onclick = startGame;
  }
  function startGame() {
    const arena = $("#arena"); arena.querySelectorAll(".carrot").forEach((c) => c.remove());
    let got = 0, left = 20;
    const score = $("#score"); const upd = () => (score.textContent = `🥕 ${got}   ⏱ ${left}s`); upd();
    $("#start").disabled = true; say("Nyt sataa porkkanoita! Nappaa ne!", "wow");
    const spawn = () => {
      const c = el(`<button class="carrot" aria-label="porkkana">🥕</button>`);
      c.style.left = Math.random() * (arena.clientWidth - 40) + "px";
      c.style.animationDuration = 2.2 + Math.random() * 1.8 + "s";
      c.onclick = () => { got++; upd(); c.remove(); };
      c.addEventListener("animationend", () => c.remove());
      arena.append(c);
    };
    let tick = 0;
    gameTimer = setInterval(() => {
      tick++;
      if (tick % 2 === 0) { left--; upd(); }
      spawn();
      if (left <= 0) {
        clearInterval(gameTimer);
        $("#start").disabled = false; $("#start").textContent = "Uudestaan ▶";
        addCarrots(got);
        score.textContent = `Keräsit ${got} porkkanaa!`;
        say(got >= 10 ? `Vau, ${got} porkkanaa! Olet nopea!` : `Sait ${got} porkkanaa. Kokeile uudestaan!`, got >= 10 ? "wow" : "happy");
      }
    }, 500);
  }

  // ---------- Ystävät ----------
  function renderFriends() {
    $("#tab-friends").innerHTML = `<h2>Nuutin ystävät</h2><p class="hint">Saat uuden ystävän, kun suoritat maanosan tietovisan.</p><div class="grid"></div>`;
    const g = $("#tab-friends .grid");
    D.regions.forEach((r) => {
      const has = S.done[r.id];
      g.append(el(`<div class="friend ${has ? "" : "locked"}"><div class="em">${r.friend.emoji}</div>
        <b>${has ? r.friend.name : "???"}</b><div class="hint">${has ? r.friend.about : "Tutki " + r.name + " löytääksesi ystävän."}</div></div>`));
    });
  }

  // ---------- Tietokirja ----------
  function renderBook() {
    $("#tab-book").innerHTML = `<h2>Tietokirja</h2><p class="hint">Tähän kertyvät kaikki faktat maanosista, joissa olet käynyt.</p>
      <div class="grid"></div>`;
    const g = $("#tab-book .grid");
    g.append(el(`<div class="fact"><h3>🌍 Maapallo</h3><ul>${D.dailyFacts.map((f) => `<li>${f}</li>`).join("")}</ul></div>`));
    D.regions.forEach((r) => {
      const seen = S.visited[r.id];
      g.append(el(`<div class="fact ${seen ? "" : "locked"}"><h3>${r.emoji} ${r.name}</h3>${
        seen ? `<ul>${r.facts.map((f) => `<li>${f}</li>`).join("")}</ul>` : `<div class="hint">Käy tutkimassa tämä maanosa kartalla.</div>`}</div>`));
    });
  }

  // ---------- Käynnistys ----------
  setMood("happy"); renderHeader(); renderMap(); renderGameIntro();
})();
