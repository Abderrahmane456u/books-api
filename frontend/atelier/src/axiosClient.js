/**
 * Client HTTP (fetch) — même usage qu'axios pour booksApi
 * Pas de dépendance axios requise
 */
// En dev : proxy Vite (/api → localhost:3000). Sinon URL directe ou variable d’env.
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:3000')

async function request(method, path, options = {}) {
  let url = `${baseURL}${path}`
  if (options.params) {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries(options.params)) {
      if (v != null && v !== '') q.set(k, String(v))
    }
    const s = q.toString()
    if (s) url += `?${s}`
  }

  const init = { method, headers: {} }
  if (options.data !== undefined) {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(options.data)
  }

  const res = await fetch(url, init)
  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }
  if (!res.ok) {
    const msg =
      typeof data?.message === 'string'
        ? data.message
        : `Erreur ${res.status}`
    const err = new Error(msg)
    err.response = { status: res.status, data }
    throw err
  }
  return { data, status: res.status }
}

const axiosClient = {
  get: (path, config) => request('GET', path, { params: config?.params }),
  post: (path, data) => request('POST', path, { data }),
  put: (path, data) => request('PUT', path, { data }),
  delete: (path) => request('DELETE', path),
}

export default axiosClient
