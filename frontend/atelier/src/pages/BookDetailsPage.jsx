import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLivreById, deleteLivre } from '../booksApi'
import { useBookCover } from '../hooks/useBookCover'

function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [livre, setLivre] = useState(null)
  const { coverUrl, loading } = useBookCover(livre?.titre, livre?.auteur)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    getLivreById(id).then(res => setLivre(res.data))
  }, [id])

  useEffect(() => {
    setImgFailed(false)
  }, [livre?.titre, livre?.auteur])

  const handleDelete = async () => {
    if (confirm('Supprimer ce livre ? Cette action est définitive.')) {
      await deleteLivre(id)
      navigate('/')
    }
  }

  if (!livre) {
    return (
      <div className="container">
        <p className="loading-state" role="status">
          Chargement de la fiche…
        </p>
      </div>
    )
  }

  const hasPhoto = !loading && coverUrl && !imgFailed

  return (
    <div className="container">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Retour au catalogue
        </Link>
      </header>

      <article className="book-detail">
        <div className="book-detail__media">
          <div
            className={`book-detail__cover ${hasPhoto ? 'book-detail__cover--photo' : 'book-detail__cover--placeholder'}`}
          >
            {loading && <span className="book-detail__skeleton" />}
            {hasPhoto && (
              <img
                src={coverUrl}
                alt={`Couverture : ${livre.titre}`}
                className="book-detail__cover-img"
                loading="eager"
                decoding="async"
                onError={() => setImgFailed(true)}
              />
            )}
            {!loading && (!coverUrl || imgFailed) && (
              <span className="book-detail__initials" aria-hidden>
                {(livre.titre || '?').slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="book-detail__panel card book-detail__card">
          {livre.categorie && <span className="categorie-badge">{livre.categorie}</span>}
          <h2>{livre.titre}</h2>
          <p>
            <span className="detail-label">Auteur</span>
            {livre.auteur || '—'}
          </p>
          <div className="actions book-detail__actions">
            <button type="button" className="secondary" onClick={() => navigate(`/livres/${id}/edit`)}>
              Modifier
            </button>
            <button type="button" className="btn-danger" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BookDetailsPage
