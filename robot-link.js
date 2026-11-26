/* NovaRescue <-> LEGO SPIKE Prime (Pybricks) Bluetooth көпірі.
   Chrome/Edge (компьютер немесе Android) керек. Сайт HTTPS-те болуы керек (GitHub Pages - иә). */
(() => {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const SVC = "c5f50001-8280-46da-89f4-6d8051e4aeef";   // Pybricks service
  const CHR = "c5f50002-8280-46da-89f4-6d8051e4aeef";   // command/event characteristic
  const L = {
    ru: { conn: "Подключить робота", ok: "Робот подключён", no: "Bluetooth не поддерживается (нужен Chrome/Edge)",
      accepted: "Заказ принят · робот выехал", warn: "Заказ принят · робот не подключён", arrived: "Робот у пункта выдачи", home: "Робот вернулся на склад" },
    kk: { conn: "Роботты қосу", ok: "Робот қосылды", no: "Bluetooth қолдау таппайды (Chrome/Edge керек)",
      accepted: "Тапсырыс қабылданды · робот жолға шықты", warn: "Тапсырыс қабылданды · робот қосылмаған", arrived: "Робот пунктке жетті", home: "Робот складқа оралды" },
    en: { conn: "Connect robot", ok: "Robot connected", no: "Bluetooth not supported (use Chrome/Edge)",
      accepted: "Order accepted · robot is on its way", warn: "Order accepted · robot not connected", arrived: "Robot is at the pickup point", home: "Robot is back at the warehouse" }
  };
  const t = () => L[typeof currentLang !== "undefined" ? currentLang : "ru"] || L.ru;

  /* ---------- UI: алдымен ЖК таңдалады, сосын қайдан алу ---------- */
  const st = document.createElement("style");
  st.textContent = ".field-row label:nth-child(2){order:-1}";
  document.head.appendChild(st);

  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "geo-btn"; btn.id = "robotBtn"; btn.textContent = "🤖 " + t().conn;
  const info = document.createElement("p");
  info.className = "geo-result"; info.id = "robotState";
  const submit = form.querySelector('button[type="submit"]');
  form.insertBefore(btn, submit); form.insertBefore(info, submit);

  const setStatus = txt => { const s = document.getElementById("ticketStatus"); if (s) s.textContent = txt; };

  /* ---------- Bluetooth ---------- */
  let chr = null, buf = "";

  function onData(e) {
    const v = e.target.value;
    if (v.getUint8(0) !== 1) return;                                   // 0x01 = stdout оқиғасы
    buf += new TextDecoder().decode(new Uint8Array(v.buffer, v.byteOffset + 1, v.byteLength - 1));
    if (buf.includes("ARRIVED")) { setStatus(t().arrived); buf = ""; }
    else if (buf.includes("HOME")) { setStatus(t().home); buf = ""; }
    else if (buf.length > 200) buf = buf.slice(-50);
  }

  async function send(text) {
    const d = new TextEncoder().encode(text), p = new Uint8Array(d.length + 1);
    p[0] = 6; p.set(d, 1);                                             // 0x06 = write stdin
    await chr.writeValueWithResponse(p);
  }

  btn.addEventListener("click", async () => {
    if (!navigator.bluetooth) { info.textContent = t().no; return; }
    try {
      const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: [SVC] }] });
      dev.addEventListener("gattserverdisconnected", () => { chr = null; info.textContent = ""; btn.textContent = "🤖 " + t().conn; });
      const server = await dev.gatt.connect();
      const svc = await server.getPrimaryService(SVC);
      chr = await svc.getCharacteristic(CHR);
      chr.addEventListener("characteristicvaluechanged", onData);
      await chr.startNotifications();
      btn.textContent = "✓ " + (dev.name || "Robot");
      info.textContent = t().ok;
    } catch (err) { info.textContent = String(err.message || err); }
  });

  /* ---------- Тапсырыс қабылданды -> робот жолға шығады ---------- */
  form.addEventListener("submit", () => {                              // script.js ticket-ті жасап болғаннан кейін
    const n = document.getElementById("orderTo").selectedIndex + 1;    // 1, 2, 3 = ЖК нөмірі
    if (!chr) { setStatus(t().warn); return; }
    setStatus(t().accepted);
    send(String(n)).catch(err => { info.textContent = String(err.message || err); });
  });
})();
