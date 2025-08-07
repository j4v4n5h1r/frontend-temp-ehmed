"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminReports = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [revenueData, setRevenueData] = useState(null);
  const [utilizationData, setUtilizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  // Redirect if not admin
  // useEffect(() => {
  //   if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
  //     router.push("/");
  //   }
  // }, [user, loading, router]);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchReports();
    // }
  }, [user, dateRange]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;
      const params = new URLSearchParams({
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
      });

      // Mock data for demonstration
      const mockRevenueData = {
        summary: {
          totalRevenue: 15672.50,
          totalRentals: 1247,
          avgDailyRevenue: 522.42
        },
        dailyData: [
          { date: "2024-01-01", totalRevenue: 542.75, totalRentals: 45, avgRevenuePerRental: 12.06 },
          { date: "2024-01-02", totalRevenue: 628.50, totalRentals: 52, avgRevenuePerRental: 12.09 },
          { date: "2024-01-03", totalRevenue: 445.25, totalRentals: 38, avgRevenuePerRental: 11.72 },
          { date: "2024-01-04", totalRevenue: 789.00, totalRentals: 65, avgRevenuePerRental: 12.14 },
          { date: "2024-01-05", totalRevenue: 656.75, totalRentals: 54, avgRevenuePerRental: 12.16 }
        ]
      };

      const mockUtilizationData = {
        summary: {
          avgUtilization: 68.5,
          maxPeakUtilization: 94.2,
          avgRentalDuration: 145
        },
        dailyData: [
          { date: "2024-01-01", averageUtilization: 65.2, peakUtilization: 89.5, peakHour: "18:00", stationData: [{ rentalsCount: 45 }] },
          { date: "2024-01-02", averageUtilization: 72.1, peakUtilization: 94.2, peakHour: "19:30", stationData: [{ rentalsCount: 52 }] },
          { date: "2024-01-03", averageUtilization: 58.9, peakUtilization: 78.3, peakHour: "17:15", stationData: [{ rentalsCount: 38 }] },
          { date: "2024-01-04", averageUtilization: 75.8, peakUtilization: 91.7, peakHour: "20:00", stationData: [{ rentalsCount: 65 }] },
          { date: "2024-01-05", averageUtilization: 70.4, peakUtilization: 88.9, peakHour: "18:45", stationData: [{ rentalsCount: 54 }] }
        ]
      };

      setTimeout(() => {
        setRevenueData(mockRevenueData);
        setUtilizationData(mockUtilizationData);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (loading || !user || user.profile?.data?.user?.role !== "admin") {
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         background: "#f8fafc",
  //       }}
  //     >
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }

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
              {t("admin.reports")}
            </h1>
          </div>
        </div>

        {/* Date Range Selector */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              {t("admin.from")}:
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              {t("admin.to")}:
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              style={{
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
          </div>
          <button
            onClick={fetchReports}
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {t("admin.updateReports")}
          </button>
        </div>

        {/* {isLoading ? (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            Loading reports...
          </div>
        ) : (
          <> */}
            {/* Revenue Report */}
            {revenueData && (
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  marginBottom: "2rem",
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
                  💰 {t("admin.revenueReport")}
                </h2>

                {/* Revenue Summary */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      ${revenueData.summary.totalRevenue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      {t("admin.totalRevenue")}
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {revenueData.summary.totalRentals.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      {t("admin.totalRentals")}
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      ${revenueData.summary.avgDailyRevenue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      {t("admin.avgDailyRevenue")}
                    </div>
                  </div>
                </div>

                {/* Daily Revenue Chart */}
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "1rem",
                    }}
                  >
                    {t("admin.dailyRevenueBreakdown")}
                  </h3>
                  <div
                    style={{
                      background: "#f9fafb",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      overflowX: "auto",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.875rem",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "left",
                              fontWeight: "600",
                            }}
                          >
                            Date
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Revenue
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Rentals
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Avg per Rental
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueData.dailyData.map((day, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom:
                                index < revenueData.dailyData.length - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                          >
                            <td style={{ padding: "0.75rem" }}>
                              {new Date(day.date).toLocaleDateString()}
                            </td>
                            <td
                              style={{
                                padding: "0.75rem",
                                textAlign: "right",
                                fontWeight: "600",
                                color: "#22c55e",
                              }}
                            >
                              ${day.totalRevenue.toFixed(2)}
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "right" }}
                            >
                              {day.totalRentals}
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "right" }}
                            >
                              ${day.avgRevenuePerRental.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Utilization Report */}
            {utilizationData && (
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  marginBottom: "2rem",
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
                  📊 Utilization Report
                </h2>

                {/* Utilization Summary */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {utilizationData.summary.avgUtilization.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      Avg Utilization
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {utilizationData.summary.maxPeakUtilization.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      Peak Utilization
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                      color: "white",
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {utilizationData.summary.avgRentalDuration} min
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                      Avg Rental Duration
                    </div>
                  </div>
                </div>

                {/* Daily Utilization Chart */}
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "1rem",
                    }}
                  >
                    Daily Utilization Breakdown
                  </h3>
                  <div
                    style={{
                      background: "#f9fafb",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      overflowX: "auto",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.875rem",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "left",
                              fontWeight: "600",
                            }}
                          >
                            Date
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Avg Utilization
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Peak
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Peak Hour
                          </th>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            Total Rentals
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {utilizationData.dailyData.map((day, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom:
                                index < utilizationData.dailyData.length - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                          >
                            <td style={{ padding: "0.75rem" }}>
                              {new Date(day.date).toLocaleDateString()}
                            </td>
                            <td
                              style={{
                                padding: "0.75rem",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              <span
                                style={{
                                  color:
                                    day.averageUtilization > 70
                                      ? "#22c55e"
                                      : day.averageUtilization > 40
                                        ? "#f59e0b"
                                        : "#ef4444",
                                }}
                              >
                                {day.averageUtilization.toFixed(1)}%
                              </span>
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "right" }}
                            >
                              {day.peakUtilization.toFixed(1)}%
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "right" }}
                            >
                              {day.peakHour}
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "right" }}
                            >
                              {day.stationData.reduce(
                                (sum, station) => sum + station.rentalsCount,
                                0,
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          {/*</>
        )}*/}
      </div>
    </div>
  );
};

export default AdminReports;
