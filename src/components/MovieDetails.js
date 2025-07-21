// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get ID from URL
  const API_KEY = '99409549f502b13451f6b88134e5e054'; // Replace with your TMDB API key

  useEffect(() => {
    // Fetch movie details from TMDB API
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
        // Save to localStorage for persistence
        localStorage.setItem('lastViewedMovie', JSON.stringify(data));
      })
      .catch(() => {
        setError('Error loading movie data.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No data.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{movie.title}</h1>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px', borderRadius: '8px' }}
        />
      )}
      <br />
      <button
        style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
}

export default MovieDetails;