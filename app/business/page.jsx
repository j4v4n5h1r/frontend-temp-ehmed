"use client";

import { useState } from "react";
import { useTranslation } from "../../utils/translations";
import Link from "next/link";

export default function BusinessPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("solutions");

  const businessSolutions = [
    {
      id: "corporate",
      title: t("business.corporate", "Corporate Solutions"),
      description: t("business.corporateDesc", "Enhance workplace productivity with convenient charging solutions for offices and corporate environments."),
      icon: "🏢",
      color: "from-blue-500 to-indigo-600",
      features: [
        "Employee productivity enhancement",
        "Custom branding options",
        "Analytics and reporting",
        "Bulk pricing and volume discounts",
        "24/7 technical support",
        "Integration with existing systems"
      ],
      pricing: "Starting from $500/month"
    },
    {
      id: "retail",
      title: t("business.retail", "Retail Solutions"),
      description: t("business.retailDesc", "Boost customer satisfaction and increase dwell time in retail locations with our power bank stations."),
      icon: "🛍️",
      color: "from-pink-500 to-red-500",
      features: [
        "Revenue sharing opportunities",
        "Customer engagement tools",
        "Marketing integration",
        "Loyalty program integration",
        "Real-time analytics",
        "Easy installation and setup"
      ],
      pricing: "Starting from $300/month"
    },
    {
      id: "hospitality",
      title: t("business.hospitality", "Hospitality Solutions"),
      description: t("business.hospitalityDesc", "Provide premium charging services for hotels, restaurants, and entertainment venues."),
      icon: "🏨",
      color: "from-purple-500 to-pink-600",
      features: [
        "Premium service offerings",
        "Multi-language support",
        "Guest satisfaction tools",
        "Revenue optimization",
        "Brand enhancement",
        "24/7 availability"
      ],
      pricing: "Starting from $400/month"
    },
    {
      id: "events",
      title: t("business.events", "Event Solutions"),
      description: t("business.eventsDesc", "Keep attendees connected at conferences, festivals, and special events with mobile charging stations."),
      icon: "🎪",
      color: "from-green-500 to-teal-600",
      features: [
        "Event-specific branding",
        "Flexible deployment options",
        "High-capacity charging",
        "Event analytics",
        "On-site support",
        "Custom rental periods"
      ],
      pricing: "Starting from $200/day"
    }
  ];

  const services = [
    {
      title: t("business.consultation", "Business Consultation"),
      description: t("business.consultationDesc", "Expert guidance on implementing power bank solutions for your business needs."),
      icon: "💼",
      duration: "1-2 weeks",
      deliverables: [
        "Business needs assessment",
        "Solution recommendations",
        "ROI analysis",
        "Implementation roadmap"
      ]
    },
    {
      title: t("business.installation", "Installation & Setup"),
      description: t("business.installationDesc", "Professional installation and configuration of power bank stations at your location."),
      icon: "🔧",
      duration: "1-3 days",
      deliverables: [
        "Site preparation",
        "Hardware installation",
        "Software configuration",
        "Staff training"
      ]
    },
    {
      title: t("business.integration", "System Integration"),
      description: t("business.integrationDesc", "Seamless integration with your existing business systems and processes."),
      icon: "🔗",
      duration: "2-4 weeks",
      deliverables: [
        "API integration",
        "Payment system setup",
        "Analytics integration",
        "Custom branding"
      ]
    },
    {
      title: t("business.support", "Ongoing Support"),
      description: t("business.supportDesc", "Continuous support and maintenance to ensure optimal performance of your power bank solution."),
      icon: "🛠️",
      duration: "Ongoing",
      deliverables: [
        "24/7 technical support",
        "Regular maintenance",
        "Performance monitoring",
        "Software updates"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Operations Manager",
      company: "TechCorp Inc.",
      content: t("business.testimonial1", "The power bank solution has significantly improved our employee satisfaction and productivity. The integration was seamless and the support team is excellent."),
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "General Manager",
      company: "Grand Hotel",
      content: t("business.testimonial2", "Our guests love the convenience of the charging stations. It's become a key differentiator for our hotel and has increased our guest satisfaction scores."),
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director",
      company: "Mall of America",
      content: t("business.testimonial3", "The revenue sharing model has been fantastic for our bottom line. The stations are popular with shoppers and have increased dwell time significantly."),
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("business.title", "Business Solutions")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {t("business.subtitle", "Transform your business with innovative power bank solutions designed to enhance customer experience and drive revenue growth.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                {t("business.getQuote", "Get Quote")}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-colors">
                {t("business.scheduleDemo", "Schedule Demo")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveTab("solutions")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "solutions"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {t("business.solutions", "Solutions")}
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "services"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {t("business.services", "Services")}
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "testimonials"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {t("business.testimonials", "Testimonials")}
          </button>
        </div>
      </div>

      {/* Solutions Tab */}
      {activeTab === "solutions" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("business.businessSolutions", "Business Solutions")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("business.businessSolutionsDesc", "Tailored power bank solutions designed to meet the unique needs of different business types and industries.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {businessSolutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">{solution.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <div className="text-lg font-semibold text-blue-600">{solution.pricing}</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full bg-gradient-to-r ${solution.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}>
                  {t("business.learnMore", "Learn More")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("business.ourServices", "Our Services")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("business.ourServicesDesc", "Comprehensive services to ensure successful implementation and ongoing support of your power bank solution.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-sm text-blue-600 font-semibold mb-4">
                  {t("business.duration", "Duration")}: {service.duration}
                </div>
                <ul className="space-y-2">
                  {service.deliverables.map((deliverable, deliverableIndex) => (
                    <li key={deliverableIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-3 h-3 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("business.customerTestimonials", "Customer Testimonials")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("business.customerTestimonialsDesc", "Hear from our satisfied business customers about their experience with our power bank solutions.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-800 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("business.readyToTransform", "Ready to Transform Your Business?")}
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            {t("business.readyToTransformDesc", "Let's discuss how our power bank solutions can benefit your business and drive growth.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              {t("business.contactUs", "Contact Us")}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-colors">
              {t("business.scheduleDemo", "Schedule Demo")}
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
              <Link href="/b2b-partnership" className="text-gray-600 hover:text-gray-800">
                {t("nav.b2bPartnership", "B2B Partnership")}
              </Link>
              <Link href="/franchise" className="text-gray-600 hover:text-gray-800">
                {t("nav.franchise", "Franchise")}
              </Link>
              <Link href="/sectors" className="text-gray-600 hover:text-gray-800">
                {t("nav.sectors", "Sectors")}
              </Link>
              <Link href="/sustainability" className="text-gray-600 hover:text-gray-800">
                {t("nav.sustainability", "Sustainability")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
