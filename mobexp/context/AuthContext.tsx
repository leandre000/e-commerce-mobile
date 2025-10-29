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

  // Load user from storage on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        const storedUser = await getStoredUser();
        setUser(storedUser);
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuth(true);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, age: number) => {
    try {
      const response = await registerService(firstName, lastName, email, password, age);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuth(true);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setIsAuth(false);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuth, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}