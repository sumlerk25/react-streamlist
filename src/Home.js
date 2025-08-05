import React, { useState } from 'react';
import './styles.css';
import list from './data';

function Home({ addToCart }) {
  // Task list states
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  // Task list handlers
  const handleInputChange = (e) => setCurrentInput(e.target.value);
  const handleAddInput = () => {
    if (currentInput.trim() !== '') {
      setInputs([...inputs, { text: currentInput, completed: false, isEditing: false }]);
      setCurrentInput('');
    }
  };
  const handleToggleComplete = (index) => {
    const newInputs = [...inputs];
    newInputs[index].completed = !newInputs[index].completed;
    setInputs(newInputs);
  };
  const handleDelete = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  const handleEdit = (index) => {
    const newInputs = [...inputs];
    newInputs[index].isEditing = true;
    setInputs(newInputs);
  };
  const handleSaveEdit = (index, newText) => {
    const newInputs = [...inputs];
    newInputs[index].text = newText;
    newInputs[index].isEditing = false;
    setInputs(newInputs);
  };

  return (
    <div>
      <h1>StreamList</h1>

      {/* Your task list UI */}
      <ul>
        {inputs.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px' }}>
            <span
              className="material-symbols-outlined"
              style={{ cursor: 'pointer' }}
              onClick={() => handleToggleComplete(index)}
            >
              {item.completed ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {item.isEditing ? (
              <input
                type="text"
                defaultValue={item.text}
                autoFocus
                onBlur={(e) => handleSaveEdit(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(index, e.target.value);
                }}
              />
            ) : (
              <span
                style={{ cursor: 'pointer', textDecoration: item.completed ? 'line-through' : 'none' }}
                onDoubleClick={() => handleEdit(index)}
              >
                {item.text}
              </span>
            )}
            {!item.isEditing && (
              <span
                className="material-symbols-outlined"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(index)}
              >
                edit
              </span>
            )}
            <span
              className="material-symbols-outlined"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDelete(index)}
            >
              delete
            </span>
          </li>
        ))}
      </ul>

      {/* Product list for adding to cart */}
      <h2>Available Products</h2>
      <div className="product-list">
        {list.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '10px' }}>
            <img src={product.img} alt={product.service} width="100" />
            <h3>{product.service}</h3>
            <p>{product.serviceInfo}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;