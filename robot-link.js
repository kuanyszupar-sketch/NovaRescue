/* NovaRescue <-> LEGO SPIKE Prime (стандартты LEGO firmware, SPIKE App 3) Bluetooth көпірі.
   Ресми хаттама: https://lego.github.io/spike-prime-docs
   "Отправить заказ" басылғанда: хабқа қосылады -> ЖК нөміріне сәйкес слотты іске қосады.
   Қандай ЖК таңдалса да, хабтағы бағдарлама слоты іске қосылады (SLOT_FOR_POINT тізімі). Chrome/Edge керек. */

// CODEC-START
const NRCobs = (() => {
  const DELIM = 0x02, NO_DELIM = 0xFF, OFFSET = 2, MAXB = 84, XOR = 3;
  function encode(data) {
    const buf = []; let ci = 0, block = 0;
    const begin = () => { ci = buf.length; buf.push(NO_DELIM); block = 1; };
    begin();
    for (const byte of data) {
      if (byte > DELIM) { buf.push(byte); block++; }
      if (byte <= DELIM || block > MAXB) {
        if (byte <= DELIM) buf[ci] = byte * MAXB + block + OFFSET;
        begin();
      }
    }
    buf[ci] = block + OFFSET;
    return buf;
  }
  function decode(data) {
    const out = [];
    const unesc = c => {
      if (c === 0xFF) return [null, MAXB + 1];
      let value = Math.floor((c - OFFSET) / MAXB), block = (c - OFFSET) % MAXB;
      if (block === 0) { block = MAXB; value -= 1; }
      return [value, block];
    };
    let [value, block] = unesc(data[0]);
    for (let i = 1; i < data.length; i++) {
      block--;
      if (block > 0) { out.push(data[i]); continue; }
      if (value !== null) out.push(value);
      [value, block] = unesc(data[i]);
    }
    return out;
  }
  const pack = data => { const b = encode(data).map(x => x ^ XOR); b.push(DELIM); return Uint8Array.from(b); };
  const unpack = frame => {                          // frame: ағымдағы хабарлама, соңғы 0x02-сіз
    const f = frame[0] === 0x01 ? frame.slice(1) : frame;
    return decode(f.map(x => x ^ XOR));
  };
  return { pack, unpack };
})();
// CODEC-END

