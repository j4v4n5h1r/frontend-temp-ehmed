"use client";

import { useState } from "react";
import { useTranslation } from "../../utils/translations";
import Link from "next/link";

export default function ProductsPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("stations");

  const productCategories = [
    {
      id: "stations",
      title: t("products.stations", "Charging Stations"),
      description: t("products.stationsDesc", "Smart power bank rental stations for various locations"),
      icon: "🔌"
    },
    {
      id: "powerbanks",
      title: t("products.powerbanks", "Power Banks"),
      description: t("products.powerbanksDesc", "High-quality portable charging devices"),
      icon: "🔋"
    },
    {
      id: "accessories",
      title: t("products.accessories", "Accessories"),
      description: t("products.accessoriesDesc", "Essential accessories and cables"),
      icon: "📱"
    },
    {
      id: "software",
      title: t("products.software", "Software Solutions"),
      description: t("products.softwareDesc", "Management and analytics platforms"),
      icon: "💻"
    }
  ];

  const chargingStations = [
    {
      id: "station-pro",
      name: t("products.stationPro", "Station Pro"),
      description: t("products.stationProDesc", "Professional-grade charging station for high-traffic locations"),
      price: "$2,500",
      capacity: "20 power banks",
      features: [
        "Touch screen interface",
        "Real-time monitoring",
        "Payment integration",
        "Custom branding",
        "Remote management",
        "24/7 support"
      ],
      image: "🔌",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "station-mini",
      name: t("products.stationMini", "Station Mini"),
      description: t("products.stationMiniDesc", "Compact charging station for small businesses and cafes"),
      price: "$1,200",
      capacity: "8 power banks",
      features: [
        "Compact design",
        "Easy installation",
        "Basic monitoring",
        "Payment support",
        "Mobile app control",
        "Energy efficient"
      ],
      image: "🔌",
      color: "from-green-500 to-teal-600"
    },
    {
      id: "station-mega",
      name: t("products.stationMega", "Station Mega"),
      description: t("products.stationMegaDesc", "Large-scale charging station for airports and shopping malls"),
      price: "$5,000",
      capacity: "50 power banks",
      features: [
        "High capacity",
        "Advanced analytics",
        "Multi-language support",
        "Premium branding",
        "API integration",
        "Dedicated support"
      ],
      image: "🔌",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const powerBanks = [
    {
      id: "powerbank-standard",
      name: t("products.powerbankStandard", "Standard Power Bank"),
      description: t("products.powerbankStandardDesc", "Reliable 10,000mAh power bank for everyday use"),
      price: "$25",
      capacity: "10,000mAh",
      features: [
        "Fast charging",
        "Universal compatibility",
        "LED indicator",
        "Compact design",
        "Durable construction",
        "1-year warranty"
      ],
      image: "🔋",
      color: "from-gray-500 to-gray-700"
    },
    {
      id: "powerbank-premium",
      name: t("products.powerbankPremium", "Premium Power Bank"),
      description: t("products.powerbankPremiumDesc", "High-capacity 20,000mAh power bank with advanced features"),
      price: "$45",
      capacity: "20,000mAh",
      features: [
        "Wireless charging",
        "Multiple ports",
        "Smart protection",
        "Premium materials",
        "Fast charging 2.0",
        "2-year warranty"
      ],
      image: "🔋",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: "powerbank-ultra",
      name: t("products.powerbankUltra", "Ultra Power Bank"),
      description: t("products.powerbankUltraDesc", "Ultra-fast charging 30,000mAh power bank for power users"),
      price: "$65",
      capacity: "30,000mAh",
      features: [
        "Ultra-fast charging",
        "USB-C Power Delivery",
        "Temperature control",
        "Premium design",
        "Multiple device charging",
        "3-year warranty"
      ],
      image: "🔋",
      color: "from-red-500 to-pink-600"
    }
  ];

  const accessories = [
    {
      id: "cable-set",
      name: t("products.cableSet", "Cable Set"),
      description: t("products.cableSetDesc", "Complete set of charging cables for all devices"),
      price: "$15",
      features: [
        "Lightning cable",
        "USB-C cable",
        "Micro USB cable",
        "Durable construction",
        "Fast charging compatible",
        "Tangle-free design"
      ],
      image: "📱",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "wireless-charger",
      name: t("products.wirelessCharger", "Wireless Charger"),
      description: t("products.wirelessChargerDesc", "Convenient wireless charging pad"),
      price: "$30",
      features: [
        "10W fast charging",
        "Universal compatibility",
        "LED indicator",
        "Non-slip design",
        "Overcharge protection",
        "Compact size"
      ],
      image: "📱",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "car-charger",
      name: t("products.carCharger", "Car Charger"),
      description: t("products.carChargerDesc", "Fast charging solution for vehicles"),
      price: "$20",
      features: [
        "Dual USB ports",
        "Fast charging support",
        "Universal compatibility",
        "Compact design",
        "Overheat protection",
        "Easy installation"
      ],
      image: "📱",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const softwareSolutions = [
    {
      id: "management-platform",
      name: t("products.managementPlatform", "Management Platform"),
      description: t("products.managementPlatformDesc", "Comprehensive platform for managing power bank operations"),
      price: "$200/month",
      features: [
        "Real-time monitoring",
        "Analytics dashboard",
        "User management",
        "Payment processing",
        "Inventory tracking",
        "API access"
      ],
      image: "💻",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: "mobile-app",
      name: t("products.mobileApp", "Mobile App"),
      description: t("products.mobileAppDesc", "User-friendly mobile application for power bank rentals"),
      price: "Free",
      features: [
        "Easy rental process",
        "Payment integration",
        "Location finder",
        "Usage history",
        "Push notifications",
        "Multi-language support"
      ],
      image: "💻",
      color: "from-green-500 to-teal-600"
    },
    {
      id: "analytics-suite",
      name: t("products.analyticsSuite", "Analytics Suite"),
      description: t("products.analyticsSuiteDesc", "Advanced analytics and reporting tools"),
      price: "$100/month",
      features: [
        "Usage analytics",
        "Revenue reports",
        "Customer insights",
        "Performance metrics",
        "Custom dashboards",
        "Export capabilities"
      ],
      image: "💻",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const getProductsByCategory = () => {
    switch (activeCategory) {
      case "stations":
        return chargingStations;
      case "powerbanks":
        return powerBanks;
      case "accessories":
        return accessories;
      case "software":
        return softwareSolutions;
      default:
        return chargingStations;
    }
  };

  const activeCategoryData = productCategories.find(category => category.id === activeCategory);
  const currentProducts = getProductsByCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("products.title", "Our Products")}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              {t("products.subtitle", "Discover our range of innovative power bank solutions designed for modern connectivity needs.")}
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      {activeCategoryData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {activeCategoryData.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeCategoryData.description}
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className={`bg-gradient-to-r ${product.color} p-8 text-center text-white`}>
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-white opacity-90 mb-4">{product.description}</p>
                <div className="text-3xl font-bold">{product.price}</div>
                {product.capacity && (
                  <div className="text-sm opacity-80 mt-2">{product.capacity}</div>
                )}
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <button className={`flex-1 bg-gradient-to-r ${product.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}>
                    {t("products.learnMore", "Learn More")}
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    {t("products.getQuote", "Get Quote")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("products.whyChoose", "Why Choose Our Products?")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("products.whyChooseDesc", "Discover the advantages of our innovative power bank solutions.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("products.quality", "High Quality")}</h3>
              <p className="text-gray-600">{t("products.qualityDesc", "Premium materials and rigorous testing ensure reliable performance.")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("products.fastCharging", "Fast Charging")}</h3>
              <p className="text-gray-600">{t("products.fastChargingDesc", "Advanced charging technology for quick and efficient power delivery.")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("products.safety", "Safety First")}</h3>
              <p className="text-gray-600">{t("products.safetyDesc", "Built-in protection systems ensure safe operation and device compatibility.")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("products.ecoFriendly", "Eco-Friendly")}</h3>
              <p className="text-gray-600">{t("products.ecoFriendlyDesc", "Sustainable design and materials reduce environmental impact.")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("products.readyToOrder", "Ready to Order?")}
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            {t("products.readyToOrderDesc", "Get in touch with our sales team to discuss your requirements and get a customized quote.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              {t("products.contactSales", "Contact Sales")}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              {t("products.requestDemo", "Request Demo")}
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
              <Link href="/sectors" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.sectors", "Sectors")}
              </Link>
              <Link href="/sustainability" className="text-indigo-600 hover:text-indigo-800">
                {t("nav.sustainability", "Sustainability")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
