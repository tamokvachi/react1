import React, { useState, useMemo, useEffect } from 'react';
import { MOVIES } from './data/movies';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MoviesSection from './components/MoviesSection';
import Footer from './components/Footer';
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
      return saved ? JSON.parse(saved) : [1, 3];
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('ყველა');
    setShowFavoritesOnly(false);
  };

  const filteredMovies = useMemo(() => {
    return MOVIES.filter(movie => {
      // ჟანრის ფილტრი
      if (selectedGenre !== 'ყველა' && movie.genre !== selectedGenre) {
        return false;
      }
      // რჩეულების ფილტრი
      if (showFavoritesOnly && !favorites.includes(movie.id)) {
        return false;
      }
      // ძებნის ფილტრი
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
      return 0;
    });
  }, [searchQuery, selectedGenre, showFavoritesOnly, favorites, sortBy]);

  return (
    <div className="app-layout">
      {/* 1. HEADER COMPONENT */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <main className="container main-content">
        {/* 2. HERO SECTION COMPONENT */}
        <HeroSection totalMovies={MOVIES.length} />

        {/* 3. MOVIES SECTION COMPONENT */}
        <MoviesSection
          movies={filteredMovies}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelectMovie={setSelectedMovie}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* 4. FOOTER COMPONENT */}
      <Footer />

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
