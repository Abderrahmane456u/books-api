import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLivreById, updateLivre, getAllCategories } from '../booksApi'

function BookEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ titre: '', auteur: '', categorie: '' })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getLivreById(id).then(res => setForm(res.data))
    getAllCategories().then(res => setCategories(res.data)).catch(() => setCategories([]))
  }, [id])

  const handleUpdate = async (e) => {
    e?.preventDefault()
    const { titre, auteur, categorie } = form
    await updateLivre(id, { titre, auteur, categorie })
    navigate(`/livres/${id}`)
  }

  return (
    <div className="container">
      <header className="page-header">
        <Link to={`/livres/${id}`} className="back-link">
          ← Retour à la fiche
        </Link>
        <h1 className="page-header__title">
          Modifier l’ouvrage
        </h1>
      </header>

      <section className="panel" aria-labelledby="edit-form-title">
        <div className="panel__header">
          <h2 id="edit-form-title" className="panel__title">
            Informations
          </h2>
          <p className="panel__desc">Mettez à jour les champs puis enregistrez.</p>
        </div>
        <div className="panel__body">
          <form className="add-book-form" onSubmit={handleUpdate}>
            <label>
              Titre
              <input
                value={form.titre}
                onChange={e => setForm({ ...form, titre: e.target.value })}
                required
              />
            </label>
            <label>
              Auteur
              <input
                value={form.auteur}
                onChange={e => setForm({ ...form, auteur: e.target.value })}
              />
            </label>
            <label>
              Catégorie
              {categories.length > 0 ? (
                <select
                  value={form.categorie}
                  onChange={e => setForm({ ...form, categorie: e.target.value })}
                >
                  <option value="">Sélectionner…</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.nom}>{cat.nom}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={form.categorie}
                  onChange={e => setForm({ ...form, categorie: e.target.value })}
                />
              )}
            </label>
            <div className="form-actions" style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <button type="submit" className="primary">
                Enregistrer
              </button>
              <button type="button" className="secondary" onClick={() => navigate(`/livres/${id}`)}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default BookEditPage
