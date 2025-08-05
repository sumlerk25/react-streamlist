import React from 'react';

function Navbar({ itemCount }) {
  return (
    <div className="navbar">
      <h2>Steamlist</h2>
      <div>🛒 Items in Cart: {itemCount}</div>
    </div>
  );
}

export default Navbar;