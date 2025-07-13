"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const StationsPage = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Debug: Check if BASE_URL is set
      console.log("BASE_URL:", BASE_URL);
      console.log("Full URL:", `${BASE_URL}/api/v1/stations`);

      // If BASE_URL is not set, use mock data for development
      if (!BASE_URL) {
        console.warn("BASE_URL not set, using mock data");
        // Use mock data for development
        const mockStations = [
          {
            id: "STATION001",
            name: "Central Station",
            location: "Downtown Mall, Level 1",
            status: "ACTIVE",
            availablePowerbanks: 8,
            totalPowerbanks: 12,
          },
          {
            id: "STATION002",
            name: "Airport Terminal",
            location: "International Airport, Gate A",
            status: "ACTIVE",
            availablePowerbanks: 5,
            totalPowerbanks: 10,
          },
          {
            id: "STATION003",
            name: "University Campus",
            location: "Student Center, Main Floor",
            status: "MAINTENANCE",
            availablePowerbanks: 0,
            totalPowerbanks: 8,
          },
          {
            id: "STATION004",
            name: "Coffee Shop",
            location: "Main Street Café",
            status: "OFFLINE",
            availablePowerbanks: 0,
            totalPowerbanks: 6,
          },
        ];
        setTimeout(() => {
          setStations(mockStations);
          setLoading(false);
        }, 1000);
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/v1/stations`, {
        timeout: 10000, // 10 second timeout
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Stations response:", response);
      setStations(response.data || []);
    } catch (err) {
      console.error("Error fetching stations:", err);

      // More detailed error handling
      let errorMessage = "Failed to load stations";

      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout - server is taking too long to respond";
      } else if (err.response) {
        // Server responded with error status
        console.error("Server error:", err.response.status, err.response.data);
        errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || "Unknown error"}`;
      } else if (err.request) {
        // Request was made but no response received
        console.error("Network error:", err.request);
        errorMessage =
          "Network error - please check your connection and try again";
      } else {
        // Something else happened
        console.error("Unexpected error:", err.message);
        errorMessage = `Unexpected error: ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredStations = stations.filter(
    (station) =>
      station.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.id?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" };
      case "MAINTENANCE":
        return { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" };
      case "OFFLINE":
        return { bg: "#fee2e2", border: "#fecaca", text: "#dc2626" };
      default:
        return { bg: "#f3f4f6", border: "#d1d5db", text: "#6b7280" };
    }
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
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
            Station Locations
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
            Find nearby power bank stations and check their availability
          </p>
        </div>

        {/* Search Bar */}
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
          <div style={{ position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.25rem",
                height: "1.25rem",
                color: "#9ca3af",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search stations by name, location, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.875rem 1rem 0.875rem 3rem",
                fontSize: "1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "0.75rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "0 0 0 4px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
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
              Loading stations...
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

        {/* Stations Grid */}
        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            {filteredStations.map((station) => {
              const statusColors = getStatusColor(station.status);
              return (
                <div
                  key={station.id}
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {/* Station Header */}
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
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#171717",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {station.name || `Station ${station.id}`}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        ID: {station.id}
                      </p>
                    </div>
                    <span
                      style={{
                        background: statusColors.bg,
                        border: `1px solid ${statusColors.border}`,
                        color: statusColors.text,
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {station.status}
                    </span>
                  </div>

                  {/* Location */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#6b7280",
                        marginRight: "0.5rem",
                        flexShrink: 0,
                      }}
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
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#374151",
                      }}
                    >
                      {station.location || "Location not specified"}
                    </span>
                  </div>

                  {/* Power Banks Count */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#6b7280",
                        marginRight: "0.5rem",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#374151",
                      }}
                    >
                      {station.availablePowerbanks || 0} /{" "}
                      {station.totalPowerbanks || 0} Available
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/rental?stationId=${station.id}`}>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background:
                          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #16a34a 0%, #15803d 100%)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
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
                      Rent from this Station
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStations.length === 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "3rem",
              textAlign: "center",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
              No stations found
            </h3>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
              }}
            >
              {searchTerm
                ? "Try adjusting your search terms"
                : "No stations are available at this time"}
            </p>
          </div>
        )}

        {/* Back to Dashboard */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
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

export default StationsPage;
