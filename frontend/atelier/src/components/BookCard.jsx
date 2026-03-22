import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookCover } from '../hooks/useBookCover'

function initialsFromTitle(titre) {
  if (!titre || typeof titre !== 'string') return '?'
  const words = titre.trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return titre.slice(0, 2).toUpperCase()
}

function BookCard({ _id, id, titre, auteur, categorie }) {
  const navigate = useNavigate()
  const bookId = _id != null ? String(_id) : id != null ? String(id) : ''
  const { coverUrl, loading } = useBookCover(titre, auteur)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgFailed(false)
  }, [titre, auteur])

  const hasPhoto = !loading && coverUrl && !imgFailed

  return (
    <article className="book-card">
      <div className="book-card__spine" aria-hidden />
      <div className="book-card__main">
        <div className="book-card__top">
          <div
            className={`book-card__cover ${hasPhoto ? 'book-card__cover--photo' : 'book-card__cover--placeholder'}`}
            aria-hidden
          >
            {loading && <span className="book-card__skeleton" />}
            {hasPhoto && (
              <img
                src={coverUrl}
                alt=""
                className="book-card__cover-img"
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
              />
            )}
            {!loading && (!coverUrl || imgFailed) && (
              <span className="book-card__initials">{initialsFromTitle(titre)}</span>
            )}
          </div>
          <div className="book-card__body">
            {categorie && <span className="categorie-badge">{categorie}</span>}
            <h3>{titre}</h3>
            <p className="book-card__author">
              <span className="book-card__author-label">Auteur</span>
              {auteur || 'Non renseigné'}
            </p>
          </div>
        </div>
        <div className="book-card__footer">
          <button
            type="button"
            className="btn-ghost"
            disabled={!bookId}
            onClick={() => bookId && navigate(`/livres/${bookId}`)}
          >
            Fiche
          </button>
          <button
            type="button"
            className="btn-outline"
            disabled={!bookId}
            onClick={() => bookId && navigate(`/livres/${bookId}/edit`)}
          >
            Éditer
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookCard
