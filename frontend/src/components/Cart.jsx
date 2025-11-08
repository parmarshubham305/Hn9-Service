import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, SERVER_CREATE_SESSION_URL } from '../config';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Cart({cart, onLoginClick}){
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((s,i)=>s+i.price,0);
  const tax = subtotal * 0.1; // 10% tax
  const discountAmount = discount > 0 ? subtotal * discount : 0;
  const total = subtotal + tax - discountAmount;

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedIn);

    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        setEmail(user.email);
      }
    }
  }, []);

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setDiscount(0.1); // 10% discount
      alert('Coupon applied! 10% discount added.');
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    if (!email) {
      alert('Please enter your email');
      return;
    }

    const line_items = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.title} (${item.plan} - ${item.hours}h)`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    try {
      // Store cart in sessionStorage for success page
      sessionStorage.setItem('checkoutCart', JSON.stringify(cart));

      const response = await axios.post(SERVER_CREATE_SESSION_URL, {
        line_items,
        customer_email: email,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create checkout session';
      alert(`Error: ${errorMessage}`);
    }
  };

  return(<div className='card bg-white p-4 rounded-3 shadow position-sticky top-0 h-100'>
    <h3 className='card-title fw-semibold mb-3'>Cart</h3>
    {cart.length === 0 ? (
      <p className='text-muted'>No items in cart</p>
    ) : (
      <>
        {cart.map((i,idx)=>(<div key={idx} className='mb-2'>{i.title} ({i.plan} - {i.hours}h) ${i.price.toFixed(2)}</div>))}
        <hr />
        <div className='mb-2'>
          <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
        </div>
        <div className='mb-2'>
          <strong>Tax (10%):</strong> ${tax.toFixed(2)}
        </div>
        {discount > 0 && (
          <div className='mb-2 text-success'>
            <strong>Discount (10%):</strong> -${discountAmount.toFixed(2)}
          </div>
        )}
        <div className='mb-3'>
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>

        {/* Coupon Section */}
        <div className='mb-3'>
          <label className='form-label fw-medium'>Coupon Code</label>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter coupon code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className='btn btn-outline-primary'
              type='button'
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>
        </div>
      </>
    )}

    {isLoggedIn && (
      <input
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='form-control mb-3'
      />
    )}

    <button
      onClick={handleCheckout}
      className='btn btn-info w-100'
      disabled={cart.length === 0}
    >
      {isLoggedIn ? 'Checkout' : 'Login to Checkout'}
    </button>
  </div>);
}
