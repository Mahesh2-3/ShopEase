import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Attach the JWT token (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('shopease_user');
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// If a token expires/invalid, log the user out client-side
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('shopease_user');
    }
    return Promise.reject(error);
  }
);

export default api;
