// Authentication Service
import apiClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

// Register new user
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: number
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      age,
    });
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.setItem('authToken', response.data.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed',
    };
  }
};

// Login user
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    // Send POST request to /api/auth/login
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.setItem('authToken', response.data.data.token);
      // Store JWT token in device storage
      
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      // Store user data in device storage
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed',
    };
    // Return error message from server or generic message
  }
};

// Get stored user
export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};