import React from 'react';

export default function TasksTab({ tasks, setEditingTask, deleteTask }) {
  return (
    <div>
      <h3>All Tasks</h3>
      <button className="btn btn-success mb-3" onClick={() => setEditingTask({})}>Add Task</button>
      <div className="list-group">
        {tasks.map(task => (
          <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.name}</h5>
              <p>{task.description}</p>
              <small>Hours: {task.hours}, Date: {task.date}</small>
            </div>
            <div>
              <button className="btn btn-primary me-2" onClick={() => setEditingTask(task)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
