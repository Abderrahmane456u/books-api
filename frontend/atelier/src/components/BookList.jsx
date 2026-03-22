import BookCard from './BookCard'

function BookList({ livres }) {
  if (!livres.length) {
    return (
      <div className="empty-state" role="status">
        <p className="empty-state__title">Aucun livre à afficher</p>
        <p className="empty-state__text">
          Essayez un autre filtre ou ajoutez un ouvrage avec le formulaire ci-dessus.
        </p>
      </div>
    )
  }

  return (
    <div className="card-grid">
      {livres.map(l => (
        <BookCard
          key={l._id ?? l.id}
          _id={l._id}
          id={l.id}
          titre={l.titre}
          auteur={l.auteur}
          categorie={l.categorie}
        />
      ))}
    </div>
  )
}

export default BookList
