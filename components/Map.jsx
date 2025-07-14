"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006, // New York City
};

const defaultZoom = 12;

// Mock station data with coordinates
const mockStations = [
  {
    id: "STATION001",
    name: "Central Station",
    location: "Downtown Mall, Level 1",
    status: "ACTIVE",
    availablePowerbanks: 8,
    totalPowerbanks: 12,
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: "STATION002",
    name: "Airport Terminal",
    location: "International Airport, Gate A",
    status: "ACTIVE",
    availablePowerbanks: 5,
    totalPowerbanks: 10,
    coordinates: { lat: 40.6892, lng: -74.1745 },
  },
  {
    id: "STATION003",
    name: "University Campus",
    location: "Student Center, Main Floor",
    status: "MAINTENANCE",
    availablePowerbanks: 0,
    totalPowerbanks: 8,
    coordinates: { lat: 40.7282, lng: -73.9942 },
  },
  {
    id: "STATION004",
    name: "Coffee Shop",
    location: "Main Street Café",
    status: "OFFLINE",
    availablePowerbanks: 0,
    totalPowerbanks: 6,
    coordinates: { lat: 40.7614, lng: -73.9776 },
  },
  {
    id: "STATION005",
    name: "Shopping Center",
    location: "West Side Mall, Food Court",
    status: "ACTIVE",
    availablePowerbanks: 12,
    totalPowerbanks: 15,
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
];

const Map = ({
  stations = mockStations,
  showCurrentLocation = true,
  height = "400px",
}) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [locationPermission, setLocationPermission] = useState("asking"); // 'asking', 'granted', 'denied'
  const [sortedStations, setSortedStations] = useState(stations);

  // Check if Google Maps API key is available
  const hasValidApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY &&
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "YOUR_API_KEY_HERE" &&
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.length > 10;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  useEffect(() => {
    if (showCurrentLocation && navigator.geolocation) {
      setLocationPermission("asking");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          setLocationPermission("granted");

          // Sort stations by distance from user location
          const stationsWithDistance = stations
            .map((station) => ({
              ...station,
              distance: calculateDistance(
                location.lat,
                location.lng,
                station.coordinates.lat,
                station.coordinates.lng,
              ),
            }))
            .sort((a, b) => a.distance - b.distance);

          setSortedStations(stationsWithDistance);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setLocationPermission("denied");
          // Use all stations in default order if location denied
          setSortedStations(stations);
        },
      );
    } else {
      setSortedStations(stations);
    }
  }, [showCurrentLocation, stations]);

  const getMarkerIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return {
          fillColor: "#22c55e",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        };
      case "MAINTENANCE":
        return {
          fillColor: "#f59e0b",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        };
      case "OFFLINE":
        return {
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        };
      default:
        return {
          fillColor: "#6b7280",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        };
    }
  };

  const getUserLocationIcon = () => ({
    fillColor: "#3b82f6",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 3,
    scale: 10,
    path: "M12 12m-8 0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0",
  });

  // Show fallback UI if no valid API key
  if (!hasValidApiKey) {
    return (
      <div className="w-full">
        <div
          className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-xl border border-primary-200 overflow-hidden"
          style={{ height }}
        >
          {/* Header with location status */}
          <div className="bg-white/90 backdrop-blur-sm p-4 border-b border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">
                    Station Locations
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {locationPermission === "granted"
                      ? "Showing closest stations to you"
                      : locationPermission === "denied"
                        ? "Showing all available stations"
                        : "Getting your location..."}
                  </p>
                </div>
              </div>
              {userLocation && (
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Your location</span>
                </div>
              )}
            </div>
          </div>

          {/* Station List */}
          <div className="p-4 h-full overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sortedStations.slice(0, 6).map((station, index) => (
                <div
                  key={station.id}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          station.status === "ACTIVE"
                            ? "bg-green-500"
                            : station.status === "MAINTENANCE"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-medium text-neutral-800">
                        {station.name}
                      </span>
                    </div>
                    {station.distance && (
                      <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {station.distance.toFixed(1)}km
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">
                    {station.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">
                      {station.availablePowerbanks}/{station.totalPowerbanks}{" "}
                      available
                    </span>
                    {station.status === "ACTIVE" &&
                      station.availablePowerbanks > 0 && (
                        <button
                          onClick={() =>
                            (window.location.href = `/rental?stationId=${station.id}`)
                          }
                          className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
                        >
                          Rent
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
            {sortedStations.length > 6 && (
              <div className="text-center mt-4">
                <p className="text-sm text-neutral-600">
                  Showing {Math.min(6, sortedStations.length)} of{" "}
                  {sortedStations.length} stations
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active Stations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Under Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        className="flex items-center justify-center bg-neutral-100 rounded-xl"
        style={{ height }}
      >
        <div className="text-center">
          <svg
            className="w-12 h-12 text-neutral-400 mx-auto mb-4"
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
          <p className="text-neutral-600 font-medium">Unable to load map</p>
          <p className="text-neutral-500 text-sm">
            Please check your internet connection
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center bg-neutral-100 rounded-xl animate-pulse"
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-neutral-300 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={{ ...mapContainerStyle, height }}
        center={mapCenter}
        zoom={defaultZoom}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={getUserLocationIcon()}
            title="Your Location"
            zIndex={1000}
          />
        )}

        {/* Station markers */}
        {sortedStations.map((station) => (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={getMarkerIcon(station.status)}
            title={
              station.name +
              (station.distance
                ? ` (${station.distance.toFixed(1)}km away)`
                : "")
            }
            onClick={() => setSelectedStation(station)}
          />
        ))}

        {/* Info window for selected station */}
        {selectedStation && (
          <InfoWindow
            position={selectedStation.coordinates}
            onCloseClick={() => setSelectedStation(null)}
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-neutral-900 mb-1">
                {selectedStation.name}
              </h3>
              <p className="text-sm text-neutral-600 mb-2">
                {selectedStation.location}
              </p>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedStation.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : selectedStation.status === "MAINTENANCE"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedStation.status}
                </span>
                {selectedStation.distance && (
                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    {selectedStation.distance.toFixed(1)}km away
                  </span>
                )}
              </div>
              <div className="text-sm text-neutral-700">
                <span className="font-medium">Available:</span>{" "}
                {selectedStation.availablePowerbanks}/
                {selectedStation.totalPowerbanks}
              </div>
              {selectedStation.status === "ACTIVE" &&
                selectedStation.availablePowerbanks > 0 && (
                  <button
                    className="mt-2 w-full bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
                    onClick={() => {
                      window.location.href = `/rental?stationId=${selectedStation.id}`;
                    }}
                  >
                    Rent Here
                  </button>
                )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Active Stations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Under Maintenance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Offline</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
