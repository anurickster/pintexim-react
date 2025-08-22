export async function handler(event) {
  try {
    const fileId = event.queryStringParameters?.fileId
    if (!fileId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'fileId is required' }) }
    }
    const target = `https://drive.google.com/uc?export=download&id=${fileId}`
    const resp = await fetch(target, { redirect: 'follow' })
    const text = await resp.text()
    try {
      JSON.parse(text)
    } catch {
      return { statusCode: resp.status || 502, body: JSON.stringify({ error: 'Upstream did not return JSON' }) }
    }
    return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: text }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}


