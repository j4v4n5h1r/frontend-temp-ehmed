"use client";
import Link from "next/link";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "../context/TranslationContext";
import GlassNav from "./GlassNav";
import LanguageSelector from "./LanguageSelector";

// Profile Dropdown Component
function ProfileDropdown({ user, logout }) {
  const { t } = useTranslation();
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
        <div className="w-9 h-9 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-500 rounded-full flex items-center justify-center">
          <span className="text-primary-700 font-bold text-sm">
            {user?.profile?.data?.user?.firstName?.charAt(0) ||
              user?.profile?.data?.user?.name?.charAt(0) ||
              user?.profile?.data?.user?.email?.charAt(0) ||
              "U"}
          </span>
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden lg:block">
          {user?.profile?.data?.user?.firstName ||
            user?.profile?.data?.user?.name ||
            user?.profile?.data?.user?.email ||
            "User"}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-600 transition-transform ${
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
              {user?.profile?.data?.user?.firstName ||
                user?.profile?.data?.user?.name ||
                "User"}{" "}
              {user?.profile?.data?.user?.lastName || ""}
            </p>
            <p className="text-sm text-neutral-600 truncate">
              {user?.profile?.data?.user?.email || ""}
            </p>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
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
            {t("profile.title", "Profile Settings")}
          </Link>

          <Link
            href="/my-rentals"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
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
            {t("rentals.title", "My Rentals")}
          </Link>

          <Link
            href="/payments"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
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
            {t("payments.title", "Payment History")}
          </Link>

          <div className="border-t border-neutral-100 mt-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-black transition-colors"
            >
              <svg
                className="w-5 h-5"
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
              {t("auth.signOut", "Sign Out")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll handling disabled to keep navbar always visible
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
  //       // Scrolling down and past 100px
  //       setIsVisible(false);
  //     } else if (currentScrollY < lastScrollY.current) {
  //       // Scrolling up
  //       setIsVisible(true);
  //     }
  //     lastScrollY.current = currentScrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <nav
      className={`bg-white/95 backdrop-blur-lg border-b border-primary-100 shadow-sm fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
              <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Pobi
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 lg:gap-10">
              <GlassNav />
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-semibold text-neutral-700 hover:text-black hover:bg-primary-50 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                  >
                    {t("nav.dashboard", "Dashboard")}
                  </Link>
                  <Link
                    href="/stations"
                    className="font-semibold text-neutral-700 hover:text-black hover:bg-primary-50 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                  >
                    {t("nav.stations", "Stations")}
                  </Link>
                  <Link
                    href="/rental"
                    className="font-semibold text-neutral-700 hover:text-black hover:bg-primary-50 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                  >
                    {t("nav.rental", "Rental")}
                  </Link>
                  <Link
                    href="/profile"
                    className="font-semibold text-neutral-700 hover:text-black hover:bg-primary-50 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                  >
                    {t("nav.profile", "Profile")}
                  </Link>
                  {user?.profile?.data?.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-neutral-700 hover:text-primary-600 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                  >
                    {t("auth.signIn", "Sign In")}
                  </Link>
                  <Link
                    href="/register"
                    className="font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base whitespace-nowrap shadow-md"
                  >
                    {t("auth.signUp", "Sign Up")}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Language Selector and Profile */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector />
              {user && <ProfileDropdown user={user} logout={logout} />}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-black hover:bg-primary-50 transition-colors"
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="py-4 space-y-1">
              {/* Mobile GlassNav Links */}
              <div className="space-y-1 pb-3 border-b border-neutral-200">
                <Link
                  href="/how-to-use"
                  className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.howToUse", "How to use")}
                </Link>
                <Link
                  href="/locations"
                  className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.locations", "Locations")}
                </Link>
                <Link
                  href="/pricing"
                  className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.pricing", "Pricing")}
                </Link>
                <Link
                  href="/about"
                  className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.about", "About Us")}
                </Link>
              </div>

              {user ? (
                <>
                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg my-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">
                        {user?.profile?.data?.user?.firstName?.charAt(0) ||
                          user?.profile?.data?.user?.name?.charAt(0) ||
                          user?.profile?.data?.user?.email?.charAt(0) ||
                          "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 text-sm truncate">
                        {user?.profile?.data?.user?.firstName ||
                          user?.profile?.data?.user?.name ||
                          "User"}
                      </div>
                      <div className="text-xs text-neutral-600 truncate">
                        {user?.profile?.data?.user?.email || ""}
                      </div>
                    </div>
                  </div>

                  {/* User Navigation Links */}
                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.dashboard", "Dashboard")}
                    </Link>
                    <Link
                      href="/stations"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.stations", "Stations")}
                    </Link>
                    <Link
                      href="/rental"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.rental", "Rental")}
                    </Link>
                    <Link
                      href="/my-rentals"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.myRentals", "My Rentals")}
                    </Link>
                    <Link
                      href="/payments"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("payments.title", "Payment History")}
                    </Link>
                    <Link
                      href="/profile"
                      className="block font-medium text-neutral-700 hover:text-black hover:bg-primary-50 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("profile.title", "Profile Settings")}
                    </Link>

                    {user?.profile?.data?.user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-3 rounded-lg transition-all duration-200 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("nav.admin", "Admin Panel")}
                      </Link>
                    )}
                  </div>

                  {/* Mobile Language Selector and Logout */}
                  <div className="pt-4 border-t border-neutral-200 mt-4 space-y-3">
                    <div className="px-4">
                      <LanguageSelector />
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                    >
                      {t("auth.signOut", "Sign Out")}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Navigation */}
                  <div className="space-y-1">
                    <Link
                      href="/login"
                      className="block font-medium text-primary-600 hover:text-white hover:bg-primary-600 border border-primary-600 px-4 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("auth.signIn", "Sign In")}
                    </Link>
                    <Link
                      href="/register"
                      className="block font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("auth.signUp", "Sign Up")}
                    </Link>
                  </div>

                  {/* Mobile Language Selector for guests */}
                  <div className="pt-4 border-t border-neutral-200 mt-4">
                    <div className="px-4">
                      <LanguageSelector />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
