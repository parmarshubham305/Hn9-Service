import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center p-3'>
      <div className='card bg-white p-5 rounded-3 shadow text-center'>
        <h1 className='h2 fw-bold mb-4'>Payment Cancelled</h1>
        <p className='mb-4'>Your payment was cancelled. You can try again or continue shopping.</p>
        <Link to="/" className='btn btn-info'>Back to Services</Link>
      </div>
    </div>
  );
}
