"use client";
import Link from "next/link";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

// Profile Dropdown Component
function ProfileDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-primary-50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-500 rounded-full flex items-center justify-center">
          <span className="text-primary-700 font-bold text-sm">
            {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
          </span>
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden lg:block">
          {user.firstName || user.email}
        </span>
        <svg
          className={`w-4 h-4 text-neutral-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-neutral-100">
            <p className="text-sm font-medium text-neutral-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-neutral-600 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 transition-colors"
            onClick={() => setIsOpen(false)}
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile Settings
          </Link>

          <Link
            href="/my-rentals"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 transition-colors"
            onClick={() => setIsOpen(false)}
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            My Rentals
          </Link>

          <Link
            href="/payments"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 transition-colors"
            onClick={() => setIsOpen(false)}
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Payment History
          </Link>

          <div className="border-t border-neutral-100 mt-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
                <Link
                  href="/profile"
                  className="font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Profile
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
                  <ProfileDropdown user={user} logout={logout} />
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
