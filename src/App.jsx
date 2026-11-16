import React, { useState, useMemo, useEffect } from 'react';
import { MOVIES } from './data/movies';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ყველა');
  const [sortBy, setSortBy] = useState('featured');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('moviehub_favs');
      return saved ? JSON.parse(saved) : [1, 3]; // default top 2 as favorites
    } catch {
      return [1, 3];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('moviehub_favs', JSON.stringify(favorites));
    } catch {
      // ignore storage error
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredMovies = useMemo(() => {
    return MOVIES.filter(movie => {
      // Genre filter
      if (selectedGenre !== 'ყველა' && movie.genre !== selectedGenre) {
        return false;
      }
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(movie.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = movie.title.toLowerCase().includes(query);
        const matchesOriginal = movie.originalTitle.toLowerCase().includes(query);
        const matchesDirector = movie.director.toLowerCase().includes(query);
        const matchesGenre = movie.genre.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOriginal && !matchesDirector && !matchesGenre) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0; // default order
    });
  }, [searchQuery, selectedGenre, showFavoritesOnly, favorites, sortBy]);

  return (
    <div className="app-layout">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <main className="container main-content">
        {/* Hero Section */}
        <section className="hero-banner">
          <div className="hero-text">
            <span className="hero-badge">✨ კინოკოლექცია</span>
            <h1>აღმოაჩინე მსოფლიო კინოკლასიკა და ჰიტები</h1>
            <p>
              დაათვალიერე შენი საყვარელი ფილმები, გაეცანი რეიტინგებს, 
              შეინახე რჩეულებში და აღმოაჩინე ახალი შედევრები.
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">{MOVIES.length}</span>
              <span className="stat-label">საუკეთესო ფილმი</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">8.8</span>
              <span className="stat-label">საშუალო რეიტინგი</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">HD ხარისხი</span>
            </div>
          </div>
        </section>

        {/* Filter & Sort Bar */}
        <FilterBar
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredMovies.length}
        />

        {/* Status notice when filtering by favorites */}
        {showFavoritesOnly && (
          <div className="filter-notice">
            <span>ნაჩვენებია მხოლოდ რჩეული ფილმები ({filteredMovies.length})</span>
            <button onClick={() => setShowFavoritesOnly(false)}>ყველა ფილმის ჩვენება</button>
          </div>
        )}

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={toggleFavorite}
                onSelectMovie={setSelectedMovie}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h2>ფილმი ვერ მოიძებნა</h2>
            <p>სცადეთ სხვა საძიებო სიტყვა ან შეცვალეთ ჟანრის ფილტრი</p>
            <button
              className="reset-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('ყველა');
                setShowFavoritesOnly(false);
              }}
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <span>🎬</span> MovieHub
          </div>
          <p>© 2026 MovieHub — ყველა უფლება დაცულია. შექმნილია React-ით & თანამედროვე CSS-ით.</p>
        </div>
      </footer>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
