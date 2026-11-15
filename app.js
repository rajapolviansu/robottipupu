(() => {
  const D = window.NUUTTI_DATA;
  const KEY = "nuutti-save-v2";
  const $ = (s) => document.querySelector(s);
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  // ---------- Tallennus ----------
  let S = { carrots: 0, done: {}, rightQ: {}, seenQ: {}, trophy: false };
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
  const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const addCarrots = (n) => {
    const before = level().title; S.carrots += n; save(); renderHeader();
    if (level().title !== before) say(`Hurraa! Nyt olen ${level().title}! 🎉`, "wow");
  };
  const allRight = () => D.topics.every((tp) => rightCount(tp) === tp.quiz.length);
  function renderHeader() {
    $("#trophy").classList.toggle("hidden", !S.trophy);
    $("#carrotCount").textContent = S.carrots;
    $("#friendCount").textContent = friendsCount();
    $("#friendTotal").textContent = D.topics.length;
    $("#levelTitle").textContent = `Taso: ${level().title}`;
  }

  // ---------- Välilehdet ----------
  document.querySelectorAll(".tabs button").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((x) => x.classList.toggle("active", x === b));
      document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.id === "tab-" + b.dataset.tab));
      if (b.dataset.tab === "friends") renderFriends();
      if (b.dataset.tab === "book") renderBook();
      if (b.dataset.tab === "topics") renderTopics();
    }));

  // ---------- Aiheet ----------
  const rightCount = (t) => t.quiz.filter((_, i) => S.rightQ[t.id + ":" + i]).length;
  function renderTopics() {
    const t = $("#tab-topics");
    t.innerHTML = `<h2>Tutki Suomen luontoa</h2><p class="hint">Valitse aihe ja vastaa kysymyksiin. Oikeista vastauksista saat 🥕, ja kun suoritat aiheen, saat uuden ystävän!</p><div class="grid topics" id="topics"></div>`;
    D.topics.forEach((tp) => {
      const b = el(`<button class="topic ${S.done[tp.id] ? "done" : ""}" style="border-color:${tp.color}">
        <span class="em">${tp.emoji}</span><b>${tp.name}</b>
        <span class="hint">${tp.quiz.length} kysymystä · ${rightCount(tp)}/${tp.quiz.length} oikein</span></button>`);
      b.addEventListener("click", () => openTopic(tp));
      $("#topics").append(b);
    });
    if (friendsCount() === 0) say(`Hei, olen Nuutti! ${D.dailyFacts[new Date().getDate() % D.dailyFacts.length]}`);
  }

  // ---------- Modal ----------
  const modal = $("#modal"), card = $("#modalCard");
  const openModal = (node) => { card.replaceChildren(node); modal.classList.remove("hidden"); };
  const closeModal = () => { modal.classList.add("hidden"); card.replaceChildren(); renderTopics(); renderHeader(); };
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

  function openTopic(tp) {
    say(`${tp.name}! ${tp.intro}`, "wow");
    const n = el(`<div><h2>${tp.emoji} ${tp.name}</h2><p class="hint">${tp.intro}</p>
      <p>Aiheessa on ${tp.quiz.length} kysymystä. Jokaisesta ensimmäisestä oikeasta vastauksesta saat 2 🥕.</p>
      <div class="row"><button class="btn" id="go">Aloitetaan! 🥕</button><button class="btn alt" id="close">Takaisin</button></div></div>`);
    n.querySelector("#go").onclick = () => quiz(tp, 0, 0);
    n.querySelector("#close").onclick = closeModal;
    openModal(n);
  }

  // ---------- Kysymykset ----------
  function quiz(tp, i, right) {
    if (i >= tp.quiz.length) return finish(tp, right);
    const q = tp.quiz[i];
    const n = el(`<div><h2>${tp.emoji} Kysymys ${i + 1}/${tp.quiz.length}</h2><p class="big">${q.q}</p>
      <div id="body"></div><p id="fb" class="hint" aria-live="polite"></p><div class="row" id="next"></div></div>`);
    const body = n.querySelector("#body");
    let answered = false;
    const answer = (ok, lock) => {
      if (answered) return; answered = true; lock();
      const key = tp.id + ":" + i;
      S.seenQ[key] = true;
      let msg;
      if (ok) {
        const first = !S.rightQ[key];
        if (first) { S.rightQ[key] = true; addCarrots(2); }
        msg = (first ? "Oikein! 🥕🥕 Sait 2 porkkanaa." : "Oikein! (Porkkanat olet jo saanut tästä.)");
        say("Mahtavaa, osasit!", "happy");
      } else {
        msg = "Ei haittaa! Nyt tiedät sen.";
        say("Ei hätää, opitaan yhdessä!", "sad");
      }
      save();
      n.querySelector("#fb").innerHTML = `<b>${msg}</b><br>${q.why}`;
      const nx = el(`<button class="btn">${i + 1 < tp.quiz.length ? "Seuraava" : "Valmis"}</button>`);
      nx.onclick = () => quiz(tp, i + 1, right + (ok ? 1 : 0));
      n.querySelector("#next").append(nx);
      nx.focus();
    };
    const renderers = { choice: renderChoice, compare: renderCompare, order: renderOrder, map: renderMapQ };
    (renderers[q.t] || renderChoice)(q, body, answer);
    openModal(n);
  }

  function renderChoice(q, body, answer) {
    if (q.visual) body.append(el(`<div class="visual ${q.visual.sil ? "sil" : ""}" aria-label="${q.visual.sil ? "siluetti" : "kuva"}">${q.visual.emoji}</div>`));
    if (q.audio) body.append(el(`<audio class="sample" controls preload="none" src="${q.audio}" aria-label="Ääninäyte">Selaimesi ei tue ääntä.</audio>`));
    const opts = el(`<div class="opts"></div>`);
    const list = q.a.map((txt, idx) => ({ txt, ok: idx === q.correct }));
    (q.keep ? list : shuffle(list)).forEach((o) => {
      const b = el(`<button>${o.txt}</button>`);
      b.onclick = () => answer(o.ok, () => {
        opts.querySelectorAll("button").forEach((x) => (x.disabled = true));
        if (!o.ok) b.classList.add("wrong");
        opts.querySelector('[data-ok="1"]').classList.add("right");
      });
      b.dataset.ok = o.ok ? "1" : "";
      opts.append(b);
    });
    body.append(opts);
  }

  function renderCompare(q, body, answer) {
    const best = q.items.reduce((a, b) => (b.v > a.v ? b : a));
    const opts = el(`<div class="opts compare"></div>`);
    shuffle(q.items).forEach((it) => {
      const b = el(`<button><b>${it.n}</b><span class="num"></span></button>`);
      b.dataset.ok = it === best ? "1" : "";
      b.onclick = () => answer(it === best, () => {
        opts.querySelectorAll("button").forEach((x, k) => {
          x.disabled = true;
          const item = q.items.find((m) => m.n === x.querySelector("b").textContent);
          x.querySelector(".num").textContent = item.label;
          if (x.dataset.ok) x.classList.add("right");
        });
        if (it !== best) b.classList.add("wrong");
      });
      opts.append(b);
    });
    body.append(opts);
  }

  function renderOrder(q, body, answer) {
    const correct = [...q.items].sort((a, b) => a.v - b.v);
    const picked = [];
    const info = el(`<p class="hint">Napauta lajit oikeassa järjestyksessä, pienimmästä suurimpaan.</p>`);
    const opts = el(`<div class="opts"></div>`);
    const reset = el(`<button class="btn alt small">Aloita alusta</button>`);
    shuffle(q.items).forEach((it) => {
      const b = el(`<button><span class="badge"></span>${it.n}<span class="num"></span></button>`);
      b.onclick = () => {
        picked.push(it); b.disabled = true; b.querySelector(".badge").textContent = picked.length;
        b.classList.add("picked");
        if (picked.length === q.items.length) {
          const ok = picked.every((p, k) => p === correct[k]);
          answer(ok, () => {
            reset.remove();
            [...opts.children].forEach((x) => {
              x.disabled = true;
              const name = x.childNodes[1].textContent;
              const item = q.items.find((m) => m.n === name);
              x.querySelector(".num").textContent = item.label;
              x.classList.remove("picked");
              x.classList.add(picked.indexOf(item) === correct.indexOf(item) ? "right" : "wrong");
              x.querySelector(".badge").textContent = correct.indexOf(item) + 1;
            });
            body.append(el(`<p class="hint">Oikea järjestys: ${correct.map((c) => c.n).join(" → ")}</p>`));
          });
        }
      };
      opts.append(b);
    });
    reset.onclick = () => {
      picked.length = 0;
      opts.querySelectorAll("button").forEach((x) => { x.disabled = false; x.classList.remove("picked"); x.querySelector(".badge").textContent = ""; });
    };
    body.append(info, opts, el(`<div class="row"></div>`));
    body.lastChild.append(reset);
  }

  const NS = "http://www.w3.org/2000/svg";
  const project = ([lon, lat]) => [((lon - 20) * 4.5).toFixed(1), ((70.2 - lat) * 10).toFixed(1)];
  function renderMapQ(q, body, answer) {
    const F = D.finland;
    const pts = F.outline.map(project).map((p) => p.join(",")).join(" ");
    const shapes = {
      pohjois: `<rect x="0" y="30" width="56" height="32"/>`,
      lappi: `<polygon points="0,0 56,0 56,36 0,48"/>`,
      lansi: `<rect x="0" y="62" width="27" height="28"/>`,
      ita: `<rect x="27" y="62" width="29" height="28"/>`,
      etela: `<rect x="0" y="90" width="56" height="18"/>`,
    };
    const svg = el(`<svg class="fimap" viewBox="0 0 56 108" role="group" aria-label="Suomen kartta">
      <defs><clipPath id="fi"><polygon points="${pts}"/></clipPath></defs>
      <g clip-path="url(#fi)">${F.regions.map((r) => `<g class="reg" data-id="${r.id}" tabindex="0" role="button" aria-label="${r.name}">${shapes[r.id]}</g>`).join("")}</g>
      <polygon points="${pts}" class="outline"/>
      ${F.regions.map((r) => `<text x="${r.at[0]}" y="${r.at[1]}" text-anchor="middle">${r.name}</text>`).join("")}
    </svg>`);
    const pick = (r) => answer(r.id === q.correct, () => {
      svg.querySelectorAll(".reg").forEach((g) => g.removeAttribute("tabindex"));
      svg.querySelector(`.reg[data-id="${q.correct}"]`).classList.add("right");
      if (r.id !== q.correct) svg.querySelector(`.reg[data-id="${r.id}"]`).classList.add("wrong");
    });
    F.regions.forEach((r) => {
      const g = svg.querySelector(`.reg[data-id="${r.id}"]`);
      g.addEventListener("click", () => pick(r));
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(r); } });
    });
    body.append(svg, el(`<p class="hint">Napauta aluetta kartalla. Kartta on vain suuntaa antava.</p>`));
  }

  function finish(tp, right) {
    const isNew = !S.done[tp.id];
    S.done[tp.id] = true; save(); renderHeader();
    const n = el(`<div class="reward"><div class="em">${tp.friend.emoji}</div>
      <h2>${isNew ? "Uusi ystävä!" : "Ystäväsi " + tp.friend.name}</h2>
      <p><b>${tp.friend.name}</b><br>${tp.friend.about}</p>
      <p class="hint">Vastasit oikein ${right}/${tp.quiz.length}.${friendsCount() === D.topics.length ? " 🎉 Olet suorittanut kaikki aiheet!" : ""}</p>
      <button class="btn">Jatketaan!</button></div>`);
    n.querySelector("button").onclick = () => {
      if (!S.trophy && allRight()) showTrophy(); else closeModal();
    };
    say(isNew ? `${tp.friend.name} liittyi seuraani!` : "Hienoa kertausta!", "wow");
    openModal(n);
  }

  // Pokaali, kun kaikkiin kysymyksiin on vastattu oikein
  function showTrophy() {
    S.trophy = true; save(); renderHeader();
    const n = el(`<div class="reward"><div class="em trophy-em">🏆🥕</div>
      <h2>Porkkanapokaali!</h2>
      <p><b>Vastasit oikein kaikkiin kysymyksiin.</b></p>
      <div class="thanks"><div class="thanks-nuutti" aria-hidden="true">${nuuttiSVG("happy")}</div><p class="big">Kiitos, kun autoit minua!</p></div>
      <button class="btn">Ole hyvä, Nuutti!</button></div>`);
    n.querySelector("button").onclick = closeModal;
    say("Kiitos, kun autoit minua!", "wow");
    openModal(n);
  }

  // ---------- Ystävät ----------
  function renderFriends() {
    $("#tab-friends").innerHTML = `<h2>Nuutin ystävät</h2><p class="hint">Saat uuden ystävän, kun suoritat aiheen kysymykset.</p><div class="grid"></div>`;
    const g = $("#tab-friends .grid");
    D.topics.forEach((tp) => {
      const has = S.done[tp.id];
      g.append(el(`<div class="friend ${has ? "" : "locked"}"><div class="em">${tp.friend.emoji}</div>
        <b>${has ? tp.friend.name : "???"}</b><div class="hint">${has ? tp.friend.about : "Suorita aihe “" + tp.name + "” löytääksesi ystävän."}</div></div>`));
    });
  }

  // ---------- Tietokirja ----------
  function renderBook() {
    $("#tab-book").innerHTML = `<h2>Tietokirja</h2><p class="hint">Tähän kertyvät kaikki opitut faktat. Jokaisen kysymyksen jälkeen saat uuden tiedon.</p>
      <div class="grid"></div>`;
    const g = $("#tab-book .grid");
    g.append(el(`<div class="fact"><h3>🇫🇮 Suomi</h3><ul>${D.dailyFacts.map((f) => `<li>${f}</li>`).join("")}</ul></div>`));
    D.topics.forEach((tp) => {
      const seen = tp.quiz.filter((_, i) => S.seenQ[tp.id + ":" + i]);
      g.append(el(`<div class="fact ${seen.length ? "" : "locked"}"><h3>${tp.emoji} ${tp.name}</h3>${
        seen.length ? `<ul>${seen.map((q) => `<li>${q.why}</li>`).join("")}</ul>` : `<div class="hint">Vastaa tämän aiheen kysymyksiin.</div>`}</div>`));
    });
  }

  // ---------- Käynnistys ----------
  setMood("happy"); renderHeader(); renderTopics();
})();
