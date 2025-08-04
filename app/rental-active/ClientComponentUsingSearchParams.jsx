"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "../../context/TranslationContext";
import { useRouter, useSearchParams } from "next/navigation";

const BASE_URL = "http://164.90.238.202:8000";

export default function ClientComponentUsingSearchParams() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("id");
  const { user } = useContext(AuthContext);

  const [activeRental, setActiveRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returnLoading, setReturnLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    fetchActiveRental();
    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveRental = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = cookie.get("token");

      console.log("Fetching active rental for user:", user?.id);
      console.log("BASE_URL:", BASE_URL);

      // If BASE_URL is not set, use mock data for development
      if (!BASE_URL) {
        console.warn("BASE_URL not set, using mock data");
        const mockRental = {
          id: rentalId || "REN001",
          stationId: "STATION001",
          stationName: "Central Station",
          stationLocation: "Downtown Mall, Level 1",
          powerbankId: "PB001",
          status: "active",
          startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          batteryLevel: 85,
          estimatedCost: 2.5,
          freeTimeRemaining: 23 * 60 + 15, // 23h 15m in minutes
          currentRate: 0.05, // $0.05 per minute after free time
          returnStations: [
            {
              id: "STATION001",
              name: "Central Station",
              distance: "0.0 km",
              available: true,
            },
            {
              id: "STATION002",
              name: "Airport Terminal",
              distance: "2.3 km",
              available: true,
            },
            {
              id: "STATION003",
              name: "University Campus",
              distance: "1.7 km",
              available: false,
            },
            {
              id: "STATION004",
              name: "Coffee Shop",
              distance: "0.8 km",
              available: true,
            },
          ],
        };
        setTimeout(() => {
          setActiveRental(mockRental);
          setLoading(false);
        }, 1000);
        return;
      }

      if (!token) {
        throw new Error(
          t("rentals.authTokenMissing"),
        );
      }

      if (!user?.id) {
        throw new Error(t("rentals.authFailed"));
      }

      const response = await axios.get(
        `${BASE_URL}/api/v1/rentals/active/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        },
      );

      if (response.data && response.data.length > 0) {
        // If rentalId is provided, find specific rental, otherwise use first active rental
        const rental = rentalId
          ? response.data.find((r) => r.id === rentalId) || response.data[0]
          : response.data[0];
        setActiveRental(rental);
      } else {
        setActiveRental(null);
      }
    } catch (err) {
      console.error("Error fetching active rental:", err);

      let errorMessage = t("rentalActive.failedToLoad");

      if (
        err.message.includes("Authentication token") ||
        err.message.includes("User ID")
      ) {
        errorMessage = err.message;
      } else if (err.code === "ECONNABORTED") {
        errorMessage = t("rentals.requestTimeout");
      } else if (err.response) {
        console.error("Server error:", err.response.status, err.response.data);
        if (err.response.status === 401) {
          errorMessage = t("rentals.authFailed");
        } else if (err.response.status === 404) {
          errorMessage = t("rentalActive.noActiveRental");
          setActiveRental(null);
          return;
        } else {
          errorMessage = `${t("rentals.serverError")}: ${err.response.status} - ${err.response.data?.message || t("rentals.unexpectedError")}`;
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

  const updateElapsedTime = () => {
    if (activeRental?.startTime) {
      const start = new Date(activeRental.startTime);
      const now = new Date();
      const diffMs = now - start;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
    }
  };

  const handleReturnPowerbank = async (stationId) => {
    try {
      setReturnLoading(true);
      const token = cookie.get("token");

      if (!BASE_URL) {
        // Mock successful return
        setTimeout(() => {
          alert("Power bank returned successfully!");
          router.push("/my-rentals");
        }, 2000);
        return;
      }

      await axios.post(
        `${BASE_URL}/api/v1/rentals/${activeRental.id}/return`,
        {
          returnStationId: stationId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        },
      );

      alert("Power bank returned successfully!");
      router.push("/my-rentals");
    } catch (err) {
      console.error("Error returning power bank:", err);
      alert("Failed to return power bank. Please try again.");
    } finally {
      setReturnLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getBatteryColor = (level) => {
    if (level > 60) return "#22c55e";
    if (level > 30) return "#f59e0b";
    return "#ef4444";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              border: "4px solid #e5e7eb",
              borderTop: "4px solid #22c55e",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontSize: "1.125rem", color: "#525252" }}>
            Loading active rental...
          </span>
        </div>
      </div>
    );
  }

  if (!activeRental) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
          padding: "2rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "3rem",
            textAlign: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
          }}
        >
          <svg
            style={{
              width: "4rem",
              height: "4rem",
              color: "#d1d5db",
              margin: "0 auto 2rem",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#171717",
              marginBottom: "1rem",
            }}
          >
            No Active Rental
          </h2>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "2rem",
            }}
          >
            You don't have any active power bank rentals at the moment.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/rental"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Rent Power Bank
            </Link>
            <Link
              href="/my-rentals"
              style={{
                background: "white",
                color: "#16a34a",
                border: "2px solid #22c55e",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              View Rental History
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          maxWidth: "900px",
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
              animation: "pulse 2s infinite",
            }}
          >
            <svg
              style={{ width: "2rem", height: "2rem", color: "white" }}
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
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#171717",
              marginBottom: "0.75rem",
              letterSpacing: "-0.025em",
            }}
          >
            Active Rental
          </h1>
          <p
            style={{
              color: "#525252",
              fontSize: "1.125rem",
              fontWeight: "500",
            }}
          >
            Track your current power bank rental
          </p>
        </div>

        {/* Main Rental Card */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Status Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                margin: "0 0 0.5rem 0",
              }}
            >
              🔋 Power Bank Active
            </h2>
            <p style={{ fontSize: "0.875rem", margin: 0, opacity: 0.9 }}>
              Rental ID: {activeRental.id}
            </p>
          </div>

          {/* Key Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#171717",
                  marginBottom: "0.25rem",
                }}
              >
                {elapsedTime || "0h 0m 0s"}
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                Time Elapsed
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: getBatteryColor(activeRental.batteryLevel),
                  marginBottom: "0.25rem",
                }}
              >
                {activeRental.batteryLevel}%
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                Battery Level
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#171717",
                  marginBottom: "0.25rem",
                }}
              >
                {formatCurrency(activeRental.estimatedCost)}
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                Current Cost
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color:
                    activeRental.freeTimeRemaining > 0 ? "#22c55e" : "#ef4444",
                  marginBottom: "0.25rem",
                }}
              >
                {formatTime(activeRental.freeTimeRemaining)}
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                Free Time Left
              </p>
            </div>
          </div>

          {/* Rental Details */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#171717",
                marginBottom: "1rem",
              }}
            >
              Rental Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <div>
                <strong style={{ color: "#374151" }}>Station:</strong>{" "}
                {activeRental.stationName}
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Power Bank ID:</strong>{" "}
                {activeRental.powerbankId}
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Location:</strong>{" "}
                {activeRental.stationLocation}
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Started:</strong>{" "}
                {new Date(activeRental.startTime).toLocaleString()}
              </div>
              <div>
                <strong style={{ color: "#374151" }}>
                  Rate (after free time):
                </strong>{" "}
                {formatCurrency(activeRental.currentRate)}/min
              </div>
            </div>
          </div>

          {/* Battery Status */}
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  background: getBatteryColor(activeRental.batteryLevel),
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
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
              <div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#15803d",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  Battery Status: {activeRental.batteryLevel}%
                </h4>
                <p
                  style={{ color: "#15803d", fontSize: "0.875rem", margin: 0 }}
                >
                  {activeRental.batteryLevel > 60
                    ? "Excellent battery level"
                    : activeRental.batteryLevel > 30
                      ? "Good battery level"
                      : "Low battery - consider returning soon"}
                </p>
              </div>
            </div>
            <div
              style={{
                background: "#e5e7eb",
                borderRadius: "9999px",
                height: "0.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: getBatteryColor(activeRental.batteryLevel),
                  height: "100%",
                  width: `${activeRental.batteryLevel}%`,
                  borderRadius: "9999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Return Stations */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#171717",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              style={{ width: "1.25rem", height: "1.25rem", color: "#22c55e" }}
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
            Return Stations
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {activeRental.returnStations?.map((station) => (
              <div
                key={station.id}
                style={{
                  background: station.available ? "#f9fafb" : "#fef2f2",
                  border: `1px solid ${station.available ? "#e5e7eb" : "#fecaca"}`,
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  transition: "all 0.3s ease",
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
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#171717",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      {station.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      {station.distance}
                    </p>
                  </div>
                  <span
                    style={{
                      background: station.available ? "#f0fdf4" : "#fee2e2",
                      color: station.available ? "#16a34a" : "#dc2626",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {station.available ? "Available" : "Full"}
                  </span>
                </div>
                <button
                  onClick={() => handleReturnPowerbank(station.id)}
                  disabled={!station.available || returnLoading}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background:
                      station.available && !returnLoading
                        ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                        : "#d1d5db",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor:
                      station.available && !returnLoading
                        ? "pointer"
                        : "not-allowed",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {returnLoading ? (
                    <>
                      <div
                        style={{
                          width: "1rem",
                          height: "1rem",
                          border: "2px solid white",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Returning...
                    </>
                  ) : (
                    <>
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
                      {station.available ? "Return Here" : "Unavailable"}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <Link
            href="/my-rentals"
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Rental History
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
            Dashboard
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
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
}
