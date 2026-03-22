import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import BookDetailsPage from './pages/BookDetailsPage'
import BookEditPage from './pages/BookEditPage'
import { HERO_LIBRARY_PHOTO } from './data/categoryPhotos'

function AppHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="app-header">
      <div className="app-header__accent" aria-hidden />
      <div className="app-header__bar">
        <Link to="/" className="app-brand" aria-label="Accueil catalogue">
          <span className="app-brand__mark" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 7h6M9 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="app-brand__text">
            <span className="app-brand__name">Bibliothèque</span>
            <span className="app-brand__tagline">Catalogue numérique</span>
          </span>
        </Link>
        <nav className="app-nav" aria-label="Navigation principale">
          <Link to="/" className={`app-nav__link ${isHome ? 'is-active' : ''}`}>
            Catalogue
          </Link>
        </nav>
      </div>
      {isHome && (
        <div className="app-hero app-hero--split">
          <div className="app-hero__copy">
            <p className="app-hero__title">Votre collection, structurée et accessible</p>
            <p className="app-hero__subtitle">
              Couvertures réelles (Open Library), photos par thème et navigation fluide — catalogue pensé pour une expérience lecture moderne.
            </p>
          </div>
          <div className="app-hero__visual" aria-hidden>
            <div
              className="app-hero__photo"
              style={{ backgroundImage: `url(${HERO_LIBRARY_PHOTO})` }}
            />
            <div className="app-hero__photo-overlay" />
            <div className="hero-stack hero-stack--layered">
              <span className="hero-stack__book hero-stack__book--1" />
              <span className="hero-stack__book hero-stack__book--2" />
              <span className="hero-stack__book hero-stack__book--3" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function AppShell() {
  return (
    <div className="app">
      <div className="app-bg" aria-hidden />
      <AppHeader />
      <main className="app-main" id="main-content">
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/livres/:id" element={<BookDetailsPage />} />
          <Route path="/livres/:id/edit" element={<BookEditPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span className="app-footer__inner">
          <span className="app-footer__dot" aria-hidden />
          Couvertures Open Library · Photos Unsplash · Démo UX
        </span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
