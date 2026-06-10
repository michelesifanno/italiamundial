/**
 * GET /api/data
 * Proxy sicuro verso Supabase.
 * Le credenziali sono in variabili d'ambiente Vercel — mai nel sorgente HTML.
 * Il browser vede solo questo endpoint, mai l'URL o la key di Supabase.
 */
export default async function handler(req, res) {
  const { SUPABASE_URL, SUPABASE_ANON } = process.env;

  // Variabili d'ambiente non configurate → restituisci 503
  // Il frontend userà i dati embedded come fallback
  if (!SUPABASE_URL || !SUPABASE_ANON) {
    return res.status(503).json({ error: 'not_configured' });
  }

  try {
    // Fetch squads ITA + players annidati in una sola query (PostgREST)
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/squads` +
      `?sel=eq.ITA` +
      `&select=slug,copa,overall,players(player_id,name,number,positions,force,legend)` +
      `&order=copa.asc`,
      {
        headers: {
          'apikey':        SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`,
          'Accept':        'application/json'
        }
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: 'supabase_error', status: response.status });
    }

    const data = await response.json();

    // Cache aggressiva: i dati non cambiano mai
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);

  } catch (err) {
    return res.status(500).json({ error: 'internal', message: err.message });
  }
}
