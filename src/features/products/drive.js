// Helper to fetch JSON from Google Drive using fileId
// Uses direct download endpoint. Many Drive files block CORS for browser fetches
// so callers should be prepared to catch and use a fallback.

export async function fetchJsonFromDrive(fileId) {
  // 1) Try fetching directly from Google Drive (browser). If CORS blocks or it isn't JSON, fall back to our API.
  const direct = `https://drive.google.com/uc?export=download&id=${fileId}`
  try {
    const r = await fetch(direct, { credentials: 'omit' })
    const ct = r.headers.get('content-type') || ''
    if (r.ok && ct.includes('application/json')) {
      return await r.json()
    }
    // If non-JSON (e.g., interstitial HTML), let it fall through to API fetch
  } catch (_) {
    // Ignore and try API
  }

  // 2) Same-origin API (dev: Vite middleware, prod: Netlify function)
  const api = `/api/drive-json?fileId=${encodeURIComponent(fileId)}`
  const response = await fetch(api, { credentials: 'omit' })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }
  return await response.json()
}


