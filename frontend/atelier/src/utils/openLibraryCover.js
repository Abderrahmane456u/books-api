/**
 * Récupère une URL de couverture via l’API publique Open Library (sans clé).
 * https://openlibrary.org/dev/docs/api/covers
 */

export async function fetchBookCoverUrl(titre, auteur, signal) {
  const q = [titre, auteur].filter(Boolean).join(' ').trim()
  if (!q) return null

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=1`
    const res = await fetch(url, { signal })
    if (!res.ok) return null
    const data = await res.json()
    const coverId = data.docs?.[0]?.cover_i
    if (!coverId) return null
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
  } catch {
    return null
  }
}
