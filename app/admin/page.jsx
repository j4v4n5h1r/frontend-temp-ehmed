"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, new: 0 },
    stations: { total: 0, online: 0, offline: 0 },
    rentals: { active: 0, completed: 0, failed: 0 },
    revenue: { today: 0, month: 0, total: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.profile?.data?.user?.role === "admin") {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const token = user?.token;
      const headers = { Authorization: `Bearer ${token}` };

      // Mock data for now - these would be real API calls
      setStats({
        users: { total: 1247, active: 891, new: 23 },
        stations: { total: 45, online: 42, offline: 3 },
        rentals: { active: 156, completed: 8934, failed: 89 },
        revenue: { today: 1240.5, month: 28430.75, total: 156780.25 },
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid #e5e7eb",
              borderTop: "4px solid #22c55e",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p style={{ color: "#6b7280" }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.profile?.data?.user?.role !== "admin") {
    return null;
  }

  const adminSections = [
    {
      title: "Users Management",
      description: "Manage user accounts, roles, and permissions",
      href: "/admin/users",
      icon: "👥",
      stats: `${stats.users.total} total, ${stats.users.new} new this week`,
      color: "#3b82f6",
    },
    {
      title: "Stations Management",
      description: "Monitor and control charging stations",
      href: "/admin/stations",
      icon: "🔌",
      stats: `${stats.stations.online}/${stats.stations.total} online`,
      color: "#10b981",
    },
    {
      title: "Power Banks",
      description: "Track power bank inventory and status",
      href: "/admin/powerbanks",
      icon: "🔋",
      stats: "Track all power banks",
      color: "#f59e0b",
    },
    {
      title: "Rentals Management",
      description: "Monitor all rental activities",
      href: "/admin/rentals",
      icon: "📱",
      stats: `${stats.rentals.active} active, ${stats.rentals.completed} completed`,
      color: "#8b5cf6",
    },
    {
      title: "Payments & Billing",
      description: "Handle payments, refunds, and billing",
      href: "/admin/payments",
      icon: "💳",
      stats: `$${stats.revenue.month.toLocaleString()} this month`,
      color: "#ef4444",
    },
    {
      title: "Reports & Analytics",
      description: "View detailed reports and analytics",
      href: "/admin/reports",
      icon: "📊",
      stats: "Revenue, utilization, and more",
      color: "#06b6d4",
    },
    {
      title: "Pricing Management",
      description: "Configure pricing tiers and rates",
      href: "/admin/pricing",
      icon: "💰",
      stats: "Manage pricing strategies",
      color: "#84cc16",
    },
    {
      title: "System Settings",
      description: "Configure system-wide settings",
      href: "/admin/settings",
      icon: "⚙️",
      stats: "System configuration",
      color: "#6b7280",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Admin Dashboard
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1.125rem",
              }}
            >
              Welcome back,{" "}
              {user.profile?.data?.user?.name ||
                user.profile?.data?.user?.email}
            </p>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Total Revenue
                  </p>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    ${stats.revenue.total.toLocaleString()}
                  </p>
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  💰
                </div>
              </div>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Active Users
                  </p>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    {stats.users.active.toLocaleString()}
                  </p>
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  👥
                </div>
              </div>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Online Stations
                  </p>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    {stats.stations.online}/{stats.stations.total}
                  </p>
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🔌
                </div>
              </div>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Active Rentals
                  </p>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    {stats.rentals.active.toLocaleString()}
                  </p>
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  📱
                </div>
              </div>
            </div>
          </div>

          {/* Admin Sections Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {adminSections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`,
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        marginRight: "1rem",
                      }}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#1f2937",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {section.title}
                      </h3>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        {section.stats}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
