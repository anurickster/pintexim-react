// Helper to fetch JSON from Google Drive using fileId
// Uses direct download endpoint. Many Drive files block CORS for browser fetches
// so callers should be prepared to catch and use a fallback.

export async function fetchJsonFromDrive(fileId) {
  // Call same-origin API that fetches from Drive server-side (dev: Vite middleware, prod: Netlify function)
  const url = `/api/drive-json?fileId=${encodeURIComponent(fileId)}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }
  return await response.json()
}


