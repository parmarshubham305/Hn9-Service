import React from 'react';

export default function TaskEditModal({ editingTask, setEditingTask, addTask, editTask }) {
  if (!editingTask) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingTask.id ? 'Edit Task' : 'Add Task'}</h5>
            <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const taskData = {
                name: formData.get('name'),
                description: formData.get('description'),
                hours: parseFloat(formData.get('hours')),
                date: formData.get('date')
              };
              if (editingTask.id) {
                editTask(editingTask.id, { ...editingTask, ...taskData });
              } else {
                addTask(taskData);
                setEditingTask(null);
              }
            }}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" className="form-control" defaultValue={editingTask.name} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" defaultValue={editingTask.description} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Hours</label>
                <input name="hours" type="number" step="0.1" className="form-control" defaultValue={editingTask.hours} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input name="date" type="date" className="form-control" defaultValue={editingTask.date} required />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
