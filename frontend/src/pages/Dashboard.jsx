import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import plansData from '../data/plans';
import usersData from '../data/users';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState(plansData);
  const [users, setUsers] = useState(usersData);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      // Calculate total hours from purchased plans
      const totalHours = storedUser.purchasedPlans?.reduce((sum, plan) => sum + (plan.hours || 0), 0) || 0;
      setUser({ ...storedUser, totalHours });

      // Load dynamic data from localStorage
      const storedUsers = localStorage.getItem('usersData');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }

      const storedPlans = localStorage.getItem('plansData');
      if (storedPlans) {
        setPlans(JSON.parse(storedPlans));
      }

      const storedTasks = localStorage.getItem('tasksData');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Plan CRUD
  const addPlan = (plan) => {
    const updatedPlans = [...plans, { ...plan, id: Date.now().toString() }];
    setPlans(updatedPlans);
    // Update localStorage
    localStorage.setItem('plansData', JSON.stringify(updatedPlans));
  };

  const editPlan = (id, updatedPlan) => {
    const updatedPlans = plans.map(p => p.id === id ? updatedPlan : p);
    setPlans(updatedPlans);
    setEditingPlan(null);
    // Update localStorage
    localStorage.setItem('plansData', JSON.stringify(updatedPlans));
  };

  const deletePlan = (id) => {
    const updatedPlans = plans.filter(p => p.id !== id);
    setPlans(updatedPlans);
    // Update localStorage
    localStorage.setItem('plansData', JSON.stringify(updatedPlans));
  };

  // User CRUD
  const addUser = (newUser) => {
    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(updatedUsers);
    // Update localStorage
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
  };

  const editUser = (id, updatedUser) => {
    const updatedUsers = users.map(u => u.id === id ? updatedUser : u);
    setUsers(updatedUsers);
    setEditingUser(null);
    // Update localStorage
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    // Update localStorage
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
  };

  // Task CRUD
  const addTask = (task) => {
    const updatedTasks = [...tasks, { ...task, id: Date.now().toString() }];
    setTasks(updatedTasks);
    // Update localStorage
    localStorage.setItem('tasksData', JSON.stringify(updatedTasks));
    // Update user's spent hours
    updateUserSpentHours(updatedTasks);
  };

  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(t => t.id === id ? updatedTask : t);
    setTasks(updatedTasks);
    setEditingTask(null);
    // Update localStorage
    localStorage.setItem('tasksData', JSON.stringify(updatedTasks));
    // Update user's spent hours
    updateUserSpentHours(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    // Update localStorage
    localStorage.setItem('tasksData', JSON.stringify(updatedTasks));
    // Update user's spent hours
    updateUserSpentHours(updatedTasks);
  };

  const updateUserSpentHours = (currentTasks = tasks) => {
    const totalSpentHours = currentTasks.reduce((sum, task) => sum + (parseFloat(task.hours) || 0), 0);
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, spentHours: totalSpentHours } : u);
    setUsers(updatedUsers);
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    // Update current user state and localStorage
    const updatedUser = { ...user, spentHours: totalSpentHours };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (!user) return <div>Loading...</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
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
      case 'users':
        return (
          <div>
            <h3>All Users</h3>
            <button className="btn btn-success mb-3" onClick={() => setEditingUser({})}>Add User</button>
            <div className="list-group">
              {users.map(user => (
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
              ))}
            </div>
          </div>
        );
      case 'purchased':
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
      case 'services':
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
      case 'tasks':
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
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="row">
        {/* Left Sidebar Tabs */}
        <div className="col-md-3">
          <div className="nav flex-column nav-pills" role="tablist">
            <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>All Users</button>
            <button className={`nav-link ${activeTab === 'purchased' ? 'active' : ''}`} onClick={() => setActiveTab('purchased')}>Purchased Services</button>
            <button className={`nav-link ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>All Services</button>
            <button className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>Tasks</button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-md-9">
          {renderTabContent()}
        </div>
      </div>

      {/* Plan Edit Modal */}
      {editingPlan && (
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
      )}

      {/* User Edit Modal */}
      {editingUser && (
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
      )}

      {/* Task Edit Modal */}
      {editingTask && (
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
      )}
    </div>
  );
}
