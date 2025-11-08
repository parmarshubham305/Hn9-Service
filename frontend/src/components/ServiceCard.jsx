
import React, { useState } from 'react';

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

  return (
    <>
      <div className="card bg-white rounded-3  mx-auto mb-4">
        <div className="card-header d-flex justify-content-between align-items-center py-3 px-4 bg-primary text-white rounded-top-3">
          <h2 className="h5 fw-semibold mb-0 text-white">{service.title}</h2>
          <div className="d-flex">
            <button
              onClick={() => setSelectedPlan("1")}
              className={`btn px-4 rounded-end-0 border border-secondary text-white ${selectedPlan === "1" ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              1 Month
            </button>
            <button
              onClick={() => setSelectedPlan("3")}
              className={`btn px-4 rounded-start-0 border border-secondary text-white ${selectedPlan === "3" ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              3 Months
            </button>
          </div>
        </div>
        <div className="card-body p-4">
            {/* Hour Selection */}
          <div className='mb-4'>
            <label className="form-label fw-medium mb-2">Select Hours:</label>
            <div className="row gap-3">
              {activePrices.map((p) => (
                <label
                  key={p.hours}
                  className={`col-12 col-md cursor-pointer p-3 fs-5 text-center rounded border ${
                    selectedHours === p.hours ? "bg-primary border-primary text-white" : "border-primary"
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
                  <span className='display-6'>{p.hours} </span>
                  <span className='d-block'>Hours</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description List */}
          <ul className='list-unstyled mb-3'>
            {service.description.map((item, index) => (
              <li key={index} className='mb-2'>
                <i className='bi bi-check-circle-fill text-success me-2'></i>
                {item}
              </li>
            ))}
          </ul>

          {/* Read More Button */}
          <button
            className='btn btn-link p-0 mb-3 text-decoration-none'
            onClick={() => setShowDetails(true)}
          >
            Read More <i className='bi bi-chevron-right'></i>
          </button>

        
          {/* Calculations */}
          <div className="mt-4">
            <div className="fw-semibold text-muted">
              Hourly Rate: ${selectedOption?.price}/hr
            </div>
            <div className="fw-semibold text-muted">
              Total Hours: {totalHours} (1 Month = 22 Days)
            </div>
            <div className="fw-bold fs-5 text-dark">
              Total Price: ${totalPrice.toFixed(2)}
            </div>
          </div>

          {/* Add Button */}
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
            className="btn btn-primary mt-4"
          >
            Add to Cart 
          </button>
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
