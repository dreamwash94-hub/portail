export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: 'RESEND_API_KEY manquante dans Vercel env vars' });

  const { to, subject, body, from } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'to, subject et body sont requis' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from || 'Dreamwash <reservation@dreamwash.fr>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html: body.replace(/\n/g, '<br>'),
        text: body
      })
    });

    const data = await r.json();

    if (!r.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: data.message || 'Erreur Resend' });
    }

    res.json({ success: true, id: data.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
