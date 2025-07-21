// src/components/SearchMovies.js
import React, { useState, useEffect } from 'react';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if user has searched

  const API_KEY = '99409549f502b13451f6b88134e5e054'; // Your TMDB API key

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  // Handle search button click
  const handleSearch = () => {
    if (!query) return;

    setHasSearched(true); // Mark that a search has been performed

    // Update history in localStorage
    const newHistory = [query, ...searchHistory.filter(q => q !== query)];
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory);

    // Fetch movies from TMDB API
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
      })
      .catch(() => alert('Error fetching data.'));
  };

  // Function to clear search history
  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Movie Search</h1>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '70%', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px' }}>Search</button>

      {/* Search History Section with Clear Button */}
      <h2 style={{ marginTop: '30px' }}>Search History</h2>
      {searchHistory.length > 0 && (
        <button
          onClick={handleClearHistory}
          style={{
            padding: '8px 12px',
            marginBottom: '10px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Search History
        </button>
      )}
      <ul>
        {searchHistory.map((item, index) => (
          <li
            key={index}
            style={{ cursor: 'pointer', marginBottom: '5px' }}
            onClick={() => setQuery(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Movies Results */}
      <div style={{ marginTop: '20px' }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px'
              }}
            >
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <button
                onClick={() => {
                  // Save selected movie data to localStorage
                  localStorage.setItem('selectedMovie', JSON.stringify(movie));
                  // Navigate to details page
                  window.location.href = `/movie/${movie.id}`;
                }}
                style={{
                  padding: '8px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          // Show message only if a search has been performed
          hasSearched && <p>No movies to display. Search above.</p>
        )}
      </div>
    </div>
  );
}

export default SearchMovies;