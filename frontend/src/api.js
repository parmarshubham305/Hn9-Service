import axios from 'axios';

const API_BASE_URL = 'https://api.hn9codecraft.com/api.php';
const SERVER_BASE_URL = 'http://localhost:4242';

export const api = {
  // Login
  login: (email, password) => axios.post(`${SERVER_BASE_URL}/login`, { email, password }),

  // Users
  getUsers: () => axios.get(`${API_BASE_URL}?resource=users`),
  createUser: (userData) => axios.post(`${API_BASE_URL}?resource=users`, userData),
  updateUser: (id, userData) => axios.put(`${API_BASE_URL}?resource=users&id=${id}`, userData),
  deleteUser: (id) => axios.delete(`${API_BASE_URL}?resource=users&id=${id}`),

  // Plans
  getPlans: () => axios.get(`${API_BASE_URL}?resource=plans`),
  createPlan: (planData) => axios.post(`${API_BASE_URL}?resource=plans`, planData),
  updatePlan: (id, planData) => axios.put(`${API_BASE_URL}?resource=plans&id=${id}`, planData),
  deletePlan: (id) => axios.delete(`${API_BASE_URL}?resource=plans&id=${id}`),

  // Services (assuming services are the same as plans for now)
  getServices: () => axios.get(`${API_BASE_URL}?resource=services`),
  createService: (serviceData) => axios.post(`${API_BASE_URL}?resource=services`, serviceData),
  updateService: (id, serviceData) => axios.put(`${API_BASE_URL}?resource=services&id=${id}`, serviceData),
  deleteService: (id) => axios.delete(`${API_BASE_URL}?resource=services&id=${id}`),
};
