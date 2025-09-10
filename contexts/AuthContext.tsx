'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirstVisit: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = async () => {
      try {
        // Check if user has ever visited before
        const hasVisited = localStorage.getItem('hasVisited');
        const token = localStorage.getItem('token');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (!hasVisited) {
          // First time visitor
          setIsFirstVisit(true);
          localStorage.setItem('hasVisited', 'true');
          setIsLoading(false);
          return;
        }

        if (token && rememberMe) {
          // Verify token with backend
          try {
            const response = await authAPI.verifyToken();
            if (response.data.user) {
              setUser(response.data.user);
              setIsAuthenticated(true);
            } else {
              // Invalid token, clear storage
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('rememberMe');
            }
          } catch (error) {
            // Token verification failed, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('rememberMe');
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.token && response.data.user) {
        // Store auth data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('rememberMe', rememberMe.toString());
        
        // Update state
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Login failed: Invalid response' };
      }
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on port 8000.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('Login error:', error);
      return { success: false, message: errorMessage };
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.data.token && response.data.user) {
        // Store auth data (auto-login after signup)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('rememberMe', 'true'); // Default to remember on signup
        
        // Update state
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        return { success: true, message: 'Account created successfully' };
      } else {
        return { success: false, message: 'Signup failed: Invalid response' };
      }
    } catch (error: any) {
      let errorMessage = 'Signup failed';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on port 8000.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'User with this email already exists';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('Signup error:', error);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if backend call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      isFirstVisit,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
