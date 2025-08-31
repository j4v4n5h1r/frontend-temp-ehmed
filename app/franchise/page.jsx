"use client";

import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import Link from "next/link";

export default function FranchisePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  const franchiseBenefits = [
    {
      title: t("franchise.provenModel", "Proven Business Model"),
      description: t("franchise.provenModelDesc", "Join a successful franchise with a track record of profitability and growth."),
      icon: "📈"
    },
    {
      title: t("franchise.training", "Comprehensive Training"),
      description: t("franchise.trainingDesc", "Receive extensive training on operations, marketing, and customer service."),
      icon: "🎓"
    },
    {
      title: t("franchise.support", "Ongoing Support"),
      description: t("franchise.supportDesc", "Get continuous support from our experienced team and franchise network."),
      icon: "🤝"
    },
    {
      title: t("franchise.marketing", "Marketing Support"),
      description: t("franchise.marketingDesc", "Access to proven marketing strategies and promotional materials."),
      icon: "📢"
    },
    {
      title: t("franchise.technology", "Advanced Technology"),
      description: t("franchise.technologyDesc", "Use our cutting-edge technology platform and management systems."),
      icon: "💻"
    },
    {
      title: t("franchise.network", "Franchise Network"),
      description: t("franchise.networkDesc", "Connect with other franchisees and share best practices."),
      icon: "🌐"
    }
  ];

  const investmentOptions = [
    {
      type: t("franchise.singleUnit", "Single Unit"),
      investment: "$50,000 - $100,000",
      description: t("franchise.singleUnitDesc", "Start with one location and grow from there."),
      features: [
        "One power bank station",
        "Basic training package",
        "Marketing materials",
        "Ongoing support"
      ]
    },
    {
      type: t("franchise.multiUnit", "Multi-Unit"),
      investment: "$200,000 - $500,000",
      description: t("franchise.multiUnitDesc", "Operate multiple locations in your territory."),
      features: [
        "Multiple power bank stations",
        "Advanced training package",
        "Territory exclusivity",
        "Priority support"
      ]
    },
    {
      type: t("franchise.areaDeveloper", "Area Developer"),
      investment: "$500,000+",
      description: t("franchise.areaDeveloperDesc", "Develop and manage an entire region or city."),
      features: [
        "Exclusive territory rights",
        "Sub-franchising opportunities",
        "Comprehensive training",
        "Dedicated support team"
      ]
    }
  ];

  const requirements = [
    {
      title: t("franchise.financial", "Financial Requirements"),
      items: [
        "Minimum net worth: $100,000",
        "Liquid capital: $25,000 - $50,000",
        "Credit score: 700+",
        "Ability to secure financing"
      ]
    },
    {
      title: t("franchise.experience", "Experience Requirements"),
      items: [
        "Business management experience",
        "Customer service skills",
        "Technology proficiency",
        "Marketing knowledge"
      ]
    },
    {
      title: t("franchise.location", "Location Requirements"),
      items: [
        "High-traffic areas",
        "Access to power outlets",
        "Security considerations",
        "Local permits and licenses"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("franchise.title", "Franchise Opportunities")}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              {t("franchise.subtitle", "Own your own power bank business with our proven franchise model. Join the future of mobile charging solutions.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                {t("franchise.applyNow", "Apply Now")}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
                {t("franchise.downloadGuide", "Download Guide")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("franchise.whyFranchise", "Why Choose Our Franchise?")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("franchise.whyFranchiseDesc", "Discover the advantages of joining our franchise network and building your own successful business.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {franchiseBenefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Options */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("franchise.investmentOptions", "Investment Options")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("franchise.investmentOptionsDesc", "Choose the investment level that fits your goals and budget.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investmentOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.type}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">{option.investment}</div>
                  <p className="text-gray-600">{option.description}</p>
                </div>
                <ul className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
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
      </div>

      {/* Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("franchise.requirements", "Franchise Requirements")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("franchise.requirementsDesc", "Ensure you meet our requirements before applying for a franchise opportunity.")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {requirements.map((requirement, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{requirement.title}</h3>
              <ul className="space-y-3">
                {requirement.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Application Process */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("franchise.applicationProcess", "Application Process")}
          </h2>
          <p className="text-xl text-green-100 mb-8">
            {t("franchise.applicationProcessDesc", "Simple steps to start your franchise journey with us.")}
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 text-left">
            <div className="bg-white rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("franchise.step1", "Initial Inquiry")}</h3>
              <p className="text-sm text-gray-600">{t("franchise.step1Desc", "Submit your initial application and learn more about our franchise opportunity.")}</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("franchise.step2", "Discovery Call")}</h3>
              <p className="text-sm text-gray-600">{t("franchise.step2Desc", "Schedule a call with our franchise development team to discuss your goals.")}</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("franchise.step3", "Franchise Agreement")}</h3>
              <p className="text-sm text-gray-600">{t("franchise.step3Desc", "Review and sign the franchise agreement and begin your training.")}</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">4</div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("franchise.step4", "Launch")}</h3>
              <p className="text-sm text-gray-600">{t("franchise.step4Desc", "Complete training and launch your power bank franchise business.")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("franchise.readyToStart", "Ready to Start Your Franchise?")}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t("franchise.readyToStartDesc", "Join our growing network of successful franchise owners and build your future.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              {t("franchise.applyNow", "Apply Now")}
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors">
              {t("franchise.contactUs", "Contact Us")}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              {t("footer.copyright", "© 2024 PowerBank Solutions. All rights reserved.")}
            </div>
            <div className="flex space-x-6">
              <Link href="/b2b-partnership" className="text-green-600 hover:text-green-800">
                {t("nav.b2bPartnership", "B2B Partnership")}
              </Link>
              <Link href="/sectors" className="text-green-600 hover:text-green-800">
                {t("nav.sectors", "Sectors")}
              </Link>
              <Link href="/sustainability" className="text-green-600 hover:text-green-800">
                {t("nav.sustainability", "Sustainability")}
              </Link>
              <Link href="/business" className="text-green-600 hover:text-green-800">
                {t("nav.business", "Business")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
