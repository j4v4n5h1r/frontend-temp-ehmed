"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ firstName, lastName, email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Kayıt işlemi başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-auth">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hesap Oluşturun
          </h1>
          <p className="text-green-100">Hızlı ve kolay kayıt işlemi</p>
        </div>

        {/* Register Form */}
        <div className="card animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Ad
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Adınız"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={error ? "input-error" : "input-primary"}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Soyad
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Soyadınız"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={error ? "input-error" : "input-primary"}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                E-posta Adresi
              </label>
              <input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={error ? "input-error" : "input-primary"}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={error ? "input-error" : "input-primary"}
              />
              <p className="text-xs text-neutral-500 mt-1">
                En az 6 karakter olmalıdır
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={error ? "input-error" : "input-primary"}
              />
            </div>

            {error && (
              <div className="alert-error animate-fade-in">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg">
              Kayıt olarak{" "}
              <a href="#" className="text-green-600 hover:underline">
                Kullanım Şartları
              </a>{" "}
              ve{" "}
              <a href="#" className="text-green-600 hover:underline">
                Gizlilik Politikası
              </a>
              'nı kabul etmiş olursunuz.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  Hesap oluşturuluyor...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Hesap Oluştur
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="px-4 text-sm text-neutral-500">veya</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/login"
                className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-green-100 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}
