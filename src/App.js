import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Movies from './Movies';
import Cart from './Cart';
import About from './About';
import SearchMovies from './components/SearchMovies';
import MovieDetails from './components/MovieDetails';



function App() {
  return (
    <div>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/about">About</Link></li>
	  <li><Link to="/search">Search</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
	<Route path="/search" element={<SearchMovies />} />
	<Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;