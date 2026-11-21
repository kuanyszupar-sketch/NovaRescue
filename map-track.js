/* NovaRescue: нақты карта + жерасты тоннель + геолокация + бақылау
   Қосылу реті: Leaflet -> script.js -> map-track.js */
(() => {
  const el = document.getElementById("realMap");
  if (!el || !window.L) return;

  /* ---------- Тілдер ---------- */
  const T = {
    ru: { me: "Вы здесь", near: "Ближайший постамат", wh: "Склад NovaRescue", post: "Постамат", portal: "Портал", robot: "Робот-курьер",
      locate: "Моё местоположение", denied: "Геолокация недоступна", demo: "Код не найден — показан демо-заказ",
      st: ["Сортировка на складе", "Робот забрал посылку, выезжает в тоннель", "Робот в тоннеле, до постамата {m} м", "Готово! Постамат: {p}. Ячейка №{c}, PIN: {pin}"] },
    kk: { me: "Сіз осындасыз", near: "Ең жақын постамат", wh: "NovaRescue складі", post: "Постамат", portal: "Портал", robot: "Робот-курьер",
      locate: "Менің орным", denied: "Геолокация қолжетімсіз", demo: "Код табылмады — демо-тапсырыс көрсетілді",
      st: ["Складта сұрыпталуда", "Робот жіберілімді алып, тоннельге шықты", "Робот тоннельде, постаматқа {m} м қалды", "Дайын! Постамат: {p}. №{c} ұяшық, PIN: {pin}"] },
    en: { me: "You are here", near: "Nearest postamat", wh: "NovaRescue warehouse", post: "Postamat", portal: "Portal", robot: "Courier robot",
      locate: "My location", denied: "Geolocation unavailable", demo: "Code not found — showing a demo order",
      st: ["Sorting at the warehouse", "Robot took the parcel and is entering the tunnel", "Robot in the tunnel, {m} m to the postamat", "Done! Postamat: {p}. Cell #{c}, PIN: {pin}"] }
  };
  const tr = () => T[typeof currentLang !== "undefined" ? currentLang : "ru"] || T.ru;

  /* ---------- Желі деректері (координаталар: Алматы/Алатау) ---------- */
  const WH = [43.205, 76.815];
  const POSTS = {
    P2: { n: "ПВЗ №2 — ЖК Highvill", ll: [43.222, 76.851] },
    P4: { n: "ПВЗ №4 — ЖК Botanic City", ll: [43.201, 76.879] },
    P1: { n: "ПВЗ №1 — ЖК Alatau City", ll: [43.238, 76.945] },
    P3: { n: "ПВЗ №3 — Центральная площадь", ll: [43.256, 76.928] }
  };
  const TRUNK = ["W", "P2", "P4", "P1", "P3"];            // жерасты магистраль
  const pt = id => (id === "W" ? WH : POSTS[id].ll);
  const ORDER_TO = ["P1", "P2", "P3"];                     // #orderTo опциялары
  const DUR = 120000;                                      // демо: 2 минут = толық жеткізу

  const dist = (a, b) => { // метр
    const R = 6371000, r = x => x * Math.PI / 180;
    const dLa = r(b[0] - a[0]), dLo = r(b[1] - a[1]);
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  };
  const routeTo = id => TRUNK.slice(0, TRUNK.indexOf(id) + 1).map(pt);
  const routeLen = r => r.slice(1).reduce((s, p, i) => s + dist(r[i], p), 0);
  function along(r, f) { // f: 0..1 -> [lat,lng]
    let left = routeLen(r) * f;
    for (let i = 1; i < r.length; i++) {
      const d = dist(r[i - 1], r[i]);
      if (left <= d) { const k = d ? left / d : 0; return [r[i - 1][0] + (r[i][0] - r[i - 1][0]) * k, r[i - 1][1] + (r[i][1] - r[i - 1][1]) * k]; }
      left -= d;
    }
    return r[r.length - 1];
  }

  /* ---------- Карта ---------- */
  const map = L.map(el, { scrollWheelZoom: false }).setView([43.225, 76.88], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);
  const icon = c => L.divIcon({ className: "", html: `<div class="nr-pin ${c}"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] });

  L.polyline(TRUNK.map(pt), { color: "#FF7A45", weight: 4, dashArray: "2 10", opacity: .9 }).addTo(map);
  L.marker(WH, { icon: icon("pin-wh") }).addTo(map).bindPopup(() => `<b>${tr().wh}</b>`);
  Object.keys(POSTS).forEach(id => {
    L.marker(POSTS[id].ll, { icon: icon("pin-post") }).addTo(map)
      .bindPopup(() => `<b>${POSTS[id].n}</b><br>${tr().post} · ${tr().portal}`);
  });
  map.fitBounds(L.latLngBounds(TRUNK.map(pt)).pad(0.2));

  const robot = L.marker(WH, { icon: icon("pin-robot"), zIndexOffset: 1000 }).addTo(map).bindPopup(() => tr().robot);

  /* ---------- Геолокация ---------- */
  let meMarker, meLine;
  function locate() {
    if (!navigator.geolocation) return alert(tr().denied);
    navigator.geolocation.getCurrentPosition(p => {
      const me = [p.coords.latitude, p.coords.longitude];
      let best = null, bd = Infinity;
      Object.keys(POSTS).forEach(id => { const d = dist(me, POSTS[id].ll); if (d < bd) { bd = d; best = id; } });
      if (meMarker) { map.removeLayer(meMarker); map.removeLayer(meLine); }
      meMarker = L.marker(me, { icon: icon("pin-me") }).addTo(map)
        .bindPopup(`<b>${tr().me}</b><br>${tr().near}: ${POSTS[best].n}<br>${(bd / 1000).toFixed(1)} km`).openPopup();
      meLine = L.polyline([me, POSTS[best].ll], { color: "#8FE38A", weight: 3, dashArray: "4 8" }).addTo(map);
      map.fitBounds(L.latLngBounds([me, POSTS[best].ll]).pad(0.3));
    }, () => alert(tr().denied), { enableHighAccuracy: true, timeout: 10000 });
  }
  const ctl = L.control({ position: "topright" });
  ctl.onAdd = () => { const b = L.DomUtil.create("button", "map-locate"); b.type = "button"; b.textContent = "◎ " + tr().locate; L.DomEvent.on(b, "click", e => { L.DomEvent.stopPropagation(e); locate(); }); return b; };
  ctl.addTo(map);
  document.getElementById("geoBtn")?.addEventListener("click", locate);

  /* ---------- Тапсырыстар мен бақылау ---------- */
  const load = () => { try { return JSON.parse(localStorage.getItem("nr_orders") || "{}"); } catch (e) { return {}; } };
  const save = o => { try { localStorage.setItem("nr_orders", JSON.stringify(o)); } catch (e) {} };
  const hash = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);

  let cur = null, timer = null, routeLine = null;

  function tick() {
    if (!cur) return;
    const p = Math.min(1, (Date.now() - cur.t) / DUR);
    const r = routeTo(cur.to), t = tr();
    const stage = p < 0.08 ? 0 : p < 0.18 ? 1 : p < 1 ? 2 : 3;
    const f = Math.max(0, (p - 0.18) / 0.82);
    robot.setLatLng(p < 0.18 ? WH : along(r, f));
    document.querySelectorAll(".tl-step").forEach((s, i) => s.classList.toggle("active", i <= stage));
    const h = hash(cur.code);
    const msg = t.st[stage].replace("{m}", Math.round(routeLen(r) * (1 - f)))
      .replace("{p}", POSTS[cur.to].n).replace("{c}", (h % 4) + 1).replace("{pin}", String(1000 + h % 9000));
    document.getElementById("trackLocation").hidden = false;
    document.getElementById("trackLocationText").textContent = msg;
    const tk = document.getElementById("ticketLocationText");
    if (tk && cur.fromOrder) tk.textContent = msg;
    if (p >= 1) clearInterval(timer);
  }

  function track(code, order) {
    cur = Object.assign({ code }, order);
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline(routeTo(cur.to), { color: "#7B5CFF", weight: 5, opacity: .9 }).addTo(map);
    clearInterval(timer); tick(); timer = setInterval(tick, 500);
  }

  // Тапсырыс жіберілгенде (script.js кодты жасап болғаннан кейін орындалады)
  document.getElementById("orderForm")?.addEventListener("submit", () => {
    const code = document.getElementById("ticketCode").textContent;
    const to = ORDER_TO[document.getElementById("orderTo").selectedIndex] || "P1";
    const o = load(); o[code] = { to, t: Date.now() }; save(o);
    document.getElementById("trackInput").value = code;
    track(code, { ...o[code], fromOrder: true });
  });

  // Бақылау формасы
  document.getElementById("trackForm")?.addEventListener("submit", () => {
    const code = document.getElementById("trackInput").value.trim().toUpperCase();
    if (!code) return;
    const o = load();
    if (o[code]) return track(code, o[code]);
    const h = hash(code);                                     // демо: кез келген код үшін
    const demo = { to: ORDER_TO[h % 3], t: Date.now() - (h % 100) * 1000 };
    alert(tr().demo);
    track(code, demo);
  });
})();
