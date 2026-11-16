import React from 'react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  favoritesCount, 
  showFavoritesOnly, 
  setShowFavoritesOnly 
}) {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <div 
          className="logo" 
          onClick={() => { setSearchQuery(''); setShowFavoritesOnly(false); }}
        >
          <span className="logo-icon">🎬</span>
          <div className="logo-text">
            <span className="logo-title">MovieHub</span>
            <span className="logo-sub">კინომანის სივრცე</span>
          </div>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="მოძებნე ფილმი, რეჟისორი ან ჟანრი..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
              title="გასუფთავება"
            >
              ✕
            </button>
          )}
        </div>

        <button 
          className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <span className="heart-icon">❤️</span>
          <span>რჩეულები</span>
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </button>
      </div>
    </header>
  );
}
