/* NovaRescue: "Жүйе қалай жұмыс істейді" фото секциясы + нақты картаны автоматты қосу.
   index.html-ге тек бір жол керек: <script src="journey.js"></script>  (script.js-тен кейін) */
(() => {
  const D = document;
  const T = {
    ru: { eb: "Система в действии", ti: "Как NovaRescue работает на практике",
      s: [["Заказ принят в кафе", "Ресторан или кафе принимает заказ и собирает его — посылка сразу попадает в очередь NovaRescue."],
          ["Подземная перевозка", "Робот-курьер едет по тоннелю под ЛРТ: без пробок, светофоров и человеческого фактора."],
          ["Пункт выдачи (постамат)", "Робот доставляет посылку к порталу, она попадает в ячейку, клиент открывает её по PIN или QR."],
          ["Склад: приём из других городов и стран", "Грузы из других городов и из-за рубежа сканируются на складе, сортируются и сразу уходят в сеть доставки."]] },
    kk: { eb: "Жүйе әрекетте", ti: "NovaRescue іс жүзінде қалай жұмыс істейді",
      s: [["Кафеде тапсырыс қабылданды", "Мейрамхана немесе кафе тапсырысты қабылдап, жинайды — жіберілім бірден NovaRescue кезегіне түседі."],
          ["Жерасты тасымалы", "Робот-курьер ЛРТ астындағы тоннельмен жүреді: кептеліссіз, бағдаршамсыз және адами факторсыз."],
          ["Тапсырыс беру пункті (постамат)", "Робот жіберілімді порталға жеткізеді, ол ұяшыққа түседі, клиент оны PIN немесе QR арқылы ашады."],
          ["Склад: басқа қала мен елден келген жүк", "Басқа қалалардан және шетелден келген жүктер складта сканерленеді, сұрыпталады және бірден жеткізу желісіне жіберіледі."]] },
    en: { eb: "The system in action", ti: "How NovaRescue works in practice",
      s: [["Order accepted at the café", "A restaurant or café accepts and packs the order — the parcel instantly enters the NovaRescue queue."],
          ["Underground transport", "The courier robot rides a tunnel beneath the LRT: no traffic, no lights, no human factor."],
          ["Pickup point (postamat)", "The robot brings the parcel to the portal, it drops into a cell, and the customer opens it with a PIN or QR."],
          ["Warehouse: arrivals from other cities and countries", "Goods from other cities and abroad are scanned, sorted and sent straight into the delivery network."]] }
  };
  const IMG = ["step1-cafe-order", "step2-underground", "step3-pickup-point", "step4-warehouse"];
  const lang = () => (typeof currentLang !== "undefined" ? currentLang : "ru");

  /* ---------- Стиль ---------- */
  const st = D.createElement("style");
  st.textContent = `.journey-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
  .journey-card{margin:0;background:var(--bg-alt);border:1px solid var(--line);border-radius:20px;overflow:hidden;transition:transform .35s var(--ease),border-color .35s}
  .journey-card:hover{transform:translateY(-6px);border-color:var(--flame)}
  .journey-card img{width:100%;height:260px;object-fit:cover}
  .journey-card div{padding:18px 20px 22px}
  .journey-card b{font-family:var(--mono);color:var(--flame);font-size:.8rem}
  .journey-card h3{font-size:1.1rem;margin:6px 0 8px}
  .journey-card p{margin:0;color:var(--muted);font-size:.9rem}
  @media(max-width:700px){.journey-grid{grid-template-columns:1fr}.journey-card img{height:210px}}`;
  D.head.appendChild(st);

  /* ---------- Фото секциясы ---------- */
  const sec = D.createElement("section");
  sec.className = "section"; sec.id = "journey";
  const mapSec = D.getElementById("map");
  if (mapSec) mapSec.parentNode.insertBefore(sec, mapSec);
  const render = () => {
    const t = T[lang()] || T.ru;
    sec.innerHTML = `<div class="section-head"><span class="section-eyebrow">${t.eb}</span><h2>${t.ti}</h2></div>
    <div class="journey-grid">${t.s.map((s, i) => `<figure class="journey-card"><img src="${IMG[i]}.jpg" alt="${s[0]}" loading="lazy" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='assets/'+this.getAttribute('src')}">
      <div><b>0${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div></figure>`).join("")}</div>`;
  };
  render();
  D.getElementById("langSwitch")?.addEventListener("click", () => setTimeout(render, 0));

  /* ---------- Нақты карта ---------- */
  const old = D.getElementById("cityMap");
  if (old && !D.getElementById("realMap")) { const m = D.createElement("div"); m.id = "realMap"; old.replaceWith(m); }
  const css = h => { const l = D.createElement("link"); l.rel = "stylesheet"; l.href = h; D.head.appendChild(l); };
  const js = s => new Promise(r => { const e = D.createElement("script"); e.src = s; e.onload = r; e.onerror = r; D.body.appendChild(e); });

  (async () => {
    if (!window.L) {
      css("https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css");
      await js("https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js");
    }
    if (!D.querySelector('link[href*="map-track.css"]')) css("map-track.css");
    if (!D.querySelector('script[src*="map-track.js"]')) await js("map-track.js");
    if (!D.querySelector('script[src*="robot-link.js"]')) await js("robot-link.js");
    if (!D.querySelector('script[src*="ai-chat.js"]')) await js("ai-chat.js");
  })();
})();
