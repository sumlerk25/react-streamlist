import React from 'react';

function SubscriptionList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.img} alt={product.service} width="100" />
          <h3>{product.service}</h3>
          <p>{product.serviceInfo}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default SubscriptionList;