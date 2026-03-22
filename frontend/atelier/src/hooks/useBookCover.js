import { useState, useEffect } from 'react'
import { fetchBookCoverUrl } from '../utils/openLibraryCover'

/**
 * Charge une couverture Open Library ; loading + url ou null si introuvable.
 */
export function useBookCover(titre, auteur) {
  const [coverUrl, setCoverUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const ac = new AbortController()

    setCoverUrl(null)
    setLoading(true)

    fetchBookCoverUrl(titre, auteur, ac.signal)
      .then((url) => {
        if (!cancelled) setCoverUrl(url)
      })
      .catch(() => {
        if (!cancelled) setCoverUrl(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      ac.abort()
    }
  }, [titre, auteur])

  return { coverUrl, loading }
}
