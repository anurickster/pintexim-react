// Vite dev-server middleware that proxies Google Drive JSON via Node fetch
// Usage: GET /api/drive-json?fileId=FILE_ID

export default function driveProxyPlugin() {
  const handler = async (req, res, next) => {
    if (req.method !== 'GET') return next()
    try {
      const url = new URL(req.url, 'http://localhost')
      const fileId = url.searchParams.get('fileId')
      if (!fileId) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'fileId is required' }))
        return
      }

      const base = `https://drive.google.com/uc?export=download&id=${fileId}`
      let upstream = await fetch(base, { redirect: 'follow' })
      let text = await upstream.text()

      let contentType = upstream.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        const tokenMatch = text.match(/confirm=([0-9A-Za-z_]+)&amp;id=/) || text.match(/name=\"confirm\"\s+value=\"([0-9A-Za-z_\-]+)\"/)
        if (tokenMatch && tokenMatch[1]) {
          const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${tokenMatch[1]}&id=${fileId}`
          upstream = await fetch(confirmUrl, { redirect: 'follow' })
          text = await upstream.text()
          contentType = upstream.headers.get('content-type') || ''
        }
      }

      try { JSON.parse(text) } catch {
        res.statusCode = upstream.status || 502
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Upstream did not return JSON' }))
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(text)
    } catch (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: err.message }))
    }
  }

  return {
    name: 'drive-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/drive-json', handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/drive-json', handler)
    },
  }
}


