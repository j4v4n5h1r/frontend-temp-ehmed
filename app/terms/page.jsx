"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#171717",
              marginBottom: "1rem",
            }}
          >
            {t("terms.title", "Terms of Service")}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            {t("terms.lastUpdated", "Last updated: March 15, 2024")}
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "2.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            lineHeight: "1.7",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.acceptance.title", "1. Acceptance of Terms")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.acceptance.content", "By accessing and using Pobi's power bank sharing service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.")}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.service.title", "2. Service Description")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.service.content", "Pobi provides a power bank sharing service that allows users to rent portable charging devices from designated stations and return them to any station within our network.")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.service.item1", "24/7 access to power bank rental stations")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.service.item2", "Mobile app for locating stations and managing rentals")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.service.item3", "Customer support and assistance")}
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.userObligations.title", "3. User Obligations")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.userObligations.intro", "As a user of our service, you agree to:")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.userObligations.item1", "Use the service only for lawful purposes")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.userObligations.item2", "Handle power banks with care and avoid damage")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.userObligations.item3", "Return power banks within the agreed rental period")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.userObligations.item4", "Pay all applicable fees and charges promptly")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("terms.userObligations.item5", "Provide accurate information when creating an account")}
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.payment.title", "4. Payment and Fees")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.payment.content", "Rental fees are charged based on the duration of use. Payment is processed automatically through your registered payment method. Additional charges may apply for late returns or damaged equipment.")}
            </p>
            <div
              style={{
                background: "#fef3c7",
                border: "1px solid #fcd34d",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <p style={{ color: "#92400e", fontSize: "0.875rem", margin: 0 }}>
                {t("terms.payment.note", "Note: All fees are non-refundable except in cases of service malfunction on our part.")}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.liability.title", "5. Limitation of Liability")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.liability.content", "Pobi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.")}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.termination.title", "6. Termination")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.termination.content", "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.")}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.changes.title", "7. Changes to Terms")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.changes.content", "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.")}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              {t("terms.contact.title", "8. Contact Information")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("terms.contact.content", "If you have any questions about these Terms of Service, please contact us:")}
            </p>
            <div style={{ color: "#4b5563", paddingLeft: "1rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("terms.contact.email", "Email:")} </strong>
                <a href="mailto:legal@mypobi.com" style={{ color: "#22c55e" }}>
                  legal@mypobi.com
                </a>
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("terms.contact.phone", "Phone:")} </strong>
                +90 (212) 555-0123
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("terms.contact.address", "Address:")} </strong>
                {t("terms.contact.addressValue", "Maslak Mahallesi, Büyükdere Caddesi No:123, 34485 Şişli/İstanbul")}
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              marginTop: "2rem",
            }}
          >
            <p style={{ color: "#16a34a", fontSize: "0.875rem", margin: 0 }}>
              {t("terms.acknowledgment", "By using our service, you acknowledge that you have read and understood these terms and agree to be bound by them.")}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
            {t("terms.backToHome", "Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
