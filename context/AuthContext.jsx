'use client';

import { createContext, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { apiCall, apiCallWithAuth } from '../utils/api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookie.get('token');
      console.log('🔐 AuthContext: Token check', token ? 'Found' : 'Not found');

      if (token) {
        try {
          console.log('🔍 AuthContext: Fetching user profile...');
          const profile = await apiCallWithAuth('/api/v1/users/me', token);
          console.log('✅ AuthContext: Profile fetched', profile);
          setUser({ token, profile });
        } catch (error) {
          console.error('❌ AuthContext: Failed to fetch user profile:', error);
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
      console.log('🔑 AuthContext: Attempting login for', email);
      const data = await apiCall('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('✅ AuthContext: Login successful', data);
      const token = data.accessToken;
      cookie.set('token', token, { expires: 1 });

      // fetch profile
      try {
        console.log('🔍 AuthContext: Fetching profile after login...');
        const profile = await apiCallWithAuth('/api/v1/users/me', token);
        console.log('✅ AuthContext: Profile fetched after login', profile);
        setUser({ token, profile });
      } catch (profileError) {
        console.error('❌ AuthContext: Profile fetch failed:', profileError);
        // Still set user with token even if profile fails
        setUser({ token, profile: null });
      }
    } catch (error) {
      console.error('❌ AuthContext: Login error:', error);
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
      console.log('📝 AuthContext: Attempting registration for', email);
      const data = await apiCall('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      console.log('✅ AuthContext: Registration successful', data);
      const token = data.accessToken;
      cookie.set('token', token, { expires: 1 });

      // fetch profile
      try {
        console.log('🔍 AuthContext: Fetching profile after registration...');
        const profile = await apiCallWithAuth('/api/v1/users/me', token);
        console.log('✅ AuthContext: Profile fetched after registration', profile);
        setUser({ token, profile });
      } catch (profileError) {
        console.error('❌ AuthContext: Profile fetch failed after registration:', profileError);
        // Still set user with token even if profile fails
        setUser({ token, profile: null });
      }
    } catch (error) {
      console.error('❌ AuthContext: Registration error:', error);
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
