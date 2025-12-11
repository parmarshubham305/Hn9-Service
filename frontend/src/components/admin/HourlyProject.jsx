import React from 'react';

export default function HourlyProject({ users, setEditingUser, deleteUser }) {
  console.log('UsersTab received users:', users);
  return (
    <div>
      <h3>All Users</h3>
      <button className="btn btn-success mb-3" onClick={() => setEditingUser({})}>Add User</button>
      <div className="list-group">
        {users && users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{user.email}</h5>
                <p>{user.phone} - {user.country}</p>
                <small>Total Hours: {user.totalHours}, Spent Hours: {user.spentHours}</small>
              </div>
              <div>
                <button className="btn btn-primary me-2" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
