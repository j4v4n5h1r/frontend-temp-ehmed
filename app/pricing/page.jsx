"use client";

import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

export default function PricingPage() {
  const { t } = useTranslation();
  const plans = [
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
        "Compatible with all devices",
      ],
      popular: false,
      color: "blue",
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
        "No overage fees for 24hrs",
      ],
      popular: true,
      color: "emerald",
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
        "Business expense reporting",
      ],
      popular: false,
      color: "purple",
    },
  ];

  const faqs = [
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! The prices shown are exactly what you pay. Late return fees only apply if you keep a power bank beyond the 7-day maximum rental period.",
    },
    {
      question: "What happens if I return the power bank late?",
      answer:
        "If you return within 24 hours of your plan expiration, you'll be charged for an additional day. After 7 days total, a replacement fee applies.",
    },
    {
      question: "Can I upgrade my plan while renting?",
      answer:
        "Yes! You can upgrade from hourly to daily or weekly at any time through our app. You'll only pay the difference.",
    },
    {
      question: "Do you offer business or bulk discounts?",
      answer:
        "Yes, we offer special pricing for businesses and organizations. Contact our sales team for custom pricing based on your usage needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and most mobile payment platforms.",
    },
    {
      question: "Can I get a refund if I don't use the full rental period?",
      answer:
        "Unfortunately, rentals are non-refundable once started. However, you can return the power bank early without penalty.",
    },
  ];

  const features = [
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
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
      title: "Fast Charging",
      description: "High-capacity power banks with fast charging technology",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
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
      ),
      title: "500+ Locations",
      description: "Extensive network of stations in major cities worldwide",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
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
      title: "Return Anywhere",
      description: "Pick up at one station, return at any other station",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Secure & Safe",
      description: "Bank-level security for payments and personal data",
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
                Simple, Transparent
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Pay only for what you use. No hidden fees, no subscription
              required.
              <br className="hidden sm:block" />
              Choose the plan that fits your needs.
            </p>
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium text-sm sm:text-base">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No Setup Fees • Cancel Anytime
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 max-w-6xl mx-auto lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular
                    ? "transform lg:scale-105 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-300"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 sm:px-4 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1 text-sm sm:text-base">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base px-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-emerald-500" : "text-blue-500"}`}
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
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <button
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Every Pobi rental includes these premium features at no
              extra cost
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pricing Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Common questions about our pricing and billing
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-4">
              Join thousands of users who trust Pobi for their charging
              needs. No commitment required - pay as you go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/locations">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  Find Stations
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm sm:text-base">
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
