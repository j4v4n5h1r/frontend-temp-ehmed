"use client";

import Link from "next/link";

export default function HowToUsePage() {
  const steps = [
    {
      step: "01",
      title: "Find a Station",
      description:
        "Use our app or website to locate the nearest PowerShare station. Look for our distinctive blue stations in malls, airports, restaurants, and other convenient locations.",
      icon: (
        <svg
          className="w-8 h-8"
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
      image:
        "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop&crop=center",
    },
    {
      step: "02",
      title: "Scan QR Code",
      description:
        "Simply scan the QR code on the station using your phone camera or our PowerShare app. No special equipment needed - just your smartphone!",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop&crop=center",
    },
    {
      step: "03",
      title: "Choose Your Power Bank",
      description:
        "Select an available power bank from the station. Each power bank comes with multiple cable types (Lightning, USB-C, Micro-USB) to charge any device.",
      icon: (
        <svg
          className="w-8 h-8"
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
      image:
        "https://images.unsplash.com/photo-1616430435423-53dd9d4d73b7?w=400&h=300&fit=crop&crop=center",
    },
    {
      step: "04",
      title: "Pay Securely",
      description:
        "Complete your rental with secure payment through our app or website. We accept all major credit cards, PayPal, and mobile payment methods.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center",
    },
    {
      step: "05",
      title: "Start Charging",
      description:
        "The power bank will automatically unlock and you can start charging your device immediately. Monitor your device's charging progress through our app.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1605349952427-e45b297d6a4a?w=400&h=300&fit=crop&crop=center",
    },
    {
      step: "06",
      title: "Return Anywhere",
      description:
        "When you're done, return the power bank to any PowerShare station. It's that simple - no need to return to the original location!",
      icon: (
        <svg
          className="w-8 h-8"
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
      image:
        "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop&crop=center",
    },
  ];

  const faqs = [
    {
      question: "How long can I keep a power bank?",
      answer:
        "You can rent a power bank for up to 7 days. After that, additional fees may apply. Most users return them within a few hours.",
    },
    {
      question: "What if I lose or damage the power bank?",
      answer:
        "If a power bank is lost or damaged, a replacement fee will be charged to your account. The fee varies by location but is typically around $30-50.",
    },
    {
      question: "Which devices are compatible?",
      answer:
        "Our power banks work with all smartphones, tablets, and small electronics. They include Lightning, USB-C, and Micro-USB cables built-in.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Pricing varies by location and duration. Typically, it's $2 per hour, $8 per day, or $25 per week. Check our pricing page for details.",
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
                How to Use
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                PowerShare
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get powered up in 6 simple steps. It's easier than you think!
              <br className="hidden sm:block" />
              From finding a station to returning your power bank - we've got
              you covered.
            </p>
            <Link href="/locations">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Find a Station
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Step-by-Step Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to start your PowerShare experience
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers. Here are the most common
              questions about using PowerShare.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Never Run Out of Power?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have made PowerShare part of their
              daily routine. Get started today and experience the convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/locations">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Find Stations
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
