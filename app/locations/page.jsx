"use client";

import Link from "next/link";
import Map from "../../components/Map";

export default function LocationsPage() {
  const countries = [
    {
      name: "United States",
      flag: "🇺🇸",
      cities: [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
      ],
      description: "Over 300 stations across major cities",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
      description: "50+ stations in metropolitan areas",
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      cities: ["London", "Manchester", "Birmingham", "Glasgow"],
      description: "Expanding coverage in major cities",
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
      description: "Growing network across Germany",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Find Us at Over
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                500+ Locations
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              PowerShare stations are available in major cities worldwide.
              <br className="hidden sm:block" />
              Find a station near you and never run out of power again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stations">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Find Nearest Station
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Map Container with Google Maps Style */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Map Controls Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <div className="bg-white rounded-lg shadow-md p-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none w-48"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-2">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Map View Controls */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white rounded-lg shadow-md p-2 flex flex-col gap-1">
                <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Map
                </button>
                <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Satellite
                </button>
              </div>
            </div>

            {/* Current Location Button */}
            <div className="absolute bottom-20 right-4 z-20">
              <button className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            {/* Station Info Card */}
            <div className="absolute bottom-4 left-4 z-20 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Times Square Station
                  </h3>
                  <p className="text-gray-600 text-xs mb-2">
                    1564 Broadway, New York, NY
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      8 Available
                    </span>
                    <span className="text-xs text-gray-500">24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Map */}
            <div className="relative">
              <Map showCurrentLocation={true} height="600px" />
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available Stations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Low Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Out of Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Our Growing Network
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Stations" },
                { number: "50+", label: "Cities" },
                { number: "10+", label: "Countries" },
                { number: "24/7", label: "Available" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users who never worry about battery life. Find a
              station near you and experience the convenience of PowerShare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stations">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Find Station Now
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
