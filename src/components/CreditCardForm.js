import React, { useState } from 'react';

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Validate card number format
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!regex.test(cardNumber)) {
      setMessage('Invalid card number format! Use 1234 5678 9012 3456.');
      return;
    }
    // Save to localStorage
    const cardData = { cardNumber, name, expDate, cvv };
    localStorage.setItem('cardInfo', JSON.stringify(cardData));
    setMessage('Card info saved!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Enter Your Credit Card Details</h2>
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Name on Card"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Expiration Date (MM/YY)"
        value={expDate}
        onChange={(e) => setExpDate(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px' }}>Save Card Info</button>
      <p>{message}</p>
    </div>
  );
}

export default CreditCardForm;