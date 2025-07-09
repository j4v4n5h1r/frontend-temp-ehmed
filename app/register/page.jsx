'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Kayıt başarısız');
      }
      const data = await res.json();
      setSuccess(data.msg);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          Kayıt Ol
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
}
