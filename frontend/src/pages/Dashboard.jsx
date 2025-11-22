import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import DashboardTab from '../components/admin/DashboardTab';
import UsersTab from '../components/admin/UsersTab';
import PurchasedServicesTab from '../components/admin/PurchasedServicesTab';
import ServicesTab from '../components/admin/ServicesTab';
import TasksTab from '../components/admin/TasksTab';
import PlanEditModal from '../components/admin/PlanEditModal';
import UserEditModal from '../components/admin/UserEditModal';
import TaskEditModal from '../components/admin/TaskEditModal';
import DeshboardImg from '../images/deshboard.svg';
import LogoutImg from '../images/logout.svg';
import PlanImg from '../images/plan.svg';
import ProfileImg from '../images/profile.svg';
import UsersImg from '../images/user.svg';


export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
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

      // Fetch data from API
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [usersResponse, plansResponse] = await Promise.all([
        api.getUsers(),
        api.getPlans()
      ]);
      console.log('Fetched users:', usersResponse.data);
      console.log('Fetched plans:', plansResponse.data);
      setUsers(usersResponse.data);
      setPlans(plansResponse.data);

      // Load tasks from localStorage (assuming tasks are local for now)
      const storedTasks = localStorage.getItem('tasksData');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Plan CRUD
  const addPlan = async (plan) => {
    try {
      await api.createPlan(plan);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  const editPlan = async (id, updatedPlan) => {
    try {
      await api.updatePlan(id, updatedPlan);
      setEditingPlan(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error editing plan:', error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await api.deletePlan(id);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  // User CRUD
  const addUser = async (newUser) => {
    try {
      await api.createUser(newUser);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = async (id, updatedUser) => {
    try {
      await api.updateUser(id, updatedUser);
      setEditingUser(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.deleteUser(id);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
        return <DashboardTab user={user} />;
      case 'users':
        return <UsersTab users={users} setEditingUser={setEditingUser} deleteUser={deleteUser} />;
      case 'purchased':
        return <PurchasedServicesTab user={user} />;
      case 'services':
        return <ServicesTab plans={plans} setEditingPlan={setEditingPlan} deletePlan={deletePlan} />;
      case 'tasks':
        return <TasksTab tasks={tasks} setEditingTask={setEditingTask} deleteTask={deleteTask} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-vh-100">
      <div className="container">
        <div className="row g-0">
          {/* Left Sidebar Tabs */}
          <div className="col-md-3 border-start border-end min-vh-100">
            <div className="nav flex-column nav-pills" role="tablist">
              <button className={`nav-link d-flex align-items-center font-outline rounded-0 py-3 px-4 text-start border ${activeTab === 'dashboard' ? 'active border-primary' : ''}`} onClick={() => setActiveTab('dashboard')}>
                <img width="23" height="23" src={DeshboardImg} alt="deshboard" className={`me-3 ${activeTab === 'dashboard' ? 'invert-img' : ''}`}/>Dashboard</button>
              <button className={`nav-link d-flex align-items-center font-outline rounded-0 py-3 px-4 text-start border ${activeTab === 'users' ? 'active border-primary' : ''}`} onClick={() => setActiveTab('users')}> <img width="23" height="23" src={UsersImg} alt="deshboard"  className={`me-3 ${activeTab === 'users' ? 'invert-img' : ''}`}/>All Users</button>
              <button className={`nav-link d-flex align-items-center font-outline rounded-0 py-3 px-4 text-start border ${activeTab === 'purchased' ? 'active border-primary' : ''}`} onClick={() => setActiveTab('purchased')}>
                <img width="23" height="23" src={PlanImg} alt="deshboard"     className={`me-3 ${activeTab === 'purchased' ? 'invert-img' : ''}`} />Purchased Services</button>
              <button className={`nav-link d-flex align-items-center font-outline rounded-0 py-3 px-4 text-start border ${activeTab === 'services' ? 'active border-primary' : ''}`} onClick={() => setActiveTab('services')}>
                <img width="23" height="23" src={ProfileImg} alt="deshboard"     className={`me-3 ${activeTab === 'services' ? 'invert-img' : ''}`}/>All Services</button>
              <button className={`nav-link d-flex align-items-center font-outline rounded-0 py-3 px-4 text-start border ${activeTab === 'tasks' ? 'active border-primary' : ''}`} onClick={() => setActiveTab('tasks')}> <img width="23" height="23" src={LogoutImg} alt="deshboard"     className={`me-3 ${activeTab === 'tasks' ? 'invert-img' : ''}`}/>Tasks</button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-md-9">
            {renderTabContent()}
          </div>
        </div>

        <PlanEditModal editingPlan={editingPlan} setEditingPlan={setEditingPlan} addPlan={addPlan} editPlan={editPlan} />
        <UserEditModal editingUser={editingUser} setEditingUser={setEditingUser} addUser={addUser} editUser={editUser} />
        <TaskEditModal editingTask={editingTask} setEditingTask={setEditingTask} addTask={addTask} editTask={editTask} />
      </div>
    </main>
  );
}
