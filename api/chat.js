export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, systemContext } = req.body;
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY manquante dans Vercel env vars' });

  try {
    // Build contents: system context injected as first user turn (works with all models)
    const contents = [];

    // First turn: system context as user message + dummy model ack
    contents.push({ role: 'user', parts: [{ text: `[CONTEXTE SYSTÈME]\n${systemContext}\n[FIN CONTEXTE]\n\nCompris. Réponds toujours en français.` }] });
    contents.push({ role: 'model', parts: [{ text: 'Compris ! Je suis le Copilote Dreamwash, prêt à vous aider.' }] });

    // Then the real conversation
    for (const m of messages) {
      contents.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      });
    }

    // Try models in order until one works
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-lite-latest'];
    let lastError = null;

    for (const model of models) {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
          })
        }
      );

      const data = await geminiRes.json();

      if (geminiRes.ok) {
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
          || "Désolé, je n'ai pas pu générer de réponse.";
        return res.json({ reply, model });
      }

      lastError = data.error?.message || `Erreur modèle ${model}`;
      console.error(`Model ${model} failed:`, lastError);
    }

    res.status(500).json({ error: lastError });
  } catch (e) {
    console.error('Handler error:', e);
    res.status(500).json({ error: e.message });
  }
}
