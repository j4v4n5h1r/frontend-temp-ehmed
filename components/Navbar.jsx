"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .hidden {
            display: block !important;
          }
        }
      `}</style>
      <nav
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #dcfce7",
          boxShadow: "0 1px 2px 0 rgba(34, 197, 94, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Link href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 6px -1px rgba(34, 197, 94, 0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <svg
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "white",
                  }}
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
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "#171717",
                  transition: "color 0.3s ease",
                  letterSpacing: "-0.025em",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#16a34a")}
                onMouseLeave={(e) => (e.target.style.color = "#171717")}
              >
                PowerBank
              </span>
            </div>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {user ? (
              <>
                <Link href="/dashboard">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#404040",
                      transition: "all 0.3s ease",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#16a34a";
                      e.target.style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#404040";
                      e.target.style.background = "transparent";
                    }}
                  >
                    Dashboard
                  </span>
                </Link>
                <Link href="/rental">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#404040",
                      transition: "all 0.3s ease",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#16a34a";
                      e.target.style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#404040";
                      e.target.style.background = "transparent";
                    }}
                  >
                    Kiralama
                  </span>
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    paddingLeft: "1rem",
                    borderLeft: "2px solid #dcfce7",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        background:
                          "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #22c55e",
                      }}
                    >
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: "700",
                          fontSize: "0.875rem",
                        }}
                      >
                        {user.firstName?.charAt(0) ||
                          user.email?.charAt(0) ||
                          "U"}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#404040",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                      className="hidden md:block"
                    >
                      {user.firstName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => logout()}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "white",
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow =
                        "0 4px 8px rgba(239, 68, 68, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 2px 4px rgba(239, 68, 68, 0.3)";
                    }}
                  >
                    Çıkış
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#404040",
                      transition: "all 0.3s ease",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#16a34a";
                      e.target.style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#404040";
                      e.target.style.background = "transparent";
                    }}
                  >
                    Giriş Yap
                  </span>
                </Link>
                <Link href="/register">
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "white",
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      borderRadius: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(34, 197, 94, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px) scale(1.05)";
                      e.target.style.boxShadow =
                        "0 8px 15px rgba(34, 197, 94, 0.4)";
                      e.target.style.background =
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0) scale(1)";
                      e.target.style.boxShadow =
                        "0 4px 6px rgba(34, 197, 94, 0.3)";
                      e.target.style.background =
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
                    }}
                  >
                    Kayıt Ol
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
