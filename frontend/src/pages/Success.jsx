import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

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

      const purchaseDate = new Date();
      const dateStr = purchaseDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      const dayStr = purchaseDate.toLocaleDateString('en-US', { weekday: 'long' }); // Full day name

      if (cart.length > 0) {
        // For each cart item, call updateUserPurchase API with required fields
        cart.forEach(item => {
          // Assume 'planDuration' field exists in cart item, else default to "1 month"
          const plan = item.planDuration || "1 month";
          api.updateUserPurchase({
            email: user.email,
            serviceName: item.title,
            price: item.price,
            hours: item.hours,
            date: dateStr,
            day: dayStr,
            plan: plan,
          }).then(() => {
            // Optionally handle success per item
          }).catch(error => {
            console.error('Error updating user purchase:', error);
          });
        });

        // Update local user purchasedPlans and totalHours as before
        const purchasedPlans = cart.map(item => ({
          serviceName: item.title,
          price: item.price,
          hours: item.hours,
          date: dateStr,
          day: dayStr,
          plan: item.planDuration || "1 month",
        }));

        user.purchasedPlans = [...(user.purchasedPlans || []), ...purchasedPlans];
        user.totalHours = (user.totalHours || 0) + cart.reduce((sum, item) => sum + item.hours, 0);

        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(user));

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
