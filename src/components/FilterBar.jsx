import React from 'react';
import { GENRES } from '../data/movies';

export default function FilterBar({ 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy, 
  totalResults,
  onOpenAddModal
}) {
  return (
    <div className="filter-bar">
      <div className="genres-list">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="filter-controls">
        <span className="results-count">{totalResults} ფილმი</span>
        <div className="sort-wrapper">
          <label htmlFor="sort-select">სორტირება:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">რეკომენდებული</option>
            <option value="rating-desc">რეიტინგით (მაღალიდან)</option>
            <option value="year-desc">წლით (უახლესი)</option>
            <option value="title-asc">სახელით (A-Z)</option>
          </select>
        </div>

        <button 
          type="button" 
          className="add-movie-trigger-btn"
          onClick={onOpenAddModal}
        >
          + ფილმის დამატება
        </button>
      </div>
    </div>
  );
}
