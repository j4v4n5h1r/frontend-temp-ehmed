"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Map from "../../components/Map";
import { useTranslation } from "../../context/TranslationContext";

const BASE_URL = "http://164.90.238.202:8000";

const StationsPage = () => {
  const { t } = useTranslation();
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
      let errorMessage = t("stations.unableToLoadStations");

      if (err.code === "ECONNABORTED") {
        errorMessage = t("rentals.requestTimeout");
      } else if (err.response) {
        // Server responded with error status
        console.error("Server error:", err.response.status, err.response.data);
        errorMessage = `${t("rentals.serverError")}: ${err.response.status} - ${err.response.data?.message || t("rentals.unexpectedError")}`;
      } else if (err.request) {
        // Request was made but no response received
        console.error("Network error:", err.request);
        errorMessage = t("rentals.networkError");
      } else {
        // Something else happened
        console.error("Unexpected error:", err.message);
        errorMessage = `${t("rentals.unexpectedError")}: ${err.message}`;
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6 animate-float">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
            {t("stations.stationLocations")}
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {t("stations.findNearbyStations")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg border border-neutral-200">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
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
              placeholder={t("stations.searchStations")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 text-base border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                {t("stations.stationLocations")}
              </h2>
              <p className="text-sm text-neutral-600">
                {t("stations.findClosestStations")}
              </p>
            </div>
          </div>
          <Map stations={stations} showCurrentLocation={true} height="450px" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center p-8 sm:p-12 bg-white rounded-xl sm:rounded-2xl shadow-lg">
            <div className="w-8 h-8 border-3 border-neutral-200 border-t-primary-500 rounded-full animate-spin mr-4"></div>
            <span className="text-lg text-neutral-600">
              {t("stations.loadingStations")}
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-red-500"
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
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {t("stations.unableToLoadStations")}
            </h3>
            <p className="text-sm sm:text-base mb-6 text-red-700">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchStations}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
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
                {t("stations.tryAgain")}
              </button>
              <Link
                href="/debug"
                className="flex items-center justify-center gap-2 bg-white text-red-600 border border-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("stations.debugAPI")}
              </Link>
            </div>
          </div>
        )}

        {/* Stations Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {filteredStations.map((station) => {
              const statusColors = getStatusColor(station.status);
              return (
                <div
                  key={station.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-neutral-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Station Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1 truncate">
                        {station.name || `Station ${station.id}`}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 truncate">
                        ID: {station.id}
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2"
                      style={{
                        background: statusColors.bg,
                        border: `1px solid ${statusColors.border}`,
                        color: statusColors.text,
                      }}
                    >
                      {station.status}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start mb-4">
                    <svg
                      className="w-4 h-4 text-neutral-400 mt-0.5 mr-2 flex-shrink-0"
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
                    <span className="text-sm text-neutral-600 leading-tight">
                      {station.location || t("stations.locationNotSpecified")}
                    </span>
                  </div>

                  {/* Power Banks Count */}
                  <div className="flex items-center mb-6">
                    <svg
                      className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-neutral-600">
                      {station.availablePowerbanks || 0} /{" "}
                      {station.totalPowerbanks || 0} {t("stations.available")}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/rental?stationId=${station.id}`}
                    className="block"
                  >
                    <button
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-primary-600 hover:to-primary-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                      disabled={
                        station.status !== "ACTIVE" ||
                        (station.availablePowerbanks || 0) === 0
                      }
                    >
                      <svg
                        className="w-4 h-4"
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
                      {station.status === "ACTIVE" &&
                      (station.availablePowerbanks || 0) > 0
                        ? "Rent from Station"
                        : station.status === "MAINTENANCE"
                          ? "Under Maintenance"
                          : station.status === "OFFLINE"
                            ? "Station Offline"
                            : "Not Available"}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStations.length === 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <svg
              className="w-16 h-16 text-neutral-300 mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No stations found
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No stations are available at this time"}
            </p>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-500 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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
    </div>
  );
};

export default StationsPage;
