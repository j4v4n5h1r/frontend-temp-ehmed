'use client';

import { createContext, useState, useEffect } from 'react';
import cookie from 'js-cookie';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    const res = await fetch('http://localhost:8000/api/v1/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) throw new Error('Giriş başarısız');

    const data = await res.json();
    cookie.set('token', data.access_token, { expires: 1 });
    setUser({ token: data.access_token });
  };

  const logout = () => {
    cookie.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
