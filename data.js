// Nuutin Suomi: kaikki pelin tieto on täällä. Lisää uusia aiheita tai kysymyksiä helposti.
//
// Kysymystyypit (t):
//   choice   – monivalinta: { q, a: [vaihtoehdot], correct: indeksi, why, visual?: { emoji, sil? }, keep? }
//              visual.sil = true näyttää kuvan siluettina; keep = true säilyttää vaihtoehtojen järjestyksen
//              audio = "assets/tiedosto.mp3" lisää kysymykseen ääninäytteen (soitin)
//   compare  – "Kumpi on enemmän?": { q, items: [{ n, v, label }, { n, v, label }], why }  (suurempi v on oikein)
//   order    – järjestä pienimmästä suurimpaan: { q, items: [{ n, v, label }, ...], why }
//   map      – klikkaa Suomen karttaa: { q, correct: alueen id, why }
window.NUUTTI_DATA = {
  levels: [
    { min: 0, title: "Retkeilijäharjoittelija" },
    { min: 10, title: "Retkeilijä" },
    { min: 30, title: "Luontotutkija" },
    { min: 60, title: "Erämaan tuntija" },
    { min: 90, title: "Suomen luonnon mestari" },
  ],
  dailyFacts: [
    "Suomessa on yli 180 000 järveä, siksi sitä sanotaan tuhansien järvien maaksi.",
    "Suomen kansalliseläin on karhu, kansallislintu laulujoutsen ja kansalliskukka kielo.",
    "Suomen ainoa luonnonvarainen kissaeläin on ilves.",
    "Saimaannorppa elää vain Saimaalla, eikä sitä tavata luonnossa missään muualla maailmassa.",
    "Käärmeistä Suomessa elää luonnonvaraisena vain kolme lajia: kyy, rantakäärme ja kangaskäärme.",
    "Jokamiehenoikeudella saat liikkua luonnossa ja poimia marjoja ja sieniä, kunhan et häiritse etkä roskaa.",
  ],
  // Suuntaa antava Suomen kartta: [pituuspiiri, leveyspiiri]
  finland: {
    outline: [
      [23.1, 59.8], [24.0, 60.0], [25.0, 60.2], [25.7, 60.4], [26.9, 60.5], [28.0, 60.55], [28.8, 61.3],
      [29.9, 61.9], [31.2, 62.9], [29.9, 63.7], [29.9, 64.5], [30.5, 65.2], [29.7, 66.0], [29.5, 66.3],
      [29.1, 66.9], [29.3, 67.5], [28.7, 68.2], [29.0, 69.0], [28.0, 69.9], [27.0, 70.1], [25.8, 69.7],
      [25.2, 68.7], [23.5, 68.7], [21.7, 69.0], [20.6, 69.05], [21.1, 68.6], [23.6, 67.9], [23.7, 66.9],
      [24.15, 65.85], [25.4, 65.0], [24.3, 64.4], [23.4, 64.0], [22.5, 63.4], [21.5, 62.8], [21.3, 62.0],
      [21.4, 61.2], [21.9, 60.7], [22.5, 60.4],
    ],
    regions: [
      { id: "lappi", name: "Lappi", at: [28, 20] },
      { id: "pohjois", name: "Pohjois-Suomi", at: [36, 50] },
      { id: "lansi", name: "Länsi-Suomi", at: [16.5, 77] },
      { id: "ita", name: "Itä-Suomi", at: [40, 77] },
      { id: "etela", name: "Etelä-Suomi", at: [28, 96] },
    ],
  },
  topics: [
    // ------------------------------------------------------------------
    {
      id: "tunnista", name: "Kuka tämä on?", emoji: "🔍", color: "#7cc576",
      intro: "Tunnista laji äänestä, jäljestä, pesästä tai muodosta. Helposta vaikeaan!",
      friend: { name: "Hugo-huuhkaja", emoji: "🦉", about: "Hugo on Suomen suurin pöllö. Se näkee hämärässä erinomaisesti ja huhuilee kumealla äänellä talviyönä." },
      quiz: [
        {
          t: "choice", q: "Kesäyönä suolta kuuluu pitkää, tasaista hurinaa, kuin pieni moottori kävisi. Kuka laulaa?",
          audio: "assets/kehraaja.mp3",
          a: ["Kehrääjä", "Kyyhky", "Kuikka"], correct: 0,
          why: "Kehrääjä on hämärässä lentävä yölintu. Sen laulu on pitkä, kehräävä hurina, joka kuuluu pitkälle.",
        },
        {
          t: "choice", q: "Talvella pakkasyössä metsästä kaikuu matala, kumea \"puuh-hu\". Kuka huhuilee?",
          audio: "assets/huuhkaja.mp3",
          a: ["Kurki", "Huuhkaja", "Kuovi"], correct: 1,
          why: "Huuhkaja on Suomen suurin pöllö. Sen kumea huhuilu kuuluu parhaiten tammi-maaliskuussa, kun se aloittaa pesinnän.",
        },
        {
          t: "choice", q: "Lumessa on jälki: neljä varvasta ja pyöreä kämmen, mutta ei yhtään kynnenjälkeä. Kenen jälki se on?",
          a: ["Ketun", "Ilveksen", "Karhun"], correct: 1,
          why: "Kissaeläinten kynnet ovat sisäänvedettävät, joten ne eivät jätä jälkeä. Ketun ja suden jäljissä kynnet näkyvät.",
        },
        {
          t: "choice", q: "Käpy on tungettu männyn rungon halkeamaan ja sen suomut on repäisty irti. Kuka sen on syönyt?",
          a: ["Käpytikka", "Hiiri", "Siili"], correct: 0,
          why: "Käpytikka käyttää rungon rakoa \"sepänpajana\" ja pitää kävyn paikallaan, kun se kuorii siemeniä.",
        },
        {
          t: "choice", q: "Korkealla männyn latvassa on iso risukasa, jota käytetään vuodesta toiseen. Kenen pesä?",
          a: ["Kuikan", "Kurjen", "Sääksen"], correct: 2,
          why: "Sääksi eli kalasääski rakentaa suuren risupesän puun latvaan tai tekopesäalustalle. Kuikka ja kurki pesivät maassa tai vedessä.",
        },
        {
          t: "choice", q: "Mistä erotat tatin rouskusta? Tatin hatun alla on…",
          a: ["Lamelleja eli levyjä", "Sienihuokosia eli putkilo", "Piikkejä"], correct: 1,
          keep: true,
          why: "Tateilla on lakin alla sienimäinen putkilo, rouskuilla lamellit. Rouskut ovat myös yleensä kovia ja haperoita.",
        },
        {
          t: "choice", q: "Selässä on tumma siksak-kuvio ja pää on leveä. Mikä käärme?",
          a: ["Rantakäärme", "Kyy", "Vaskitsa"], correct: 1,
          why: "Kyy on Suomen ainoa myrkyllinen käärme. Rantakäärmeen tuntee päänsä takaa keltaisista läiskistä. Vaskitsa ei ole käärme vaan jalaton lisko.",
        },
        {
          t: "choice", q: "Lyhyet pyöreät siivet ja pitkä häntä: lintu syöksyy yllättäen pensaikosta pikkulintujen kimppuun. Kumpi haukka?",
          a: ["Nuolihaukka", "Varpushaukka"], correct: 1, keep: true,
          why: "Varpushaukka metsästää metsässä lyhyillä siivillä ja pitkällä hännällä. Nuolihaukka on pitkäsiipinen ja nopea, ja se saalistaa avoimessa ilmassa.",
        },
        {
          t: "choice", q: "Mikä eläin on kuvassa pelkkänä siluettina?",
          visual: { emoji: "🦔", sil: true },
          a: ["Siili", "Hiiri", "Lumikko"], correct: 0,
          why: "Siilin tunnistaa pyöreästä muodosta ja piikeistä. Piikkejä on noin 6 000.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "kumpi", name: "Kumpi on enemmän?", emoji: "⚖️", color: "#f2b35e",
      intro: "Vertaile lukuja ja järjestä lajit. Arvaa ensin, katso sitten oikeat luvut.",
      friend: { name: "Nooa-norppa", emoji: "🦭", about: "Nooa on saimaannorppa. Norppia on enää muutama sata, joten jokainen niistä on tärkeä." },
      quiz: [
        {
          t: "compare", q: "Kumpaa on Suomessa enemmän?",
          items: [{ n: "Ilves", v: 2300, label: "noin 2 000–2 500" }, { n: "Susi", v: 350, label: "noin 300–400" }],
          why: "Ilveksiä on noin kuusi kertaa enemmän kuin susia. Sudet elävät pienemmissä laumoissa, ja kanta on arvioitu vain muutamaksi sadaksi.",
        },
        {
          t: "compare", q: "Kumpi painaa enemmän?",
          items: [{ n: "Saimaannorppa", v: 70, label: "noin 50–90 kg" }, { n: "Maakotka", v: 5, label: "noin 3–6,5 kg" }],
          why: "Norppa painaa kymmeniä kiloja. Maakotka on iso lintu, mutta lintujen luut ovat ontot ja kevyet.",
        },
        {
          t: "compare", q: "Kumpi on korkeampi (säkäkorkeus eli selän korkein kohta)?",
          items: [{ n: "Hirvi", v: 1.7, label: "noin 1,4–2,1 m" }, { n: "Karhu", v: 1.1, label: "noin 0,9–1,3 m" }],
          why: "Hirvi on Euroopan suurin hirvieläin ja pitkäjalkainen. Karhu näyttää isolta, mutta on neljällä jalalla matalampi.",
        },
        {
          t: "order", q: "Järjestä nisäkkäät pienimmästä suurimpaan (paino).",
          items: [
            { n: "Orava", v: 0.3, label: "noin 300 g" },
            { n: "Kettu", v: 6, label: "noin 6 kg" },
            { n: "Karhu", v: 200, label: "noin 150–300 kg" },
            { n: "Hirvi", v: 450, label: "noin 350–600 kg" },
          ],
          why: "Hirvi on Suomen suurin villieläin. Karhu painaa vaihtelevasti: syksyllä se on lihavimmillaan.",
        },
        {
          t: "order", q: "Järjestä linnut kevyimmästä painavimpaan.",
          items: [
            { n: "Hippiäinen", v: 0.005, label: "noin 5 g" },
            { n: "Talitiainen", v: 0.018, label: "noin 18 g" },
            { n: "Korppi", v: 1.2, label: "noin 1,2 kg" },
            { n: "Maakotka", v: 5, label: "noin 5 kg" },
            { n: "Laulujoutsen", v: 10, label: "noin 10 kg" },
          ],
          why: "Hippiäinen on Euroopan pienimpiä lintuja ja painaa vähemmän kuin kahden euron kolikko. Laulujoutsen on Suomen painavimpia lintuja.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "tiesitko", name: "Tiesitkö?", emoji: "💡", color: "#ffd27a",
      intro: "Yllättäviä faktoja suomalaisista eläimistä.",
      friend: { name: "Sirkku-siili", emoji: "🦔", about: "Sirkku nukkuu talven yli talviunessa. Silloin sen sydän lyö vain noin 20 kertaa minuutissa." },
      quiz: [
        {
          t: "choice", q: "Mitä siilin sydämelle tapahtuu talviunen aikana?",
          a: ["Se pysähtyy kokonaan", "Syke hidastuu rajusti", "Mitään ei muutu"], correct: 1,
          why: "Siilin syke laskee tavallisesta noin 190 lyönnistä minuutissa noin 20 lyöntiin, ja ruumiin lämpö laskee muutamaan asteeseen. Näin se säästää energiaa.",
        },
        {
          t: "choice", q: "Lumikko ja kärppä vaihtavat talveksi valkoiseen turkkiin. Mikä on nykyään ongelma valkoisessa turkissa?",
          a: ["Valkoinen turkki on liian lämmin", "Lunta tulee myöhään ja sulaa aikaisin, joten valkoinen eläin näkyy hyvin mustaa maata vasten", "Ne eivät löydä ruokaa"], correct: 1,
          keep: true,
          why: "Eläin vaihtaa turkkinsa päivän pituuden mukaan, ei lumen. Kun lumi tulee myöhemmin, valkoinen turkki paljastaa eläimen pedoille.",
        },
        {
          t: "choice", q: "Mikä suomalainen lintu muuttaa pisimmälle, jopa Etelämantereen vesille asti?",
          a: ["Lapintiira", "Peippo", "Varis"], correct: 0,
          why: "Lapintiira lentää pesimäseudulta Etelämantereen reunamille ja takaisin, kymmeniä tuhansia kilometrejä vuodessa. Se näkee elämänsä aikana enemmän päivänvaloa kuin mikään muu eläin.",
        },
        {
          t: "choice", q: "Miten kärppä pärjää talvella?",
          a: ["Se nukkuu koko talven", "Turkki muuttuu valkoiseksi, vain hännän kärki jää mustaksi, ja se metsästää myyriä lumen alta", "Se lentää etelään"], correct: 1,
          keep: true,
          why: "Kärpän hännän kärki on talvellakin musta. Kärppä on niin ohut, että se mahtuu seuraamaan myyriä niiden käytäville lumen alle.",
        },
        {
          t: "choice", q: "Mikä on Suomen kansallislintu?",
          a: ["Laulujoutsen", "Kurki", "Talitiainen"], correct: 0,
          why: "Laulujoutsen valittiin kansallislinnuksi 1981. Kansalliseläin on karhu, kansalliskala ahven ja kansalliskukka kielo.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "ekologia", name: "Miksi näin käy?", emoji: "🌲", color: "#4fb58a",
      intro: "Luonnossa kaikki liittyy kaikkeen. Mitä tapahtuu, kun jokin muuttuu?",
      friend: { name: "Sami-susi", emoji: "🐺", about: "Sami on huippupeto: sillä on iso merkitys metsän tasapainolle, koska se pitää hirvieläinkantoja kurissa." },
      quiz: [
        {
          t: "choice", q: "Mitä voi tapahtua, jos susi katoaa alueelta?",
          a: ["Mitään ei tapahdu", "Hirvieläimiä tulee enemmän ja ne syövät nuoria puita", "Kaikki linnut katoavat"], correct: 1,
          why: "Huippupedon puute voi kasvattaa kasvinsyöjien määrää. Silloin ne voivat syödä nuoria taimia liikaa. Luonto on verkko, jossa jokainen laji vaikuttaa toisiin.",
        },
        {
          t: "choice", q: "Miksi vanhat metsät ja lahopuut ovat tikoille tärkeitä?",
          a: ["Lahopuussa on koloja ja paljon hyönteisiä, jotka ovat tikan ruokaa", "Tikat syövät vain kuorta", "Vanhat puut ovat helppo nostaa"], correct: 0,
          why: "Tikat pesivät puun koloihin ja syövät lahopuun hyönteisiä ja toukkia. Kun metsistä poistetaan lahopuu, tikat menettävät sekä kodin että ruoan.",
        },
        {
          t: "choice", q: "Miksi Lohjan ja Paraisten seudulla kasvaa harvinaisia kasveja?",
          a: ["Siellä on aina kuuma", "Kallioperässä on kalkkikiveä, joka tekee maasta ravinteikkaan", "Siellä ei ole lunta"], correct: 1,
          why: "Kalkki tekee maaperästä emäksistä ja ravinteikasta. Monet vaateliaat kasvit, kuten jotkut kämmekät, kasvavat vain sellaisessa.",
        },
        {
          t: "choice", q: "Miksi saimaannorppa tarvitsee lunta?",
          a: ["Se syö lunta", "Poikaset syntyvät rannan lumikinokseen kaivettuun pesään", "Lumi pitää kalat poissa"], correct: 1,
          why: "Norppaemo kaivaa pesän jäälle kertyneeseen kinokseen. Ilman riittävää lunta pesä jää avoimeksi, ja poikaset ovat vaarassa kylmälle ja pedoille. Muita uhkia ovat verkkoihin hukkuminen, ja ilmastonmuutos tekee talvista vähälumisia.",
        },
        {
          t: "choice", q: "Myyriä on yhtenä vuonna tavallista enemmän. Mitä siitä seuraa?",
          a: ["Petolinnut ja pöllöt pesivät runsaasti ja saavat enemmän poikasia", "Kaikki linnut muuttavat pois", "Hirvet lisääntyvät"], correct: 0,
          why: "Myyrävuosina pöllöillä ja päiväpetolinnuilla on paljon ruokaa. Kun myyrät vähenevät, saaliseläimiä syövät pedot joutuvat etsimään muuta ruokaa.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "totta", name: "Totta vai tarua?", emoji: "🤔", color: "#e8a24a",
      intro: "Myytit ja uskomukset. Moni erehtyy, ja siitä oppii parhaiten!",
      friend: { name: "Otso-karhu", emoji: "🐻", about: "Otso on Suomen kansalliseläin. Se nukkuu talven pesässä, mutta ei ole yhtä sikeässä unessa kuin siili." },
      quiz: [
        {
          t: "choice", q: "\"Karhu nukkuu koko talven.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 2, keep: true,
          why: "Karhu horrostaa talvipesässään noin 5–7 kuukautta, mutta ruumiinlämpö laskee vain muutaman asteen. Se voi herätä ja jopa lähteä pesästä, jos sitä häiritään. Naaraan poikaset syntyvät talvella.",
        },
        {
          t: "choice", q: "\"Kyyn purema on aina kuolemaksi.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 1, keep: true,
          why: "Kuolemat ovat hyvin harvinaisia. Purema on kuitenkin vaarallinen, ja siihen on hakeuduttava lääkäriin, varsinkin lapsilla.",
        },
        {
          t: "choice", q: "\"Kotkat nappaavat vauvoja.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 1, keep: true,
          why: "Kotkat eivät jaksa kantaa ihmislapsia. Maakotkan saaliita ovat esimerkiksi jänikset ja riekot.",
        },
        {
          t: "choice", q: "\"Siili pitää maidosta.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 1, keep: true,
          why: "Siilit ovat laktoosi-intolerantteja, ja maito voi aiheuttaa niille vatsavaivoja. Siilille kelpaa vesi, ja ruoaksi esimerkiksi etanat ja kovakuoriaiset.",
        },
        {
          t: "choice", q: "\"Ilves on Suomen ainoa luonnonvarainen kissaeläin.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 0, keep: true,
          why: "Ilves on meidän ainoa luonnonvarainen kissaeläin. Se on arka ja öinen, joten sen näkeminen on harvinaista.",
        },
        {
          t: "choice", q: "\"Susi ulvoo kuulle.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 1, keep: true,
          why: "Ulvonnalla sudet pitävät yhteyttä toisiinsa ja kertovat reviiristä. Kuu ei vaikuta asiaan.",
        },
        {
          t: "choice", q: "\"Kuikka kulkee maalla huonosti.\"",
          a: ["Totta", "Tarua", "Osittain totta"], correct: 0, keep: true,
          why: "Kuikan jalat ovat kaukana takana, mikä on loistavaa sukeltamiseen mutta hankalaa kävelyssä. Se pesii veden rajalla.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "kartta", name: "Missä päin Suomea?", emoji: "🗺️", color: "#6fb8e8",
      intro: "Klikkaa kartalta oikea alue. Kartta on suuntaa antava.",
      friend: { name: "Pyry-poro", emoji: "🦌", about: "Pyry asuu Lapissa. Porot kaivavat ruokansa lumen alta, ja niillä on lämmin, paksu turkki." },
      quiz: [
        { t: "map", q: "Missä päin Suomea saimaannorppa elää?", correct: "ita", why: "Saimaannorppa elää vain Saimaalla Itä-Suomessa. Se on maailman uhanalaisimpia hylkeitä." },
        { t: "map", q: "Missä on Nuuksion kansallispuisto?", correct: "etela", why: "Nuuksio on Espoossa pääkaupunkiseudun vieressä, joten sinne pääsee helposti myös julkisilla." },
        { t: "map", q: "Missä on Kolin kansallispuisto?", correct: "ita", why: "Koli sijaitsee Pohjois-Karjalassa Pielisen rannalla. Kolin maisemat ovat tunnettuja kansallismaisemia." },
        { t: "map", q: "Missä on Suomen suurin kansallispuisto, Lemmenjoki?", correct: "lappi", why: "Lemmenjoki on Suomen suurin kansallispuisto, noin 2 850 neliökilometriä. Se on Inarin Lapissa, ja alueella on harvinaista vanhaa metsää." },
        { t: "map", q: "Missä on Hossan kansallispuisto, jossa on kalliomaalauksia ja koskia?", correct: "pohjois", why: "Hossa on Suomussalmella, Kainuussa. Alueella on myös Julma-Ölkky, harvinainen kanjonijärvi." },
        { t: "map", q: "Missä on Seitsemisen kansallispuisto, jossa on vanhaa metsää ja suota?", correct: "lansi", why: "Seitseminen on Ikaalisten ja Ruoveden seudulla Pirkanmaalla. Alue on tunnettu vanhasta metsästä ja soista." },
        {
          t: "choice", q: "Mikä näistä elää Suomessa vain tunturialueilla?",
          a: ["Naali", "Orava", "Siili"], correct: 0,
          why: "Naali on Suomen harvinaisimpia nisäkkäitä ja elää tuntureilla Lapissa. Myös tunturikiuru ja tunturipöllö pesivät vain tunturialueilla.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "ihminen", name: "Ihminen ja luonto", emoji: "🧺", color: "#c99be8",
      intro: "Mitä luonnossa saa tehdä? Jokaisenoikeudet ja luonnonsuojelun perusteet.",
      friend: { name: "Olli-orava", emoji: "🐿️", about: "Olli tietää metsän säännöt: älä aiheuta turhaa meteliä, älä roskaa ja jätä pesät rauhaan." },
      quiz: [
        {
          t: "choice", q: "Saatko poimia lakkoja ja mustikoita toisen omistamasta metsästä?",
          a: ["Kyllä, jokaisenoikeudella", "Ei, ilman lupaa ei saa", "Vain omalla pihalla"], correct: 0,
          why: "Luonnonmarjat ja useimmat sienet saa poimia vapaasti, myös toisen maalta. Ei kuitenkaan pihapiirissä eikä suojelualueilla, joissa on omat säännöt.",
        },
        {
          t: "choice", q: "Saatko pystyttää teltan yöksi toisen omistamalle maalle?",
          a: ["Kyllä, lyhyeksi aikaa, kunhan et häiritse asukkaita", "Ei missään tapauksessa", "Vain jos maanomistaja on paikalla"], correct: 0,
          why: "Lyhytaikainen telttailu on jokaisenoikeus, kunhan et mene liian lähelle asutusta. Kansallispuistoissa telttailu on sallittu vain merkityillä paikoilla.",
        },
        {
          t: "choice", q: "Saatko tehdä nuotion toisen omistamalle maalle?",
          a: ["Kyllä, aina", "Ei ilman maanomistajan lupaa", "Vain talvella"], correct: 1,
          why: "Nuotion tekoon tarvitaan maanomistajan lupa. Kuivalla säällä metsäpalovaroituksen aikana avotuli on kielletty.",
        },
        {
          t: "choice", q: "Mikä näistä kasveista on rauhoitettu eikä sitä saa poimia?",
          a: ["Mustikka", "Neidonkenkä (orkidea)", "Puolukka"], correct: 1,
          why: "Neidonkenkä on rauhoitettu orkidea. Kaikki Suomen luonnonvaraiset kämmekät eli orkideat on rauhoitettu, ja moni muukin harvinainen kasvi.",
        },
        {
          t: "choice", q: "Mitä kalastustapaa saa harrastaa ilman lupaa?",
          a: ["Verkkokalastus", "Onkiminen ja pilkkiminen", "Heittokalastus"], correct: 1,
          why: "Onkiminen ja pilkkiminen ovat jokaisenoikeuksia. Muuhun kalastukseen tarvitaan yleensä kalastuksenhoitomaksu tai lupa vesialueen omistajalta.",
        },
        {
          t: "choice", q: "Löydät linnunpesän, jossa on munia. Mitä teet?",
          a: ["Otan munat mukaan", "Pysyn loitolla ja jätän pesän rauhaan", "Siirrän pesän turvaan"], correct: 1,
          why: "Lintujen pesiä ja munia ei saa vahingoittaa eikä ottaa. Jos jäät liian lähelle, emo voi hylätä pesän.",
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: "perinne", name: "Perinne ja kulttuuri", emoji: "📜", color: "#f08f8f",
      intro: "Kalevalan eläimet, vanhat nimet ja sananlaskut.",
      friend: { name: "Jaana-joutsen", emoji: "🦢", about: "Jaana on laulujoutsen. Sen laulu kuuluu kauas, ja se on Suomen kansallislintu." },
      quiz: [
        {
          t: "choice", q: "Mikä näistä EI ole karhun vanha nimi?",
          a: ["Otso", "Mesikämmen", "Hukka"], correct: 2,
          why: "Karhun oikeaa nimeä ei haluttu sanoa ääneen, joten sille keksittiin kunnianimiä kuten otso, kontio ja mesikämmen. Hukka on vanha nimi sudelle.",
        },
        {
          t: "choice", q: "Mitä sananlasku \"Metsä vastaa kuin sinne huudetaan\" tarkoittaa?",
          a: ["Metsässä kaikuu", "Miten itse kohtelet muita, niin sinua kohdellaan", "Metsässä ei saa huutaa"], correct: 1,
          why: "Sananlasku opettaa, että käytös palaa takaisin. Sama ajatus kuuluu: kuten metsään huudetaan, niin sieltä vastataan.",
        },
        {
          t: "choice", q: "Mitä sananlasku \"Parempi pyy pivossa kuin kymmenen oksalla\" tarkoittaa?",
          a: ["Pieni varma on parempi kuin iso epävarma"], correct: 0,
          why: "Parempi tyytyä siihen, mikä on varmaa.",
        },
        {
          t: "choice", q: "Mistä Väinämöisen ensimmäinen kantele tehtiin Kalevalassa?",
          a: ["Hauen leukaluusta", "Karhun hampaasta", "Hirven sarvesta"], correct: 0,
          why: "Väinämöinen teki kanteleen suuren hauen leuasta. Kalevalassa tapahtuu paljon eläinten parissa.",
        },
        {
          t: "choice", q: "Kalevalan mukaan maailma syntyi munasta, jonka lintu muni Ilmattaren polvelle. Mikä lintu?",
          a: ["Sotka", "Kurki", "Joutsen"], correct: 0,
          why: "Sotka muni munan Ilmattaren polvelle. Munan palaset muuttuivat taivaaksi, maaksi, kuuksi ja tähdiksi.",
        },
        {
          t: "choice", q: "Kuka oli suomalaisessa perinteessä metsän haltija?",
          a: ["Tapio", "Ahti", "Ukko"], correct: 0,
          why: "Tapio oli metsän haltija, ja metsästäjät pyysivät häneltä onnea. Ahti oli vetten haltija ja Ukko ylijumala ja ukkosen jumala.",
        },
      ],
    },
  ],
};
