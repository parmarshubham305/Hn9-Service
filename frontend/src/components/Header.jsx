import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteImage from '../images/hn9-codecraft.svg';

export default function Header({ onLoginClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedIn);

    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
         <a href="/"><img src={SiteImage} alt='Hn9 Codecraft'/></a>
          </div>
          <div className='d-flex align-items-center gap-2'>
            <a href="/howtowork" className='text-black mx-4 font-outline'>How to Work</a>
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                  <button
                  className="btn btn-link text-black text-decoration-none border-end rounded-0"
                  onClick={goToDashboard}
                >
                  <span >Dashboard</span>
                </button>
                <button
                  className="btn btn-link text-decoration-none me-3 fw-semibold text-black"
                  onClick={goToDashboard}
                >
                  <span >Hello, {user?.firstname}</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={onLoginClick}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
