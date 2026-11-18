export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Csak POST kérés engedélyezett." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "A szerveren még nincs beállítva a GROQ_API_KEY." });
  }

  const incoming = req.body?.messages;
  if (!Array.isArray(incoming) || incoming.length < 1 || incoming.length > 30) {
    return res.status(400).json({ error: "Érvénytelen beszélgetési előzmény." });
  }

  const messages = [];
  for (const item of incoming) {
    if (!item || !["user", "assistant"].includes(item.role) ||
        typeof item.content !== "string" || !item.content.trim() ||
        item.content.length > 8000) {
      return res.status(400).json({ error: "Érvénytelen üzenet." });
    }
    messages.push({ role: item.role, content: item.content.trim() });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Te a BEST AI vagy, egy barátságos, segítőkész és intelligens magyar asszisztens. Alapértelmezetten mindig magyarul válaszolj. Ha a felhasználó más nyelvet kér, válaszolj azon a nyelven. Légy világos és pontos." },
          ...messages
        ],
        max_completion_tokens: 2048
      }),
      signal: AbortSignal.timeout(55000)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.error?.message || `A Groq API hibát adott (${response.status}).`;
      return res.status(response.status === 429 ? 429 : 502).json({ error: message });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(502).json({ error: "A Groq API nem adott szöveges választ." });
    }
    return res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    const message = error.name === "TimeoutError"
      ? "Az AI válasza túl sokáig tartott. Próbáld újra."
      : "Nem sikerült elérni a Groq szolgáltatást.";
    return res.status(502).json({ error: message });
  }
}
