// src/components/Navbar/Navbar.tsx
import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Navbar: React.FC = () => {
  const history = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      setIsUserLoaded(true);
    }
  }, [setUser]);

  const logoutHandler = () => {
  // Clear user context value

  // Remove user details from localStorage
  localStorage.removeItem("userInfo");
  // Redirect user to home page
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
