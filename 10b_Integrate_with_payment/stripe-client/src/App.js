import React from 'react';

function App() {
  const handlePayment = async () => {
    const dummyCart = [
      {
        "_id": "product1",
        "name": "Product 1",
        "image": "https://via.placeholder.com/150",
        "selectedQuantity": 2,
        "price": 20
      },
      {
        "_id": "product2",
        "name": "Product 2",
        "image": "https://via.placeholder.com/150",
        "selectedQuantity": 1,
        "price": 50
      }
    ];

    try {
      const response = await fetch('http://localhost:3001/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dummyCart }),
      });

      const data = await response.json();
      if (data.sessionId) {
        window.location.href = data.sessionId;
      } else {
        console.error('Error creating payment intent:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>My First React App</h1>
      <button onClick={handlePayment}>Pay with Stripe</button>
    </div>
  );
}

export default App;