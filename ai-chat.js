/* NovaRescue AI көмекші (чат). Екі режим:
   1) AI_ENDPOINT бос болса: кілтсіз жұмыс істейтін жергілікті көмекші (FAQ + трек-код бойынша статус)
   2) AI_ENDPOINT-қа Cloudflare Worker сілтемесін қойсаңыз: нағыз AI (Claude) жауап береді
   API кілтін ЕШҚАШАН осы файлға жазбаңыз: GitHub-та бәрі көрінеді! Кілт тек Worker-де сақталады. */
(() => {
  const AI_ENDPOINT = "";   // мысалы: "https://novarescue-ai.логин.workers.dev"

  const T = {
    ru: { title: "NovaRescue AI", ph: "Спросите о доставке…", send: "➤", hi: "Привет! Я помощник NovaRescue. Спросите, как работает доставка, где пункты выдачи, или пришлите трек-код (NR-123456).",
      err: "Не удалось получить ответ. Попробуйте ещё раз.", wait: "Думаю…" },
    kk: { title: "NovaRescue AI", ph: "Жеткізу туралы сұраңыз…", send: "➤", hi: "Сәлем! Мен NovaRescue көмекшісімін. Жеткізу қалай жұмыс істейтінін, пункттер қайда екенін сұраңыз немесе трек-кодты (NR-123456) жіберіңіз.",
      err: "Жауап алу мүмкін болмады. Қайта көріңіз.", wait: "Ойланып жатырмын…" },
    en: { title: "NovaRescue AI", ph: "Ask about delivery…", send: "➤", hi: "Hi! I'm the NovaRescue assistant. Ask how delivery works, where pickup points are, or send a tracking code (NR-123456).",
      err: "Could not get a reply. Please try again.", wait: "Thinking…" }
  };
  const KB = {   // жергілікті режим: кілт сөздер -> жауап
    ru: [[/как|работает|принцип|тоннел|подзем/i, "Склад на окраине сортирует посылки, курьер-робот везёт их подземным тоннелем под линиями ЛРТ к ближайшему пункту выдачи (постамату). Там посылка попадает в ячейку, и вы открываете её по PIN или QR."],
         [/пункт|пвз|постамат|адрес|где/i, "Пункты выдачи: №1 — ЖК Alatau City (пр. Момышулы, 15), №2 — ЖК Highvill (ул. Аль-Фараби, 140), №3 — Центральная площадь (пл. Республики, 3), №4 — ЖК Botanic City (ул. Ботанический сад, 8). Ближайший можно найти по геолокации на карте."],
         [/врем|долго|быстр|мин|скорост/i, "Средняя доставка — меньше 35 минут: робот едет под землёй, без пробок и светофоров."],
         [/заказ|оформ|как заказать/i, "Выберите пункт выдачи, затем откуда забрать и что доставить, и нажмите «Отправить заказ». Вы получите трек-номер и штрихкод."],
         [/связ|контакт|whatsapp|ватсап|телефон/i, "Напишите нам в WhatsApp: +7 747 049 64 33 (кнопка внизу справа)."],
         [/кто|команд|школ|создател/i, "Проект NovaRescue создала команда Школы-гимназии №28 (г. Алатау)."]],
    kk: [[/қалай|жұмыс|принцип|тоннел|жерасты/i, "Қала шетіндегі склад жіберілімдерді сұрыптайды, робот-курьер оларды ЛРТ астындағы жерасты тоннелімен ең жақын пунктке (постаматқа) жеткізеді. Ол жерде жіберілім ұяшыққа түседі, сіз оны PIN немесе QR арқылы ашасыз."],
         [/пункт|пвз|тап|постамат|мекенжай|қайда/i, "Пункттер: №1 — Alatau City ЖК (Момышұлы д-лы, 15), №2 — Highvill ЖК (Әл-Фараби к-сі, 140), №3 — Орталық алаң (Республика алаңы, 3), №4 — Botanic City ЖК (Ботаникалық бақ к-сі, 8). Ең жақынын картадағы геолокация арқылы табуға болады."],
         [/уақыт|ұзақ|жылдам|мин|жылдамдық/i, "Орташа жеткізу уақыты 35 минуттан аз: робот жер астымен, кептеліссіз және бағдаршамсыз жүреді."],
         [/тапсырыс|рәсімде|қалай бер/i, "Алдымен тапсырыс алу пунктін, сосын қайдан алуды және не жеткізуді таңдап, «Отправить заказ» басыңыз. Трек-нөмір мен штрихкод аласыз."],
         [/байланыс|whatsapp|ватсап|телефон/i, "WhatsApp-қа жазыңыз: +7 747 049 64 33 (оң жақ төменгі батырма)."],
         [/кім|команда|мектеп|жасаушы/i, "NovaRescue жобасын №28 мектеп-гимназиясының командасы жасады (Алатау қ.)."]],
    en: [[/how|work|principle|tunnel|underground/i, "A warehouse on the city's edge sorts parcels, and a courier robot carries them through an underground tunnel beneath the LRT to the nearest pickup point (postamat). The parcel drops into a cell and you open it with a PIN or QR."],
         [/point|pickup|postamat|address|where/i, "Pickup points: #1 Alatau City (15 Momyshuly Ave.), #2 Highvill (140 Al-Farabi St.), #3 Central Square (3 Republic Sq.), #4 Botanic City (8 Botanic Garden St.). Find the nearest by geolocation on the map."],
         [/time|long|fast|min|speed/i, "Average delivery is under 35 minutes: the robot travels underground, with no traffic or lights."],
         [/order|place/i, "Pick a pickup point, then where to collect from and what to deliver, and press “Send order”. You get a tracking number and barcode."],
         [/contact|whatsapp|phone/i, "Message us on WhatsApp: +7 747 049 64 33 (button at the bottom right)."],
         [/who|team|school|creator/i, "NovaRescue was created by the team of School-Gymnasium No. 28 (Alatau)."]]
  };
  const lang = () => (typeof currentLang !== "undefined" && T[currentLang] ? currentLang : "ru");
  const DUR = 120000;

  function trackReply(code) {
    let o = {}; try { o = JSON.parse(localStorage.getItem("nr_orders") || "{}"); } catch (_) {}
    const ord = o[code]; const l = lang();
    if (!ord) return { ru: `Посылка ${code} не найдена на этом устройстве. Проверьте код.`, kk: `${code} жіберіліміне осы құрылғыда табылмады. Кодты тексеріңіз.`, en: `Parcel ${code} not found on this device. Check the code.` }[l];
    const p = Math.min(1, (Date.now() - ord.t) / DUR);
    const st = p < 0.08 ? 0 : p < 0.18 ? 1 : p < 1 ? 2 : 3;
    const S = { ru: ["сортируется на складе", "передана роботу", "в подземном тоннеле", "ожидает вас в пункте выдачи"],
                kk: ["складта сұрыпталуда", "роботқа берілді", "жерасты тоннелінде", "пунктте сізді күтіп тұр"],
                en: ["being sorted at the warehouse", "handed to the robot", "in the underground tunnel", "waiting for you at the pickup point"] };
    return { ru: `Посылка ${code}: ${S.ru[st]} (${Math.round(p * 100)}% пути).`, kk: `${code} жіберілімі: ${S.kk[st]} (жолдың ${Math.round(p * 100)}%).`, en: `Parcel ${code}: ${S.en[st]} (${Math.round(p * 100)}% of the route).` }[l];
  }
  function localAnswer(q) {
    const m = q.match(/NR-\d{6}/i);
    if (m) return trackReply(m[0].toUpperCase());
    for (const [re, a] of KB[lang()]) if (re.test(q)) return a;
    return { ru: "Я отвечаю на вопросы о NovaRescue: как работает доставка, пункты выдачи, заказ, трек-код. Спросите что-нибудь из этого.", kk: "Мен NovaRescue туралы сұрақтарға жауап беремін: жеткізу, пункттер, тапсырыс, трек-код. Осылардың бірін сұраңыз.", en: "I answer questions about NovaRescue: how delivery works, pickup points, ordering, tracking. Ask me one of those." }[lang()];
  }

  /* ---------- UI ---------- */
  const st = document.createElement("style");
  st.textContent = `.ai-fab{position:fixed;right:18px;bottom:86px;z-index:60;width:56px;height:56px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--purple),var(--flame));color:#fff;font-size:1.4rem;cursor:pointer;box-shadow:0 10px 26px rgba(0,0,0,.5)}
  .ai-panel{position:fixed;right:18px;bottom:152px;z-index:61;width:min(340px,calc(100vw - 36px));height:420px;max-height:70vh;display:none;flex-direction:column;background:var(--bg-alt);border:1px solid var(--line);border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.6);overflow:hidden}
  .ai-panel.open{display:flex}.ai-head{padding:12px 16px;font-family:var(--display);font-weight:600;border-bottom:1px solid var(--line);display:flex;justify-content:space-between}
  .ai-head button{background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.1rem}
  .ai-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
  .ai-m{max-width:85%;padding:9px 12px;border-radius:12px;font-size:.88rem;line-height:1.45;white-space:pre-wrap}
  .ai-m.bot{background:var(--bg);border:1px solid var(--line);align-self:flex-start}.ai-m.me{background:var(--purple);color:#fff;align-self:flex-end}
  .ai-in{display:flex;gap:8px;padding:10px;border-top:1px solid var(--line)}
  .ai-in input{flex:1;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px;color:var(--cream)}
  .ai-in button{background:var(--purple);border:none;border-radius:10px;color:#fff;padding:0 14px;cursor:pointer}`;
  document.head.appendChild(st);

  const fab = document.createElement("button"); fab.className = "ai-fab"; fab.textContent = "AI"; fab.setAttribute("aria-label", "AI");
  const panel = document.createElement("div"); panel.className = "ai-panel";
  panel.innerHTML = `<div class="ai-head"><span></span><button type="button" aria-label="close">✕</button></div><div class="ai-msgs"></div>
    <div class="ai-in"><input type="text"><button type="button"></button></div>`;
  document.body.append(fab, panel);
  const msgsEl = panel.querySelector(".ai-msgs"), input = panel.querySelector("input"), sendBtn = panel.querySelector(".ai-in button");
  const history = [];
  const add = (txt, who) => { const d = document.createElement("div"); d.className = "ai-m " + who; d.textContent = txt; msgsEl.appendChild(d); msgsEl.scrollTop = msgsEl.scrollHeight; return d; };
  const label = () => { const t = T[lang()]; panel.querySelector(".ai-head span").textContent = "🤖 " + t.title; input.placeholder = t.ph; sendBtn.textContent = t.send; };
  label();
  fab.onclick = () => { panel.classList.toggle("open"); if (panel.classList.contains("open") && !msgsEl.children.length) add(T[lang()].hi, "bot"); label(); input.focus(); };
  panel.querySelector(".ai-head button").onclick = () => panel.classList.remove("open");
  document.getElementById("langSwitch")?.addEventListener("click", () => setTimeout(label, 0));

  async function ask() {
    const q = input.value.trim(); if (!q) return;
    input.value = ""; add(q, "me"); history.push({ role: "user", content: q });
    const wait = add(T[lang()].wait, "bot");
    let a;
    try {
      if (AI_ENDPOINT) {
        const r = await fetch(AI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-8), lang: lang() }) });
        a = (await r.json()).reply;
      } else a = localAnswer(q);
    } catch (_) { a = T[lang()].err; }
    wait.textContent = a || T[lang()].err; history.push({ role: "assistant", content: wait.textContent });
  }
  sendBtn.onclick = ask;
  input.addEventListener("keydown", e => { if (e.key === "Enter") ask(); });
})();
