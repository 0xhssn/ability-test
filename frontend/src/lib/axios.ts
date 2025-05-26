import axios from 'axios';
import { getTokenFromCookie } from './utils/cookie-auth';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is important for handling cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // You might want to redirect to login page or refresh token
    }
    return Promise.reject(error);
  }
);

export default api; 