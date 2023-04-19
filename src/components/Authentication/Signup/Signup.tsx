import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { UserContext } from '../../../Context/UserContext';
const API_URL = process.env.REACT_APP_API_URL;


const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false); 
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true); 
    try {
      const {data} = await axios.post(`${API_URL}/api/auth/signup`, {
        name,
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
    } catch (error) {
      console.error(error);
      setError('Sign Up Failed. Please try again.');
    }
    setShowSpinner(false);
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
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
