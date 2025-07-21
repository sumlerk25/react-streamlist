import React, { useState } from 'react';
import './styles.css';

function Home() {
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  // Handle user typing in input box
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Add new item to the list
  const handleAddInput = () => {
    if (currentInput.trim() !== '') {
      setInputs([...inputs, { text: currentInput, completed: false, isEditing: false }]);
      setCurrentInput(''); // clear input
    }
  };

  // Toggle completion status
  const handleToggleComplete = (index) => {
    const newInputs = [...inputs];
    newInputs[index].completed = !newInputs[index].completed;
    setInputs(newInputs);
  };

  // Delete an item
  const handleDelete = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  // Start editing an item
  const handleEdit = (index) => {
    const newInputs = [...inputs];
    newInputs[index].isEditing = true;
    setInputs(newInputs);
  };

  // Save edited text
  const handleSaveEdit = (index, newText) => {
    const newInputs = [...inputs];
    newInputs[index].text = newText;
    newInputs[index].isEditing = false;
    setInputs(newInputs);
  };

  return (
    <div>
      <h1>StreamList</h1>
      {/* Input box */}
      <input
        type="text"
        placeholder="Enter your event..."
        value={currentInput}
        onChange={handleInputChange}
      />
      {/* Submit button */}
      <button onClick={handleAddInput}>Add</button>

      {/* Display list of inputs */}
      <ul>
        {inputs.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px',
            }}
          >
            {/* Complete icon */}
            <span
              className="material-symbols-outlined"
              style={{ cursor: 'pointer' }}
              onClick={() => handleToggleComplete(index)}
            >
              {item.completed ? 'check_circle' : 'radio_button_unchecked'}
            </span>

            {/* Item text or input if editing */}
            {item.isEditing ? (
              <input
                type="text"
                defaultValue={item.text}
                autoFocus
                onBlur={(e) => handleSaveEdit(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveEdit(index, e.target.value);
                  }
                }}
              />
            ) : (
              <span
                style={{
                  cursor: 'pointer',
                  textDecoration: item.completed ? 'line-through' : 'none',
                }}
                onDoubleClick={() => handleEdit(index)}
              >
                {item.text}
              </span>
            )}

            {/* Edit icon */}
            {!item.isEditing && (
              <span
                className="material-symbols-outlined"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(index)}
              >
                edit
              </span>
            )}

            {/* Delete icon */}
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
    </div>
  );
}

export default Home;