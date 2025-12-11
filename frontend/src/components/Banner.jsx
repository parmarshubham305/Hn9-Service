import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerImage from '../images/banner-img.png';

export default function Banner() {
    return (
    <div className="py-md-5 py-4">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                    <h1 className='display-6 fw-semibold text-black'>Smarter Work <span className='text-secondary'>Starts Here <br/>AI +</span> Hourly Developers</h1>
                    <p className='mb-4'>Bring your ideas to life with AI-powered workflows and expert hourly developers across all major technologies. Our AI Agents support analysis, automation, and optimization, ensuring every step of your development cycle runs smoothly. Enjoy flexible hours, faster turnaround, and smarter project execution.</p>
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