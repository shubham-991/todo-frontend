import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true);
    try {
      const {data} = await axios.post('https://todo-backend-shubham-991.onrender.com/api/auth/login', {
        email,
        password,
      });
      if (data) {
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        history('/todos');
      }
    } catch (error) {
      console.error(error);
      setError('Login Failed. Please try again.');
    }
    setShowSpinner(false); 
  };

  return (
    <div className="login">
      <h2>Login</h2>
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
