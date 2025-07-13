"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const AdminPowerBanks = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [powerBanks, setPowerBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [stationFilter, setStationFilter] = useState("all");

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.profile?.data?.user?.role === "admin") {
      fetchPowerBanks();
    }
  }, [user, statusFilter, stationFilter]);

  const fetchPowerBanks = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;
      const queryParams = new URLSearchParams({
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(stationFilter !== "all" && { stationId: stationFilter }),
      });

      const response = await fetch(`/api/v1/admin/powerbanks?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setPowerBanks(data.data.powerBanks);
      }
    } catch (error) {
      console.error("Failed to fetch power banks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !user || user.profile?.data?.user?.role !== "admin") {
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
        <div>Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return { bg: "#f0fdf4", text: "#166534" };
      case "rented":
        return { bg: "#fef3c7", text: "#92400e" };
      case "maintenance":
        return { bg: "#fef2f2", text: "#991b1b" };
      default:
        return { bg: "#f3f4f6", text: "#374151" };
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case "good":
        return "#22c55e";
      case "fair":
        return "#f59e0b";
      case "poor":
        return "#ef4444";
      default:
        return "#6b7280";
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
              ← Back to Admin Dashboard
            </Link>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#1f2937",
                margin: 0,
              }}
            >
              Power Banks Management
            </h1>
          </div>
        </div>

        {/* Summary Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Total", count: powerBanks.length, color: "#3b82f6" },
            {
              label: "Available",
              count: powerBanks.filter((pb) => pb.status === "available")
                .length,
              color: "#22c55e",
            },
            {
              label: "Rented",
              count: powerBanks.filter((pb) => pb.status === "rented").length,
              color: "#f59e0b",
            },
            {
              label: "Maintenance",
              count: powerBanks.filter((pb) => pb.status === "maintenance")
                .length,
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
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              background: "white",
            }}
          >
            <option value="all">All Stations</option>
            <option value="st_001">Downtown Mall Station</option>
            <option value="st_002">Airport Terminal 1</option>
            <option value="st_003">Central Park Station</option>
          </select>
        </div>

        {/* Power Banks Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
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
              Loading power banks...
            </div>
          ) : (
            powerBanks.map((powerBank) => {
              const statusColors = getStatusColor(powerBank.status);
              const healthColor = getHealthColor(powerBank.health);

              return (
                <div
                  key={powerBank.id}
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    border: `2px solid ${statusColors.text}`,
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      padding: "1.5rem",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: "1.125rem",
                            fontWeight: "700",
                            color: "#1f2937",
                            margin: "0 0 0.25rem 0",
                          }}
                        >
                          🔋 {powerBank.serialNumber}
                        </h3>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        >
                          ID: {powerBank.id}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: "0.375rem 0.75rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          background: statusColors.bg,
                          color: statusColors.text,
                        }}
                      >
                        {powerBank.status}
                      </span>
                    </div>

                    {/* Battery Level */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "#374151",
                            fontWeight: "500",
                          }}
                        >
                          Battery Level
                        </span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {powerBank.batteryLevel}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "0.5rem",
                          background: "#e5e7eb",
                          borderRadius: "0.25rem",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${powerBank.batteryLevel}%`,
                            height: "100%",
                            background:
                              powerBank.batteryLevel > 60
                                ? "#22c55e"
                                : powerBank.batteryLevel > 30
                                  ? "#f59e0b"
                                  : "#ef4444",
                            transition: "width 0.3s ease",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Capacity
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {powerBank.capacity}mAh
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Cycles
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {powerBank.cycleCount}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Health
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: healthColor,
                          }}
                        >
                          {powerBank.health}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Temperature
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {powerBank.temperature}°C
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      background: "#f9fafb",
                    }}
                  >
                    {powerBank.stationId ? (
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Current Location
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#1f2937",
                          }}
                        >
                          Station {powerBank.stationId} - Slot{" "}
                          {powerBank.slotNumber || "N/A"}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "#f59e0b",
                          fontWeight: "500",
                        }}
                      >
                        Currently rented
                      </div>
                    )}
                  </div>

                  {/* Last Activity */}
                  <div
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderTop: "1px solid #f3f4f6",
                      fontSize: "0.75rem",
                      color: "#6b7280",
                    }}
                  >
                    Last rented:{" "}
                    {new Date(powerBank.lastRentedAt).toLocaleString()}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {powerBanks.length === 0 && !isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280",
            }}
          >
            No power banks found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPowerBanks;
