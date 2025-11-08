import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Artc from '../images/logo/artc.svg';
import Boqtiquebar from '../images/logo/boqtiquebar.svg';
import Dig from '../images/logo/dig-pharma.svg';
import TheIron from '../images/logo/theiron.svg';
import Dk from '../images/logo/dk-service.svg';
import Idyn from '../images/logo/Idyn.svg';
import listd from '../images/logo/listd.svg';
import Pink from '../images/logo/pink-elephant.svg';
import pos365 from '../images/logo/pos365.svg';
import Mahakali from '../images/logo/shree-mahakali.svg';
import siteSurgery from '../images/logo/site-surgery.svg';
import Stayable from '../images/logo/stayable.svg';
import Swarat from '../images/logo/swarat.svg';
import Timmy from '../images/logo/timmy-tells.svg';
import Volante from '../images/logo/Volante.svg';
export default function OurBrands () {
    return (
    <div className="section-spacing">
        <div className="container">
            <div className="text-center">
                <h2 className='fw-semibold text-primary section-heading heading-center text-center'>Brands That Believe in Us</h2>
                <p className='mb-5 text-center'>We collaborate with ambitious brands that value creativity, technology, and long-term success.</p>
            </div>
            <div className="image-wrapper d-flex align-items-center justify-content-center flex-wrap">
                <div className="img-box bg-lighter">
                    <img src={Artc} alt="Artc" />
                </div>
                 <div className="img-box bg-lighter">
                     <img src={Boqtiquebar} alt="Boqtiquebar" />
                </div>
                 <div className="img-box bg-lighter">
                    <img src={Dig} alt="Dig" /> 
                </div>
                 <div className="img-box bg-lighter">
                    <img src={Idyn} alt="Idyn" />   
                </div>
                 <div className="img-box bg-lighter">
                   <img src={listd} alt="listd" />
                </div>
                 <div className="img-box bg-lighter">
                    <img src={Pink} alt="Pink Elephant" />
                </div>
                 <div className="img-box bg-lighter">
                    <img src={Dk} alt="pos365" />
                </div>
                  <div className="img-box bg-lighter">
                   <img src={Mahakali} alt="Mahakali" />
                </div>

                <div className="img-box bg-lighter">
                    <img src={pos365} alt="pos365" />
                </div>

                <div className="img-box bg-lighter">
                    <img src={siteSurgery} alt="siteSurgery" />
                </div>
                <div className="img-box bg-lighter">
                     <img src={Stayable} alt="Stayable" />
                </div>
                 <div className="img-box bg-lighter">
                     <img src={Swarat} alt="Swarat" />
                </div>
                 <div className="img-box bg-lighter">
                    <img src={Timmy} alt="Timmy" />
                </div>
                <div className="img-box bg-lighter">
                    <img src={Volante} alt="Volante" />
                </div>
                <div className="img-box bg-lighter">
                    <img src={TheIron} alt="TheIron" />
                </div>
            </div>
        </div>
    </div>
);
}