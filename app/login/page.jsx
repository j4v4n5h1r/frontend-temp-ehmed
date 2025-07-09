'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      const res = await fetch('http://localhost:8000/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      if (!res.ok) throw new Error('Giriş başarısız');

      const data = await res.json();
      cookie.set('token', data.access_token);
      router.push('/dashboard'); // Giriş sonrası yönlendirme
    } catch (err) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLoading ? 'Yükleniyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}
