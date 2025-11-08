import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem('cart');

    // Update user's purchased services
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Get cart items from URL params or session storage
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');

      // For demo purposes, we'll assume the cart was stored in sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('checkoutCart') || '[]');

      if (cart.length > 0) {
        // Update user's purchased plans
        const purchasedPlans = cart.map(item => ({
          serviceName: item.title,
          price: item.price,
          hours: item.hours,
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) // Full day name
        }));

        user.purchasedPlans = [...(user.purchasedPlans || []), ...purchasedPlans];
        user.totalHours = (user.totalHours || 0) + cart.reduce((sum, item) => sum + item.hours, 0);

        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Update usersData array
        const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');
        const userIndex = usersData.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          usersData[userIndex] = user;
          localStorage.setItem('usersData', JSON.stringify(usersData));
        }

        // Clear session cart
        sessionStorage.removeItem('checkoutCart');
      }
    }
  }, []);

  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center p-3'>
      <div className='card bg-white p-5 rounded-3 shadow text-center'>
        <h1 className='h2 fw-bold mb-4'>Payment Successful!</h1>
        <p className='mb-4'>Thank you for your purchase. A confirmation email has been sent to your email address.</p>
        <Link to="/" className='btn btn-info'>Back to Services</Link>
      </div>
    </div>
  );
}
