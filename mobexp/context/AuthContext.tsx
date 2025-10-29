// AuthContext - Manages authentication state across the app
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, login as loginService, register as registerService, logout as logoutService, getStoredUser, isAuthenticated } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string, age: number) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  // State for user data, loading status, and auth status

  useEffect(() => {
    loadUser();
  }, []);
  // Load user from storage when app starts

  const loadUser = async () => {
    try {
      const authenticated = await isAuthenticated();
      // Check if token exists in storage
      
      if (authenticated) {
        const storedUser = await getStoredUser();
        // Retrieve user data from storage
        
        setUser(storedUser);
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
      // Always set loading to false, even on error
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      // Call login API
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuth(true);
        // Update context state on successful login
        
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuth, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
  // Provide auth state and functions to all child components
}