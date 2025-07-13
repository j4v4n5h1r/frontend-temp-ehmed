"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%)",
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="animate-fade-in"
            style={{
              animation: "fadeIn 0.8s ease-out",
            }}
          >
            <h1
              className="text-5xl md:text-6xl font-black mb-6 leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.025em",
                textShadow: "0 4px 8px rgba(34, 197, 94, 0.3)",
              }}
            >
              Power Bank Kiralama Sistemi
            </h1>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{
                color: "#525252",
                fontSize: "1.25rem",
                lineHeight: "1.75",
              }}
            >
              Şehirdeki istasyonlardan kolayca power bank kiralayın, ödeme
              geçmişinizi görün ve cihazınızı şarj edin.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            style={{
              animation: "slideUp 1s ease-out 0.3s both",
            }}
          >
            <Link href="/login">
              <button
                className="w-full sm:w-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  background: "white",
                  color: "#16a34a",
                  border: "2px solid #22c55e",
                  boxShadow:
                    "0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -4px rgba(34, 197, 94, 0.3)",
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  cursor: "pointer",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px) scale(1.05)";
                  e.target.style.boxShadow =
                    "0 20px 25px -5px rgba(34, 197, 94, 0.4), 0 8px 10px -6px rgba(34, 197, 94, 0.4)";
                  e.target.style.background = "#f0fdf4";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -4px rgba(34, 197, 94, 0.3)";
                  e.target.style.background = "white";
                }}
              >
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
              </button>
            </Link>
            <Link href="/register">
              <button
                className="w-full sm:w-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                  color: "white",
                  border: "none",
                  boxShadow:
                    "0 10px 15px -3px rgba(34, 197, 94, 0.5), 0 4px 6px -4px rgba(34, 197, 94, 0.5)",
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  cursor: "pointer",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px) scale(1.05)";
                  e.target.style.boxShadow =
                    "0 20px 40px rgba(34, 197, 94, 0.6), 0 0 50px rgba(16, 185, 129, 0.4)";
                  e.target.style.background =
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.5), 0 4px 6px -4px rgba(34, 197, 94, 0.5)";
                  e.target.style.background =
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)";
                }}
              >
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
                Kayıt Ol
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className="py-16"
        style={{
          background: "white",
          borderTop: "1px solid #dcfce7",
          borderBottom: "1px solid #dcfce7",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                color: "#166534",
                letterSpacing: "-0.025em",
              }}
            >
              Neden Bizi Seçmelisiniz?
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{
                color: "#525252",
                lineHeight: "1.75",
              }}
            >
              Modern teknoloji ile güvenli ve hızlı power bank kiralama deneyimi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Hızlı Şarj",
                description:
                  "Yüksek kapasiteli power bank'ler ile cihazlarınızı hızla şarj edin",
                color: "#22c55e",
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Kolay Erişim",
                description:
                  "Şehrin her yerinde bulunan istasyonlardan kolayca kiralayın",
                color: "#10b981",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Güvenli Ödeme",
                description:
                  "Güvenli ödeme sistemi ile endişesiz kullanım deneyimi",
                color: "#14b8a6",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  border: "2px solid #dcfce7",
                  boxShadow:
                    "0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -4px rgba(34, 197, 94, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  animation: `slideUp 0.6s ease-out ${0.2 * index}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(34, 197, 94, 0.25)";
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -4px rgba(34, 197, 94, 0.1)";
                  e.currentTarget.style.borderColor = "#dcfce7";
                }}
              >
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                    borderRadius: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg
                    style={{
                      width: "2rem",
                      height: "2rem",
                      color: feature.color,
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl md:text-2xl font-semibold mb-3"
                  style={{
                    color: "#166534",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "#525252",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {[
              { number: "1000+", label: "Aktif Kullanıcı", delay: 0 },
              { number: "50+", label: "İstasyon Noktası", delay: 0.2 },
              { number: "10K+", label: "Başarılı Kiralama", delay: 0.4 },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  animation: `bounceGentle 3s infinite ${stat.delay}s`,
                }}
              >
                <div
                  className="text-5xl font-bold mb-2"
                  style={{
                    color: "white",
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    fontSize: "3rem",
                    fontWeight: "900",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: "#dcfce7",
                    fontSize: "1.125rem",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              color: "#166534",
              letterSpacing: "-0.025em",
            }}
          >
            Hemen Başlayın
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              color: "#525252",
              lineHeight: "1.75",
            }}
          >
            Dakikalar içinde kayıt olun ve power bank kiralama deneyiminizi
            başlatın
          </p>
          <Link href="/register">
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.25rem 2.5rem",
                fontSize: "1.25rem",
                fontWeight: "700",
                borderRadius: "1rem",
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                color: "white",
                border: "none",
                boxShadow:
                  "0 20px 40px rgba(34, 197, 94, 0.4), 0 0 50px rgba(16, 185, 129, 0.3)",
                transition: "all 0.3s ease",
                transform: "translateY(0)",
                cursor: "pointer",
                gap: "0.75rem",
                animation: "glow 2s ease-in-out infinite alternate",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px) scale(1.05)";
                e.target.style.boxShadow =
                  "0 25px 50px rgba(34, 197, 94, 0.6), 0 0 60px rgba(16, 185, 129, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  "0 20px 40px rgba(34, 197, 94, 0.4), 0 0 50px rgba(16, 185, 129, 0.3)";
              }}
            >
              Ücretsiz Kayıt Ol
              <svg
                style={{ width: "1.5rem", height: "1.5rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Add required keyframes as inline styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes bounceGentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0% {
            box-shadow:
              0 20px 40px rgba(34, 197, 94, 0.4),
              0 0 50px rgba(16, 185, 129, 0.3);
          }
          100% {
            box-shadow:
              0 25px 50px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(16, 185, 129, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
