"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminPayments = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchPayments();
    // }
  }, [user, currentPage, searchQuery, statusFilter]);

  const fetchPayments = async () => {
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
      const mockPayments = [
        {
          id: "PAY001",
          userId: "USR123",
          userName: "John Doe",
          userEmail: "john@example.com",
          rentalId: "REN001",
          amount: 5.50,
          status: "completed",
          method: "credit_card",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          processedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5000).toISOString(),
          transactionId: "TXN_1234567890"
        },
        {
          id: "PAY002",
          userId: "USR124",
          userName: "Jane Smith",
          userEmail: "jane@example.com",
          rentalId: "REN002",
          amount: 12.75,
          status: "completed",
          method: "apple_pay",
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          processedAt: new Date(Date.now() - 5 * 60 * 60 * 1000 + 3000).toISOString(),
          transactionId: "TXN_1234567891"
        },
        {
          id: "PAY003",
          userId: "USR125",
          userName: "Mike Johnson",
          userEmail: "mike@example.com",
          rentalId: "REN003",
          amount: 3.25,
          status: "pending",
          method: "google_pay",
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          processedAt: null,
          transactionId: "TXN_1234567892"
        },
        {
          id: "PAY004",
          userId: "USR126",
          userName: "Sarah Wilson",
          userEmail: "sarah@example.com",
          rentalId: "REN004",
          amount: 8.00,
          status: "failed",
          method: "credit_card",
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          processedAt: null,
          transactionId: "TXN_1234567893"
        }
      ];

      setTimeout(() => {
        setPayments(mockPayments);
        setTotalPages(2);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setIsLoading(false);
    }
  };

  const handleRefund = async (paymentId) => {
    if (!confirm(t("admin.refundConfirm"))) return;

    try {
      const token = user?.token;
      // Mock API call
      setTimeout(() => {
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: "refunded" }
            : payment
        ));
        alert(t("admin.refundSuccess"));
      }, 1000);
    } catch (error) {
      console.error("Failed to process refund:", error);
      alert(t("admin.refundFailed"));
    }
  };

  const handleRetryPayment = async (paymentId) => {
    if (!confirm(t("admin.retryPaymentConfirm"))) return;

    try {
      const token = user?.token;
      // Mock API call
      setTimeout(() => {
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: "completed", processedAt: new Date().toISOString() }
            : payment
        ));
        alert(t("admin.paymentRetrySuccess"));
      }, 1000);
    } catch (error) {
      console.error("Failed to retry payment:", error);
      alert(t("admin.paymentRetryFailed"));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return { bg: "#f0fdf4", text: "#166534", border: "#22c55e" };
      case "pending":
        return { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" };
      case "failed":
        return { bg: "#fef2f2", text: "#991b1b", border: "#ef4444" };
      case "refunded":
        return { bg: "#f0f9ff", text: "#1e40af", border: "#3b82f6" };
      default:
        return { bg: "#f3f4f6", text: "#374151", border: "#6b7280" };
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "credit_card": return "💳";
      case "apple_pay": return "🍎";
      case "google_pay": return "🔵";
      case "paypal": return "💙";
      default: return "💰";
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments.filter(p => p.status === "completed").reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments.filter(p => p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0);
  const refundedAmount = payments.filter(p => p.status === "refunded").reduce((sum, payment) => sum + payment.amount, 0);

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
              {t("admin.payments")}
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
            { label: t("admin.totalRevenue"), amount: `$${totalRevenue.toFixed(2)}`, color: "#22c55e" },
            { label: t("payments.pending"), amount: `$${pendingAmount.toFixed(2)}`, color: "#f59e0b" },
            { label: t("admin.refunded"), amount: `$${refundedAmount.toFixed(2)}`, color: "#3b82f6" },
            { label: t("admin.totalPayments"), amount: payments.length.toString(), color: "#8b5cf6" },
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
                {stat.amount}
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
            placeholder={t("admin.searchPayments")}
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
            <option value="completed">{t("payments.completed")}</option>
            <option value="pending">{t("payments.pending")}</option>
            <option value="failed">{t("payments.failed")}</option>
            <option value="refunded">{t("admin.refunded")}</option>
          </select>
        </div>

        {/* Payments Table */}
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
              {t("admin.loadingPayments")}
            </div>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
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
                        {t("admin.paymentID")}
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
                        {t("admin.amount")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {t("admin.method")}
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
                        {t("admin.createdAt")}
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
                    {filteredPayments.map((payment, index) => {
                      const statusColors = getStatusColor(payment.status);
                      return (
                        <tr
                          key={payment.id}
                          style={{
                            borderBottom:
                              index < filteredPayments.length - 1
                                ? "1px solid #f3f4f6"
                                : "none",
                          }}
                        >
                          <td style={{ padding: "1rem", fontWeight: "600", color: "#1f2937" }}>
                            <div>
                              <div>{payment.id}</div>
                              <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                                {payment.transactionId}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div>
                              <div style={{ fontWeight: "600", color: "#1f2937" }}>
                                {payment.userName}
                              </div>
                              <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                                {payment.userEmail}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "1rem", fontWeight: "600", color: "#1f2937" }}>
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontSize: "1.2rem" }}>
                                {getMethodIcon(payment.method)}
                              </span>
                              <span style={{ textTransform: "capitalize" }}>
                                {payment.method.replace("_", " ")}
                              </span>
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
                              {t(`payments.${payment.status}`)}
                            </span>
                          </td>
                          <td style={{ padding: "1rem", color: "#6b7280" }}>
                            {new Date(payment.createdAt).toLocaleString()}
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
                              {payment.status === "completed" && (
                                <button
                                  onClick={() => handleRefund(payment.id)}
                                  style={{
                                    padding: "0.375rem 0.75rem",
                                    background: "#f59e0b",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  {t("admin.refund")}
                                </button>
                              )}
                              {payment.status === "failed" && (
                                <button
                                  onClick={() => handleRetryPayment(payment.id)}
                                  style={{
                                    padding: "0.375rem 0.75rem",
                                    background: "#22c55e",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  {t("admin.retry")}
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

export default AdminPayments;
