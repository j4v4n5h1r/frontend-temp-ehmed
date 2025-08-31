"use client";

import Link from "next/link";
import { useTranslation } from "../../utils/translations";
import Map from "../../components/Map";

export default function LocationsPage() {
  const { t } = useTranslation();

  const countries = [
    {
      name: t("locations.countries.unitedStates.name", "United States"),
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
      description: t(
        "locations.countries.unitedStates.description",
        "Over 300 stations across major cities",
      ),
    },
    {
      name: t("locations.countries.canada.name", "Canada"),
      flag: "🇨🇦",
      cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
      description: t(
        "locations.countries.canada.description",
        "50+ stations in metropolitan areas",
      ),
    },
    {
      name: t("locations.countries.unitedKingdom.name", "United Kingdom"),
      flag: "🇬🇧",
      cities: ["London", "Manchester", "Birmingham", "Glasgow"],
      description: t(
        "locations.countries.unitedKingdom.description",
        "Expanding coverage in major cities",
      ),
    },
    {
      name: t("locations.countries.germany.name", "Germany"),
      flag: "🇩🇪",
      cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
      description: t(
        "locations.countries.germany.description",
        "Growing network across Germany",
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {t("locations.title", "Find Us at Over 500+ Locations")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              {t(
                "locations.subtitle",
                "Pobi stations are available in major cities worldwide. Find a station near you and never run out of power again.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stations">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  {t("locations.findNearestStation", "Find Nearest Station")}
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  {t("locations.getStarted", "Get Started")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h2 className="text-[#76b82c] font-medium text-xl sm:text-2xl font-rubik">
                {t("locations.title", "Find Us at Over 500+ Locations")}
              </h2>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {t("locations.locationsTitle", "LOCATIONS")}
              </h1>
            </div>

            {/* Country Filter Tabs */}
            <div className="flex flex-wrap gap-3 sm:gap-5 items-center justify-center sm:justify-start">
              <button className="px-3 sm:px-4 py-2 sm:py-3 text-[#76b82c] font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
                {t("locations.closestLocation", "Closest Location")}
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
                {t("locations.countries.unitedStates.name", "United States")}
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
                {t("locations.countries.canada.name", "Canada")}
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
                {t("locations.countries.unitedKingdom.name", "United Kingdom")}
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap">
                {t("locations.countries.germany.name", "Germany")}
              </button>
            </div>

            {/* Embedded Map */}
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[619px] bg-gray-100 rounded-lg overflow-hidden">
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
            <div className="bg-white pt-6 sm:pt-8">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl text-center sm:text-left mx-auto sm:mx-0 px-4 sm:px-0">
                {t(
                  "locations.description",
                  "Rent and return at more than 500 locations in major cities worldwide. Our growing network ensures you'll always find a Pobi station when you need it most.",
                )}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#76b82c] mb-1 sm:mb-2">
                  500+
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {t("locations.stats.locations", "Locations")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#76b82c] mb-1 sm:mb-2">
                  50+
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {t("locations.stats.cities", "Cities")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#76b82c] mb-1 sm:mb-2">
                  24/7
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {t("locations.stats.available", "Available")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#76b82c] mb-1 sm:mb-2">
                  100K+
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {t("locations.stats.happyUsers", "Happy Users")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Details Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("locations.availableCountries", "Available Countries")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t(
                "locations.expandingDesc",
                "We're expanding rapidly to serve you better",
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {countries.map((country, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-center mb-4">
                  <div className="text-3xl sm:text-4xl mb-2">
                    {country.flag}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {country.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {country.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {t("locations.majorCities", "Major Cities:")}
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {country.cities.slice(0, 4).map((city, cityIndex) => (
                      <span
                        key={cityIndex}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {city}
                      </span>
                    ))}
                    {country.cities.length > 4 && (
                      <span className="text-gray-500 text-xs">
                        +{country.cities.length - 4}{" "}
                        {t("locations.moreText", "more")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
              {t("locations.network.title", "Our Growing Network")}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  number: "500+",
                  label: t("locations.stats.stations", "Stations"),
                },
                { number: "50+", label: t("locations.stats.cities", "Cities") },
                {
                  number: "10+",
                  label: t("locations.stats.countries", "Countries"),
                },
                {
                  number: "24/7",
                  label: t("locations.stats.available", "Available"),
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-lg opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t("locations.network.readyTitle", "Ready to Get Started?")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
              {t(
                "locations.network.readyDesc",
                "Join thousands of users who never worry about battery life. Find a station near you and experience the convenience of Pobi.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stations">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  {t("locations.network.findStationNow", "Find Station Now")}
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  {t("locations.network.createAccount", "Create Account")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
