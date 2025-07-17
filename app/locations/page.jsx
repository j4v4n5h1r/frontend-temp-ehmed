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

      {/* Locations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-10">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[#76b82c] font-medium text-2xl font-rubik">
                Find Us at Over 500+ Locations
              </h2>
              <h1
                className="text-5xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                LOCATIONS
              </h1>
            </div>

            {/* Country Filter Tabs */}
            <div className="flex flex-wrap gap-5 items-center">
              <button className="px-4 py-3 text-[#76b82c] font-medium hover:bg-gray-50 rounded-lg transition-colors">
                Closest Location
              </button>
              <button className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                United States
              </button>
              <button className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                Canada
              </button>
              <button className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                United Kingdom
              </button>
              <button className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                Germany
              </button>
            </div>

            {/* Embedded Map */}
            <div className="relative w-full h-[619px] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.0622732494!2d-74.30932777004716!3d40.69701928188069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959472632!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

              {/* Overlay for custom styling */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent"></div>
            </div>

            {/* Description */}
            <div className="bg-white pt-8">
              <p className="text-gray-700 text-base leading-relaxed max-w-4xl">
                Rent and return at more than 500 locations in major cities
                worldwide. Our growing network ensures you'll always find a
                PowerShare station when you need it most.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#76b82c] mb-2">
                  500+
                </div>
                <div className="text-gray-600 text-sm">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#76b82c] mb-2">
                  50+
                </div>
                <div className="text-gray-600 text-sm">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#76b82c] mb-2">
                  24/7
                </div>
                <div className="text-gray-600 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#76b82c] mb-2">
                  100K+
                </div>
                <div className="text-gray-600 text-sm">Happy Users</div>
              </div>
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
