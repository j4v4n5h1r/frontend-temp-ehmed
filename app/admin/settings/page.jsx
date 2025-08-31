"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminSettings = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchSettings();
    // }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;

      // Mock data for demonstration
      const mockSettings = {
        general: {
          siteName: "Pobi Power Bank",
          supportEmail: "support@pobi.com",
          maxRentalDuration: 168, // hours
          defaultCurrency: "USD",
          timeZone: "UTC",
        },
        pricing: {
          hourlyRate: 2.00,
          dailyRate: 8.00,
          weeklyRate: 25.00,
          lateFeePerHour: 1.00,
          depositAmount: 50.00,
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          lowBatteryAlert: 20,
          maintenanceAlerts: true,
        },
        security: {
          maxLoginAttempts: 5,
          sessionTimeout: 30, // minutes
          requireTwoFactor: false,
          passwordMinLength: 8,
          encryptionEnabled: true,
        },
        maintenance: {
          maintenanceMode: false,
          maintenanceMessage: "System is under maintenance. Please check back later.",
          autoBackupEnabled: true,
          backupFrequency: "daily",
          logRetentionDays: 30,
        }
      };

      setTimeout(() => {
        setSettings(mockSettings);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      const token = user?.token;
      
      // Mock API call
      setTimeout(() => {
        setIsSaving(false);
        alert(t("admin.settingsSaved"));
      }, 1000);

    } catch (error) {
      console.error("Failed to save settings:", error);
      setIsSaving(false);
      alert(t("admin.settingsSaveFailed"));
    }
  };

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "2rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#6b7280" }}>
          {t("admin.loadingSettings")}
        </div>
      </div>
    );
  }

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
          maxWidth: "1200px",
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
              {t("admin.settings")}
            </h1>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            style={{
              background: isSaving ? "#9ca3af" : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: "600",
              cursor: isSaving ? "not-allowed" : "pointer",
              boxShadow: "0 4px 6px -1px rgba(34, 197, 94, 0.3)",
            }}
          >
            {isSaving ? t("admin.saving") : t("admin.saveSettings")}
          </button>
        </div>

        {/* Settings Sections */}
        <div style={{ display: "grid", gap: "2rem" }}>
          
          {/* General Settings */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ⚙️ {t("admin.generalSettings")}
            </h2>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.siteName")}:
                </label>
                <input
                  type="text"
                  value={settings.general?.siteName || ""}
                  onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.supportEmail")}:
                </label>
                <input
                  type="email"
                  value={settings.general?.supportEmail || ""}
                  onChange={(e) => handleSettingChange("general", "supportEmail", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.maxRentalDuration")} ({t("admin.hours")}):
                </label>
                <input
                  type="number"
                  value={settings.general?.maxRentalDuration || ""}
                  onChange={(e) => handleSettingChange("general", "maxRentalDuration", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.defaultCurrency")}:
                </label>
                <select
                  value={settings.general?.defaultCurrency || "USD"}
                  onChange={(e) => handleSettingChange("general", "defaultCurrency", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    background: "white",
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="TRY">TRY (₺)</option>
                  <option value="AZN">AZN (₼)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Settings */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💰 {t("admin.pricingSettings")}
            </h2>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.hourlyRate")} ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.pricing?.hourlyRate || ""}
                  onChange={(e) => handleSettingChange("pricing", "hourlyRate", parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.dailyRate")} ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.pricing?.dailyRate || ""}
                  onChange={(e) => handleSettingChange("pricing", "dailyRate", parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.weeklyRate")} ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.pricing?.weeklyRate || ""}
                  onChange={(e) => handleSettingChange("pricing", "weeklyRate", parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.depositAmount")} ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.pricing?.depositAmount || ""}
                  onChange={(e) => handleSettingChange("pricing", "depositAmount", parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🔔 {t("admin.notificationSettings")}
            </h2>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {Object.entries({
                emailNotifications: t("admin.emailNotifications"),
                smsNotifications: t("admin.smsNotifications"), 
                pushNotifications: t("admin.pushNotifications"),
                maintenanceAlerts: t("admin.maintenanceAlerts")
              }).map(([key, label]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications?.[key] || false}
                    onChange={(e) => handleSettingChange("notifications", key, e.target.checked)}
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </label>
                </div>
              ))}
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.lowBatteryAlert")} (%):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={settings.notifications?.lowBatteryAlert || ""}
                  onChange={(e) => handleSettingChange("notifications", "lowBatteryAlert", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🔒 {t("admin.securitySettings")}
            </h2>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.maxLoginAttempts")}:
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.security?.maxLoginAttempts || ""}
                  onChange={(e) => handleSettingChange("security", "maxLoginAttempts", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.sessionTimeout")} ({t("admin.minutes")}):
                </label>
                <input
                  type="number"
                  min="5"
                  value={settings.security?.sessionTimeout || ""}
                  onChange={(e) => handleSettingChange("security", "sessionTimeout", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("admin.passwordMinLength")}:
                </label>
                <input
                  type="number"
                  min="6"
                  value={settings.security?.passwordMinLength || ""}
                  onChange={(e) => handleSettingChange("security", "passwordMinLength", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="checkbox"
                  checked={settings.security?.requireTwoFactor || false}
                  onChange={(e) => handleSettingChange("security", "requireTwoFactor", e.target.checked)}
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    cursor: "pointer",
                  }}
                />
                <label
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    cursor: "pointer",
                  }}
                >
                  {t("admin.requireTwoFactor")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
