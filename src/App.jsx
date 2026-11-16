import React, { useState, useMemo, useEffect } from 'react';
import { MOVIES } from './data/movies';
import Header from './components/Header';
import TaskList from './components/TaskList';
import HeroSection from './components/HeroSection';
import MoviesSection from './components/MoviesSection';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import AddMovieModal from './components/AddMovieModal';

export default function App() {
  const [moviesList, setMoviesList] = useState(MOVIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ყველა');
  const [sortBy, setSortBy] = useState('featured');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'ფილმების სიის გადახედვა', completed: true },
    { id: 3, title: 'რჩეულების შენახვა', completed: false }
  ]);

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedCompleted = !task.completed;

          // შესრულებულად მონიშვნისას გადასვლის (ნავიგაციის) ფუნქცია
          if (updatedCompleted) {
            // თუ რჩეულების შენახვაა, ვაჩვენოთ რჩეულები
            if (task.title.includes('რჩეულებ')) {
              setShowFavoritesOnly(true);
            } else if (task.title.includes('სიის გადახედვა') || task.title.includes('ფილმ')) {
              setShowFavoritesOnly(false);
            }

            // გადასვლა (Scroll) ფილმების ჩამონათვალზე
            setTimeout(() => {
              const moviesSection = document.getElementById('movies-section');
              if (moviesSection) {
                moviesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 80);
          }

          return { ...task, completed: updatedCompleted };
        }
        return task;
      })
    );
  };

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

  const handleAddMovie = (newMovie) => {
    setMoviesList((prev) => [newMovie, ...prev]);
  };

  const handleDeleteMovie = (id) => {
    setMoviesList((prev) => prev.filter((movie) => movie.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    if (selectedMovie && selectedMovie.id === id) {
      setSelectedMovie(null);
    }
  };

  const filteredMovies = useMemo(() => {
    return moviesList.filter(movie => {
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

      {/* TaskList */}
      <div className="container tasks-container">
        <TaskList tasks={tasks} onToggle={handleToggle} />
      </div>

      <main className="container main-content">
        {/* 2. HERO SECTION COMPONENT */}
        <HeroSection totalMovies={moviesList.length} />

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
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onDeleteMovie={handleDeleteMovie}
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
          onDeleteMovie={handleDeleteMovie}
        />
      )}

      {/* Add Movie Modal */}
      <AddMovieModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMovie={handleAddMovie}
      />
    </div>
  );
}
