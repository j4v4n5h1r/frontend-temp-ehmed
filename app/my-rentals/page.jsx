"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/TranslationContext";

const BASE_URL = "http://164.90.238.202:8000";

const MyRentalsPage = () => {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = cookie.get("token");

      console.log("BASE_URL:", BASE_URL);
      console.log("Token:", token ? "Present" : "Missing");

      // If BASE_URL is not set, use mock data for development
      if (!BASE_URL) {
        console.warn("BASE_URL not set, using mock data");
        const mockRentals = [
          {
            id: "REN001",
            stationId: "STATION001",
            stationName: "Central Station",
            powerbankId: "PB001",
            status: "active",
            startTime: new Date(Date.now() - 3600000).toISOString(),
            endTime: null,
            totalAmount: 0,
            duration: "1h 0m",
            location: "Downtown Mall, Level 1",
          },
          {
            id: "REN002",
            stationId: "STATION002",
            stationName: "Airport Terminal",
            powerbankId: "PB025",
            status: "completed",
            startTime: new Date(Date.now() - 86400000).toISOString(),
            endTime: new Date(Date.now() - 82800000).toISOString(),
            totalAmount: 5.99,
            duration: "1h 30m",
            location: "International Airport, Gate A",
          },
          {
            id: "REN003",
            stationId: "STATION001",
            stationName: "Central Station",
            powerbankId: "PB015",
            status: "completed",
            startTime: new Date(Date.now() - 172800000).toISOString(),
            endTime: new Date(Date.now() - 169200000).toISOString(),
            totalAmount: 3.5,
            duration: "45m",
            location: "Downtown Mall, Level 1",
          },
          {
            id: "REN004",
            stationId: "STATION003",
            stationName: "University Campus",
            powerbankId: "PB032",
            status: "cancelled",
            startTime: new Date(Date.now() - 259200000).toISOString(),
            endTime: new Date(Date.now() - 258900000).toISOString(),
            totalAmount: 0,
            duration: "5m",
            location: "Student Center, Main Floor",
          },
        ];
        setTimeout(() => {
          setRentals(mockRentals);
          setLoading(false);
        }, 1000);
        return;
      }

      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }

      const response = await axios.get(`${BASE_URL}/api/v1/users/me/rentals`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      setRentals(response.data || []);
    } catch (err) {
      console.error("Error fetching rentals:", err);

      let errorMessage = "Failed to load rental history";

      if (err.message.includes("Authentication token")) {
        errorMessage = err.message;
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout - server is taking too long to respond";
      } else if (err.response) {
        console.error("Server error:", err.response.status, err.response.data);
        if (err.response.status === 401) {
          errorMessage = "Authentication failed - please log in again";
        } else {
          errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || "Unknown error"}`;
        }
      } else if (err.request) {
        console.error("Network error:", err.request);
        errorMessage =
          "Network error - please check your connection and try again";
      } else {
        console.error("Unexpected error:", err.message);
        errorMessage = `Unexpected error: ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredRentals = rentals.filter((rental) => {
    const matchesFilter =
      filter === "all" || rental.status?.toLowerCase() === filter;
    const matchesSearch =
      rental.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.stationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.stationId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "ongoing":
        return { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" };
      case "completed":
      case "finished":
        return { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" };
      case "cancelled":
      case "canceled":
        return { bg: "#fee2e2", border: "#fecaca", text: "#dc2626" };
      case "pending":
        return { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" };
      default:
        return { bg: "#f3f4f6", border: "#d1d5db", text: "#6b7280" };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalSpent = rentals.reduce(
    (sum, rental) => sum + (rental.totalAmount || 0),
    0,
  );
  const activeRentals = rentals.filter(
    (r) => r.status?.toLowerCase() === "active",
  ).length;
  const completedRentals = rentals.filter(
    (r) => r.status?.toLowerCase() === "completed",
  ).length;

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
          maxWidth: "1200px",
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
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
            My Rentals
          </h1>
          <p
            style={{
              color: "#525252",
              fontSize: "1.125rem",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Track your power bank rental history and current usage
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                background: "#fef3c7",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem", color: "#f59e0b" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#171717",
                margin: "0 0 0.25rem 0",
              }}
            >
              {activeRentals}
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              Active Rentals
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                background: "#f0fdf4",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem", color: "#22c55e" }}
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
            </div>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#171717",
                margin: "0 0 0.25rem 0",
              }}
            >
              {completedRentals}
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              Completed
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                background: "#eff6ff",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem", color: "#3b82f6" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#171717",
                margin: "0 0 0.25rem 0",
              }}
            >
              {formatCurrency(totalSpent)}
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              Total Spent
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                background: "#f3e8ff",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem", color: "#8b5cf6" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#171717",
                margin: "0 0 0.25rem 0",
              }}
            >
              {rentals.length}
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              Total Rentals
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              alignItems: "end",
            }}
          >
            {/* Search */}
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
                Search
              </label>
              <input
                type="text"
                placeholder="Search rentals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Status Filter */}
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
                Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  outline: "none",
                  background: "white",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "4rem",
              background: "white",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                border: "3px solid #e5e7eb",
                borderTop: "3px solid #22c55e",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginRight: "1rem",
              }}
            />
            <span style={{ fontSize: "1.125rem", color: "#525252" }}>
              Loading your rentals...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "2rem",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <svg
              style={{
                width: "2rem",
                height: "2rem",
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Unable to Load Rentals
            </h3>
            <p style={{ margin: "0 0 1.5rem 0", fontSize: "0.875rem" }}>
              {error}
            </p>
            <button
              onClick={fetchRentals}
              style={{
                background: "#dc2626",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "0 auto",
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {/* Rentals List */}
        {!loading && !error && (
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            {filteredRentals.length > 0 ? (
              <div>
                {filteredRentals.map((rental) => {
                  const statusColors = getStatusColor(rental.status);
                  return (
                    <div
                      key={rental.id}
                      style={{
                        padding: "2rem",
                        borderBottom: "1px solid #f3f4f6",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: "1rem",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Rental Info */}
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              marginBottom: "1rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <h3
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: "#171717",
                                margin: 0,
                              }}
                            >
                              {rental.stationName ||
                                `Station ${rental.stationId}`}
                            </h3>
                            <span
                              style={{
                                background: statusColors.bg,
                                border: `1px solid ${statusColors.border}`,
                                color: statusColors.text,
                                padding: "0.25rem 0.75rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                textTransform: "capitalize",
                              }}
                            >
                              {rental.status}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                              gap: "1rem",
                              fontSize: "0.875rem",
                              color: "#6b7280",
                            }}
                          >
                            <div>
                              <strong style={{ color: "#374151" }}>
                                Rental ID:
                              </strong>{" "}
                              {rental.id}
                            </div>
                            <div>
                              <strong style={{ color: "#374151" }}>
                                Power Bank:
                              </strong>{" "}
                              {rental.powerbankId}
                            </div>
                            <div>
                              <strong style={{ color: "#374151" }}>
                                Location:
                              </strong>{" "}
                              {rental.location}
                            </div>
                            <div>
                              <strong style={{ color: "#374151" }}>
                                Duration:
                              </strong>{" "}
                              {rental.duration}
                            </div>
                            <div>
                              <strong style={{ color: "#374151" }}>
                                Started:
                              </strong>{" "}
                              {formatDate(rental.startTime)}
                            </div>
                            {rental.endTime && (
                              <div>
                                <strong style={{ color: "#374151" }}>
                                  Ended:
                                </strong>{" "}
                                {formatDate(rental.endTime)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Amount and Actions */}
                        <div
                          style={{
                            textAlign: "right",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "700",
                              color:
                                rental.totalAmount > 0 ? "#171717" : "#6b7280",
                            }}
                          >
                            {rental.totalAmount > 0
                              ? formatCurrency(rental.totalAmount)
                              : "Free"}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              flexWrap: "wrap",
                            }}
                          >
                            {rental.status === "active" && (
                              <Link
                                href={`/rental-active?id=${rental.id}`}
                                style={{
                                  background: "#22c55e",
                                  color: "white",
                                  padding: "0.5rem 1rem",
                                  borderRadius: "0.375rem",
                                  textDecoration: "none",
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                Track
                              </Link>
                            )}
                            <button
                              onClick={() => {
                                /* Handle view details */
                              }}
                              style={{
                                background: "white",
                                color: "#6b7280",
                                padding: "0.5rem 1rem",
                                border: "1px solid #e5e7eb",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div
                style={{
                  padding: "4rem",
                  textAlign: "center",
                }}
              >
                <svg
                  style={{
                    width: "4rem",
                    height: "4rem",
                    color: "#d1d5db",
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  No rentals found
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search or filter"
                    : "You haven't rented any power banks yet"}
                </p>
                <Link
                  href="/rental"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    color: "white",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "600",
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Start Your First Rental
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Link
            href="/rental"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Rent Power Bank
          </Link>

          <Link
            href="/stations"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem",
              background: "white",
              color: "#16a34a",
              border: "2px solid #22c55e",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f0fdf4";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.transform = "translateY(0)";
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Find Stations
          </Link>

          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem",
              background: "white",
              color: "#16a34a",
              border: "2px solid #22c55e",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f0fdf4";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.transform = "translateY(0)";
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
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
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
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default MyRentalsPage;
