import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSso = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/start-sso');
      window.location.href = response.data.rampartUrl; // Redirect
    } catch (error) {
      console.error('SSO Error:', error);
      alert('Failed to start SSO');
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Rampart SSO Example</h1>
      <button 
        onClick={handleSso} 
        disabled={isLoading}
        className="sso-button"
      >
        {isLoading ? 'Loading...' : 'SSO with Rampart'}
      </button>
    </div>
  );
}

export default App;