
import React, { useState } from 'react';
import checkIcon from '../images/checkbox.svg';

export default function ServiceCard({ service, onAdd }) {
  const [selectedPlan, setSelectedPlan] = useState("1");
  const [selectedHours, setSelectedHours] = useState(service.prices1month[0].hours);
  const [showDetails, setShowDetails] = useState(false);

  const activePrices = selectedPlan === "1" ? service.prices1month : service.prices3month;
  const selectedOption = activePrices.find((p) => p.hours === selectedHours);
  console.log('Selected Option:', selectedOption);
const totalHours = selectedOption
  ? selectedOption.hours * (selectedPlan === "3" ? 66 : 22)
  : 0;
  const totalPrice = selectedOption ? totalHours * selectedOption.price : 0;
  const selectedMonth = selectedPlan === "3" ? "66" : "22";

  return (
    <>
      <div className="card bg-white rounded-3  mx-auto mb-5 position-sticky top-0">
        <div className="card-header d-flex justify-content-between align-items-center py-3 px-4 bg-primary text-white rounded-top-3">
          <h2 className="h3 fw-semibold mb-0 text-white">{service.title}</h2>
          <div className="d-flex">
            <button
              onClick={() => setSelectedPlan("1")}
              className={`btn px-4 transition-background lh-1 rounded-end-0 border border-secondary text-white ${selectedPlan === "1" ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              1 Month
            </button>
            <button
              onClick={() => setSelectedPlan("3")}
              className={`btn px-4 transition-background lh-1 rounded-start-0 border border-secondary text-white ${selectedPlan === "3" ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              3 Months
            </button>
          </div>
        </div>
        <div className="card-body px-4 py-5">
            {/* Hour Selection */}
          <div className='mb-4'>
            <div className="row gap-3 px-3">
              {activePrices.map((p) => (
                <label
                  key={p.hours}
                  className={`col-12 col-md cursor-pointer p-4 text-center rounded border ${
                    selectedHours === p.hours ? "bg-primary border-primary text-white" : "border-light text-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name={`hours-${service.id}`}
                    value={p.hours}
                    checked={selectedHours === p.hours}
                    onChange={() => setSelectedHours(p.hours)}
                    className="d-none"
                  />
                  <span className='display-4 fw-semibold lh-1'>{p.hours} </span>
                  <span className='d-block fw-medium fs-5 lh-sm mt-2 font-outline'>Hours for<br/> each day</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description List */}
          <h3 className='h4 text-primary fw-semibold mb-3'>What's include:</h3>
          <ul className='list-unstyled mb-3 column-count-2'>
            {service.description.map((item, index) => (
              <li key={index} className='mb-2 d-flex align-items-start'>
                <img src={checkIcon} alt="check" className='me-2 mt-2' />
                {item}
              </li>
            ))}
          </ul>

          {/* Read More Button */}
          <button
            className='btn btn-link p-0 text-secondary text-decoration-none fs-5 fw-semibold'
            onClick={() => setShowDetails(true)}
          >
            Read More <i className='bi bi-chevron-right'></i>
          </button>

        
          {/* Calculations */}
          <div className="mt-4 pt-4 border-top border-light d-flex align-items-center justify-content-between flex-wrap gap-3">
           <div className='pe-5 border-end border-light'> 
              <h4 className='fw-semibold fs-3 text-primary mb-0'>{selectedMonth} Days</h4>
               <p className='mb-0 font-outline'> For {selectedPlan === '1' ? '1 Month' : '3 Months'}</p>
            </div>
            
            <div className='pe-5 border-end border-light'>
                <h4 className='fw-semibold fs-3 text-primary mb-0'> {totalHours} </h4>
                <p className='mb-0 font-outline'> Total Hours</p>
            </div>
            <div className='pe-5 border-end border-light'>
               <h4 className='fw-semibold fs-3 text-primary mb-0'>${selectedOption?.price}/hr</h4>
             <p className='mb-0 font-outline'>Hourly Price</p>
            </div>
            <div>
               <h4 className='fw-semibold fs-3 text-primary mb-0'>${totalPrice.toFixed(2)}</h4>
                 <p className='mb-0 font-outline'> Total Price</p>
            </div>
              <button
            onClick={() =>
              onAdd({
                plan: selectedPlan === "1" ? "1 Month" : "3 Months",
                hours: selectedHours,
                price: totalPrice,
                id: service.id,
                title: service.title,
              })
            }
            className="btn btn-primary"
          >
            Add to Cart 
          </button>
          </div>
        
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{service.title} - Detailed Information</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetails(false)}></button>
              </div>
              <div className="modal-body">
                <h6 className="fw-bold mb-3">What We Offer:</h6>
                <ul className='list-unstyled mb-4'>
                  {service.description.map((item, index) => (
                    <li key={index} className='mb-2'>
                      <i className='bi bi-check-circle-fill text-success me-2'></i>
                      {item}
                    </li>
                  ))}
                </ul>

                <h6 className="fw-bold mb-3">Additional Details:</h6>
                <p className="text-muted">{service.extraDetails}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetails(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
