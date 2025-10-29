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

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.setItem('authToken', response.data.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed',
    };
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('user');
};

export const getProfile = async (): Promise<AuthResponse> => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch profile',
    };
  }
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to process request',
    };
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};