import React from 'react';

export default function PlanEditModal({ editingPlan, setEditingPlan, addPlan, editPlan }) {
  if (!editingPlan) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingPlan.id ? 'Edit Service' : 'Add Service'}</h5>
            <button type="button" className="btn-close" onClick={() => setEditingPlan(null)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const planData = {
                title: formData.get('title'),
                description: formData.get('description'),
                prices1month: [
                  { hours: parseInt(formData.get('hours1_1')), price: parseInt(formData.get('price1_1')) },
                  { hours: parseInt(formData.get('hours1_2')), price: parseInt(formData.get('price1_2')) },
                  { hours: parseInt(formData.get('hours1_3')), price: parseInt(formData.get('price1_3')) },
                  { hours: parseInt(formData.get('hours1_4')), price: parseInt(formData.get('price1_4')) }
                ],
                prices3month: [
                  { hours: parseInt(formData.get('hours3_1')), price: parseInt(formData.get('price3_1')) },
                  { hours: parseInt(formData.get('hours3_2')), price: parseInt(formData.get('price3_2')) },
                  { hours: parseInt(formData.get('hours3_3')), price: parseInt(formData.get('price3_3')) },
                  { hours: parseInt(formData.get('hours3_4')), price: parseInt(formData.get('price3_4')) }
                ]
              };
              if (editingPlan.id) {
                editPlan(editingPlan.id, { ...editingPlan, ...planData });
              } else {
                addPlan(planData);
              }
            }}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" className="form-control" defaultValue={editingPlan.title} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" defaultValue={editingPlan.description} required />
              </div>
              <h6>1 Month Pricing</h6>
              <div className="row">
                {[1,2,3,4].map(i => (
                  <div key={i} className="col-md-3">
                    <label>Hours {i}</label>
                    <input name={`hours1_${i}`} type="number" className="form-control" defaultValue={editingPlan.prices1month?.[i-1]?.hours || 2 + (i-1)*2} required />
                    <label>Price {i}</label>
                    <input name={`price1_${i}`} type="number" className="form-control" defaultValue={editingPlan.prices1month?.[i-1]?.price || 10} required />
                  </div>
                ))}
              </div>
              <h6>3 Month Pricing</h6>
              <div className="row">
                {[1,2,3,4].map(i => (
                  <div key={i} className="col-md-3">
                    <label>Hours {i}</label>
                    <input name={`hours3_${i}`} type="number" className="form-control" defaultValue={editingPlan.prices3month?.[i-1]?.hours || 2 + (i-1)*2} required />
                    <label>Price {i}</label>
                    <input name={`price3_${i}`} type="number" className="form-control" defaultValue={editingPlan.prices3month?.[i-1]?.price || 8} required />
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
