import React from 'react';

export default function DashboardTab({ user }) {
  return (
    <div>
      <h3>Dashboard Overview</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Hours</h5>
              <p className="card-text">{user.totalHours}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Spent Hours</h5>
              <p className="card-text">{user.spentHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
