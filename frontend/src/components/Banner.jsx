import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerImage from '../images/banner-img.png';

export default function Banner() {
    return (
    <div className="section-spacing">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <h1 className='display-5 fw-semibold text-black'>Code <span className='text-secondary'>Crafting <br/>Future</span> Work</h1>
                    <p className='mb-4'>embodies the transformative power of software in shaping the way we work and live. In an era where technology continually evolves, software companies play a pivotal role in designing the tools and applications that enable businesses and individuals to thrive.</p>
                    <div className="btn-wrapper d-flex gap-3">
                        <a href="#" className="btn btn-secondary">Hourly Project</a>
                        <a href="#" className="btn btn-primary">Fixed Project</a>
                    </div>
                </div>
                <div className="col-md-6 text-md-end">
                    <img src={BannerImage} alt="banner image" />
                </div>
            </div>
        </div>
    </div>
);
}