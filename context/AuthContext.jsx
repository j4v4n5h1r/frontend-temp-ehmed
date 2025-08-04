'use client';

import { createContext, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { apiCall, apiCallWithAuth } from '../utils/api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "http://164.90.238.202:8000";

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookie.get('token');
      if (token) {
        try {
          const profile = await apiCallWithAuth('/api/v1/users/me', token);
          setUser({ token, profile });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          cookie.remove('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiCall('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const token = data.accessToken;
      cookie.set('token', token, { expires: 1 });

      // fetch profile
      try {
        const profile = await apiCallWithAuth('/api/v1/users/me', token);
        setUser({ token, profile });
      } catch (profileError) {
        console.error('Profile fetch failed:', profileError);
        // Still set user with token even if profile fails
        setUser({ token, profile: null });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    cookie.remove('token');
    setUser(null);
  };

  // Register a new user and login
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const res = await fetch(
        url+'/api/v1/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || err?.message || 'Registration failed');
      }

      const data = await res.json();
      const token = data.accessToken;
      cookie.set('token', token, { expires: 1 });

      // fetch profile
      try {
        const profileRes = await fetch(
          url+'/api/v1/users/me',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (profileRes.ok) {
          const profile = await profileRes.json();
          setUser({ token, profile });
        } else {
          // Even if profile fetch fails, user is still registered and logged in
          setUser({ token, profile: null });
        }
      } catch (profileError) {
        console.error('Profile fetch failed after registration:', profileError);
        // Still set user with token even if profile fails
        setUser({ token, profile: null });
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
