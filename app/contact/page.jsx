"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: t("contact.email", "Email Support"),
      description: t("contact.emailDesc", "Get help via email"),
      contact: "support@mypobi.com",
      response: t("contact.emailResponse", "Response within 24 hours"),
    },
    {
      icon: "💬",
      title: t("contact.liveChat", "Live Chat"),
      description: t("contact.liveChatDesc", "Chat with our team"),
      contact: t("contact.liveChatAvailable", "Available 24/7"),
      response: t("contact.liveChatResponse", "Instant response"),
    },
    {
      icon: "📞",
      title: t("contact.phone", "Phone Support"),
      description: t("contact.phoneDesc", "Call us directly"),
      contact: "+90 (212) 555-0123",
      response: t("contact.phoneResponse", "Mon-Fri 9AM-6PM"),
    },
    {
      icon: "📍",
      title: t("contact.office", "Visit Our Office"),
      description: t("contact.officeDesc", "Meet us in person"),
      contact: t("contact.officeAddress", "Istanbul, Turkey"),
      response: t("contact.officeHours", "By appointment only"),
    },
  ];

  const officeLocations = [
    {
      city: t("contact.offices.istanbul", "Istanbul"),
      address: "Maslak Mahallesi, Büyükdere Caddesi No:123, 34485 Şişli/İstanbul",
      phone: "+90 (212) 555-0123",
      email: "istanbul@mypobi.com",
    },
    {
      city: t("contact.offices.ankara", "Ankara"),
      address: "Çankaya Mahallesi, Atatürk Bulvarı No:456, 06420 Çankaya/Ankara",
      phone: "+90 (312) 555-0456",
      email: "ankara@mypobi.com",
    },
    {
      city: t("contact.offices.izmir", "İzmir"),
      address: "Alsancak Mahallesi, Kordon Caddesi No:789, 35220 Konak/İzmir",
      phone: "+90 (232) 555-0789",
      email: "izmir@mypobi.com",
    },
  ];

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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
            {t("contact.title", "Contact Us")}
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
            {t("contact.subtitle", "We're here to help. Reach out to us anytime.")}
          </p>
        </div>

        {/* Contact Methods */}
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
            {t("contact.methodsTitle", "Get in Touch")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {contactMethods.map((method, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                  textAlign: "center",
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
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  {method.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "0.5rem",
                  }}
                >
                  {method.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                  }}
                >
                  {method.description}
                </p>
                <div
                  style={{
                    color: "#22c55e",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  {method.contact}
                </div>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                  }}
                >
                  {method.response}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and Office Locations */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Contact Form */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1.5rem",
              }}
            >
              {t("contact.formTitle", "Send us a Message")}
            </h3>

            {submitStatus === "success" && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#16a34a",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                {t("contact.successMessage", "Thank you! Your message has been sent successfully.")}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("contact.form.name", "Full Name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("contact.form.email", "Email Address")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("contact.form.category", "Category")}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    background: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="general">{t("contact.form.categories.general", "General Inquiry")}</option>
                  <option value="support">{t("contact.form.categories.support", "Technical Support")}</option>
                  <option value="billing">{t("contact.form.categories.billing", "Billing Question")}</option>
                  <option value="partnership">{t("contact.form.categories.partnership", "Partnership")}</option>
                  <option value="feedback">{t("contact.form.categories.feedback", "Feedback")}</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("contact.form.subject", "Subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("contact.form.message", "Message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    resize: "vertical",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  background: isSubmitting 
                    ? "#9ca3af" 
                    : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "white",
                  padding: "0.875rem",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      style={{
                        width: "1rem",
                        height: "1rem",
                        border: "2px solid white",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    {t("contact.form.sending", "Sending...")}
                  </>
                ) : (
                  <>
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    {t("contact.form.send", "Send Message")}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1.5rem",
              }}
            >
              {t("contact.officesTitle", "Our Offices")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                    boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#171717",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {office.city}
                  </h4>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {office.address}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <div style={{ color: "#22c55e", fontWeight: "500" }}>
                      📞 {office.phone}
                    </div>
                    <div style={{ color: "#22c55e", fontWeight: "500" }}>
                      ✉️ {office.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "3rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "0.5rem",
              padding: "3rem",
              color: "#6b7280",
            }}
          >
            <svg
              style={{
                width: "4rem",
                height: "4rem",
                margin: "0 auto 1rem",
                display: "block",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              {t("contact.mapTitle", "Find Us on Map")}
            </h3>
            <p style={{ fontSize: "0.875rem" }}>
              {t("contact.mapDescription", "Interactive map showing all our office locations")}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: "center" }}>
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
            {t("contact.backToHome", "Back to Home")}
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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
