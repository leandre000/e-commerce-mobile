import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';
// Base URL for all API requests

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,  // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});
// Create axios instance with default configuration

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    // Retrieve JWT token from device storage
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add token to Authorization header if it exists
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Request interceptor: runs before every request

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      // Clear stored auth data on 401 Unauthorized
    }
    return Promise.reject(error);
  }
);
// Response interceptor: runs after every response

export default apiClient;
