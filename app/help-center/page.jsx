"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const HelpCenterPage = () => {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: 1,
      question: t("helpCenter.faq.question1", "How do I rent a power bank?"),
      answer: t("helpCenter.faq.answer1", "Simply find a nearby station using our app, scan the QR code, and select your rental duration. The power bank will be dispensed automatically."),
    },
    {
      id: 2,
      question: t("helpCenter.faq.question2", "How do I return a power bank?"),
      answer: t("helpCenter.faq.answer2", "Return the power bank to any of our stations. Simply insert it into an available slot and your rental will end automatically."),
    },
    {
      id: 3,
      question: t("helpCenter.faq.question3", "What if I can't find a station to return?"),
      answer: t("helpCenter.faq.answer3", "Use our station finder in the app to locate the nearest return point. If you're in an emergency, contact our support team for assistance."),
    },
    {
      id: 4,
      question: t("helpCenter.faq.question4", "How much does it cost?"),
      answer: t("helpCenter.faq.answer4", "We offer flexible pricing: ₺15/hour, ₺60/day, or ₺190/week. Choose the option that best fits your needs."),
    },
    {
      id: 5,
      question: t("helpCenter.faq.question5", "What devices are compatible?"),
      answer: t("helpCenter.faq.answer5", "Our power banks come with multiple cables including USB-C, Lightning, and Micro-USB, compatible with all major smartphone brands."),
    },
    {
      id: 6,
      question: t("helpCenter.faq.question6", "What if the power bank is damaged?"),
      answer: t("helpCenter.faq.answer6", "If you notice any damage, please return it immediately and report it through the app. We'll provide a replacement at no extra charge."),
    },
  ];

  const supportCategories = [
    {
      icon: "📱",
      title: t("helpCenter.categories.gettingStarted", "Getting Started"),
      description: t("helpCenter.categories.gettingStartedDesc", "Learn how to use our service"),
      articles: 12,
    },
    {
      icon: "💳",
      title: t("helpCenter.categories.billing", "Billing & Payments"),
      description: t("helpCenter.categories.billingDesc", "Payment methods and billing questions"),
      articles: 8,
    },
    {
      icon: "🔧",
      title: t("helpCenter.categories.troubleshooting", "Troubleshooting"),
      description: t("helpCenter.categories.troubleshootingDesc", "Solve common issues"),
      articles: 15,
    },
    {
      icon: "🗺️",
      title: t("helpCenter.categories.locations", "Locations & Stations"),
      description: t("helpCenter.categories.locationsDesc", "Find and use our stations"),
      articles: 6,
    },
    {
      icon: "⚡",
      title: t("helpCenter.categories.powerbanks", "Power Banks"),
      description: t("helpCenter.categories.powerbanksDesc", "Device compatibility and usage"),
      articles: 10,
    },
    {
      icon: "👤",
      title: t("helpCenter.categories.account", "Account Management"),
      description: t("helpCenter.categories.accountDesc", "Manage your profile and settings"),
      articles: 7,
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              borderRadius: "1rem",
              marginBottom: "1.5rem",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <svg
              style={{ width: "2rem", height: "2rem", color: "white" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#171717",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}
          >
            {t("helpCenter.title", "Help Center")}
          </h1>
          <p
            style={{
              color: "#525252",
              fontSize: "1.25rem",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("helpCenter.subtitle", "Find answers to your questions and get the support you need")}
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder={t("helpCenter.searchPlaceholder", "Search for answers...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                fontSize: "1.125rem",
                border: "2px solid #e5e7eb",
                borderRadius: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.25rem",
                height: "1.25rem",
                color: "#9ca3af",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Support Categories */}
        <div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {t("helpCenter.categoriesTitle", "Browse by Category")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {supportCategories.map((category, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {category.description}
                </p>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#22c55e",
                    fontWeight: "600",
                  }}
                >
                  {category.articles} {t("helpCenter.articles", "articles")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {t("helpCenter.faqTitle", "Frequently Asked Questions")}
          </h2>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  background: "white",
                  marginBottom: "1rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    textAlign: "left",
                    background: "white",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#171717",
                  }}
                >
                  {faq.question}
                  <svg
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      transform: expandedFaq === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      color: "#22c55e",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedFaq === faq.id && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem",
                      color: "#6b7280",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      borderTop: "1px solid #f3f4f6",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            borderRadius: "1.5rem",
            padding: "3rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            {t("helpCenter.contactTitle", "Still need help?")}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: "2rem",
              opacity: 0.9,
            }}
          >
            {t("helpCenter.contactSubtitle", "Our support team is here to help you 24/7")}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                background: "white",
                color: "#22c55e",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <svg
                style={{ width: "1rem", height: "1rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t("helpCenter.contactUs", "Contact Us")}
            </Link>
            <button
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "2px solid white",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#22c55e";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.color = "white";
              }}
            >
              <svg
                style={{ width: "1rem", height: "1rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {t("helpCenter.liveChat", "Live Chat")}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("helpCenter.backToHome", "Back to Home")}
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default HelpCenterPage;
