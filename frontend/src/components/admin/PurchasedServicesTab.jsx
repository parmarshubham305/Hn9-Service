import React from 'react';

export default function PurchasedServicesTab({ user }) {
  return (
    <div>
      <h3>Purchased Services</h3>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Hours Purchased</h5>
              <h3>{user.totalHours || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Hours Spent</h5>
              <h3>{user.spentHours || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Remaining Hours</h5>
              <h3>{(user.totalHours || 0) - (user.spentHours || 0)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Purchased Services</h5>
        </div>
        <div className="card-body">
          {user.purchasedPlans && user.purchasedPlans.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Hours</th>
                    <th>Date</th>
                    <th>Day</th>
                  </tr>
                </thead>
                <tbody>
                  {user.purchasedPlans.map((plan, index) => (
                    <tr key={index}>
                      <td>{plan.serviceName}</td>
                      <td>${plan.price}</td>
                      <td>{plan.hours}</td>
                      <td>{plan.date}</td>
                      <td>{plan.day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No purchased services yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
