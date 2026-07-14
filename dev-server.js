import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3000

app.use(express.json())

async function handler(req, res) {
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

app.get('/api/check', handler)
app.get('*', (req, res, next) => {
  if (req.path === '/api/check') return next()
  const distPath = path.join(process.cwd(), 'dist')
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) console.error('Serving index.html failed:', err)
  })
})

app.listen(PORT, () => console.log(`Dev server running on port ${PORT}`))