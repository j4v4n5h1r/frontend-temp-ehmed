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
          {/* Colorful animated overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 206, 255, 0.3) 0%, rgba(173, 65, 187, 0.2) 25%, rgba(255, 221, 0, 0.3) 50%, rgba(255, 60, 164, 0.2) 75%, rgba(0, 206, 255, 0.3) 100%)",
              backgroundSize: "200% 200%",
              animation: "colorShift 8s ease-in-out infinite",
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

      {/* Animated Colorful Shapes Section */}
      <section
        className="py-16 lg:py-24 overflow-hidden"
        style={{ background: "white" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div
            style={{
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflowX: "hidden",
                overflowY: "hidden",
                width: "100%",
              }}
            >
              {/* First Row */}
              <div
                className="flex items-center py-2"
                style={{
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  animation: "slideLeft 20s linear infinite",
                }}
              >
                {[
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190112e59fe7dc8_squircle-5-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011bbbefe7dc3_squircle-6-p-800.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190113f42fe7dd2_squircle-7-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190113c39fe7dcd_squircle-8-p-500.png",
                ]
                  .concat([
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190112e59fe7dc8_squircle-5-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011bbbefe7dc3_squircle-6-p-800.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190113f42fe7dd2_squircle-7-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190113c39fe7dcd_squircle-8-p-500.png",
                  ])
                  .map((src, index) => (
                    <img
                      key={index}
                      loading="eager"
                      alt=""
                      src={src}
                      className="flex-shrink-0"
                      style={{
                        height: "200px",
                        marginRight: "20px",
                        maxWidth: "100%",
                        verticalAlign: "middle",
                      }}
                    />
                  ))}
              </div>

              {/* Second Row */}
              <div
                className="flex items-center py-2"
                style={{
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  animation: "slideRight 25s linear infinite",
                }}
              >
                {[
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901163fafe7dc0_squircle-3-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011f13ffe7dbb_squircle-4-p-800.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190116205fe7db6_squircle-2-p-800.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190111464fe7db1_squircle-1-p-500.png",
                ]
                  .concat([
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011f13ffe7dbb_squircle-4-p-800.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901163fafe7dc0_squircle-3-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190116205fe7db6_squircle-2-p-800.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190111464fe7db1_squircle-1-p-500.png",
                  ])
                  .map((src, index) => (
                    <img
                      key={index}
                      loading="eager"
                      alt=""
                      src={src}
                      className="flex-shrink-0"
                      style={{
                        height: "200px",
                        marginRight: "20px",
                        maxWidth: "100%",
                        verticalAlign: "middle",
                      }}
                    />
                  ))}
              </div>

              {/* Third Row */}
              <div
                className="flex items-center py-2"
                style={{
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  animation: "slideLeft 30s linear infinite",
                }}
              >
                {[
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901145ecfe7de6_squircle-10-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901165d1fe7ddb_squircle-9-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190115f5dfe7de0_squircle-11-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011cca2fe7dd6_squircle-12-p-500.png",
                  "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad019011fc87fe7dec_squircle-13-p-500.png",
                ]
                  .concat([
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901165d1fe7ddb_squircle-9-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901145ecfe7de6_squircle-10-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad0190115f5dfe7de0_squircle-11-p-500.png",
                    "https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a84ad01901165d1fe7ddb_squircle-9-p-500.png",
                  ])
                  .map((src, index) => (
                    <img
                      key={index}
                      loading="eager"
                      alt=""
                      src={src}
                      className="flex-shrink-0"
                      style={{
                        height: "200px",
                        marginRight: "20px",
                        maxWidth: "100%",
                        verticalAlign: "middle",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-12 flex items-center justify-center gap-12">
          <div className="flex flex-col max-w-2xl gap-6 pr-12">
            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-2">
              PRICING
            </p>
            <h1
              className="text-5xl font-extrabold leading-tight text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Smart service, affordable price.
            </h1>
            <p className="text-base leading-relaxed text-gray-600 mb-2">
              <span>Pay per minutes or flat price.</span>
              <br />
              <span>Just choose the way you're more comfortable with.</span>
            </p>
            <div className="mt-4">
              <img
                loading="lazy"
                alt="Payment methods"
                src="https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a860fbe797cade50ce5d1_payment%20methods.svg"
                className="inline-block max-w-full"
              />
            </div>
          </div>

          <div className="flex flex-col max-w-lg gap-6">
            {/* Pay as you go card */}
            <div className="bg-gray-100 rounded-3xl p-8 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h4
                  className="text-xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Pay as you go
                </h4>
                <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  WITH POWERSHARE APPS
                </div>
              </div>
              <div className="text-base leading-relaxed text-gray-700">
                Rent a PowerShare power bank with the PowerShare app or web app
                and pay just the minutes of usage.
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-4 justify-start mb-6 pt-4">
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[#22dd88] hover:bg-gray-200 transition-colors"
                  >
                    <div className="text-sm font-medium tracking-wide">
                      Learn more
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <img
                loading="lazy"
                alt="3D Mobile"
                src="https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a860fbe797c51180ce5d2_3d-mobile.png"
                className="absolute bottom-[-73px] left-[-6px] h-40 w-auto z-10"
              />
            </div>

            {/* Flat price card */}
            <div className="bg-gray-100 rounded-3xl p-8 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h4
                  className="text-xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Flat price
                </h4>
                <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  WITH CARDS
                </div>
              </div>
              <div className="text-base leading-relaxed text-gray-700">
                Tap your card on the PowerShare Station payment terminal or pay
                with Apple Pay or Google Pay.
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-4 justify-start mb-6 pt-4">
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[#22dd88] hover:bg-gray-200 transition-colors"
                  >
                    <div className="text-sm font-medium tracking-wide">
                      Learn more
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <img
                loading="lazy"
                alt="3D Cards"
                src="https://cdn.prod.website-files.com/62fd35451b4dae51b79595fd/642a860fbe797c54870ce5d4_3d-cards.png"
                className="absolute bottom-[-73px] left-[-6px] h-40 w-auto z-10"
              />
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
              {/* Clean Phone Mockup */}
              <div className="relative">
                {/* Decorative Background Elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full blur-lg"></div>

                {/* Main Phone Mockup */}
                <div className="relative z-10">
                  <div
                    className="w-72 h-[450px] rounded-[2.5rem] p-3 shadow-2xl"
                    style={{ background: "rgba(30, 41, 59, 0.95)" }}
                  >
                    <div
                      className="w-full h-full rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden border border-white/10"
                      style={{
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                      }}
                    >
                      {/* Phone Screen Header */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>

                      {/* Phone Screen Content */}
                      <div className="text-center text-white px-8">
                        <div className="mb-8">
                          <div className="w-24 h-24 mx-auto mb-6 bg-white/15 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <svg
                              className="w-12 h-12 text-white"
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
                        </div>
                        <h3 className="font-bold text-2xl mb-3">PowerShare</h3>
                        <p className="text-lg opacity-90 mb-6">Mobile App</p>

                        {/* Feature List */}
                        <div className="space-y-3 text-left bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                            <span className="text-sm">
                              Find nearby stations
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            <span className="text-sm">
                              Real-time availability
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                            <span className="text-sm">Instant QR scanning</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating UI Elements */}
                      <div className="absolute top-8 right-6 w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <div className="absolute bottom-8 left-6 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Download Badge */}
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Coming Soon
                  </div>
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

      {/* Footer */}
      <footer style={{ background: "#1e293b", color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
                            <div className="mb-4">
                    <defs>
                      <clipPath id="footer_logo_clip">
                        <rect width="200" height="80" x="0" y="0"></rect>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#footer_logo_clip)">
                      {/* First Layer - Cyan */}
                      <g
                        className="animate-pulse"
                        style={{
                          animationDelay: "0s",
                          animationDuration: "2s",
                        }}
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
                        <g
                          transform="matrix(1,0,0,1,151.86,48.791)"
                          opacity="1"
                        >
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
                        <g
                          transform="matrix(1,0,0,1,131.726,39.871)"
                          opacity="1"
                        >
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
                        <g
                          transform="matrix(1,0,0,1,28.661,48.501)"
                          opacity="1"
                        >
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
                        style={{
                          animationDelay: "0.5s",
                          animationDuration: "2s",
                        }}
                      >
                        <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.8">
                          <circle
                            cx="0"
                            cy="0"
                            r="6.5"
                            fill="rgb(173,65,187)"
                          />
                        </g>
                        <g
                          transform="matrix(1,0,0,1,186.637,48.5)"
                          opacity="0.8"
                        >
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
                        <g
                          transform="matrix(1,0,0,1,151.86,48.791)"
                          opacity="0.8"
                        >
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
                        <g
                          transform="matrix(1,0,0,1,131.726,39.871)"
                          opacity="0.8"
                        >
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
                        <g transform="matrix(1,0,0,1,100,40)" opacity="0.8">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                            fillOpacity="0"
                            strokeMiterlimit="10"
                            stroke="rgb(173,65,187)"
                            strokeOpacity="1"
                            strokeWidth="11.339"
                            d=" M7.935,27.476 C7.935,27.476 7.935,8.541 7.935,8.541 C7.935,5.946 7.431,3.447 6.436,1.11 C5.46,-1.185 4.065,-3.246 2.296,-5.013 C0.553,-6.756 -1.525,-8.138 -3.875,-9.117 C-6.243,-10.096 -8.737,-10.59 -11.304,-10.59 C-13.844,-10.59 -16.323,-10.09 -18.67,-9.107 C-21,-8.129 -23.062,-6.75 -24.802,-5.008 C-26.55,-3.26 -27.941,-1.224 -28.935,1.043 C-29.966,3.402 -30.488,5.923 -30.488,8.541 C-30.488,11.155 -29.967,13.676 -28.939,16.031 C-27.942,18.302 -26.552,20.336 -24.803,22.088 C-23.057,23.835 -20.995,25.212 -18.672,26.187 C-16.335,27.169 -13.854,27.669 -11.304,27.669 C-8.73,27.669 -6.234,27.175 -3.883,26.2 C-1.533,25.224 0.545,23.843 2.296,22.095 C4.068,20.323 5.462,18.261 6.437,15.966 C7.237,14.091 7.719,12.108 7.877,10.053"
                          />
                        </g>
                        <g
                          transform="matrix(1,0,0,1,28.661,48.501)"
                          opacity="0.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                            fillOpacity="0"
                            strokeMiterlimit="10"
                            stroke="rgb(173,65,187)"
                            strokeOpacity="1"
                            strokeWidth="11.339"
                            d=" M18.826,18.988 C18.826,18.988 18.824,-0.615 18.824,-0.615 C18.824,-0.615 18.736,-2.033 18.736,-2.033 C18.736,-2.033 18.532,-3.429 18.532,-3.429 C18.532,-3.429 18.509,-3.552 18.509,-3.552 C18.226,-5.041 17.757,-6.493 17.115,-7.865 C16.058,-10.123 14.58,-12.126 12.719,-13.815 C11.028,-15.403 8.981,-16.702 6.705,-17.613 C4.418,-18.532 2.023,-18.999 -0.409,-18.999 C-2.855,-18.999 -5.228,-18.535 -7.464,-17.62 C-9.736,-16.69 -11.72,-15.379 -13.364,-13.724 C-14.987,-12.103 -16.305,-10.167 -17.265,-7.987 C-18.239,-5.768 -18.762,-3.397 -18.822,-0.936 C-18.822,-0.936 -18.826,18.999 -18.826,18.999"
                          />
                        </g>
                      </g>

                      {/* Third Layer - Yellow */}
                      <g
                        className="animate-pulse"
                        style={{
                          animationDelay: "1s",
                          animationDuration: "2s",
                        }}
                      >
                        <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.6">
                          <circle cx="0" cy="0" r="6.5" fill="rgb(255,221,0)" />
                        </g>
                        <g
                          transform="matrix(1,0,0,1,186.637,48.5)"
                          opacity="0.6"
                        >
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
                        <g
                          transform="matrix(1,0,0,1,151.86,48.791)"
                          opacity="0.6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                            fillOpacity="0"
                            strokeMiterlimit="10"
                            stroke="rgb(255,221,0)"
                            strokeOpacity="1"
                            strokeWidth="11.339"
                            d=" M7.631,-18.709 C7.631,-18.709 -11.14,-1.528 -11.14,-1.528 C-11.14,-1.528 11.14,18.709 11.14,18.709"
                          />
                        </g>
                      </g>

                      {/* Fourth Layer - Pink */}
                      <g
                        className="animate-pulse"
                        style={{
                          animationDelay: "1.5s",
                          animationDuration: "2s",
                        }}
                      >
                        <g transform="matrix(1,0,0,1,186.5,13)" opacity="0.4">
                          <circle
                            cx="0"
                            cy="0"
                            r="6.5"
                            fill="rgb(255,60,164)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-white">PowerShare</h2>
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