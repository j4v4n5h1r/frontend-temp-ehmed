"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../utils/auth";
import GoogleLogin from "../../components/GoogleLogin";

import { useTranslation } from "../../utils/translations";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { t } = useTranslation(); // Use the translation hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await login({ email, password });
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || t("errors.loginFailed"));
      }
    } catch (err) {
      console.error('Login error:', err);

      // Handle specific error types
      if (err.isNetworkError) {
        setError(t("errors.networkTimeout"));
      } else if (err.message.includes('Login failed')) {
        setError(t("errors.loginFailed"));
      } else {
        setError(err.message || t("errors.generic"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-2xl mb-6 animate-float">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600"
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
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
            {t("auth.welcomeBack")}
          </h1>
          <p className="text-primary-100 text-base sm:text-lg font-medium">
            {t("auth.signIn")} {t("auth.welcomeBack")}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 backdrop-blur-sm animate-slide-up">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                {t("auth.email")}
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 sm:py-4 text-base border-2 rounded-xl bg-white text-neutral-900 transition-all duration-200 outline-none ${
                  error
                    ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                    : "border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                {t("auth.password")}
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 sm:py-4 text-base border-2 rounded-xl bg-white text-neutral-900 transition-all duration-200 outline-none ${
                  error
                    ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                    : "border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                }`}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl animate-fade-in">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 flex-shrink-0"
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
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl transition-all duration-300 ${
                isLoading
                  ? "bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
              } shadow-lg`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  {t("auth.signIn")}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="px-4 text-sm text-neutral-500">
              {t("auth.continueWith")}
            </span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <GoogleLogin />

            {/* Other social login buttons temporarily removed to prevent OAuth conflicts */}
            <div className="text-center text-sm text-neutral-500 mt-4">
              More social login options coming soon
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-neutral-600 text-sm">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                href="/register"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                {t("auth.signUp")}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm font-semibold group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
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
            {t("auth.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
