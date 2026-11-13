// Nuutin maailma: kaikki pelin tieto on täällä. Lisää uusia alueita tai kysymyksiä helposti.
window.NUUTTI_DATA = {
  levels: [
    { min: 0, title: "Tutkijaharjoittelija" },
    { min: 10, title: "Tutkija" },
    { min: 30, title: "Vanhempi tutkija" },
    { min: 60, title: "Päätutkija" },
    { min: 100, title: "Maailmantutkija" },
  ],
  dailyFacts: [
    "Maapallon pinta-alasta noin 71 % on vettä.",
    "Maapallo pyörähtää akselinsa ympäri noin 24 tunnissa. Siitä tulee päivä ja yö!",
    "Maapallo kiertää Auringon noin 365 päivässä. Se on yksi vuosi.",
    "Maapallolla on yksi Kuu, joka kiertää sitä.",
    "Maanosia on seitsemän ja valtameriä viisi.",
    "Suurin valtameri on Tyynimeri.",
  ],
  regions: [
    {
      id: "eurooppa", name: "Eurooppa", emoji: "🏰", color: "#7cc576",
      pos: { x: 52, y: 26 },
      intro: "Täällä asuu Nuutin koti-Suomi!",
      facts: [
        "Suomessa on yli 180 000 järveä, siksi sitä sanotaan tuhansien järvien maaksi.",
        "Euroopassa on yli 40 maata, vaikka maanosa on aika pieni.",
        "Alpit ovat Keski-Euroopan suuri vuoristo. Niiden korkein huippu on Mont Blanc, 4 806 metriä.",
      ],
      quiz: [
        { q: "Kuinka monta järveä Suomessa on?", a: ["Noin 100", "Noin 1 000", "Yli 180 000"], correct: 2 },
        { q: "Minkä nimistö vuoristo on Keski-Euroopassa?", a: ["Alpit", "Andit", "Himalaja"], correct: 0 },
      ],
      friend: { name: "Pyry-poro", emoji: "🦌", about: "Pyry on poro Lapista. Porot osaavat kaivaa ruokansa lumen alta ja niillä on lämmin, paksu turkki." },
    },
    {
      id: "aasia", name: "Aasia", emoji: "🏯", color: "#f2b35e",
      pos: { x: 72, y: 30 },
      intro: "Maailman suurin maanosa.",
      facts: [
        "Aasia on maailman suurin maanosa. Siellä asuu yli puolet kaikista ihmisistä.",
        "Maailman korkein vuori Mount Everest on Aasiassa. Se on noin 8 849 metriä korkea.",
        "Jättiläispandat elävät luonnossa Kiinassa ja syövät lähes pelkkää bambua.",
      ],
      quiz: [
        { q: "Mikä on maailman korkein vuori?", a: ["Mont Blanc", "Mount Everest", "Kilimanjaro"], correct: 1 },
        { q: "Mitä jättiläispandat syövät eniten?", a: ["Bambua", "Kalaa", "Porkkanoita"], correct: 0 },
      ],
      friend: { name: "Pimpom-panda", emoji: "🐼", about: "Pimpom viettää päivänsä mutustellen bambua. Se voi syödä yli kymmenen kiloa päivässä!" },
    },
    {
      id: "afrikka", name: "Afrikka", emoji: "🌍", color: "#e8a24a",
      pos: { x: 53, y: 50 },
      intro: "Savannien ja aavikoiden maanosa.",
      facts: [
        "Sahara on maailman suurin kuuma aavikko. Se on lähes yhtä iso kuin Yhdysvallat.",
        "Niili on yksi maailman pisimmistä joista, noin 6 650 kilometriä.",
        "Afrikannorsu on maailman suurin maalla elävä eläin.",
      ],
      quiz: [
        { q: "Mikä on maailman suurin kuuma aavikko?", a: ["Sahara", "Gobi", "Atacama"], correct: 0 },
        { q: "Mikä on suurin maalla elävä eläin?", a: ["Kirahvi", "Afrikannorsu", "Leijona"], correct: 1 },
      ],
      friend: { name: "Nelli-norsu", emoji: "🐘", about: "Nelli käyttää kärsäänsä juomiseen, tervehtimiseen ja suihkussa käymiseen. Norsut muistavat pitkään!" },
    },
    {
      id: "pohjois-amerikka", name: "Pohjois-Amerikka", emoji: "🗽", color: "#6fb8e8",
      pos: { x: 22, y: 28 },
      intro: "Metsiä, preerioita ja kanjoneita.",
      facts: [
        "Grand Canyon on noin 446 kilometriä pitkä kanjoni. Colorado-joki on kaivertanut sen miljoonien vuosien aikana.",
        "Kanadassa on enemmän järviä kuin missään muussa maassa.",
        "Majava on Kanadan kansalliseläin. Se rakentaa patoja puista.",
      ],
      quiz: [
        { q: "Mikä joki on kaivertanut Grand Canyonin?", a: ["Niili", "Colorado", "Amazon"], correct: 1 },
        { q: "Mikä eläin rakentaa patoja puista?", a: ["Majava", "Kettu", "Pingviini"], correct: 0 },
      ],
      friend: { name: "Make-majava", emoji: "🦫", about: "Make on ahkera rakentaja. Majavan hampaat kasvavat koko elämän ajan, joten sen täytyy jyrsiä puuta." },
    },
    {
      id: "etela-amerikka", name: "Etelä-Amerikka", emoji: "🌴", color: "#4fb58a",
      pos: { x: 32, y: 62 },
      intro: "Sademetsien ja vuorten maanosa.",
      facts: [
        "Amazonin sademetsä on maailman suurin sademetsä. Siellä elää valtavasti eläin- ja kasvilajeja.",
        "Andit on maailman pisin vuoristo, noin 7 000 kilometriä pitkä.",
        "Laamat ovat sukua kameleille. Ne asuvat Andien vuoristossa.",
      ],
      quiz: [
        { q: "Missä on maailman suurin sademetsä?", a: ["Amazonilla", "Suomessa", "Saharassa"], correct: 0 },
        { q: "Mikä vuoristo on maailman pisin?", a: ["Alpit", "Andit", "Ural"], correct: 1 },
      ],
      friend: { name: "Lola-laama", emoji: "🦙", about: "Lola kantaa tavaroita vuoristopoluilla. Laama voi kuitenkin sylkäistä, jos se suuttuu!" },
    },
    {
      id: "oseania", name: "Oseania", emoji: "🏝️", color: "#f08f8f",
      pos: { x: 82, y: 64 },
      intro: "Saaria, riuttoja ja Australia.",
      facts: [
        "Oseania on maailman pienin maanosa. Sen suurin maa on Australia.",
        "Suuri valliriutta on maailman suurin koralliriutta. Se näkyy jopa avaruuteen.",
        "Kengurut liikkuvat hyppien, ja äiti kantaa pientä poikasta kukkarossaan.",
      ],
      quiz: [
        { q: "Mikä eläin kantaa poikasta kukkarossa ja hyppii?", a: ["Kenguru", "Orava", "Norsu"], correct: 0 },
        { q: "Mikä on maailman suurin koralliriutta?", a: ["Pieni lampi", "Suuri valliriutta", "Itämeri"], correct: 1 },
      ],
      friend: { name: "Kalle-kenguru", emoji: "🦘", about: "Kalle voi hypätä useita metrejä kerralla. Sen vahva häntä auttaa pitämään tasapainon." },
    },
    {
      id: "antarktis", name: "Antarktis", emoji: "🧊", color: "#a9d8f0",
      pos: { x: 55, y: 88 },
      intro: "Maailman kylmin ja jäisin paikka.",
      facts: [
        "Antarktis on maapallon kylmin maanosa. Lähes kaikki sen pinta on jään peitossa.",
        "Siellä ei asu pysyvästi ihmisiä, vain tutkijoita, jotka käyvät työskentelemässä.",
        "Keisaripingviini on maailman suurin pingviini ja se pesii Antarktiksella.",
      ],
      quiz: [
        { q: "Mikä maanosa on kylmin?", a: ["Afrikka", "Antarktis", "Oseania"], correct: 1 },
        { q: "Mikä lintu ei osaa lentää ja viihtyy Antarktiksella?", a: ["Pingviini", "Kotka", "Papukaija"], correct: 0 },
      ],
      friend: { name: "Pinja-pingviini", emoji: "🐧", about: "Pinja liukuu mielellään vatsallaan jäällä. Pingviinit pysyvät lämpiminä pitämällä yhdessä." },
    },
  ],
};
