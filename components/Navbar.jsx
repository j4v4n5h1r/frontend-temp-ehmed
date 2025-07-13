"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="nav-primary sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-xl font-bold text-neutral-900 group-hover:text-green-600 transition-colors duration-200">
              PowerBank
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="nav-link">Dashboard</span>
              </Link>
              <Link href="/rental">
                <span className="nav-link">Kiralama</span>
              </Link>
              <div className="flex items-center space-x-4 pl-4 border-l border-green-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-medium text-sm">
                      {user.firstName?.charAt(0) ||
                        user.email?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-neutral-700 hidden md:block">
                    {user.firstName || user.email}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="btn-danger text-sm px-3 py-1.5"
                >
                  Çıkış
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="nav-link">Giriş Yap</span>
              </Link>
              <Link href="/register">
                <span className="btn-primary">Kayıt Ol</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
