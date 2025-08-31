"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../utils/auth";
import { useTranslation } from "../../../utils/translations";
import { useRouter } from "next/navigation";

const AdminRentals = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchRentals();
    // }
  }, [user, currentPage, searchQuery, statusFilter]);

  const fetchRentals = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      // Mock data for demonstration
      const mockRentals = [
        {
          id: "REN001",
          userId: "USR123",
          userName: "John Doe",
          userEmail: "john@example.com",
          powerbankId: "PB001",
          stationId: "ST001",
          stationName: "Downtown Mall",
          status: "active",
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          endTime: null,
          duration: "2h 15m",
          cost: 5.50,
          batteryLevel: 85
        },
        {
          id: "REN002",
          userId: "USR124",
          userName: "Jane Smith",
          userEmail: "jane@example.com",
          powerbankId: "PB002",
          stationId: "ST002",
          stationName: "Airport Terminal",
          status: "completed",
          startTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          duration: "4h 12m",
          cost: 12.75,
          batteryLevel: 92
        },
        {
          id: "REN003",
          userId: "USR125",
          userName: "Mike Johnson",
          userEmail: "mike@example.com",
          powerbankId: "PB003",
          stationId: "ST001",
          stationName: "Downtown Mall",
          status: "failed",
          startTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          duration: "0h 45m",
          cost: 0,
          batteryLevel: 15
        }
      ];

      setTimeout(() => {
        setRentals(mockRentals);
        setTotalPages(3);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Failed to fetch rentals:", error);
      setIsLoading(false);
    }
  };

  const handleEndRental = async (rentalId) => {
    if (!confirm(t("admin.endRentalConfirm"))) return;

    try {
      const token = user?.token;
      // Mock API call
      setTimeout(() => {
        setRentals(prev => prev.map(rental => 
          rental.id === rentalId 
            ? { ...rental, status: "completed", endTime: new Date().toISOString() }
            : rental
        ));
        alert(t("admin.rentalEndedSuccess"));
      }, 1000);
    } catch (error) {
      console.error("Failed to end rental:", error);
      alert(t("admin.rentalEndFailed"));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return { bg: "#f0fdf4", text: "#166534", border: "#22c55e" };
      case "completed":
        return { bg: "#f0f9ff", text: "#1e40af", border: "#3b82f6" };
      case "failed":
        return { bg: "#fef2f2", text: "#991b1b", border: "#ef4444" };
      default:
        return { bg: "#f3f4f6", text: "#374151", border: "#6b7280" };
    }
  };

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || rental.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              {t("admin.rentals")}
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: t("admin.totalRentals"), count: rentals.length, color: "#3b82f6" },
            {
              label: t("rentals.active"),
              count: rentals.filter((r) => r.status === "active").length,
              color: "#22c55e",
            },
            {
              label: t("rentals.completed"),
              count: rentals.filter((r) => r.status === "completed").length,
              color: "#06b6d4",
            },
            {
              label: t("admin.failed"),
              count: rentals.filter((r) => r.status === "failed").length,
              color: "#ef4444",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: stat.color,
                  marginBottom: "0.25rem",
                }}
              >
                {stat.count}
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder={t("admin.searchRentals")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: "300px",
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              background: "white",
            }}
          >
            <option value="all">{t("admin.allStatus")}</option>
            <option value="active">{t("rentals.active")}</option>
            <option value="completed">{t("rentals.completed")}</option>
            <option value="failed">{t("admin.failed")}</option>
          </select>
        </div>

        {/* Rentals Table */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              {t("admin.loadingRentals")}
            </div>
          ) : (
            <>
              <div
                style={{
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
                  <thead
                    style={{
                      background: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("rentals.rentalID")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("admin.user")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("rentals.station")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("rentals.status")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("admin.duration")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "right",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("admin.cost")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "right",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("admin.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRentals.map((rental, index) => {
                      const statusColors = getStatusColor(rental.status);
                      return (
                        <tr
                          key={rental.id}
                          style={{
                            borderBottom:
                              index < filteredRentals.length - 1
                                ? "1px solid #f3f4f6"
                                : "none",
                          }}
                        >
                          <td style={{ padding: "1rem", fontWeight: "600", color: "#1f2937" }}>
                            {rental.id}
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div>
                              <div style={{ fontWeight: "600", color: "#1f2937" }}>
                                {rental.userName}
                              </div>
                              <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                                {rental.userEmail}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div>
                              <div style={{ fontWeight: "500", color: "#1f2937" }}>
                                {rental.stationName}
                              </div>
                              <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                                {rental.stationId}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <span
                              style={{
                                padding: "0.25rem 0.75rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                background: statusColors.bg,
                                color: statusColors.text,
                                border: `1px solid ${statusColors.border}`,
                              }}
                            >
                              {t(`rentals.${rental.status}`)}
                            </span>
                          </td>
                          <td style={{ padding: "1rem", color: "#6b7280" }}>
                            {rental.duration}
                          </td>
                          <td style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>
                            ${rental.cost.toFixed(2)}
                          </td>
                          <td style={{ padding: "1rem", textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                              <button
                                style={{
                                  padding: "0.375rem 0.75rem",
                                  background: "#3b82f6",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "0.375rem",
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                }}
                              >
                                {t("admin.view")}
                              </button>
                              {rental.status === "active" && (
                                <button
                                  onClick={() => handleEndRental(rental.id)}
                                  style={{
                                    padding: "0.375rem 0.75rem",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  {t("admin.endRental")}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    padding: "1rem",
                    borderTop: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    {t("admin.page")} {currentPage} {t("admin.of")} {totalPages}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: "0.5rem 1rem",
                        background: currentPage === 1 ? "#f3f4f6" : "#22c55e",
                        color: currentPage === 1 ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      {t("admin.previous")}
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "0.5rem 1rem",
                        background: currentPage === totalPages ? "#f3f4f6" : "#22c55e",
                        color: currentPage === totalPages ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      }}
                    >
                      {t("admin.next")}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRentals;
