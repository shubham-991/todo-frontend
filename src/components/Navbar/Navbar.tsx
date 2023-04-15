// src/components/Navbar/Navbar.tsx
import React, { useContext } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Navbar: React.FC = () => {
  const history = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      history("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">TaskMate</div>
      <div className="navbar-items">
        {user && <span className="navbar-item">Hi, {user.name}</span>}
        <button className="navbar-item logout-btn" onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
