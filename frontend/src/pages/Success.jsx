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
      // For demo purposes, we'll assume the cart was stored in sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('checkoutCart') || '[]');

      if (cart.length > 0) {
        const purchasePromises = cart.map(item => {
          // The backend will calculate most fields. We just send the core purchase info.
          return api.updateUserPurchase({
            email: user.email,
            serviceName: item.title,
            price: item.price,
            hours: item.hours,
            totalHours: item.totalHours, // Send total calculated hours
            days: item.days, // Send total calculated days
            planDuration: item.plan || "1 month",
          });
        });

        // After all purchases are processed, we can get the final user object
        Promise.all(purchasePromises)
          .then(results => {
            // The last result will contain the most up-to-date user object
            const lastResult = results[results.length - 1];
            if (lastResult && lastResult.user) {
              // Update user in localStorage with the response from the server
              localStorage.setItem('user', JSON.stringify(lastResult.user));
            }
          })
          .catch(error => {
            console.error('One or more user purchase updates failed:', error);
          })
          .finally(() => {
            // Clear session cart regardless of success or failure
            sessionStorage.removeItem('checkoutCart');
          });
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
