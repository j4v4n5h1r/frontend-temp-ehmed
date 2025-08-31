"use client";

import { useState } from "react";
import { useTranslation } from "../../utils/translations";
import Link from "next/link";

export default function SustainabilityPage() {
  const { t } = useTranslation();
  const [activeInitiative, setActiveInitiative] = useState("renewable");

  const initiatives = [
    {
      id: "renewable",
      title: t("sustainability.renewableEnergy", "Renewable Energy"),
      description: t("sustainability.renewableDesc", "Powering our stations with 100% renewable energy sources."),
      icon: "☀️",
      color: "from-yellow-400 to-orange-500",
      stats: {
        percentage: "100%",
        metric: "Renewable Energy",
        impact: "CO2 Reduction"
      },
      details: [
        "Solar panel integration",
        "Wind energy partnerships",
        "Green energy certificates",
        "Carbon footprint tracking"
      ]
    },
    {
      id: "recycling",
      title: t("sustainability.recycling", "Battery Recycling"),
      description: t("sustainability.recyclingDesc", "Comprehensive battery recycling program to minimize environmental impact."),
      icon: "♻️",
      color: "from-green-500 to-emerald-600",
      stats: {
        percentage: "95%",
        metric: "Recycling Rate",
        impact: "Waste Reduction"
      },
      details: [
        "Certified recycling partners",
        "Battery lifecycle management",
        "Material recovery programs",
        "Circular economy approach"
      ]
    },
    {
      id: "efficiency",
      title: t("sustainability.energyEfficiency", "Energy Efficiency"),
      description: t("sustainability.efficiencyDesc", "Optimizing energy consumption through smart technology and efficient design."),
      icon: "⚡",
      color: "from-blue-500 to-cyan-600",
      stats: {
        percentage: "40%",
        metric: "Energy Savings",
        impact: "Efficiency Gain"
      },
      details: [
        "Smart charging algorithms",
        "Energy-efficient hardware",
        "Power management systems",
        "Real-time optimization"
      ]
    },
    {
      id: "packaging",
      title: t("sustainability.sustainablePackaging", "Sustainable Packaging"),
      description: t("sustainability.packagingDesc", "Using eco-friendly materials and reducing packaging waste."),
      icon: "📦",
      color: "from-purple-500 to-pink-600",
      stats: {
        percentage: "80%",
        metric: "Recycled Materials",
        impact: "Waste Reduction"
      },
      details: [
        "Biodegradable materials",
        "Minimal packaging design",
        "Reusable containers",
        "Local sourcing"
      ]
    }
  ];

  const impactMetrics = [
    {
      title: t("sustainability.carbonReduction", "Carbon Reduction"),
      value: "2,500",
      unit: "tons CO2",
      description: t("sustainability.carbonReductionDesc", "Annual CO2 emissions reduced through our sustainable practices."),
      icon: "🌱"
    },
    {
      title: t("sustainability.energySaved", "Energy Saved"),
      value: "15,000",
      unit: "MWh",
      description: t("sustainability.energySavedDesc", "Energy saved through efficiency improvements and renewable sources."),
      icon: "💡"
    },
    {
      title: t("sustainability.batteriesRecycled", "Batteries Recycled"),
      value: "50,000",
      unit: "units",
      description: t("sustainability.batteriesRecycledDesc", "Batteries recycled through our comprehensive program."),
      icon: "🔋"
    },
    {
      title: t("sustainability.wasteReduced", "Waste Reduced"),
      value: "75%",
      unit: "reduction",
      description: t("sustainability.wasteReducedDesc", "Overall waste reduction through sustainable practices."),
      icon: "🗑️"
    }
  ];

  const goals = [
    {
      year: "2025",
      title: t("sustainability.goal2025", "Carbon Neutral Operations"),
      description: t("sustainability.goal2025Desc", "Achieve carbon neutrality across all operations and facilities."),
      status: "in-progress"
    },
    {
      year: "2026",
      title: t("sustainability.goal2026", "100% Renewable Energy"),
      description: t("sustainability.goal2026Desc", "Transition to 100% renewable energy for all power bank stations."),
      status: "planned"
    },
    {
      year: "2027",
      title: t("sustainability.goal2027", "Zero Waste Operations"),
      description: t("sustainability.goal2027Desc", "Implement zero-waste policies across all business operations."),
      status: "planned"
    },
    {
      year: "2028",
      title: t("sustainability.goal2028", "Circular Economy Model"),
      description: t("sustainability.goal2028Desc", "Establish a complete circular economy model for all products."),
      status: "planned"
    }
  ];

  const activeInitiativeData = initiatives.find(initiative => initiative.id === activeInitiative);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("sustainability.title", "Sustainability")}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              {t("sustainability.subtitle", "Committed to environmental responsibility and building a sustainable future through innovative power bank solutions.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                {t("sustainability.learnMore", "Learn More")}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
                {t("sustainability.downloadReport", "Download Report")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("sustainability.ourImpact", "Our Environmental Impact")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("sustainability.ourImpactDesc", "Measurable results from our commitment to sustainability and environmental responsibility.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">{metric.icon}</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metric.value} {metric.unit}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{metric.title}</h3>
              <p className="text-gray-600 text-sm">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Initiatives */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("sustainability.initiatives", "Sustainability Initiatives")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("sustainability.initiativesDesc", "Comprehensive programs and practices that drive our environmental commitment.")}
            </p>
          </div>

          {/* Initiative Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {initiatives.map((initiative) => (
              <button
                key={initiative.id}
                onClick={() => setActiveInitiative(initiative.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeInitiative === initiative.id
                    ? `bg-gradient-to-r ${initiative.color} text-white shadow-lg`
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="mr-2">{initiative.icon}</span>
                {initiative.title}
              </button>
            ))}
          </div>

          {/* Active Initiative Details */}
          {activeInitiativeData && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl mb-6">{activeInitiativeData.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeInitiativeData.title}
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  {activeInitiativeData.description}
                </p>
                
                <div className="bg-white rounded-xl p-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {activeInitiativeData.stats.percentage}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {activeInitiativeData.stats.metric}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activeInitiativeData.stats.impact}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {activeInitiativeData.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`bg-gradient-to-br ${activeInitiativeData.color} rounded-2xl p-8 text-white`}>
                <h4 className="text-2xl font-bold mb-4">
                  {t("sustainability.whyImportant", "Why This Matters")}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{t("sustainability.environmental", "Environmental Impact")}</h5>
                      <p className="text-sm opacity-90">{t("sustainability.environmentalDesc", "Reducing our carbon footprint and protecting natural resources.")}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{t("sustainability.customer", "Customer Value")}</h5>
                      <p className="text-sm opacity-90">{t("sustainability.customerDesc", "Providing eco-friendly solutions that align with customer values.")}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{t("sustainability.future", "Future Ready")}</h5>
                      <p className="text-sm opacity-90">{t("sustainability.futureDesc", "Building a sustainable business model for long-term success.")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sustainability Goals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("sustainability.goals", "Sustainability Goals")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("sustainability.goalsDesc", "Our roadmap to achieving comprehensive environmental sustainability.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {goals.map((goal, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mb-4 ${
                  goal.status === 'completed' ? 'bg-green-500' :
                  goal.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                  {goal.status === 'completed' ? '✓' :
                   goal.status === 'in-progress' ? '⟳' : '○'}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{goal.year}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{goal.title}</h3>
                <p className="text-gray-600 text-sm">{goal.description}</p>
              </div>
              <div className={`text-center px-3 py-1 rounded-full text-xs font-semibold ${
                goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                goal.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {goal.status === 'completed' ? t("sustainability.completed", "Completed") :
                 goal.status === 'in-progress' ? t("sustainability.inProgress", "In Progress") : 
                 t("sustainability.planned", "Planned")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("sustainability.joinUs", "Join Our Sustainability Journey")}
          </h2>
          <p className="text-xl text-green-100 mb-8">
            {t("sustainability.joinUsDesc", "Partner with us to create a more sustainable future through innovative power bank solutions.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              {t("sustainability.contactUs", "Contact Us")}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
              {t("sustainability.downloadReport", "Download Report")}
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
              <Link href="/b2b-partnership" className="text-green-600 hover:text-green-800">
                {t("nav.b2bPartnership", "B2B Partnership")}
              </Link>
              <Link href="/franchise" className="text-green-600 hover:text-green-800">
                {t("nav.franchise", "Franchise")}
              </Link>
              <Link href="/sectors" className="text-green-600 hover:text-green-800">
                {t("nav.sectors", "Sectors")}
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
