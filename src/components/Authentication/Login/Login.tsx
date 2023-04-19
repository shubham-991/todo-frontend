import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { UserContext } from '../../../Context/UserContext';
const API_URL = process.env.REACT_APP_API_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true);
    try {
      const {data} = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      if (data) {
        setUser({
          name: data.name,
          email: data.email,
          token: data.token,
        });
        navigate('/todos');
      }
    } catch (error : any) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      setError('Invalid email or password. Please try again.');
    } else {
      setError('Login Failed. Please try again later.');
    }
  }
    setShowSpinner(false); 
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        {showSpinner ? ( 
          <Spinner />
        ) : (
          <button type="submit">
            <h3>Log In</h3>
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
