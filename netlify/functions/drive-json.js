// Netlify Functions use CommonJS by default. Use `exports.handler` to ensure
// the function is detected in production.
exports.handler = async (event) => {
  try {
    const fileId = event.queryStringParameters && event.queryStringParameters.fileId
    if (!fileId) {
      return { statusCode: 400, headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ error: 'fileId is required' }) }
    }
    const base = `https://drive.google.com/uc?export=download&id=${fileId}`
    let resp = await fetch(base, { redirect: 'follow' })
    let text = await resp.text()

    // If Drive sends an interstitial HTML page, extract the confirm token and retry
    const contentType = resp.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      // Try common token patterns
      const tokenMatch = text.match(/confirm=([0-9A-Za-z_]+)&amp;id=/) || text.match(/name="confirm"\s+value="([0-9A-Za-z_\-]+)"/)
      if (tokenMatch && tokenMatch[1]) {
        const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${tokenMatch[1]}&id=${fileId}`
        resp = await fetch(confirmUrl, { redirect: 'follow' })
        text = await resp.text()
      }
    }

    try { JSON.parse(text) } catch {
      return { statusCode: resp.status || 502, headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ error: 'Upstream did not return JSON' }) }
    }
    return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'access-control-allow-origin': '*' }, body: text }
  } catch (err) {
    return { statusCode: 500, headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ error: err.message }) }
  }
}


