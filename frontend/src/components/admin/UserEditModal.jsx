import React from 'react';

export default function UserEditModal({ editingUser, setEditingUser, addUser, editUser }) {
  if (!editingUser) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingUser.id ? 'Edit User' : 'Add User'}</h5>
            <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const userData = {
                email: formData.get('email'),
                password: formData.get('password') || 'password123',
                phone: formData.get('phone'),
                country: formData.get('country'),
                totalHours: 0, // Will be calculated from purchased plans
                spentHours: 0, // Always 0 for new/edited users
                purchasedPlans: [] // Will be managed separately
              };
              if (editingUser.id) {
                editUser(editingUser.id, { ...editingUser, ...userData });
              } else {
                addUser(userData);
              }
            }}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-control" defaultValue={editingUser.email} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control" defaultValue={editingUser.password} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input name="phone" className="form-control" defaultValue={editingUser.phone} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input name="country" className="form-control" defaultValue={editingUser.country} required />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
