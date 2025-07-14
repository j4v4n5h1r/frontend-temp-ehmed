"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-primary-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
            <span className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
              PowerBank
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/stations"
                  className="font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Stations
                </Link>
                <Link
                  href="/rental"
                  className="font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Rental
                </Link>
                {user?.profile?.data?.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    Admin
                  </Link>
                )}

                <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">
                        {user.firstName?.charAt(0) ||
                          user.email?.charAt(0) ||
                          "U"}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-neutral-700 hidden lg:block">
                      {user.firstName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-bold">
                      {user.firstName?.charAt(0) ||
                        user.email?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {user.firstName || user.email}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {user.role || "User"}
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="block font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/stations"
                  className="block font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stations
                </Link>
                <Link
                  href="/rental"
                  className="block font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rental
                </Link>
                {user?.profile?.data?.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-3 rounded-lg transition-all duration-200 mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}

                <div className="pt-4 border-t border-neutral-200 mt-4">
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
