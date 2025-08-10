"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const PrivacyPage = () => {
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
            {t("privacy.title", "Privacy Policy")}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            {t("privacy.lastUpdated", "Last updated: March 15, 2024")}
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
              {t("privacy.introduction.title", "1. Introduction")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.introduction.content", "At Pobi, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our power bank sharing service.")}
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
              {t("privacy.collection.title", "2. Information We Collect")}
            </h2>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
              }}
            >
              {t("privacy.collection.personal.title", "Personal Information")}
            </h3>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.personal.item1", "Name and contact information (email, phone number)")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.personal.item2", "Payment information (credit/debit card details)")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.personal.item3", "Account credentials and preferences")}
              </li>
            </ul>

            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
              }}
            >
              {t("privacy.collection.usage.title", "Usage Information")}
            </h3>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.usage.item1", "Rental history and transaction details")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.usage.item2", "Location data when using our stations")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.collection.usage.item3", "Device information and app usage patterns")}
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
              {t("privacy.usage.title", "3. How We Use Your Information")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.usage.intro", "We use the collected information for the following purposes:")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item1", "Provide and maintain our power bank sharing service")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item2", "Process payments and manage your account")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item3", "Send service-related notifications and updates")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item4", "Improve our services and develop new features")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item5", "Ensure security and prevent fraud")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.usage.item6", "Comply with legal obligations")}
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
              {t("privacy.sharing.title", "4. Information Sharing")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.sharing.content", "We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.sharing.item1", "With your explicit consent")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.sharing.item2", "To trusted service providers who assist in operating our service")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.sharing.item3", "When required by law or to protect our rights")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.sharing.item4", "In connection with a business transfer or merger")}
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
              {t("privacy.security.title", "5. Data Security")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.security.content", "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.security.item1", "Encryption of sensitive data in transit and at rest")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.security.item2", "Regular security audits and monitoring")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.security.item3", "Access controls and authentication protocols")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.security.item4", "Employee training on data protection practices")}
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
              {t("privacy.rights.title", "6. Your Rights")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.rights.intro", "You have the following rights regarding your personal information:")}
            </p>
            <ul style={{ color: "#4b5563", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.rights.item1", "Access and review your personal information")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.rights.item2", "Correct inaccurate or incomplete information")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.rights.item3", "Request deletion of your personal information")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.rights.item4", "Object to or restrict processing of your information")}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                {t("privacy.rights.item5", "Data portability and withdrawal of consent")}
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
              {t("privacy.retention.title", "7. Data Retention")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.retention.content", "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.")}
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
              {t("privacy.cookies.title", "8. Cookies and Tracking")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.cookies.content", "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.")}
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
              {t("privacy.changes.title", "9. Policy Changes")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.changes.content", "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the 'last updated' date. Your continued use of our service after such changes constitutes acceptance of the updated policy.")}
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
              {t("privacy.contact.title", "10. Contact Us")}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {t("privacy.contact.content", "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:")}
            </p>
            <div style={{ color: "#4b5563", paddingLeft: "1rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("privacy.contact.dpo", "Data Protection Officer:")} </strong>
                <a href="mailto:privacy@mypobi.com" style={{ color: "#22c55e" }}>
                  privacy@mypobi.com
                </a>
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("privacy.contact.phone", "Phone:")} </strong>
                +90 (212) 555-0123
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>{t("privacy.contact.address", "Address:")} </strong>
                {t("privacy.contact.addressValue", "Maslak Mahallesi, Büyükdere Caddesi No:123, 34485 Şişli/İstanbul")}
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              marginTop: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1e40af",
                marginBottom: "0.75rem",
              }}
            >
              {t("privacy.commitment.title", "Our Commitment to Privacy")}
            </h3>
            <p style={{ color: "#1e40af", fontSize: "0.875rem", margin: 0 }}>
              {t("privacy.commitment.content", "Your privacy is important to us. We are committed to being transparent about our data practices and giving you control over your personal information. If you have any questions or concerns, please don't hesitate to reach out to our privacy team.")}
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
            {t("privacy.backToHome", "Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
