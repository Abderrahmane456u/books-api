import { useState, useEffect } from 'react'
import { getAllLivres, getAllCategories } from '../booksApi'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import CategoryCard from '../components/CategoryCard'
import { getCategoryPhotoUrl } from '../data/categoryPhotos'

function BooksPage() {
  const [livres, setLivres] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategorie, setSelectedCategorie] = useState(null)

  const fetchLivres = () => {
    getAllLivres(selectedCategorie || undefined)
      .then(res => setLivres(Array.isArray(res.data) ? res.data : []))
      .catch(() => setLivres([]))
  }

  const fetchCategories = () => {
    getAllCategories()
      .then(res => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCategories([]))
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchLivres()
  }, [selectedCategorie])

  const filterLabel = selectedCategorie
    ? `Filtré : ${selectedCategorie}`
    : 'Toutes les catégories'

  return (
    <div className="container">
      <header className="page-header">
        <span className="page-header__eyebrow">Catalogue</span>
        <div className="page-header__row">
          <div>
            <h1 className="page-header__title">Nos livres</h1>
            <p className="page-header__meta">
              {livres.length} titre{livres.length !== 1 ? 's' : ''} · {filterLabel}
            </p>
          </div>
        </div>
      </header>

      <div className="category-filters" role="group" aria-label="Filtrer par catégorie">
        <span className="category-filters__label">Filtrer</span>
        <button
          type="button"
          className={`category-pill ${!selectedCategorie ? 'active' : ''}`}
          onClick={() => setSelectedCategorie(null)}
        >
          Tous
        </button>
        {categories.map(cat => (
          <button
            type="button"
            key={cat._id}
            className={`category-pill ${selectedCategorie === cat.nom ? 'active' : ''}`}
            onClick={() => setSelectedCategorie(cat.nom)}
          >
            {cat.nom}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <section className="section" aria-labelledby="categories-heading">
          <div className="section__head">
            <h2 id="categories-heading" className="section__title">
              Explorer les catégories
            </h2>
            <span className="section__hint">Cliquez pour filtrer le catalogue</span>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <CategoryCard
                key={cat._id}
                nom={cat.nom}
                description={cat.description}
                isActive={selectedCategorie === cat.nom}
                onClick={setSelectedCategorie}
                photoUrl={getCategoryPhotoUrl(cat.nom)}
              />
            ))}
          </div>
        </section>
      )}

      <BookForm onAjoute={fetchLivres} categories={categories} />

      <section className="section" aria-labelledby="books-heading">
        <div className="section__head">
          <h2 id="books-heading" className="section__title">
            Collection
          </h2>
        </div>
        <BookList livres={livres} />
      </section>
    </div>
  )
}

export default BooksPage
