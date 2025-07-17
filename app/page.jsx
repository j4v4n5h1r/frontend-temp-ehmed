"use client";

import Link from "next/link";
import Map from "../components/Map";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            src="https://framerusercontent.com/assets/9iupb2w1hpCaqeMtQoCnSX6RW4s.mp4"
            loop
            preload="auto"
            poster="https://framerusercontent.com/images/k8Hkm7dmWSk151V66VOruDBQIw.png"
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(241, 245, 249, 0.7) 0%, rgba(224, 247, 250, 0.7) 100%)",
            }}
          />
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.08), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 80%, rgba(16,185,129,0.08), transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h1
              className="mb-6 leading-tight font-bold"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                background:
                  "linear-gradient(135deg, #2563eb 0%, #1d4ed8 25%, #059669 75%, #047857 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Never Run Out of
              <br className="hidden sm:block" />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #2563eb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Power Again
              </span>
            </h1>

            <p
              className="mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                color: "#475569",
              }}
            >
              Rent a power bank anytime, anywhere in seconds.
              <br className="hidden sm:block" />
              Fast, convenient, and always available when you need it most.
            </p>

            {/* Video Section */}
            <div className="mb-12">
              <div
                className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "1.77778",
                  backgroundColor: "rgb(254, 254, 254)",
                }}
              >
                <video
                  src="https://framerusercontent.com/assets/9iupb2w1hpCaqeMtQoCnSX6RW4s.mp4"
                  loop
                  preload="auto"
                  poster="https://framerusercontent.com/images/k8Hkm7dmWSk151V66VOruDBQIw.png"
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  style={{
                    backgroundColor: "rgba(247, 247, 247, 0)",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/stations">
                <button
                  className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105 hover:shadow-xl"
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#1d4ed8";
                    e.target.style.transform = "translateY(-2px) scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#2563eb";
                    e.target.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Find a Station
                </button>
              </Link>

              <button
                className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105 hover:shadow-xl"
                style={{
                  background: "white",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f8fafc";
                  e.target.style.transform = "translateY(-2px) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.transform = "translateY(0) scale(1)";
                }}
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Download App
              </button>
            </div>
          </div>

          {/* Floating Animation Elements */}
          <div
            className="absolute top-20 left-10 w-16 h-16 rounded-full animate-float"
            style={{ background: "rgba(59, 130, 246, 0.15)" }}
          />
          <div
            className="absolute top-40 right-16 w-12 h-12 rounded-full animate-float"
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute bottom-32 left-20 w-8 h-8 rounded-full animate-float"
            style={{
              background: "rgba(251, 191, 36, 0.15)",
              animationDelay: "4s",
            }}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e293b",
              }}
            >
              How It Works
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
              }}
            >
              Get powered up in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Scan QR Code",
                description:
                  "Find a station and scan the QR code with your phone camera or our app",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Pick Power Bank",
                description:
                  "Choose an available power bank from the station and start charging immediately",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Return Anywhere",
                description:
                  "Return the power bank to any station when you're done. It's that simple!",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md"
                    style={{ background: "#fbbf24", color: "#1e293b" }}
                  >
                    {item.step}
                  </div>
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#1e293b" }}
                >
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#64748b" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24" style={{ background: "#f8fafc" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e293b",
              }}
            >
              Why Choose PowerShare?
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
              }}
            >
              Experience the future of portable charging with our premium
              features
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                title: "24/7 Access",
                description: "Available round the clock, wherever you are",
                icon: (
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                color: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              },
              {
                title: "Fast Charging",
                description: "High-speed charging for all your devices",
                icon: (
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              },
              {
                title: "App Integration",
                description: "Seamless experience with our mobile app",
                icon: (
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
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ),
                color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              },
              {
                title: "Affordable",
                description: "Competitive pricing with flexible plans",
                icon: (
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                ),
                color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                style={{ background: "white" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#1e293b" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e293b",
              }}
            >
              Find Stations Near You
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
              }}
            >
              Over 500 stations across major cities and growing every day
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Map showCurrentLocation={true} height="320px" />
            </div>

            <div>
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: "#1e293b" }}
              >
                Available Cities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Houston",
                  "Phoenix",
                  "Philadelphia",
                  "San Antonio",
                  "San Diego",
                ].map((city, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ background: "#f8fafc" }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#f8fafc")
                    }
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#10b981" }}
                    ></div>
                    <span className="font-medium" style={{ color: "#374151" }}>
                      {city}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/stations">
                <button
                  className="mt-6 px-6 py-3 font-semibold rounded-xl transition-colors flex items-center gap-2"
                  style={{ background: "#2563eb", color: "white" }}
                  onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
                  onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
                >
                  View All Locations
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section
        className="py-16 lg:py-24"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2
                className="mb-6 font-bold text-white"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                Get the PowerShare App
              </h2>
              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: "#bfdbfe" }}
              >
                Download our app for the fastest way to find stations, rent
                power banks, and manage your account on the go.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-colors"
                  style={{ background: "black", color: "white" }}
                  onMouseEnter={(e) => (e.target.style.background = "#1f2937")}
                  onMouseLeave={(e) => (e.target.style.background = "black")}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>

                <button
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-colors"
                  style={{ background: "black", color: "white" }}
                  onMouseEnter={(e) => (e.target.style.background = "#1f2937")}
                  onMouseLeave={(e) => (e.target.style.background = "black")}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="w-64 h-96 rounded-3xl p-2 shadow-2xl"
                  style={{ background: "#1e293b" }}
                >
                  <div
                    className="w-full h-full rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                    }}
                  >
                    <div className="text-center text-white">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-semibold">PowerShare App</p>
                      <p className="text-sm opacity-80">Coming Soon</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -top-4 -right-4 rounded-full p-3 shadow-lg animate-bounce"
                  style={{ background: "white" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#10b981" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5z M5 7h14l-9-3z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24" style={{ background: "#f8fafc" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e293b",
              }}
            >
              What Our Users Say
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
              }}
            >
              Join thousands of satisfied customers who never worry about
              battery life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Frequent Traveler",
                content:
                  "PowerShare saved my trip! Found a station right at the airport and kept my phone charged throughout my journey. Absolutely essential for travelers.",
                rating: 5,
                avatar: "SJ",
              },
              {
                name: "Mike Chen",
                role: "College Student",
                content:
                  "Super affordable and convenient. There's a station right on campus and the app makes it so easy to rent and return. Game changer for students!",
                rating: 5,
                avatar: "MC",
              },
              {
                name: "Emma Davis",
                role: "Business Professional",
                content:
                  "The reliability is outstanding. I use PowerShare during conferences and long meetings. Never had an issue finding an available power bank.",
                rating: 5,
                avatar: "ED",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                style={{ background: "white" }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold" style={{ color: "#1e293b" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm" style={{ color: "#64748b" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      style={{ color: "#fbbf24" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="leading-relaxed" style={{ color: "#64748b" }}>
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e293b",
              }}
            >
              Simple, Transparent Pricing
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
              }}
            >
              Pay only for what you use. No hidden fees, no subscription
              required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Hourly",
                price: "$2",
                period: "per hour",
                description: "Perfect for short trips and quick charges",
                features: [
                  "Fast charging cables included",
                  "Return to any station",
                  "24/7 customer support",
                  "Mobile app access",
                ],
                popular: false,
              },
              {
                name: "Daily",
                price: "$8",
                period: "per day",
                description: "Best value for all-day adventures",
                features: [
                  "All hourly features",
                  "Up to 24 hours usage",
                  "Priority customer support",
                  "Multiple device charging",
                ],
                popular: true,
              },
              {
                name: "Weekly",
                price: "$25",
                period: "per week",
                description: "Extended stays and business trips",
                features: [
                  "All daily features",
                  "Up to 7 days usage",
                  "Dedicated account manager",
                  "Bulk rental discounts",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? "transform scale-105" : ""}`}
                style={{
                  background: "white",
                  border: plan.popular
                    ? "2px solid #2563eb"
                    : "1px solid #e2e8f0",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="px-4 py-1 rounded-full text-sm font-semibold"
                      style={{ background: "#2563eb", color: "white" }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "#1e293b" }}
                    >
                      {plan.price}
                    </span>
                    <span className="ml-1" style={{ color: "#64748b" }}>
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#64748b" }}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: "#10b981" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span style={{ color: "#64748b" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300"
                    style={{
                      background: plan.popular ? "#2563eb" : "#f1f5f9",
                      color: plan.popular ? "white" : "#1e293b",
                    }}
                    onMouseEnter={(e) => {
                      if (plan.popular) {
                        e.target.style.background = "#1d4ed8";
                      } else {
                        e.target.style.background = "#e2e8f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = plan.popular
                        ? "#2563eb"
                        : "#f1f5f9";
                    }}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1e293b", color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                  }}
                ></div>
                <span className="text-xl font-bold">PowerShare</span>
              </div>
              <p className="mb-6 max-w-md" style={{ color: "#cbd5e1" }}>
                The most convenient way to stay charged. Rent power banks from
                stations nationwide and never run out of battery again.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    name: "Twitter",
                    icon: "M8 19c11 0 17-9 17-17v-1a12 12 0 0 0 3-3 12 12 0 0 1-3 1 6 6 0 0 0 3-3 12 12 0 0 1-4 2 6 6 0 0 0-10 5 17 17 0 0 1-12-6 6 6 0 0 0 2 8 6 6 0 0 1-3-1c0 3 2 5 5 6a6 6 0 0 1-3 0c1 3 4 5 7 5A12 12 0 0 1 3 21a17 17 0 0 0 9-3",
                  },
                  {
                    name: "Facebook",
                    icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  },
                  {
                    name: "Instagram",
                    icon: "M16 8a6 6 0 0 1 6 6v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a6 6 0 0 1 6-6h8zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zm8-2.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
                  },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "#334155" }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#475569")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#334155")
                    }
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
                        d={social.icon}
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2" style={{ color: "#cbd5e1" }}>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2" style={{ color: "#cbd5e1" }}>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="transition-colors hover:text-white"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t mt-12 pt-8 text-center"
            style={{ borderColor: "#374151", color: "#94a3b8" }}
          >
            <p>&copy; 2024 PowerShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
