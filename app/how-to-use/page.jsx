"use client";

import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

export default function HowToUsePage() {
  const { t } = useTranslation();

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
      question: t("howToUse.faq.q1", "How long can I keep a power bank?"),
      answer: t(
        "howToUse.faq.a1",
        "You can rent a power bank for up to 7 days. After that, additional fees may apply. Most users return them within a few hours.",
      ),
    },
    {
      question: t(
        "howToUse.faq.q2",
        "What if I lose or damage the power bank?",
      ),
      answer: t(
        "howToUse.faq.a2",
        "If a power bank is lost or damaged, a replacement fee will be charged to your account. The fee varies by location but is typically around $30-50.",
      ),
    },
    {
      question: t("howToUse.faq.q3", "Which devices are compatible?"),
      answer: t(
        "howToUse.faq.a3",
        "Our power banks work with all smartphones, tablets, and small electronics. They include Lightning, USB-C, and Micro-USB cables built-in.",
      ),
    },
    {
      question: t("howToUse.faq.q4", "How much does it cost?"),
      answer: t(
        "howToUse.faq.a4",
        "Pricing varies by location and duration. Typically, it's $2 per hour, $8 per day, or $25 per week. Check our pricing page for details.",
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
                How to Use
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                PowerShare
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Get powered up in 6 simple steps. It's easier than you think!
              <br className="hidden sm:block" />
              From finding a station to returning your power bank - we've got
              you covered.
            </p>
            <Link href="/locations">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                Find a Station
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="order-1 lg:order-1 w-full lg:w-auto">
                <div className="w-full max-w-sm lg:w-[370px] h-[250px] sm:h-[280px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop&crop=center"
                    alt="Find a Station"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="order-2 lg:order-2 flex items-center justify-center">
                <div className="flex lg:flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#76b82c] rounded-2xl lg:rounded-3xl flex items-center justify-center">
                    <h1 className="text-white text-xl sm:text-2xl font-bold">
                      1
                    </h1>
                  </div>
                  <div className="hidden lg:block w-[5px] h-[100px] bg-[#76b82c]"></div>
                  <div className="lg:hidden w-[50px] h-[5px] bg-[#76b82c]"></div>
                </div>
              </div>

              <div className="order-3 lg:order-3 flex flex-col gap-3 w-full lg:max-w-[370px] text-center lg:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Find a PowerShare Station
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-6">
                  PowerShare is available at thousands of convenience stores,
                  malls, airports, and charging stations worldwide. Use our app
                  or website to find the nearest location.
                  <br />
                  <br />
                  <Link
                    href="/locations"
                    className="underline text-blue-600 hover:text-blue-700"
                  >
                    Find the closest location here
                  </Link>
                </p>

                {/* Partner logos */}
                <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 overflow-hidden h-14">
                  <div className="flex items-center gap-2 animate-scroll">
                    <img
                      src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=27&fit=crop"
                      alt="Partner 1"
                      className="h-6 w-auto"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=65&h=22&fit=crop"
                      alt="Partner 2"
                      className="h-5 w-auto"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=79&h=27&fit=crop"
                      alt="Partner 3"
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="order-1 lg:order-3 w-full lg:w-auto">
                <div className="w-full max-w-sm lg:w-[370px] h-[250px] sm:h-[280px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.pexels.com/photos/10104281/pexels-photo-10104281.jpeg?w=400&h=300&fit=crop&crop=center"
                    alt="Grab Power Bank"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="order-2 lg:order-2 flex items-center justify-center">
                <div className="flex lg:flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#76b82c] rounded-2xl lg:rounded-3xl flex items-center justify-center">
                    <h1 className="text-white text-xl sm:text-2xl font-bold">
                      2
                    </h1>
                  </div>
                  <div className="hidden lg:block w-[5px] h-[100px] bg-[#76b82c]"></div>
                  <div className="lg:hidden w-[50px] h-[5px] bg-[#76b82c]"></div>
                </div>
              </div>

              <div className="order-3 lg:order-1 flex flex-col gap-3 w-full lg:max-w-[370px] text-center lg:text-right">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Grab a PowerShare power bank and charge on the go
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-6">
                  No app needed. Renting a PowerShare costs just $2 to $8
                  depending on your rental duration, along with a returnable
                  deposit of $15.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-6">
                  <Link
                    href="/pricing"
                    className="underline text-blue-600 hover:text-blue-700"
                  >
                    (Tap here to see detailed pricing.)
                  </Link>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="order-1 lg:order-1 w-full lg:w-auto">
                <div className="w-full max-w-sm lg:w-[370px] h-[250px] sm:h-[280px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.pexels.com/photos/9800036/pexels-photo-9800036.jpeg?w=400&h=300&fit=crop&crop=center"
                    alt="Return Power Bank"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="order-2 lg:order-2 flex items-center justify-center">
                <div className="flex lg:flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#76b82c] rounded-2xl lg:rounded-3xl flex items-center justify-center">
                    <h1 className="text-white text-xl sm:text-2xl font-bold">
                      3
                    </h1>
                  </div>
                  <div className="hidden lg:block w-[5px] h-[100px] bg-[#76b82c]"></div>
                  <div className="lg:hidden w-[50px] h-[5px] bg-[#76b82c]"></div>
                </div>
              </div>

              <div className="order-3 lg:order-3 flex flex-col gap-3 w-full lg:max-w-[370px] text-center lg:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Return in 7 days, get your deposit back — maybe grab another?
                  😉
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-6">
                  You have 7 days from the time you rent PowerShare to return
                  it, so there's no rush. And when you do return it on-time,
                  we'll give you back your full deposit. Every week that you're
                  late, we deduct $2 from your deposit, the max is $15.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-8 sm:gap-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              PowerShare is also available outside of convenience stores.
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Station */}
              <div className="flex flex-col gap-6 sm:gap-8 items-center text-center">
                <div className="w-full max-w-xs sm:w-[250px] lg:w-[290px] h-[200px] sm:h-[250px] lg:h-[290px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.pexels.com/photos/9800036/pexels-photo-9800036.jpeg?w=400&h=400&fit=crop&crop=center"
                    alt="Station"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    Station
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-6 px-4">
                    Scan the QR code or simply tap your card to rent a power
                    bank, then return it to any convenience store or station.
                  </p>
                </div>
              </div>

              {/* Vending Machine */}
              <div className="flex flex-col gap-6 sm:gap-8 items-center text-center">
                <div className="w-full max-w-xs sm:w-[250px] lg:w-[290px] h-[200px] sm:h-[250px] lg:h-[290px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.pexels.com/photos/14528919/pexels-photo-14528919.jpeg?w=400&h=400&fit=crop&crop=center"
                    alt="Vending Machine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    Vending Machine
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-6 px-4">
                    Getting a PowerShare from a vending machine is like getting
                    a water bottle from a vending machine, except you also pay a
                    deposit. Return your PowerShare to any convenience store.
                  </p>
                </div>
              </div>

              {/* Events */}
              <div className="flex flex-col gap-6 sm:gap-8 items-center text-center sm:col-span-2 lg:col-span-1">
                <div className="w-full max-w-xs sm:w-[250px] lg:w-[290px] h-[200px] sm:h-[250px] lg:h-[290px] rounded-2xl lg:rounded-3xl overflow-hidden mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&crop=center"
                    alt="Events"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    Events
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-6 px-4">
                    PowerShare is often used at festivals and events around the
                    world. Don't be surprised if you see us out and about at
                    your favorite big event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Got questions? We've got answers. Here are the most common
              questions about using PowerShare.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:bg-gray-100 transition-colors"
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
              Ready to Never Run Out of Power?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-4">
              Join thousands of users who have made PowerShare part of their
              daily routine. Get started today and experience the convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/locations">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  Find Stations
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm sm:text-base">
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
