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
            {user.profile?.data?.user?.firstName?.charAt(0) ||
              user.profile?.data?.user?.name?.charAt(0) ||
              user.profile?.data?.user?.email?.charAt(0) ||
              "U"}
          </span>
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden lg:block">
          {user.profile?.data?.user?.firstName ||
            user.profile?.data?.user?.name ||
            user.profile?.data?.user?.email}
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
              {user.profile?.data?.user?.firstName ||
                user.profile?.data?.user?.name ||
                "User"}{" "}
              {user.profile?.data?.user?.lastName || ""}
            </p>
            <p className="text-sm text-neutral-600 truncate">
              {user.profile?.data?.user?.email}
            </p>
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
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 80"
                width="160"
                height="64"
                className="hover:scale-105 transition-transform duration-300"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              >
                <defs>
                  <clipPath id="logo_clip">
                    <rect width="200" height="80" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clipPath="url(#logo_clip)">
                  {/* First Layer - Cyan */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "0s", animationDuration: "2s" }}
                  >
                    <g transform="matrix(1,0,0,1,186.5,13)" opacity="1">
                      <circle cx="0" cy="0" r="6.5" fill="rgb(0,206,255)" />
                    </g>
                    <g transform="matrix(1,0,0,1,186.637,48.5)" opacity="1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(0,206,255)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M0,19 C0,19 0,-19 0,-19"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,151.86,48.791)" opacity="1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(0,206,255)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M7.631,-18.709 C7.631,-18.709 -11.14,-1.528 -11.14,-1.528 C-11.14,-1.528 11.14,18.709 11.14,18.709"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,131.726,39.871)" opacity="1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(0,206,255)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M0,27.629 C0,27.629 0,-27.629 0,-27.629"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,100,40)" opacity="1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(0,206,255)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M7.877,10.053 C7.719,12.108 7.237,14.091 6.437,15.966 C5.462,18.261 4.068,20.323 2.296,22.095 C0.545,23.843 -1.533,25.224 -3.883,26.2 C-6.234,27.175 -8.73,27.669 -11.304,27.669 C-13.854,27.669 -16.335,27.169 -18.672,26.187 C-20.995,25.212 -23.057,23.835 -24.803,22.088 C-26.552,20.336 -27.942,18.302 -28.939,16.031 C-29.967,13.676 -30.488,11.155 -30.488,8.541 C-30.488,5.923 -29.966,3.402 -28.935,1.043 C-27.941,-1.224 -26.55,-3.26 -24.802,-5.008 C-23.062,-6.75 -21,-8.129 -18.67,-9.107 C-16.323,-10.09 -13.844,-10.59 -11.304,-10.59 C-8.737,-10.59 -6.243,-10.096 -3.875,-9.117 C-1.525,-8.138 0.553,-6.756 2.296,-5.013 C4.065,-3.246 5.46,-1.185 6.436,1.11 C7.431,3.447 7.935,5.946 7.935,8.541 C7.935,8.541 7.935,27.476 7.935,27.476"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,28.661,48.501)" opacity="1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(0,206,255)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M-18.826,18.999 C-18.826,18.999 -18.822,-0.936 -18.822,-0.936 C-18.762,-3.397 -18.239,-5.768 -17.265,-7.987 C-16.305,-10.167 -14.987,-12.103 -13.364,-13.724 C-11.72,-15.379 -9.736,-16.69 -7.464,-17.62 C-5.228,-18.535 -2.855,-18.999 -0.409,-18.999 C2.023,-18.999 4.418,-18.532 6.705,-17.613 C8.981,-16.702 11.028,-15.403 12.719,-13.815 C14.58,-12.126 16.058,-10.123 17.115,-7.865 C17.757,-6.493 18.226,-5.041 18.509,-3.552 C18.509,-3.552 18.532,-3.429 18.532,-3.429 C18.532,-3.429 18.736,-2.033 18.736,-2.033 C18.736,-2.033 18.824,-0.615 18.824,-0.615 C18.824,-0.615 18.826,18.988 18.826,18.988"
                      />
                    </g>
                  </g>

                  {/* Second Layer - Purple */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "0.5s", animationDuration: "2s" }}
                  >
                    <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.8">
                      <circle cx="0" cy="0" r="6.5" fill="rgb(173,65,187)" />
                    </g>
                    <g transform="matrix(1,0,0,1,186.637,48.5)" opacity="0.8">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(173,65,187)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M0,-19 C0,-19 0,19 0,19"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,151.86,48.791)" opacity="0.8">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(173,65,187)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M11.14,18.709 C11.14,18.709 -11.14,-1.528 -11.14,-1.528 C-11.14,-1.528 7.631,-18.709 7.631,-18.709"
                      />
                    </g>
                    <g transform="matrix(1,0,0,1,131.726,39.871)" opacity="0.8">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(173,65,187)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M0,-27.629 C0,-27.629 0,27.629 0,27.629"
                      />
                    </g>
                  </g>

                  {/* Third Layer - Yellow */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "1s", animationDuration: "2s" }}
                  >
                    <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.6">
                      <circle cx="0" cy="0" r="6.5" fill="rgb(255,221,0)" />
                    </g>
                    <g transform="matrix(1,0,0,1,186.637,48.5)" opacity="0.6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="10"
                        stroke="rgb(255,221,0)"
                        strokeOpacity="1"
                        strokeWidth="11.339"
                        d=" M0,19 C0,19 0,-19 0,-19"
                      />
                    </g>
                  </g>

                  {/* Fourth Layer - Pink */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "1.5s", animationDuration: "2s" }}
                  >
                    <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.4">
                      <circle cx="0" cy="0" r="6.5" fill="rgb(255,60,164)" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight hidden sm:block">
              PowerShare
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
                      {user.profile?.data?.user?.firstName?.charAt(0) ||
                        user.profile?.data?.user?.name?.charAt(0) ||
                        user.profile?.data?.user?.email?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {user.profile?.data?.user?.firstName ||
                        user.profile?.data?.user?.name ||
                        user.profile?.data?.user?.email}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {user.profile?.data?.user?.role || "User"}
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
                <Link
                  href="/profile"
                  className="block font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
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
