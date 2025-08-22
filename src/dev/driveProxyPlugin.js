// Vite dev-server middleware that proxies Google Drive JSON via Node fetch
// Usage: GET /api/drive-json?fileId=FILE_ID

export default function driveProxyPlugin() {
  return {
    name: 'drive-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/drive-json', async (req, res, next) => {
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

          const target = `https://drive.google.com/uc?export=download&id=${fileId}`
          const upstream = await fetch(target, { redirect: 'follow' })
          const text = await upstream.text()

          // Try to return JSON. If upstream sent JSON, pass through; otherwise attempt parse
          let contentType = upstream.headers.get('content-type') || ''
          if (!contentType.includes('application/json')) {
            try {
              JSON.parse(text)
              contentType = 'application/json'
            } catch {
              res.statusCode = upstream.status || 502
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Upstream did not return JSON' }))
              return
            }
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(text)
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}


