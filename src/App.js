import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Existing imports
import list from './data'; // your product list
import Navbar from './components/Navbar';
import Home from './Home';
import Movies from './components/Movies';
import About from './About';
import MovieDetails from './components/MovieDetails';
import Cart from './components/Cart';

// Firebase auth imports
import { auth, provider} from './firebase';
import {signInWithPopup, signout } from 'firebase/auth';

// Credit Card Form component
import CreditCardForm from './components/CreditCardForm';

// ProtectedRoute component
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const navigate = useNavigate();

  // Firebase user state
  const [user, setUser] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Login handler
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/app'); // go to main app after login
    } catch (error) {
      alert('Login failed');
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/'); // go back to login
  };

  // Cart state and functions
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [warning, setWarning] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log('Adding product:', product);
    if (product.service) {
      const hasSubscription = cart.some(item => item.service);
      if (hasSubscription) {
        setWarning('You can only add one subscription at a time.');
        setTimeout(() => setWarning(''), 3000);
        return;
      }
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, amount: Math.max(1, item.amount + delta) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <div>
      {/* Login/Logout section */}
      <div style={{ marginBottom: '10px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="profile"
                style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
            )}
            <span>Welcome, {user.displayName || user.email}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </div>

      {/* Routing setup */}
      <Routes>
        {/* Login route */}
        <Route path="/" element={user ? <Navigate to="/app" /> : <Home />} />

        {/* Main app routes under /app */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute user={user}>
              <>
                <Navbar itemCount={cart.length} />
                {warning && <div className="warning">{warning}</div>}

                <nav>
                  <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
                    <li><Link to="/app">Home</Link></li>
                    <li><Link to="/app/movies">Movies</Link></li>
                    <li><Link to="/app/cart">Cart ({cart.length})</Link></li>
                    <li><Link to="/app/about">About</Link></li>
                  </ul>
                </nav>

                <Routes>
                  <Route path="" element={<Home addToCart={addToCart} />} />
                  <Route path="movies" element={<Movies />} />
                  <Route
                    path="cart"
                    element={
                      <Cart
                        items={cart}
                        remove={removeFromCart}
                        updateQuantity={updateQuantity}
                        total={total}
                      />
                    }
                  />
                  <Route path="about" element={<About />} />
                  <Route path="movie/:id" element={<MovieDetails />} />
                </Routes>
              </>
            </ProtectedRoute>
          }
        />

        {/* Separate route for checkout (outside nested routes) */}
        <Route
          path="/app/checkout"
          element={
            <ProtectedRoute user={user}>
              <CreditCardForm />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={user ? "/app" : "/"} />} />
      </Routes>
    </div>
  );
}

export default App;