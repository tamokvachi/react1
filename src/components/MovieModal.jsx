import React, { useEffect } from 'react';

export default function MovieModal({ movie, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="დახურვა">✕</button>

        <div className="modal-body">
          <div className="modal-poster-wrap">
            <img src={movie.poster} alt={movie.title} className="modal-poster" />
          </div>

          <div className="modal-details">
            <div className="modal-badges">
              <span className="genre-tag">{movie.genre}</span>
              <span className="rating-pill">⭐ {movie.rating.toFixed(1)} / 10</span>
              <span className="year-pill">{movie.year}</span>
            </div>

            <h2 className="modal-title">{movie.title}</h2>
            <h4 className="modal-orig-title">{movie.originalTitle}</h4>

            <div className="modal-info-grid">
              <div className="info-item">
                <span className="info-title">რეჟისორი</span>
                <span className="info-value">{movie.director}</span>
              </div>
              <div className="info-item">
                <span className="info-title">ხანგრძლივობა</span>
                <span className="info-value">{movie.duration}</span>
              </div>
              <div className="info-item">
                <span className="info-title">ჟანრი</span>
                <span className="info-value">{movie.genre}</span>
              </div>
              <div className="info-item">
                <span className="info-title">გამოშვების წელი</span>
                <span className="info-value">{movie.year}</span>
              </div>
            </div>

            <div className="modal-synopsis">
              <h3>შინაარსი</h3>
              <p>{movie.description}</p>
            </div>

            <div className="modal-actions">
              <button 
                className={`action-btn fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(movie.id)}
              >
                {isFavorite ? '❤️ რჩეულებშია' : '🤍 რჩეულებში დამატება'}
              </button>
              <button 
                className="action-btn watch-btn"
                onClick={() => alert(`ფილმის "${movie.title}" ყურება მალე იქნება ხელმისაწვდომი!`)}
              >
                ▶ ტრეილერის ნახვა
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
