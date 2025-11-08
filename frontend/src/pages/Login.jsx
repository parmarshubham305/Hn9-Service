import React, { useState } from 'react';
import usersData from '../data/users';

export default function Login({ onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check against existing users
    const existingUser = usersData.find(u => u.email === formData.email && u.password === formData.password);
    // Also check registered user in localStorage
    const registeredUser = JSON.parse(localStorage.getItem('user'));
    const isRegisteredValid = registeredUser && registeredUser.email === formData.email && registeredUser.password === formData.password;

    if (existingUser || isRegisteredValid) {
      const userToLogin = existingUser || registeredUser;
      localStorage.setItem('user', JSON.stringify(userToLogin));
      localStorage.setItem('isLoggedIn', 'true');
      onClose();
      // Reload page to update header/login state
      window.location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link"
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
              >
                Don't have an account? Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
