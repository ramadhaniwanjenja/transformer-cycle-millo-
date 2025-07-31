import axios from 'axios';

// Get API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3005/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

export const pickupsAPI = {
  getAll: () => api.get('/pickups'),
  create: (data: any) => api.post('/pickups', data),
  update: (id: string, data: any) => api.put(`/pickups/${id}`, data),
  delete: (id: string) => api.delete(`/pickups/${id}`),
};

export const recyclingCentersAPI = {
  getAll: () => api.get('/recycling-centers'),
  create: (data: any) => api.post('/recycling-centers', data),
  update: (id: string, data: any) => api.put(`/recycling-centers/${id}`, data),
  delete: (id: string) => api.delete(`/recycling-centers/${id}`),
};

export const tutorialsAPI = {
  getAll: () => api.get('/tutorials'),
  create: (data: any) => api.post('/tutorials', data),
  update: (id: string, data: any) => api.put(`/tutorials/${id}`, data),
  delete: (id: string) => api.delete(`/tutorials/${id}`),
};

export const rewardsAPI = {
  getAll: () => api.get('/rewards'),
  create: (data: any) => api.post('/rewards', data),
  update: (id: string, data: any) => api.put(`/rewards/${id}`, data),
  delete: (id: string) => api.delete(`/rewards/${id}`),
};

export const contactAPI = {
  sendMessage: (data: any) => api.post('/contact', data),
};

export const activitiesAPI = {
  getAll: () => api.get('/activities'),
  create: (data: any) => api.post('/activities', data),
  update: (id: string, data: any) => api.put(`/activities/${id}`, data),
  delete: (id: string) => api.delete(`/activities/${id}`),
};

export default api; 