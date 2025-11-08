import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, SERVER_CREATE_SESSION_URL } from '../config';
import ApplePay from '../images/Apple_Pay_logo.svg';
import Mastercard from '../images/Mastercard-logo.svg';
import PayPal from '../images/PayPal.svg';
import Visa from '../images/Visa_Inc_logo.svg';

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
    <h3 className='card-title text-primary fw-semibold mb-4 pb-4 border-bottom border-light'>Order Summary</h3>
    {cart.length === 0 ? (
      <p className='text-muted'>No items in cart</p>
    ) : (
      <>
        <div className=' mb-4 pb-4 border-bottom border-light d-flex flex-column gap-2'>
          {cart.map((i,idx)=>(<div key={idx} className='d-flex justify-content-between align-items-center text-black fw-medium'><span>{i.title} <small className='text-muted'>({i.plan})</small> </span> 
          <span>${i.price.toFixed(2)}</span></div>))}
        </div>
          {/* Coupon Section */}
        <div className=' mb-4 pb-4 border-bottom border-light'>
          <label className='form-label text-primary fw-medium'>Enter Coupon Code</label>
          <div className='input-group'>
            <input
              type='text'
              className='form-control rounded-5 border-primary rounded-end-0'
              placeholder='Enter coupon code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className='btn btn-primary px-4'
              type='button'
              onClick={applyCoupon}
            >
              Submit
            </button>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center text-black fw-medium mb-2'>
          <span>Subtotal:</span> ${subtotal.toFixed(2)}
        </div>
        <div className='d-flex justify-content-between align-items-center text-black fw-medium mb-2'>
          <span>Tax </span> ${tax.toFixed(2)}
        </div>
        {discount > 0 && (
          <div className='d-flex justify-content-between align-items-center text-black fw-medium mb-2 text-success'>
            <span>Discount (10%):</span> -${discountAmount.toFixed(2)}
          </div>
        )}
        <div className='mb-4 d-flex justify-content-between align-items-center text-black fw-bold fs-5 border-top pt-3 mt-2'>
          <span>Total:</span>   <span>${total.toFixed(2)}</span>
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
      className='btn btn-secondary w-100'
      disabled={cart.length === 0}
    >
      {isLoggedIn ? 'Checkout' : 'Login to Checkout'}
    </button>

    <h4 className='mb-3 pt-4'>Payment Accept:</h4>
    <div className='d-flex align-items-center justify-content-between'>
      <img src={PayPal} alt="PayPal" />
      <img src={Mastercard} alt="Mastercard" />
      <img src={Visa} alt="Visa" />
      <img src={ApplePay} alt="" />
    </div>
  </div>);
}
