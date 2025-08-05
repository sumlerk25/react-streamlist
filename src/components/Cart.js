import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ items, remove, updateQuantity, total }) {
  // Debug: log current cart items
  console.log('Cart items:', items);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="cart-item"
              style={{ display: 'flex', marginBottom: '10px' }}
            >
              <img
                src={item.img}
                alt={item.service}
                width="50"
                style={{ marginRight: '10px' }}
              />
              <div>
                <h4>{item.service}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.amount}</p>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => remove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>

          {/* Add the checkout button here */}
          <div style={{ marginTop: '20px' }}>
            <Link to="/app/checkout">
              <button style={{ padding: '10px 20px', fontSize: '16px' }}>Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;