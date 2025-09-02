"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        
        // Fetch user profile data after successful login
        try {
          const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
            headers: {
              'Authorization': `Bearer ${data.accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            const userData = {
              id: profileData.user_id || 'temp',
              email: credentials.email,
              token: data.accessToken,
              profile: profileData
            };
            localStorage.setItem('user_data', JSON.stringify(userData));
            setUser(userData);
          } else {
            // Fallback if profile fetch fails
            const userData = {
              id: 'temp',
              email: credentials.email,
              token: data.accessToken
            };
            localStorage.setItem('user_data', JSON.stringify(userData));
            setUser(userData);
          }
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Fallback if profile fetch fails
          const userData = {
            id: 'temp',
            email: credentials.email,
            token: data.accessToken
          };
          localStorage.setItem('user_data', JSON.stringify(userData));
          setUser(userData);
        }
        
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
