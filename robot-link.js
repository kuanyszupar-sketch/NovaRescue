/* NovaRescue <-> LEGO SPIKE Prime (Pybricks firmware) Bluetooth көпірі.
   "Отправить заказ" басылғанда: хабқа қосылады (бірінші рет терезе шығады) -> робот жүре бастайды.
   Chrome/Edge керек (компьютер немесе Android). */
(() => {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const SVC = "c5f50001-8280-46da-89f4-6d8051e4aeef";   // Pybricks service
  const CHR = "c5f50002-8280-46da-89f4-6d8051e4aeef";   // command/event characteristic
  const L = {
    ru: { conn: "Подключить робота", ok: "Робот подключён", no: "Bluetooth не поддерживается (нужен Chrome/Edge)", wait: "Выберите робота в окне Bluetooth…",
      accepted: "Заказ принят · робот выехал", warn: "Заказ принят · робот не подключён", arrived: "Робот у пункта выдачи", home: "Робот вернулся на склад" },
    kk: { conn: "Роботты қосу", ok: "Робот қосылды", no: "Bluetooth қолдау таппайды (Chrome/Edge керек)", wait: "Bluetooth терезесінде роботты таңдаңыз…",
      accepted: "Тапсырыс қабылданды · робот жолға шықты", warn: "Тапсырыс қабылданды · робот қосылмаған", arrived: "Робот пунктке жетті", home: "Робот складқа оралды" },
    en: { conn: "Connect robot", ok: "Robot connected", no: "Bluetooth not supported (use Chrome/Edge)", wait: "Pick the robot in the Bluetooth window…",
      accepted: "Order accepted · robot is on its way", warn: "Order accepted · robot not connected", arrived: "Robot is at the pickup point", home: "Robot is back at the warehouse" }
  };
  const t = () => L[typeof currentLang !== "undefined" ? currentLang : "ru"] || L.ru;

  /* ---------- UI: алдымен ЖК таңдалады ---------- */
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
    if (v.getUint8(0) !== 1) return;                                   // 0x01 = stdout
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

  async function open(dev) {
    dev.addEventListener("gattserverdisconnected", () => { chr = null; info.textContent = ""; btn.textContent = "🤖 " + t().conn; });
    const server = await dev.gatt.connect();
    const svc = await server.getPrimaryService(SVC);
    chr = await svc.getCharacteristic(CHR);
    chr.addEventListener("characteristicvaluechanged", onData);
    await chr.startNotifications();
    btn.textContent = "✓ " + (dev.name || "Robot");
    info.textContent = t().ok;
  }

  // ВАЖНО: requestDevice басқанда (user gesture) бірден шақырылуы керек, алдында await болмасын
  async function connect() {
    if (chr) return true;
    if (!navigator.bluetooth) { info.textContent = t().no; return false; }
    try {
      info.textContent = t().wait;
      const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: [SVC] }] });
      await open(dev);
      return true;
    } catch (err) { info.textContent = String(err.message || err); return false; }
  }

  btn.addEventListener("click", connect);

  /* ---------- Тапсырыс қабылданды -> робот жолға шығады ---------- */
  form.addEventListener("submit", async () => {
    const n = document.getElementById("orderTo").selectedIndex + 1;    // 1, 2, 3 = ЖК нөмірі
    const ok = chr ? true : await connect();                           // қосылмаған болса, Bluetooth терезесі шығады
    if (!ok) { setStatus(t().warn); return; }
    setStatus(t().accepted);
    try { await send(String(n)); } catch (err) { info.textContent = String(err.message || err); }
  });
})();
