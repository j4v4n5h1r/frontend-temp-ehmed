"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Redirect if not admin
  // useEffect(() => {
  //   if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
  //     router.push("/");
  //   }
  // }, [user, loading, router]);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchUsers();
    // }
  }, [user, currentPage, searchQuery, statusFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/v1/admin/users?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data.users);
        setTotalPages(data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = user?.token;
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = user?.token;
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // if (loading || !user || user.profile?.data?.user?.role !== "admin") {
    // return (
    //   <div
    //     style={{
    //       minHeight: "100vh",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       background: "#f8fafc",
    //     }}
    //   >
    //     <div>Loading...</div>
    //   </div>
    // );
  // }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
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
              Users Management
            </h1>
          </div>
          <button
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(34, 197, 94, 0.3)",
            }}
          >
            + Add New User
          </button>
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
            placeholder="Search users by name or email..."
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Users Table */}
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
              Loading users...
            </div>
          ) : (
            <>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
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
                        fontSize: "0.875rem",
                      }}
                    >
                      User
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      Joined
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      Last Login
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "right",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom:
                          index < filteredUsers.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      }}
                    >
                      <td style={{ padding: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "600",
                              fontSize: "0.875rem",
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: "600",
                                color: "#1f2937",
                                fontSize: "0.875rem",
                              }}
                            >
                              {user.name}
                            </div>
                            <div
                              style={{
                                color: "#6b7280",
                                fontSize: "0.75rem",
                              }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <select
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(user.id, e.target.value)
                          }
                          style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #d1d5db",
                            fontSize: "0.75rem",
                            background:
                              user.status === "active"
                                ? "#f0fdf4"
                                : user.status === "suspended"
                                  ? "#fef2f2"
                                  : "#fef3c7",
                            color:
                              user.status === "active"
                                ? "#166534"
                                : user.status === "suspended"
                                  ? "#991b1b"
                                  : "#92400e",
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="pending">Pending</option>
                        </select>
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        {new Date(user.registeredAt).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "flex-end",
                          }}
                        >
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
                            View
                          </button>
                          <button
                            style={{
                              padding: "0.375rem 0.75rem",
                              background: "#10b981",
                              color: "white",
                              border: "none",
                              borderRadius: "0.375rem",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
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
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
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
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "0.5rem 1rem",
                        background:
                          currentPage === totalPages ? "#f3f4f6" : "#22c55e",
                        color: currentPage === totalPages ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Next
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

export default AdminUsers;
