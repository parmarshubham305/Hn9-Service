import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Footer() {
    return (
    <div className="footer-section bg-primary text-white py-4">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <p className='mb-0'>Copyright @2023. All rights reserved</p>
                </div>
                <div className="col-md-6">
                    <ul className="list-unstyled d-flex mb-0 gap-3 align-items-center justify-content-md-end justify-content-center">
                        <li><a href="#" className='text-white'>Trust & Safety</a></li>
                        <li><a href="#" className='text-white'>Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
}