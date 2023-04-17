import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
const API_URL = process.env.REACT_APP_API_URL;


const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false); 
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true); 
    try {
      const {data} = await axios.post<{ token: string }>(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        history('/todos');
      }
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    }
    setShowSpinner(false);
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showSpinner ? ( // show the spinner if the showSpinner state variable is true
          <Spinner />
        ) : (
          <button type="submit">
            <h3>SignUp</h3>
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
