import { useState } from 'react'
import { createLivre } from '../booksApi'

function BookForm({ onAjoute, categories = [] }) {
  const [form, setForm] = useState({ titre: '', auteur: '', categorie: '' })

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!form.titre.trim()) return
    await createLivre(form)
    setForm({ titre: '', auteur: '', categorie: '' })
    onAjoute?.()
  }

  return (
    <section className="panel" aria-labelledby="form-add-title">
      <div className="panel__header">
        <h2 id="form-add-title" className="panel__title">
          Ajouter un ouvrage
        </h2>
        <p className="panel__desc">
          Renseignez le titre, l’auteur et la catégorie. Les champs marqués sont obligatoires pour l’enregistrement.
        </p>
      </div>
      <div className="panel__body">
        <form className="add-book-form" onSubmit={handleSubmit}>
          <label>
            Titre <span aria-hidden>·</span> requis
            <input
              placeholder="Ex. Les Misérables"
              value={form.titre}
              onChange={e => setForm({ ...form, titre: e.target.value })}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Auteur
            <input
              placeholder="Nom de l’auteur"
              value={form.auteur}
              onChange={e => setForm({ ...form, auteur: e.target.value })}
              autoComplete="off"
            />
          </label>
          <label>
            Catégorie
            {categories.length > 0 ? (
              <select
                value={form.categorie}
                onChange={e => setForm({ ...form, categorie: e.target.value })}
                aria-label="Choisir une catégorie"
              >
                <option value="">Sélectionner…</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.nom}>{cat.nom}</option>
                ))}
              </select>
            ) : (
              <input
                placeholder="Catégorie libre"
                value={form.categorie}
                onChange={e => setForm({ ...form, categorie: e.target.value })}
              />
            )}
          </label>
          <div className="form-actions">
            <button type="submit" className="primary">
              Enregistrer le livre
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BookForm
