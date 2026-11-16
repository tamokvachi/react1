import React, { useState, useEffect } from 'react';
import { GENRES } from '../data/movies';

export default function AddMovieModal({ isOpen, onClose, onAddMovie }) {
  const availableGenres = GENRES.filter(g => g !== 'ყველა');

  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    genre: availableGenres[0] || 'დრამა',
    rating: '8.5',
    year: new Date().getFullYear().toString(),
    duration: '2სთ 00წთ',
    director: '',
    poster: '',
    description: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('გთხოვთ მიუთითოთ ფილმის სათაური');
      return;
    }

    const defaultPoster = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80';

    const newMovie = {
      id: Date.now(),
      title: formData.title.trim(),
      originalTitle: formData.originalTitle.trim() || formData.title.trim(),
      genre: formData.genre,
      rating: parseFloat(formData.rating) || 8.0,
      year: parseInt(formData.year, 10) || new Date().getFullYear(),
      duration: formData.duration.trim() || '2სთ 00წთ',
      director: formData.director.trim() || 'უცნობი რეჟისორი',
      poster: formData.poster.trim() || defaultPoster,
      description: formData.description.trim() || 'ფილმის მოკლე აღწერა არ არის დამატებული.',
      featured: false
    };

    onAddMovie(newMovie);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content add-movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="დახურვა">✕</button>

        <div className="add-movie-header">
          <span className="add-modal-badge">🎬 ახალი ჩანაწერი</span>
          <h2>ახალი ფილმის დამატება</h2>
          <p>შეავსეთ ველები ფილმების კოლექციაში დასამატებლად</p>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="add-movie-form">
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="movie-title">ფილმის სათაური *</label>
              <input
                id="movie-title"
                name="title"
                type="text"
                placeholder="მაგ: დასაწყისი"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="movie-genre">ჟანრი</label>
              <select
                id="movie-genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                {availableGenres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="movie-orig">ორიგინალი სათაური (ინგლისურად)</label>
              <input
                id="movie-orig"
                name="originalTitle"
                type="text"
                placeholder="მაგ: Inception"
                value={formData.originalTitle}
                onChange={handleChange}
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="movie-director">რეჟისორი</label>
              <input
                id="movie-director"
                name="director"
                type="text"
                placeholder="მაგ: კრისტოფერ ნოლანი"
                value={formData.director}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="movie-year">გამოშვების წელი</label>
              <input
                id="movie-year"
                name="year"
                type="number"
                min="1900"
                max="2099"
                placeholder="2024"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="movie-rating">რეიტინგი (1-10)</label>
              <input
                id="movie-rating"
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="10"
                placeholder="8.5"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="movie-duration">ხანგრძლივობა</label>
              <input
                id="movie-duration"
                name="duration"
                type="text"
                placeholder="2სთ 15წთ"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="movie-poster">პოსტერის სურათის URL (არასავალდებულო)</label>
            <input
              id="movie-poster"
              name="poster"
              type="url"
              placeholder="https://example.com/poster.jpg"
              value={formData.poster}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="movie-description">მოკლე შინაარსი</label>
            <textarea
              id="movie-description"
              name="description"
              rows="3"
              placeholder="დაწერეთ ფილმის მოკლე აღწერა..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="add-movie-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              გაუქმება
            </button>
            <button type="submit" className="submit-movie-btn">
              + ფილმის დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
