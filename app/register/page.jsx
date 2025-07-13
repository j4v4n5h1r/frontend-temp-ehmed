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
      setError(err.message || "Kayıt işlemi başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #22c55e 0%, #10b981 25%, #14b8a6 50%, #06b6d4 75%, #3b82f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "80px",
          height: "80px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "32rem",
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
              animation: "bounce 2s infinite",
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
            Hesap Oluşturun
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              fontWeight: "500",
            }}
          >
            Hızlı ve kolay kayıt işlemi
          </p>
        </div>

        {/* Register Form */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "1.5rem",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            animation: "slideUp 0.8s ease-out",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                width: "100%",
                boxSizing: "border-box",
              }}
              className="name-grid"
            >
              <div style={{ width: "100%", boxSizing: "border-box" }}>
                <label
                  htmlFor="firstName"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#404040",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ad
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Adınız"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    fontSize: "0.875rem",
                    border: "2px solid #dcfce7",
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
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(34, 197, 94, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#dcfce7";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ width: "100%", boxSizing: "border-box" }}>
                <label
                  htmlFor="lastName"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#404040",
                    marginBottom: "0.5rem",
                  }}
                >
                  Soyad
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Soyadınız"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    fontSize: "0.875rem",
                    border: "2px solid #dcfce7",
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
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(34, 197, 94, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#dcfce7";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.5rem",
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
                  fontSize: "0.875rem",
                  border: "2px solid #dcfce7",
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
                  e.target.style.borderColor = "#dcfce7";
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
                  marginBottom: "0.5rem",
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
                minLength={6}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "0.875rem",
                  border: "2px solid #dcfce7",
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
                  e.target.style.borderColor = "#dcfce7";
                  e.target.style.boxShadow = "none";
                }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#737373",
                  marginTop: "0.25rem",
                }}
              >
                En az 6 karakter olmalıdır
              </p>
            </div>

            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="confirmPassword"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.5rem",
                }}
              >
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "0.875rem",
                  border:
                    error && error.includes("eşleşmiyor")
                      ? "2px solid #ef4444"
                      : "2px solid #dcfce7",
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
                  e.target.style.borderColor =
                    error && error.includes("eşleşmiyor")
                      ? "#ef4444"
                      : "#dcfce7";
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
                  animation: "shake 0.5s ease-in-out",
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

            <div
              style={{
                fontSize: "0.75rem",
                color: "#525252",
                background: "#f5f5f5",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e5e5",
              }}
            >
              Kayıt olarak{" "}
              <a
                href="#"
                style={{
                  color: "#16a34a",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Kullanım Şartları
              </a>{" "}
              ve{" "}
              <a
                href="#"
                style={{
                  color: "#16a34a",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Gizlilik Politikası
              </a>
              'nı kabul etmiş olursunuz.
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 1.5rem",
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "white",
                background: loading
                  ? "linear-gradient(135deg, #a3a3a3 0%, #737373 100%)"
                  : "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)",
                borderRadius: "0.75rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                gap: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(34, 197, 94, 0.5)",
                animation: "pulse 2s infinite",
                boxSizing: "border-box",
                minWidth: 0,
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px) scale(1.02)";
                  e.target.style.boxShadow =
                    "0 20px 25px -5px rgba(34, 197, 94, 0.6)";
                  e.target.style.background =
                    "linear-gradient(135deg, #059669 0%, #0f766e 50%, #0d9488 100%)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.5)";
                  e.target.style.background =
                    "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)";
                }
              }}
            >
              {loading ? (
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
                  Hesap oluşturuluyor...
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Hesap Oluştur
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1.5rem 0",
            }}
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

          {/* Login Link */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#525252", fontSize: "0.875rem" }}>
              Zaten hesabınız var mı?{" "}
              <Link
                href="/login"
                style={{
                  fontWeight: "600",
                  color: "#16a34a",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#15803d")}
                onMouseLeave={(e) => (e.target.style.color = "#16a34a")}
              >
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/"
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(255, 255, 255, 0.9)")
            }
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

      {/* Enhanced animations */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        @media (max-width: 640px) {
          .name-grid {
            grid-template-columns: 1fr !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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
            transform: translateY(-20px);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
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