(() => {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const SVC = "0000fd02-0000-1000-8000-00805f9b34fb";
  const RX  = "0000fd02-0001-1000-8000-00805f9b34fb";   // хабқа жазу
  const TX  = "0000fd02-0002-1000-8000-00805f9b34fb";   // хабтан хабарлама
  // ЖК №1, №2, №3 үшін хабтағы слот нөмірі. Қазір бәрі "ту кызыл" жобасы тұрған 6-слот.
  // Әр ЖК үшін бөлек жоба жасасаңыз, мысалы [6, 7, 8] деп өзгертіңіз. Слот ығысса, ±1 көріңіз.
  const SLOT_FOR_POINT = [6, 6, 6];

  const L = {
    ru: { conn: "Подключить робота", ok: "Робот подключён", no: "Bluetooth не поддерживается (нужен Chrome/Edge)", wait: "Выберите робота в окне Bluetooth…",
      accepted: "Заказ принят · робот выехал", warn: "Заказ принят · робот не подключён", nack: "Робот не запустил программу — проверьте слот на хабе",
      arrived: "Робот у пункта выдачи", done: "Робот завершил маршрут · заказ у пункта выдачи" },
    kk: { conn: "Роботты қосу", ok: "Робот қосылды", no: "Bluetooth қолдау таппайды (Chrome/Edge керек)", wait: "Bluetooth терезесінде роботты таңдаңыз…",
      accepted: "Тапсырыс қабылданды · робот жолға шықты", warn: "Тапсырыс қабылданды · робот қосылмаған", nack: "Робот бағдарламаны іске қоспады — хабтағы слотты тексеріңіз",
      arrived: "Робот пунктке жетті", done: "Робот маршрутты аяқтады · тапсырыс пункте" },
    en: { conn: "Connect robot", ok: "Robot connected", no: "Bluetooth not supported (use Chrome/Edge)", wait: "Pick the robot in the Bluetooth window…",
      accepted: "Order accepted · robot is on its way", warn: "Order accepted · robot not connected", nack: "Robot did not start the program — check the hub slot",
      arrived: "Robot is at the pickup point", done: "Robot finished the route · order at the pickup point" }
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
  let rx = null, maxPacket = 20, rxBuf = [], waiters = [];

  function handle(msg) {
    const type = msg[0];
    if (type === 0x01 && msg.length >= 11) maxPacket = msg[9] | (msg[10] << 8);          // InfoResponse
    if (type === 0x20 && msg[1] === 0x01) setStatus(t().done);                           // ProgramFlowNotification: Stop
    if (type === 0x21) {                                                                  // ConsoleNotification (print)
      const txt = String.fromCharCode(...msg.slice(1).filter(c => c > 0));
      if (txt.includes("ARRIVED")) setStatus(t().arrived);
    }
    waiters = waiters.filter(w => { if (w.type === type) { w.resolve(msg); return false; } return true; });
  }
  function onNotify(e) {
    const v = new Uint8Array(e.target.value.buffer, e.target.value.byteOffset, e.target.value.byteLength);
    for (const b of v) {
      if (b === 0x02) { if (rxBuf.length) { try { handle(NRCobs.unpack(rxBuf)); } catch (_) {} } rxBuf = []; }
      else if (b === 0x01) rxBuf = [];
      else rxBuf.push(b);
    }
  }
  const waitFor = (type, ms = 3000) => new Promise((resolve, reject) => {
    waiters.push({ type, resolve });
    setTimeout(() => reject(new Error("timeout")), ms);
  });
  async function send(bytes) {
    const frame = NRCobs.pack(bytes);
    for (let i = 0; i < frame.length; i += maxPacket) await rx.writeValueWithoutResponse(frame.slice(i, i + maxPacket));
  }

  // ВАЖНО: requestDevice басқанда (user gesture) бірден шақырылады, алдында await жоқ
  async function connect() {
    if (rx) return true;
    if (!navigator.bluetooth) { info.textContent = t().no; return false; }
    try {
      info.textContent = t().wait;
      const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: [SVC] }] });
      dev.addEventListener("gattserverdisconnected", () => { rx = null; info.textContent = ""; btn.textContent = "🤖 " + t().conn; });
      const server = await dev.gatt.connect();
      const svc = await server.getPrimaryService(SVC);
      rx = await svc.getCharacteristic(RX);
      const tx = await svc.getCharacteristic(TX);
      tx.addEventListener("characteristicvaluechanged", onNotify);
      await tx.startNotifications();
      const infoReply = waitFor(0x01);
      await send([0x00]);                                  // InfoRequest
      await infoReply.catch(() => {});
      btn.textContent = "✓ " + (dev.name || "Robot");
      info.textContent = t().ok;
      return true;
    } catch (err) { rx = null; info.textContent = String(err.message || err); return false; }
  }
  btn.addEventListener("click", connect);

  /* ---------- Тапсырыс қабылданды -> робот жолға шығады ---------- */
  form.addEventListener("submit", async () => {
    const n = document.getElementById("orderTo").selectedIndex;        // 0,1,2 = ЖК №1,2,3
    const ok = rx ? true : await connect();                            // қосылмаған болса, Bluetooth терезесі шығады
    if (!ok) { setStatus(t().warn); return; }
    try {
      const reply = waitFor(0x1F);
      await send([0x1E, 0x00, SLOT_FOR_POINT[n] ?? 6]);                         // ProgramFlowRequest: Start, slot
      const r = await reply;
      if (r[1] === 0x00) setStatus(t().accepted); else setStatus(t().nack);
    } catch (err) { info.textContent = String(err.message || err); setStatus(t().accepted); }
  });
})();
