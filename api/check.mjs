export default async function handler(req, res) {
  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'Missing url parameter' })

  let target = url
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target

  const start = Date.now()
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(target, { signal: controller.signal, redirect: 'follow' })
    clearTimeout(timer)

    res.json({
      statusCode: response.status,
      responseTimeMs: Date.now() - start,
    })
  } catch (err) {
    res.json({
      statusCode: null,
      responseTimeMs: Date.now() - start,
      error: err.name === 'AbortError' ? 'Timeout' : err.message,
    })
  }
}
