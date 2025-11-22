import axios from 'axios';

const API_BASE_URL = 'https://api.hn9codecraft.com/api.php';
const SERVER_BASE_URL = 'http://localhost:4242';

// Create axios instance with auth interceptor
const apiClient = axios.create();

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Login
  login: (email, password) => axios.post(`${API_BASE_URL}?resource=login`, { email, password }),

  // Users
  getUsers: () => apiClient.get(`${API_BASE_URL}?resource=users`),
  createUser: (userData) => apiClient.post(`${API_BASE_URL}?resource=users`, userData),
  updateUser: (id, userData) => apiClient.put(`${API_BASE_URL}?resource=users&id=${id}`, userData),
  deleteUser: (id) => apiClient.delete(`${API_BASE_URL}?resource=users&id=${id}`),

  // New method to update user purchase
  updateUserPurchase: (purchaseData) =>
    axios.post(`${API_BASE_URL}?resource=update-user-purchase`, purchaseData),

  // Plans
  getPlans: () => apiClient.get(`${API_BASE_URL}?resource=plans`),
  createPlan: (planData) => apiClient.post(`${API_BASE_URL}?resource=plans`, planData),
  updatePlan: (id, planData) => apiClient.put(`${API_BASE_URL}?resource=plans&id=${id}`, planData),
  deletePlan: (id) => apiClient.delete(`${API_BASE_URL}?resource=plans&id=${id}`),

  // Services (assuming services are the same as plans for now)
  getServices: () => apiClient.get(`${API_BASE_URL}?resource=services`),
  createService: (serviceData) => apiClient.post(`${API_BASE_URL}?resource=services`, serviceData),
  updateService: (id, serviceData) => apiClient.put(`${API_BASE_URL}?resource=services&id=${id}`, serviceData),
  deleteService: (id) => apiClient.delete(`${API_BASE_URL}?resource=services&id=${id}`),

  // Checkout
  createCheckoutSession: (line_items, customer_email) =>
    axios.post(`${API_BASE_URL}?resource=create-checkout-session`, { line_items, customer_email }),

  getTestimonials: () => axios.get(`${API_BASE_URL}?resource=testimonials`),
};
