import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutImage from '../images/about-img.png';

export default function FixedPrice() {
    return (
    <div className="section-spacing bg-lighter">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-md-5">
                    <h2 className='fw-semibold text-primary section-heading'>Let’s Build Something Great Together!</h2>
                    <p className='fs-5 '>At Hn9 Codecraft, our Fixed Price Resource Allocation model ensures you get dedicated design and development expertise at a transparent, pre-defined cost. We assign the right professionals to your project based on scope and complexity — ensuring maximum efficiency, predictable timelines, and no budget surprises. From planning to deployment, our team stays focused on delivering measurable results that align perfectly with your business goals.</p>
                </div>
                <div className="col-md-6">
                    <div className="form">
                        <form action="">
                            <div className="form-row row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="text" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="name" name="First name"  required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastname" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="name" name="lastname"  required />
                                </div>
                            </div>
                            <div className="form-row row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="number" className="form-label">Phone Number</label>
                                    <input type="number" className="form-control" id="name" name="number" required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"  required />
                                </div>
                            </div>
                            <div className="form-row row mb-4">
                                <div className="col-md-8">
                                    <label htmlFor="Title" className="form-label">Project Title</label>
                                    <input type="text" className="form-control" id="title" name="Title"  required />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="timeline" className="form-label">Project Timeline</label>
                                   <select name="" className='form-control' id="selecthours">
                                    <option value="Select Hours">Select Hours</option>
                                    <option value="2 hours">2 hours</option>
                                    <option value="4 Hours">4 Hours</option>
                                    <option value="6 Hours">6 Hours</option>
                                   </select>
                                </div>
                            </div>
                            <div className="form-row row mb-4">
                                <div className="col-12">
                                    <label htmlFor="Title" className="form-label">Project Description</label>
                                    <textarea name="message" id="message" placeholder='Select Message' className='w-100 form-control'></textarea>
                                </div>
                            </div>
                             <div className="form-row row mb-4">
                                <div className="col-12">
                                   <input type="file" className='form-control' />
                                </div>
                            </div>
                              <div className="form-row row mb-4">
                                <div className="col-12">
                                   <input type="submit" className='btn btn-secondary' value="Send Quote" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}