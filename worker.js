// Cloudflare Worker: сайт пен Anthropic API арасындағы қауіпсіз көпір (API кілті осында ғана сақталады).
// Баптау: Workers -> Settings -> Variables and Secrets:
//   ANTHROPIC_API_KEY  (Secret)  - console.anthropic.com-дан алынған кілт
//   ALLOWED_ORIGIN     (Text)    - https://ЛОГИН.github.io  (сіздің сайт, соңында / жоқ)
const SYSTEM = `You are the assistant of NovaRescue, a school project of School-Gymnasium No. 28 (Alatau, Kazakhstan).
NovaRescue is an autonomous delivery network: a warehouse on the city's edge sorts parcels, a courier robot carries them through underground tunnels beneath the LRT lines to the nearest pickup point (postamat), where the parcel goes into a cell and the customer opens it with a PIN or QR. Average delivery is under 35 minutes, no traffic.
Pickup points: #1 Alatau City (Momyshuly Ave. 15), #2 Highvill (Al-Farabi St. 140), #3 Central Square (Republic Sq. 3), #4 Botanic City (Botanic Garden St. 8).
Contact: WhatsApp +7 747 049 64 33. The project was presented to a Vice Minister of Kazakhstan and an advisor to the President.
Answer briefly (max 3-4 sentences), politely, in the user's language. If you do not know something, say so; never invent facts, prices or timings.`;

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "";
    const cors = { "Access-Control-Allow-Origin": allowed, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST" || origin !== allowed) return new Response("Forbidden", { status: 403, headers: cors });

    let body; try { body = await req.json(); } catch { return new Response("Bad request", { status: 400, headers: cors }); }
    let msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-8)
      .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 500) }));
    while (msgs.length && msgs[0].role !== "user") msgs.shift();
    if (!msgs.length) return new Response("Bad request", { status: 400, headers: cors });

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-5-5", max_tokens: 400, system: SYSTEM, messages: msgs })
    });
    const data = await r.json();
    const reply = data.content?.[0]?.text || "…";
    return new Response(JSON.stringify({ reply }), { headers: { ...cors, "Content-Type": "application/json" } });
  }
};
