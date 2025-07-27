"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";

const BASE_URL = "http://164.90.238.202:8000";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = cookie.get("token");

      console.log("BASE_URL:", BASE_URL);
      console.log("Token:", token ? "Present" : "Missing");

      // If BASE_URL is not set, use mock data for development
      if (!BASE_URL) {
        console.warn("BASE_URL not set, using mock data");
        const mockPayments = [
          {
            id: "PAY001",
            description: "Power Bank Rental - Station 001",
            amount: 5.99,
            status: "completed",
            type: "charge",
            createdAt: new Date().toISOString(),
            rentalId: "REN001",
          },
          {
            id: "PAY002",
            description: "Power Bank Rental - Station 002",
            amount: 3.5,
            status: "pending",
            type: "charge",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            rentalId: "REN002",
          },
          {
            id: "PAY003",
            description: "Refund - Power Bank Rental",
            amount: 5.99,
            status: "refunded",
            type: "refund",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            rentalId: "REN003",
          },
        ];
        setTimeout(() => {
          setPayments(mockPayments);
          setLoading(false);
        }, 1000);
        return;
      }

      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again.",
        );
      }

      const response = await axios.get(`${BASE_URL}/api/v1/payments`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      setPayments(response.data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);

      let errorMessage = "Failed to load payment history";

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

  const filteredPayments = payments.filter((payment) => {
    const matchesFilter =
      filter === "all" || payment.status?.toLowerCase() === filter;
    const matchesSearch =
      payment.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount?.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" };
      case "pending":
        return { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" };
      case "failed":
      case "error":
        return { bg: "#fee2e2", border: "#fecaca", text: "#dc2626" };
      case "refunded":
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
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
            Payment History
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
            View and manage your payment transactions
          </p>
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
                placeholder="Search payments..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
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
              Loading payments...
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
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <svg
              style={{
                width: "1.5rem",
                height: "1.5rem",
                margin: "0 auto 0.5rem",
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
            <p style={{ fontWeight: "600", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Payments List */}
        {!loading && !error && (
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            {filteredPayments.length > 0 ? (
              <div>
                {/* Header Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 100px 120px 80px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    background: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  <div>Transaction</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Action</div>
                </div>

                {/* Payment Rows */}
                {filteredPayments.map((payment) => {
                  const statusColors = getStatusColor(payment.status);
                  return (
                    <div
                      key={payment.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 120px 100px 120px 80px",
                        gap: "1rem",
                        padding: "1.5rem",
                        borderBottom: "1px solid #f3f4f6",
                        alignItems: "center",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      {/* Transaction Info */}
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#171717",
                            margin: "0 0 0.25rem 0",
                          }}
                        >
                          {payment.description || `Payment #${payment.id}`}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            margin: 0,
                          }}
                        >
                          ID: {payment.id}
                        </p>
                        {payment.rentalId && (
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "#9ca3af",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            Rental: {payment.rentalId}
                          </p>
                        )}
                      </div>

                      {/* Amount */}
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color:
                            payment.type === "refund" ? "#dc2626" : "#171717",
                        }}
                      >
                        {payment.type === "refund" && "-"}
                        {formatCurrency(payment.amount)}
                      </div>

                      {/* Status */}
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
                        {payment.status}
                      </span>

                      {/* Date */}
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "#6b7280",
                        }}
                      >
                        {formatDate(payment.createdAt || payment.date)}
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => {
                          /* Handle view details */
                        }}
                        style={{
                          padding: "0.5rem",
                          background: "none",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          color: "#6b7280",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = "#22c55e";
                          e.target.style.color = "#22c55e";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.color = "#6b7280";
                        }}
                        title="View Details"
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
                      </button>
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
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
                  No payments found
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
                    : "You haven't made any payments yet"}
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
            href="/profile"
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Payment Methods
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

export default PaymentsPage;
