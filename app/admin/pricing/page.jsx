"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../utils/auth";
import { useTranslation } from "../../../utils/translations";
import { useRouter } from "next/navigation";

const AdminPricing = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [pricingPlans, setPricingPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchPricingPlans();
    // }
  }, [user]);

  const fetchPricingPlans = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;

      // Mock data for demonstration
      const mockPlans = [
        {
          id: "hourly",
          name: t("admin.hourlyPlan"),
          type: "hourly",
          basePrice: 2.00,
          currency: "USD",
          features: [t("admin.payPerHour"), t("admin.noCommitment"), t("admin.greatForShortTrips")],
          isActive: true,
          description: t("admin.hourlyPlanDesc")
        },
        {
          id: "daily",
          name: t("admin.dailyPlan"),
          type: "daily",
          basePrice: 8.00,
          currency: "USD",
          features: [t("admin.dayAccess"), t("admin.bestValueDayTrips"), t("admin.allDayCharging")],
          isActive: true,
          description: t("admin.dailyPlanDesc")
        },
        {
          id: "weekly",
          name: t("admin.weeklyPlan"),
          type: "weekly",
          basePrice: 25.00,
          currency: "USD",
          features: [t("admin.weekUnlimited"), t("admin.maximumSavings"), t("admin.businessTravelers")],
          isActive: true,
          description: t("admin.weeklyPlanDesc")
        },
        {
          id: "monthly",
          name: t("admin.monthlyPlan"),
          type: "monthly",
          basePrice: 80.00,
          currency: "USD",
          features: [t("admin.monthUnlimited"), t("admin.corporateRates"), t("admin.premiumSupport")],
          isActive: false,
          description: t("admin.monthlyPlanDesc")
        }
      ];

      setTimeout(() => {
        setPricingPlans(mockPlans);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Failed to fetch pricing plans:", error);
      setIsLoading(false);
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;

    try {
      const token = user?.token;
      // Mock API call
      setTimeout(() => {
        setPricingPlans(prev => prev.map(plan => 
          plan.id === editingPlan.id 
            ? editingPlan 
            : plan
        ));
        setEditingPlan(null);
        alert(t("admin.pricingUpdateSuccess"));
      }, 1000);
    } catch (error) {
      console.error("Failed to update pricing plan:", error);
      alert(t("admin.pricingUpdateFailed"));
    }
  };

  const handleToggleActive = async (planId) => {
    try {
      const token = user?.token;
      // Mock API call
      setTimeout(() => {
        setPricingPlans(prev => prev.map(plan => 
          plan.id === planId 
            ? { ...plan, isActive: !plan.isActive }
            : plan
        ));
        alert(t("admin.pricingStatusUpdated"));
      }, 1000);
    } catch (error) {
      console.error("Failed to toggle plan status:", error);
      alert(t("admin.pricingStatusFailed"));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <Link
              href="/admin"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
                display: "inline-block",
              }}
            >
              ← {t("admin.backToAdmin")}
            </Link>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#1f2937",
                margin: 0,
              }}
            >
              {t("admin.pricing")}
            </h1>
          </div>
        </div>

        {/* Pricing Plans Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {isLoading ? (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "3rem",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              {t("admin.loadingPricing")}
            </div>
          ) : (
            pricingPlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: plan.isActive ? "2px solid #22c55e" : "2px solid #e5e7eb",
                  position: "relative",
                }}
              >
                {/* Active Badge */}
                {plan.isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "#22c55e",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {t("admin.active")}
                  </div>
                )}

                {/* Plan Header */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {plan.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        color: "#1f2937",
                      }}
                    >
                      ${plan.basePrice.toFixed(2)}
                    </span>
                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: "1rem",
                      }}
                    >
                      /{plan.type}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: "2rem" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {t("admin.features")}:
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                          color: "#4b5563",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span style={{ color: "#22c55e" }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => handleEditPlan(plan)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => handleToggleActive(plan.id)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      background: plan.isActive ? "#ef4444" : "#22c55e",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {plan.isActive ? t("admin.deactivate") : t("admin.activate")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {editingPlan && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "2rem",
                maxWidth: "500px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "1.5rem",
                }}
              >
                {t("admin.editPlan")}: {editingPlan.name}
              </h3>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.planName")}:
                </label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) =>
                    setEditingPlan((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.basePrice")} ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingPlan.basePrice}
                  onChange={(e) =>
                    setEditingPlan((prev) => ({
                      ...prev,
                      basePrice: parseFloat(e.target.value) || 0,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.description")}:
                </label>
                <textarea
                  value={editingPlan.description}
                  onChange={(e) =>
                    setEditingPlan((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setEditingPlan(null)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleSavePlan}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPricing;
