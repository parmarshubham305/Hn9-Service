import React from 'react';

export default function ServicesTab({ plans, setEditingPlan, deletePlan }) {
  return (
    <div>
      <h3>All Services</h3>
      <button className="btn btn-success mb-3" onClick={() => setEditingPlan({})}>Add Service</button>
      <div className="list-group">
        {plans.map(plan => (
          <div key={plan.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{plan.title}</h5>
              <p>{plan.description}</p>
              <small>
                1 Month: {plan.prices1month?.map(p => `${p.hours}h - $${p.price}`).join(', ')}<br/>
                3 Month: {plan.prices3month?.map(p => `${p.hours}h - $${p.price}`).join(', ')}
              </small>
            </div>
            <div>
              <button className="btn btn-primary me-2" onClick={() => setEditingPlan(plan)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deletePlan(plan.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
