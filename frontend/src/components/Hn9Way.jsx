import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessImage from '../images/success-img.png';
export default function Hn9Way() {
    return (
    <div className="section-spacing  pb-0">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <img src={SuccessImage} alt="banner image" />
                </div>
                <div className="col-md-6">
                    <p className='section-subheading'>Empowering Dreams, Building Success: The HN9 Way.</p>
                    <p className='mb-4'>At HN9, we foster innovation, resilience, and determination in our pursuit of excellence. Whether it's in the software we develop, the services we provide, or the partnerships we forge, our commitment to empowering individuals and businesses to achieve their aspirations is unwavering. Through a combination of cutting-edge technology and unwavering support, HN9 paves the way for dreams to become a tangible and prosperous part of the future.</p>
                </div>
            </div>
        </div>
    </div>
);
}