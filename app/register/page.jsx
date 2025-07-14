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
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ firstName, lastName, email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-emerald-500 to-teal-500 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-[10%] left-[10%] w-20 h-20 sm:w-25 sm:h-25 bg-white/10 rounded-full animate-float" />
      <div
        className="absolute top-[60%] right-[15%] w-24 h-24 sm:w-38 sm:h-38 bg-white/5 rounded-full animate-float"
        style={{ animationDelay: "2s", animationDirection: "reverse" }}
      />
      <div
        className="absolute bottom-[20%] left-[20%] w-16 h-16 sm:w-20 sm:h-20 bg-white/8 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-2xl mb-6 animate-bounce-gentle">
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
            Create Account
          </h1>
          <p className="text-white/90 text-base sm:text-lg font-medium">
            Quick and easy registration
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-neutral-200 rounded-xl bg-white text-neutral-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-neutral-200 rounded-xl bg-white text-neutral-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-base border-2 border-neutral-200 rounded-xl bg-white text-neutral-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 text-base border-2 border-neutral-200 rounded-xl bg-white text-neutral-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 text-base border-2 rounded-xl bg-white text-neutral-900 outline-none transition-all duration-200 ${
                  error && error.includes("match")
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

            <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              By registering, you agree to our{" "}
              <a
                href="#"
                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              .
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary-500 via-emerald-500 to-teal-500 hover:from-primary-600 hover:via-emerald-600 hover:to-teal-600 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
              } shadow-lg`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Creating account...
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="px-4 text-sm text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-neutral-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
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
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
