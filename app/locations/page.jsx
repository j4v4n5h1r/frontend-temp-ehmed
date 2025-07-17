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

      {/* Station Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Stations Near You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our growing network of power bank stations. Click on any
              location to see available power banks and station details.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <Map showCurrentLocation={true} height="500px" />
          </div>

          <div className="mt-8 text-center">
            <Link href="/stations">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                View All Stations
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
