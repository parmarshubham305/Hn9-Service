import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <img src='/src/images/hn9-codecraft.svg' alt='Hn9 Codecraft'/>
          </div>
          <div>
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-link text-decoration-none me-3"
                  onClick={goToDashboard}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  <span className="ms-2">{user?.email}</span>
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
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
