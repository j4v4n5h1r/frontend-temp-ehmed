'use client';

import { createContext, useState, useEffect } from 'react';
import cookie from 'js-cookie';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookie.get('token');
      if (token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const profile = await res.json();
            setUser({ token, profile });
          } else {
            cookie.remove('token');
            setUser(null);
          }
        } catch {
          cookie.remove('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    const token = data.accessToken;
    cookie.set('token', token, { expires: 1 });
    // fetch profile
    const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (profileRes.ok) {
      const profile = await profileRes.json();
      setUser({ token, profile });
    }
  };

  const logout = () => {
    cookie.remove('token');
    setUser(null);
  };

  // Register a new user and login
  const register = async ({ firstName, lastName, email, password }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.detail || 'Registration failed');
    }
    const data = await res.json();
    const token = data.accessToken;
    cookie.set('token', token, { expires: 1 });
    // fetch profile
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (profileRes.ok) {
      const profile = await profileRes.json();
      setUser({ token, profile });
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
