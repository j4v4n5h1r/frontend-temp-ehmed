"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { useRouter } from "next/navigation";

const AdminStations = () => {
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStation, setSelectedStation] = useState(null);
  const [commandType, setCommandType] = useState("RESET");

  // Redirect if not admin
  // useEffect(() => {
  //   if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
  //     router.push("/");
  //   }
  // }, [user, loading, router]);

  useEffect(() => {
    // if (user?.profile?.data?.user?.role === "admin") {
      fetchStations();
    // }
  }, [user, searchQuery, statusFilter]);

  const fetchStations = async () => {
    try {
      setIsLoading(true);
      const token = user?.token;
      const queryParams = new URLSearchParams({
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`/api/v1/admin/stations?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStations(data.data.stations);
      }
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (stationId, newStatus) => {
    try {
      const token = user?.token;
      const response = await fetch(
        `/api/v1/admin/stations/${stationId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        fetchStations(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to update station status:", error);
    }
  };

  const handleSendCommand = async () => {
    if (!selectedStation) return;

    try {
      const token = user?.token;
      const commandData = {
        command: commandType,
        ...(commandType !== "REBOOT" &&
          commandType !== "DIAGNOSTICS" && { slotNumber: 1 }),
      };

      const response = await fetch(
        `/api/v1/admin/stations/${selectedStation}/command`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commandData),
        },
      );

      if (response.ok) {
        alert(t("admin.commandSentSuccess"));
        setSelectedStation(null);
      }
    } catch (error) {
      console.error("Failed to send command:", error);
    }
  };

  const handleDeleteStation = async (stationId) => {
    if (!confirm(t("admin.deleteStationConfirm"))) return;

    try {
      const token = user?.token;
      const response = await fetch(`/api/v1/admin/stations/${stationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchStations(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to delete station:", error);
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

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || station.status === statusFilter;
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
              {t("admin.stations")}
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
            + {t("admin.addNewStation")}
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
            placeholder={t("admin.searchStations")}
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
            <option value="online">{t("admin.online")}</option>
            <option value="offline">{t("admin.offline")}</option>
            <option value="maintenance">{t("admin.maintenance")}</option>
          </select>
        </div>

        {/* Command Panel */}
        {selectedStation && (
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "2px solid #fbbf24",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              {t("admin.sendCommandTo")}{" "}
              {stations.find((s) => s.id === selectedStation)?.name}
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <select
                value={commandType}
                onChange={(e) => setCommandType(e.target.value)}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  background: "white",
                }}
              >
                <option value="RESET">{t("admin.resetStation")}</option>
                <option value="REBOOT">{t("admin.rebootSystem")}</option>
                <option value="DIAGNOSTICS">{t("admin.runDiagnostics")}</option>
                <option value="EJECT">{t("admin.emergencyEject")}</option>
                <option value="LOCK_SLOT">{t("admin.lockAllSlots")}</option>
                <option value="UNLOCK_SLOT">{t("admin.unlockAllSlots")}</option>
              </select>
              <button
                onClick={handleSendCommand}
                style={{
                  background: "#f59e0b",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Send Command
              </button>
              <button
                onClick={() => setSelectedStation(null)}
                style={{
                  background: "#6b7280",
                  color: "white",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {t("common.cancel")}
              </button>
            </div>
          </div>
        )}

        {/* Stations Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
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
              {t("admin.loadingStations")}
            </div>
          ) : (
            filteredStations.map((station) => (
              <div
                key={station.id}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  border:
                    station.status === "online"
                      ? "2px solid #22c55e"
                      : station.status === "offline"
                        ? "2px solid #ef4444"
                        : "2px solid #f59e0b",
                }}
              >
                {/* Station Header */}
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
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      {station.name}
                    </h3>
                    <select
                      value={station.status}
                      onChange={(e) =>
                        handleStatusChange(station.id, e.target.value)
                      }
                      style={{
                        padding: "0.375rem 0.5rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #d1d5db",
                        fontSize: "0.75rem",
                        background:
                          station.status === "online"
                            ? "#f0fdf4"
                            : station.status === "offline"
                              ? "#fef2f2"
                              : "#fef3c7",
                        color:
                          station.status === "online"
                            ? "#166534"
                            : station.status === "offline"
                              ? "#991b1b"
                              : "#92400e",
                      }}
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    📍 {station.location.address}
                  </p>

                  {/* Station Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        background: "#f9fafb",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Available Slots
                      </div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#22c55e",
                        }}
                      >
                        {station.availableSlots}/{station.capacity}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#f9fafb",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Revenue
                      </div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#1f2937",
                        }}
                      >
                        ${station.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Station Actions */}
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    background: "#f9fafb",
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {t("admin.viewDetails")}
                  </button>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => setSelectedStation(station.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {t("admin.sendCommand")}
                  </button>
                  <button
                    onClick={() => handleDeleteStation(station.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {t("common.delete")}
                  </button>
                </div>

                {/* Last Seen */}
                <div
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderTop: "1px solid #f3f4f6",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                  }}
                >
                  Last seen: {new Date(station.lastSeen).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {filteredStations.length === 0 && !isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280",
            }}
          >
            No stations found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStations;
