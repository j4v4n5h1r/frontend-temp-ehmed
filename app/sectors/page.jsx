"use client";

import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import Link from "next/link";

export default function SectorsPage() {
  const { t } = useTranslation();
  const [activeSector, setActiveSector] = useState("retail");

  const sectors = [
    {
      id: "retail",
      title: t("sectors.retail", "Retail & Shopping"),
      description: t("sectors.retailDesc", "Enhance customer experience in shopping malls, stores, and retail centers."),
      icon: "🛍️",
      color: "from-pink-500 to-red-500",
      features: [
        "Increase customer dwell time",
        "Revenue sharing opportunities",
        "Brand integration options",
        "Customer loyalty programs"
      ],
      stats: {
        locations: "500+",
        customers: "2M+",
        revenue: "$15M+"
      }
    },
    {
      id: "hospitality",
      title: t("sectors.hospitality", "Hospitality & Tourism"),
      description: t("sectors.hospitalityDesc", "Provide essential charging services for hotels, restaurants, and tourist destinations."),
      icon: "🏨",
      color: "from-blue-500 to-indigo-600",
      features: [
        "Guest satisfaction enhancement",
        "Premium service offerings",
        "24/7 availability",
        "Multi-language support"
      ],
      stats: {
        locations: "300+",
        customers: "1.5M+",
        revenue: "$12M+"
      }
    },
    {
      id: "transportation",
      title: t("sectors.transportation", "Transportation & Travel"),
      description: t("sectors.transportationDesc", "Keep travelers connected at airports, train stations, and transit hubs."),
      icon: "✈️",
      color: "from-green-500 to-teal-600",
      features: [
        "High-traffic locations",
        "Traveler convenience",
        "International compatibility",
        "Emergency charging"
      ],
      stats: {
        locations: "200+",
        customers: "3M+",
        revenue: "$20M+"
      }
    },
    {
      id: "healthcare",
      title: t("sectors.healthcare", "Healthcare & Medical"),
      description: t("sectors.healthcareDesc", "Support patients and visitors in hospitals, clinics, and medical facilities."),
      icon: "🏥",
      color: "from-purple-500 to-pink-600",
      features: [
        "Sanitized charging stations",
        "Medical facility compliance",
        "Patient comfort focus",
        "Emergency backup power"
      ],
      stats: {
        locations: "150+",
        customers: "800K+",
        revenue: "$8M+"
      }
    },
    {
      id: "education",
      title: t("sectors.education", "Education & Universities"),
      description: t("sectors.educationDesc", "Support students and faculty in educational institutions and campuses."),
      icon: "🎓",
      color: "from-yellow-500 to-orange-600",
      features: [
        "Student-friendly pricing",
        "Campus integration",
        "Academic calendar support",
        "Educational partnerships"
      ],
      stats: {
        locations: "400+",
        customers: "1.2M+",
        revenue: "$10M+"
      }
    },
    {
      id: "corporate",
      title: t("sectors.corporate", "Corporate & Offices"),
      description: t("sectors.corporateDesc", "Enhance workplace productivity with convenient charging solutions."),
      icon: "🏢",
      color: "from-gray-600 to-gray-800",
      features: [
        "Employee productivity tools",
        "Corporate branding options",
        "Analytics and reporting",
        "Bulk pricing options"
      ],
      stats: {
        locations: "600+",
        customers: "2.5M+",
        revenue: "$18M+"
      }
    }
  ];

  const activeSectorData = sectors.find(sector => sector.id === activeSector);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("sectors.title", "Industry Sectors")}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              {t("sectors.subtitle", "Serving diverse industries with innovative power bank solutions tailored to each sector's unique needs.")}
            </p>
          </div>
        </div>
      </div>

      {/* Sector Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveSector(sector.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSector === sector.id
                  ? `bg-gradient-to-r ${sector.color} text-white shadow-lg`
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="mr-2">{sector.icon}</span>
              {sector.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Sector Details */}
      {activeSectorData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-6">{activeSectorData.icon}</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {activeSectorData.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {activeSectorData.description}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{activeSectorData.stats.locations}</div>
                  <div className="text-sm text-gray-600">{t("sectors.locations", "Locations")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{activeSectorData.stats.customers}</div>
                  <div className="text-sm text-gray-600">{t("sectors.customers", "Customers")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{activeSectorData.stats.revenue}</div>
                  <div className="text-sm text-gray-600">{t("sectors.revenue", "Revenue")}</div>
                </div>
              </div>

              <ul className="space-y-3">
                {activeSectorData.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`bg-gradient-to-br ${activeSectorData.color} rounded-2xl p-8 text-white`}>
              <h3 className="text-2xl font-bold mb-4">
                {t("sectors.whyChoose", "Why Choose Us for")} {activeSectorData.title}?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("sectors.expertise", "Industry Expertise")}</h4>
                    <p className="text-sm opacity-90">{t("sectors.expertiseDesc", "Deep understanding of sector-specific challenges and requirements.")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("sectors.customization", "Custom Solutions")}</h4>
                    <p className="text-sm opacity-90">{t("sectors.customizationDesc", "Tailored solutions designed specifically for your industry needs.")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("sectors.support", "Dedicated Support")}</h4>
                    <p className="text-sm opacity-90">{t("sectors.supportDesc", "24/7 support and maintenance services for uninterrupted operations.")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Sectors Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("sectors.allSectors", "All Industry Sectors")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("sectors.allSectorsDesc", "Explore how our power bank solutions can benefit your specific industry.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setActiveSector(sector.id)}
              >
                <div className="text-4xl mb-4">{sector.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h3>
                <p className="text-gray-600 mb-6">{sector.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{sector.stats.locations} {t("sectors.locations", "Locations")}</span>
                  <span>{sector.stats.customers} {t("sectors.customers", "Customers")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("sectors.readyToPartner", "Ready to Partner?")}
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            {t("sectors.readyToPartnerDesc", "Let's discuss how our power bank solutions can benefit your industry sector.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              {t("sectors.contactUs", "Contact Us")}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              {t("sectors.scheduleDemo", "Schedule Demo")}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              {t("footer.copyright", "© 2024 PowerBank Solutions. All rights reserved.")}
            </div>
            <div className="flex space-x-6">
              <Link href="/b2b-partnership" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.b2bPartnership", "B2B Partnership")}
              </Link>
              <Link href="/franchise" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.franchise", "Franchise")}
              </Link>
              <Link href="/sustainability" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.sustainability", "Sustainability")}
              </Link>
              <Link href="/business" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.business", "Business")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
