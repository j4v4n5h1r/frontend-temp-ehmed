"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Giriş yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          position: "relative",
          zIndex: 10,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Logo and Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "5rem",
              height: "5rem",
              background: "white",
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              marginBottom: "1.5rem",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <svg
              style={{ width: "2.5rem", height: "2.5rem", color: "#16a34a" }}
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
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "800",
              color: "white",
              marginBottom: "0.75rem",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "-0.025em",
            }}
          >
            Hoş Geldiniz
          </h1>
          <p
            style={{
              color: "#dcfce7",
              fontSize: "1.125rem",
              fontWeight: "500",
            }}
          >
            Hesabınıza giriş yapın
          </p>
        </div>

        {/* Login Form */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideUp 0.8s ease-out",
            backdropFilter: "blur(20px)",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.75rem",
                }}
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
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "1rem",
                  border: error ? "2px solid #ef4444" : "2px solid #dcfce7",
                  borderRadius: "0.75rem",
                  background: "white",
                  color: "#171717",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 4px rgba(34, 197, 94, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? "#ef4444" : "#dcfce7";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.75rem",
                }}
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
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "1rem",
                  border: error ? "2px solid #ef4444" : "2px solid #dcfce7",
                  borderRadius: "0.75rem",
                  background: "white",
                  color: "#171717",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 4px rgba(34, 197, 94, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? "#ef4444" : "#dcfce7";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#991b1b",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  animation: "fadeIn 0.3s ease-out",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      marginRight: "0.75rem",
                    }}
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

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 1.5rem",
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "white",
                background: isLoading
                  ? "linear-gradient(135deg, #a3a3a3 0%, #737373 100%)"
                  : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                borderRadius: "0.75rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                gap: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(34, 197, 94, 0.5)",
                boxSizing: "border-box",
                minWidth: 0,
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(-2px) scale(1.02)";
                  e.target.style.boxShadow =
                    "0 20px 25px -5px rgba(34, 197, 94, 0.6)";
                  e.target.style.background =
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.5)";
                  e.target.style.background =
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <svg
                    style={{ width: "1.25rem", height: "1.25rem" }}
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
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{ display: "flex", alignItems: "center", margin: "2rem 0" }}
          >
            <div
              style={{ flex: 1, height: "1px", background: "#e5e5e5" }}
            ></div>
            <span
              style={{
                padding: "0 1rem",
                fontSize: "0.875rem",
                color: "#737373",
              }}
            >
              veya
            </span>
            <div
              style={{ flex: 1, height: "1px", background: "#e5e5e5" }}
            ></div>
          </div>

          {/* Register Link */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#525252", fontSize: "0.875rem" }}>
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                style={{
                  fontWeight: "600",
                  color: "#16a34a",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#15803d")}
                onMouseLeave={(e) => (e.target.style.color = "#16a34a")}
              >
                Kayıt olun
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/"
            style={{
              color: "#dcfce7",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "#dcfce7")}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
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

      {/* Required animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
