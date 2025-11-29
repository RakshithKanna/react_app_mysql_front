import React, { useState } from 'react';
import './LoginForm.css'; // Optional styling file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for user feedback messages

  // Function to handle form submission and API call
  const handleSubmit = async (event) => { 
    event.preventDefault(); // Prevents the default browser page reload

    // Clear previous messages and show loading state
    setMessage('Attempting to log in...');

    try {
      // Send a POST request to your backend API endpoint running on port 3001
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server we are sending JSON
        },
        // Convert the state data into a JSON string for the request body
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse the JSON response from the server
      
      if (response.ok && data.isAuthenticated) {
        // Handle successful login
        setMessage(`Success: ${data.message}`);
        console.log('Login successful for user:', username);
        // You would typically store a user token or redirect the user here
      } else {
        // Handle failed login (e.g., wrong password)
        setMessage(`Error: ${data.message}`);
      }

    } catch (error) {
      // Handle network errors (e.g., backend server is offline)
      console.error('Network error during login:', error);
      setMessage('A network error occurred. Check if the backend server is running.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {/* Display feedback message to the user */}
        {message && (
          <p style={{ 
            color: message.startsWith('Error') || message.startsWith('A network') ? 'red' : 'green',
            padding: '10px',
            border: '1px solid currentColor',
            borderRadius: '4px'
          }}>
            {message}
          </p>
        )}
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
