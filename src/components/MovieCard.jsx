import React, { useState } from 'react';

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onSelectMovie }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="movie-card">
      <div className="poster-wrapper" onClick={() => onSelectMovie(movie)}>
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80' : movie.poster}
          alt={movie.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="movie-poster"
        />
        <div className="poster-overlay">
          <button className="preview-btn">დეტალურად ნახვა</button>
        </div>
        <span className="rating-pill">
          ⭐ {movie.rating.toFixed(1)}
        </span>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          aria-label={isFavorite ? "რჩეულებიდან ამოშლა" : "რჩეულებში დამატება"}
          title={isFavorite ? "რჩეულებიდან ამოშლა" : "რჩეულებში დამატება"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="movie-info">
        <div className="movie-meta-top">
          <span className="genre-tag">{movie.genre}</span>
          <span className="movie-year">{movie.year}</span>
        </div>

        <h3 className="movie-title" onClick={() => onSelectMovie(movie)} title={movie.title}>
          {movie.title}
        </h3>

        <p className="movie-director">
          <span className="director-label">რეჟისორი:</span> {movie.director}
        </p>

        <p className="movie-description">
          {movie.description}
        </p>

        <div className="movie-footer">
          <span className="duration">⏱️ {movie.duration}</span>
          <button className="details-link" onClick={() => onSelectMovie(movie)}>
            სრულად →
          </button>
        </div>
      </div>
    </article>
  );
}
