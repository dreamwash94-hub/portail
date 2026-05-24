export default async function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return res.json({ status: 'ERROR', message: 'GEMINI_API_KEY absente des variables Vercel' });
  }

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
    );
    const data = await r.json();

    if (!r.ok) {
      return res.json({ status: 'API_ERROR', httpStatus: r.status, error: data.error });
    }

    const models = (data.models || []).map(m => m.name);
    res.json({ status: 'OK', keyPresent: true, keyPrefix: key.slice(0,8)+'...', models });
  } catch (e) {
    res.json({ status: 'FETCH_ERROR', error: e.message });
  }
}
