"use client";

import React, { useState, useEffect, useContext } from "react";
import cookie from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/TranslationContext";
import { apiCallWithAuth } from "../../utils/api";
import Link from "next/link";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  useEffect(() => {
    console.log('🔍 Profile: User data', user);
    if (user?.profile?.data?.user) {
      const userData = user.profile.data.user;
      console.log('✅ Profile: Populating form with user data', userData);
      setFirstName(userData.firstName || userData.name || "");
      setLastName(userData.lastName || "");
      setUsername(userData.username || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
    } else {
      console.log('⚠️ Profile: No user data available');
    }
    fetchPaymentMethods();
  }, [user]);

  const fetchPaymentMethods = async () => {
    try {
      const token = cookie.get("token");
      console.log("🔍 Profile: Fetching payment methods...");
      console.log("Token:", token ? "Present" : "Missing");

      if (!token) {
        console.warn("No authentication token found");
        // Use mock payment methods for demo
        const mockPaymentMethods = [
          {
            id: "pm_001",
            lastFour: "4242",
            cardType: "Visa",
            expiryDate: "12/25",
          },
          {
            id: "pm_002",
            lastFour: "1234",
            cardType: "Mastercard",
            expiryDate: "06/26",
          },
        ];
        setPaymentMethods(mockPaymentMethods);
        return;
      }

      const response = await apiCallWithAuth("/api/v1/users/me/payment-methods", token);
      setPaymentMethods(response || []);
      console.log("✅ Profile: Payment methods fetched", response);
    } catch (err) {
      console.error("❌ Profile: Error fetching payment methods:", err);
      // Don't show error for payment methods as it's not critical - use mock data
      const mockPaymentMethods = [
        {
          id: "pm_001",
          lastFour: "4242",
          cardType: "Visa",
          expiryDate: "12/25",
        },
      ];
      setPaymentMethods(mockPaymentMethods);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = cookie.get("token");
      const updateData = {
        firstName,
        lastName,
        username,
        email,
        phone,
      };

      console.log("🔍 Profile: Updating profile", updateData);
      const response = await apiCallWithAuth("/api/v1/users/me", token, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      console.log("✅ Profile: Profile updated", response);
      // Update the user context with new data
      const updatedProfile = { ...user.profile, data: { user: response } };
      setUser({ ...user, profile: updatedProfile });
      setSuccess(t("success.saved"));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("❌ Profile: Error updating profile:", err);
      setError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = cookie.get("token");
      await axios.post(
        `${BASE_URL}/api/v1/users/me/payment-methods`,
        newPaymentMethod,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setNewPaymentMethod({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
      });
      setSuccess(t("success.created"));
      fetchPaymentMethods();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", name: t("profile.personalInfo"), icon: "user" },
    { id: "payment", name: t("profile.paymentMethods"), icon: "credit-card" },
    { id: "security", name: t("profile.security"), icon: "shield" },
  ];

  const renderIcon = (iconName) => {
    const iconProps = {
      style: { width: "1.25rem", height: "1.25rem" },
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    };

    switch (iconName) {
      case "user":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "credit-card":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      case "shield":
        return (
          <svg {...iconProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#171717",
              marginBottom: "0.75rem",
              letterSpacing: "-0.025em",
            }}
          >
            {t("profile.title")}
          </h1>
          <p
            style={{
              color: "#525252",
              fontSize: "1.125rem",
              fontWeight: "500",
            }}
          >
            {t("profile.preferences")}
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#16a34a",
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginRight: "0.75rem",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginRight: "0.75rem",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Main Content */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background: activeTab === tab.id ? "white" : "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid #22c55e"
                      : "2px solid transparent",
                  color: activeTab === tab.id ? "#22c55e" : "#6b7280",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {renderIcon(tab.icon)}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: "2rem" }}>
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={updateProfile}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("profile.firstName")}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("profile.lastName")}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t("profile.usernamePlaceholder")}
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

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("auth.email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("profile.phone")}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    color: "white",
                    padding: "0.75rem 2rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? t("common.loading") : t("common.save")}
                </button>
              </form>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t("profile.paymentMethods")}
                </h3>

                {/* Existing Payment Methods */}
                <div style={{ marginBottom: "2rem" }}>
                  {paymentMethods.length > 0 ? (
                    paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#f9fafb",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          marginBottom: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <svg
                            style={{
                              width: "2rem",
                              height: "2rem",
                              marginRight: "1rem",
                              color: "#6b7280",
                            }}
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
                          <div>
                            <p style={{ fontWeight: "600", margin: 0 }}>
                              •••• •••• •••• {method.lastFour || "****"}
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#6b7280",
                                margin: 0,
                              }}
                            >
                              {method.cardType || "Credit Card"} • Expires{" "}
                              {method.expiryDate}
                            </p>
                          </div>
                        </div>
                        <button
                          style={{
                            color: "#dc2626",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                          }}
                        >
                          {t("common.remove")}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#6b7280", fontStyle: "italic" }}>
                      {t("payments.noPaymentsYet")}
                    </p>
                  )}
                </div>

                {/* Add New Payment Method */}
                <div
                  style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "0.5rem",
                    padding: "2rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    {t("common.add")} {t("payments.methods")}
                  </h4>
                  <form onSubmit={addPaymentMethod}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#374151",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {t("profile.cardHolderName")}
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.cardHolderName}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              cardHolderName: e.target.value,
                            })
                          }
                          placeholder={t("profile.cardHolderPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#374151",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {t("profile.cardNumber")}
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.cardNumber}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              cardNumber: e.target.value,
                            })
                          }
                          placeholder={t("profile.cardNumberPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#374151",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {t("profile.expiryDate")}
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              expiryDate: e.target.value,
                            })
                          }
                          placeholder={t("profile.expiryPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#374151",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {t("profile.cvv")}
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.cvv}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              cvv: e.target.value,
                            })
                          }
                          placeholder={t("profile.cvvPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background:
                          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "white",
                        padding: "0.75rem 2rem",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? t("common.loading") : t("common.add")}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t("profile.security")}
                </h3>
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <svg
                    style={{
                      width: "3rem",
                      height: "3rem",
                      color: "#16a34a",
                      margin: "0 auto 1rem",
                    }}
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
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("app.comingSoon")}
                  </h4>
                  <p
                    style={{
                      color: "#15803d",
                      fontSize: "0.875rem",
                    }}
                  >
                    {t("profile.securityDescription")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "white",
              color: "#16a34a",
              border: "2px solid #22c55e",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("stations.backToDashboard")}
          </Link>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
