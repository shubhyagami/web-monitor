export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    return res.status(200).json({
      url,
      status: response.ok ? 'up' : 'down',
      statusCode: response.status,
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(200).json({
      url,
      status: 'down',
      statusCode: 0,
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
      error: 'Request failed',
    });
  }
}