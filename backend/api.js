import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials);
};

export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

export const getJobs = async () => {
  return api.get('/jobs');
};

export const postJob = async (jobData) => {
  return api.post('/jobs', jobData);
};