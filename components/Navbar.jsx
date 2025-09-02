"use client";
import Link from "next/link";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../utils/auth";
import { useTranslation } from "../utils/translations";
import GlassNav from "./GlassNav";
import LanguageSelector from "./LanguageSelector";

// Navigation Dropdown Component
function NavigationDropdown({ user }) {
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
        className="flex items-center gap-2 font-semibold text-neutral-700 hover:text-black hover:bg-primary-50 px-2 lg:px-3 py-1 rounded-lg transition-all duration-200 text-sm whitespace-nowrap"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {t("nav.menu", "Menu")}
        <svg
          className={`w-4 h-4 transition-transform ${
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
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"
              />
            </svg>
            {t("nav.dashboard", "Dashboard")}
          </Link>

          <Link
            href="/stations"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {t("nav.stations", "Stations")}
          </Link>

          <Link
            href="/rental"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            {t("nav.rental", "Rental")}
          </Link>

          <Link
            href="/my-rentals"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
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
            {t("nav.myRentals", "My Rentals")}
          </Link>

          <Link
            href="/payments"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
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
            {t("payments.title", "Payment History")}
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-black transition-colors"
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
            {t("profile.title", "Profile")}
          </Link>

          {user?.profile?.data?.user?.role === "admin" && (
            <>
              <div className="border-t border-neutral-100 my-1"></div>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Admin
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

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
            {user?.profile?.data?.user?.firstName?.charAt(0)?.toUpperCase() ||
              user?.profile?.data?.user?.name?.charAt(0)?.toUpperCase() ||
              user?.profile?.data?.user?.username?.charAt(0)?.toUpperCase() ||
              user?.profile?.data?.user?.email?.charAt(0)?.toUpperCase() ||
              "U"}
          </span>
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden lg:block">
          {user?.profile?.firstName ||
            user?.profile?.name ||
            user?.profile?.username ||
            user?.profile?.email ||
            user?.email ||
            t("common.loading", "Loading...")}
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
              {user?.profile?.firstName ||
                user?.profile?.name ||
                user?.profile?.username ||
                t("common.loading", "Loading...")}{" "}
              {user?.profile?.lastName || ""}
            </p>
            <p className="text-sm text-neutral-600 truncate">
              {user?.profile?.email || user?.email || ""}
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
rom api                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 003 3z"
              />
            </svg>
            {t("payments.title", "Payment History")}
          </Link>

          {/* Admin Panel Link */}
          {user?.profile?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-black transition-colors"
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {t("nav.admin", "Admin Panel")}
            </Link>
          )}

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
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <div className="flex items-center gap-4">
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
                Pobi
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-3 lg:gap-5">
              <GlassNav />
              {user ? (
                <NavigationDropdown user={user} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-neutral-700 hover:text-primary-600 px-2 lg:px-3 py-1 rounded-lg transition-all duration-200 text-sm whitespace-nowrap"
                  >
                    {t("auth.signIn", "Sign In")}
                  </Link>
                  <Link
                    href="/register"
                    className="font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-2 lg:px-3 py-1 rounded-lg transition-all duration-200 text-sm whitespace-nowrap shadow-md"
                  >
                    {t("auth.signUp", "Sign Up")}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop Language Selector and Profile */}
            <div className="hidden md:flex items-center gap-2">
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
                        {user?.profile?.firstName?.charAt(0)?.toUpperCase() ||
                          user?.profile?.name?.charAt(0)?.toUpperCase() ||
                          user?.profile?.username?.charAt(0)?.toUpperCase() ||
                          user?.profile?.email?.charAt(0)?.toUpperCase() ||
                          user?.email?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 text-sm truncate">
                        {user?.profile?.firstName ||
                          user?.profile?.name ||
                          user?.profile?.username ||
                          t("common.loading", "Loading...")}
                      </div>
                      <div className="text-xs text-neutral-600 truncate">
                        {user?.profile?.email || user?.email || ""}
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

                    {user?.profile?.role === "admin" && (
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
