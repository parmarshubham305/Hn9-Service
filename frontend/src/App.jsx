import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import servicesData from './data/services';
import Cart from './components/Cart';
import ServiceCard from './components/ServiceCard';
import Header from './components/Header';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App(){
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function addToCart(item){ setCart(prev=>[...prev,item]); }

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <Router>
      <Header onLoginClick={handleLoginClick} />
      <Routes>
        <Route path="/" element={
          <div className='min-vh-100 p-3 p-md-5'>
            <div className="container">
            <div className="heading mb-md-5 mb-4">
              <h1 className="text-primary text-center fw-bold">Looking to Hire Skilled Developers?</h1>
              <p className="text-center">At Hn9 Codecraft, we bring your ideas to life with expert web and app development services. Our dedicated team of skilled developers builds high-performance websites and mobile apps with quality, speed, and innovation.</p>
            </div>
            <div className='row g-4 align-items-start'>
              <div className='col-md-8 col-12'>{servicesData.map(s=>(<ServiceCard key={s.id} service={s} onAdd={addToCart}/>))}</div>
              <div className='col-md-4 col-12 position-sticky top-0 '><Cart cart={cart} onLoginClick={handleLoginClick}/></div>
            </div>
            </div>
          </div>
        } />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>

      {showLogin && (
        <Login
          onClose={handleCloseModals}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {showRegister && (
        <Register
          onClose={handleCloseModals}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </Router>
  );
}
