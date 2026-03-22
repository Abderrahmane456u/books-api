function CategoryCard({ nom, description, isActive, onClick, photoUrl }) {
  const letter = nom?.trim()?.charAt(0)?.toUpperCase() || '?'

  return (
    <button
      type="button"
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick?.(nom)}
      aria-pressed={isActive}
    >
      {photoUrl && (
        <>
          <span
            className="category-card__bg"
            style={{ backgroundImage: `url(${photoUrl})` }}
            aria-hidden
          />
          <span className="category-card__scrim" aria-hidden />
        </>
      )}
      <span className="category-card__content">
        <span className="category-card__icon" aria-hidden>
          {letter}
        </span>
        <h4>{nom}</h4>
        {description && <p>{description}</p>}
      </span>
    </button>
  )
}

export default CategoryCard
