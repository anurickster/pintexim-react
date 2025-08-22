// Helper to fetch JSON from Google Drive using fileId
// Uses direct download endpoint. Many Drive files block CORS for browser fetches
// so callers should be prepared to catch and use a fallback.

export async function fetchJsonFromDrive(fileId) {
  const isProdHosted = typeof window !== 'undefined' && /netlify\.app$/.test(window.location.hostname)

  // Prefer same-origin API first (works in prod/preview). If that fails, try direct Drive as a last resort.
  const api = `/api/drive-json?fileId=${encodeURIComponent(fileId)}`
  try {
    const response = await fetch(api, { credentials: 'omit' })
    if (response.ok) return await response.json()
  } catch (_) { /* fall through */ }

  // In local dev (or if API is not available), attempt direct Drive fetch.
  if (!isProdHosted) {
    const direct = `https://drive.google.com/uc?export=download&id=${fileId}`
    try {
      const r = await fetch(direct, { credentials: 'omit' })
      const ct = r.headers.get('content-type') || ''
      if (r.ok && ct.includes('application/json')) {
        return await r.json()
      }
    } catch (_) { /* ignore */ }
  }

  throw new Error('Failed to load products data')
}


