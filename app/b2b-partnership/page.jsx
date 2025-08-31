"use client";

import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import Link from "next/link";

export default function B2BPartnershipPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  const partnershipTypes = [
    {
      id: "corporate",
      title: t("b2b.corporatePartnership", "Corporate Partnership"),
      description: t("b2b.corporateDesc", "Partner with us to provide power bank solutions for your corporate offices, events, and facilities."),
      features: [
        "Custom branding options",
        "Dedicated account management",
        "Analytics and reporting",
        "24/7 support",
        "Flexible pricing models"
      ],
      icon: "🏢"
    },
    {
      id: "retail",
      title: t("b2b.retailPartnership", "Retail Partnership"),
      description: t("b2b.retailDesc", "Integrate power bank stations into your retail locations to enhance customer experience."),
      features: [
        "Revenue sharing model",
        "Easy integration",
        "Customer engagement tools",
        "Marketing support",
        "Technical assistance"
      ],
        icon: "🛍️"
    },
    {
      id: "hospitality",
      title: t("b2b.hospitalityPartnership", "Hospitality Partnership"),
      description: t("b2b.hospitalityDesc", "Provide convenient charging solutions for hotels, restaurants, and entertainment venues."),
      features: [
        "Premium service options",
        "Custom station designs",
        "Guest satisfaction tools",
        "Revenue optimization",
        "Brand enhancement"
      ],
      icon: "🏨"
    },
    {
      id: "transportation",
      title: t("b2b.transportationPartnership", "Transportation Partnership"),
      description: t("b2b.transportationDesc", "Install power bank stations in airports, train stations, and transit hubs."),
      features: [
        "High-traffic locations",
        "Traveler convenience",
        "Revenue generation",
        "Infrastructure support",
        "Maintenance services"
      ],
      icon: "✈️"
    }
  ];

  const benefits = [
    {
      title: t("b2b.revenueGeneration", "Revenue Generation"),
      description: t("b2b.revenueDesc", "Generate additional revenue through power bank rentals and advertising opportunities."),
      icon: "💰"
    },
    {
      title: t("b2b.customerRetention", "Customer Retention"),
      description: t("b2b.customerRetentionDesc", "Increase customer dwell time and satisfaction with convenient charging solutions."),
      icon: "👥"
    },
    {
      title: t("b2b.brandEnhancement", "Brand Enhancement"),
      description: t("b2b.brandEnhancementDesc", "Enhance your brand image as a customer-focused, technology-forward business."),
      icon: "⭐"
    },
    {
      title: t("b2b.sustainability", "Sustainability"),
      description: t("b2b.sustainabilityDesc", "Demonstrate your commitment to environmental responsibility and green initiatives."),
      icon: "🌱"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("b2b.title", "B2B Partnership")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t("b2b.subtitle", "Transform your business with innovative power bank solutions. Partner with us to enhance customer experience and generate new revenue streams.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                {t("b2b.getStarted", "Get Started")}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {t("b2b.learnMore", "Learn More")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("b2b.partnershipTypes", "Partnership Types")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("b2b.partnershipTypesDesc", "Choose the partnership model that best fits your business needs and objectives.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnershipTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.description}</p>
              <ul className="space-y-2">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("b2b.benefits", "Partnership Benefits")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("b2b.benefitsDesc", "Discover how partnering with us can transform your business and create new opportunities.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("b2b.readyToPartner", "Ready to Partner?")}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t("b2b.readyToPartnerDesc", "Join hundreds of businesses already benefiting from our power bank solutions.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              {t("b2b.contactUs", "Contact Us")}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t("b2b.scheduleDemo", "Schedule Demo")}
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
              <Link href="/franchise" className="text-blue-600 hover:text-blue-800">
                {t("nav.franchise", "Franchise")}
              </Link>
              <Link href="/sectors" className="text-blue-600 hover:text-blue-800">
                {t("nav.sectors", "Sectors")}
              </Link>
              <Link href="/sustainability" className="text-blue-600 hover:text-blue-800">
                {t("nav.sustainability", "Sustainability")}
              </Link>
              <Link href="/business" className="text-blue-600 hover:text-blue-800">
                {t("nav.business", "Business")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
