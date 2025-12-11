import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './api';
import Cart from './components/Cart';
import ServiceCard from './components/ServiceCard';
import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import FixedPrice from './components/FixedPrice';
import OurBrands from './components/OurBrands';
import Testimonials from './components/Testimonials';
import Hn9Way from './components/Hn9Way';
import Footer from './components/Footer';
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
  const [servicesData, setServicesData] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Fetch services from API
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to static data if API fails
        // import('./data/services').then(module => setServicesData(module.default));
      }
    };
    fetchServices();
  }, []);

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
          <main>
            <Banner/>
            <div className="service-section section-spacing bg-lighter mt-md-3">
              <div className="main-heading">
                <div className="container">
                    <h2 className="text-primary text-center fw-bold mb-3">Flexible Hourly Plans Designed to Fit Your Workload.</h2>
                    <p className="text-center mb-0">Pick your preferred hours and let our AI-powered development team deliver fast, reliable, and scalable results. Each hour works smarter with automation, expert focus, and a workflow designed to accelerate your business.</p>
                </div>
              </div>
              <div className="container">
                <div className='row align-items-start'>
                  <div className='col-md-8 col-12'>{servicesData.map(s=>(<ServiceCard key={s.id} service={s} onAdd={addToCart}/>))}</div>
                  <div className='col-md-4 col-12 position-sticky top-0 mt-md-5'><Cart cart={cart} onLoginClick={handleLoginClick}/></div>
                </div>
              </div>
            </div>
            <About/>
            <FixedPrice/>
            <OurBrands/>
            <Testimonials />
            <Hn9Way />
            <Footer/>
          </main>
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
