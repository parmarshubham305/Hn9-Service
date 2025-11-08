import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutImage from '../images/about-img.png';
export default function About() {
    return (
    <div className="section-spacing">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <img src={AboutImage} alt="banner image" />
                </div>
                <div className="col-md-6">
                    <h2 className='fw-semibold text-primary section-heading'>About Hn9 Codecraft</h2>
                    <p className='section-subheading'>Pioneering Progress with Hn9 Codecraft's Software Prowess.</p>
                    <p className='mb-4'>Hn9 Codecraft stands as a well-established entity within the technological landscape, offering a comprehensive array of cutting-edge IT solutions and services. With a proven track record of excellence and client satisfaction, our company is dedicated to delivering innovative and customized solutions tailored to meet the diverse needs of our clients. We take pride in our commitment to reliability, transparency, and long-term partnerships, ensuring every project is executed with precision and care. Backed by a team of seasoned professionals and a consistently high project success rate, we emphasize not only quality but also speed — delivering results faster without compromising on performance or value. At Hn9 Codecraft, trust, efficiency, and excellence define everything we do.</p>
                </div>
            </div>
        </div>
    </div>
);
}