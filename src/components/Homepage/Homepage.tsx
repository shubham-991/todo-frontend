// src/components/Homepage/Homepage.tsx
import React, { useState } from 'react';
import Login from '../Authentication/Login/Login';
import Signup from '../Authentication/Signup/Signup';
import './Homepage.css';

const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const renderContent = () => {
    if (activeTab === 'login') {
      return <Login />;
    } else {
      return <Signup />;
    }
  };

  return (
    <div className="homepage">
      <h1 className="heading">TaskMate</h1>
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          <h3>Login</h3>
        </button>
        <button
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          <h3>Sign Up</h3>
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Homepage;
