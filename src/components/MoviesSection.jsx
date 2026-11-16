import React from 'react';
import FilterBar from './FilterBar';
import MovieCard from './MovieCard';

export default function MoviesSection({
  movies,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favorites,
  toggleFavorite,
  onSelectMovie,
  onResetFilters,
  onOpenAddModal,
  onDeleteMovie
}) {
  return (
    <section className="movies-section" id="movies-section">
      {/* ფილტრაცია და სორტირება */}
      <FilterBar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={movies.length}
        onOpenAddModal={onOpenAddModal}
      />

      {/* რჩეულების ფილტრის შეტყობინება */}
      {showFavoritesOnly && (
        <div className="filter-notice">
          <span>ნაჩვენებია მხოლოდ რჩეული ფილმები ({movies.length})</span>
          <button onClick={() => setShowFavoritesOnly(false)}>ყველა ფილმის ჩვენება</button>
        </div>
      )}

      {/* ფილმების ბადე ან ცარიელი მდგომარეობა */}
      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={toggleFavorite}
              onSelectMovie={onSelectMovie}
              onDeleteMovie={onDeleteMovie}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h2>ფილმი ვერ მოიძებნა</h2>
          <p>სცადეთ სხვა საძიებო სიტყვა ან შეცვალეთ ჟანრის ფილტრი</p>
          <button className="reset-btn" onClick={onResetFilters}>
            ფილტრების გასუფთავება
          </button>
        </div>
      )}
    </section>
  );
}
