import { NextResponse } from "next/server";

// GET /api/v1/stations - Get public stations list
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radius = parseFloat(searchParams.get("radius") || "10"); // km
    const status = searchParams.get("status") || ""; // online, offline, maintenance

    console.log(
      `Fetching public stations - Page: ${page}, Location: ${lat},${lng}, Radius: ${radius}km`,
    );

    // Process stations retrieval logic here
    // This would typically:
    // 1. Query active/public stations from database
    // 2. Filter by location if coordinates provided
    // 3. Include real-time availability and status
    // 4. Calculate distance from user location
    // 5. Sort by distance or availability

    // Mock stations data
    const allStations = [
      {
        id: "st_001",
        name: "Downtown Mall Station",
        location: {
          address: "123 Main St, Downtown",
          coordinates: { lat: 40.7128, lng: -74.006 },
          city: "New York",
          state: "NY",
          country: "USA",
          zipCode: "10001",
        },
        status: "online",
        capacity: 8,
        availableSlots: 5,
        availablePowerBanks: 3,
        pricing: {
          baseFee: 1.0,
          ratePerMinute: 0.08,
          currency: "USD",
        },
        features: ["24/7", "covered", "security_camera", "lighting"],
        distance: lat && lng ? 2.3 : null, // km from user location
        lastUpdated: "2024-01-21T15:30:00Z",
        qrCode: "QR_ST001_MAIN",
        operationalHours: {
          allDay: true,
          timezone: "America/New_York",
        },
      },
      {
        id: "st_002",
        name: "Airport Terminal 1",
        location: {
          address: "Terminal 1, JFK Airport",
          coordinates: { lat: 40.6413, lng: -73.7781 },
          city: "New York",
          state: "NY",
          country: "USA",
          zipCode: "11430",
        },
        status: "online",
        capacity: 12,
        availableSlots: 8,
        availablePowerBanks: 7,
        pricing: {
          baseFee: 1.0,
          ratePerMinute: 0.08,
          currency: "USD",
        },
        features: ["24/7", "indoor", "security_camera", "high_traffic"],
        distance: lat && lng ? 15.7 : null,
        lastUpdated: "2024-01-21T15:25:00Z",
        qrCode: "QR_ST002_JFK",
        operationalHours: {
          allDay: true,
          timezone: "America/New_York",
        },
      },
      {
        id: "st_003",
        name: "Central Park Station",
        location: {
          address: "Central Park South, NYC",
          coordinates: { lat: 40.7829, lng: -73.9654 },
          city: "New York",
          state: "NY",
          country: "USA",
          zipCode: "10019",
        },
        status: "online",
        capacity: 6,
        availableSlots: 2,
        availablePowerBanks: 1,
        pricing: {
          baseFee: 1.0,
          ratePerMinute: 0.08,
          currency: "USD",
        },
        features: ["outdoor", "scenic", "lighting"],
        distance: lat && lng ? 5.1 : null,
        lastUpdated: "2024-01-21T15:28:00Z",
        qrCode: "QR_ST003_CP",
        operationalHours: {
          allDay: false,
          hours: {
            monday: { open: "06:00", close: "22:00" },
            tuesday: { open: "06:00", close: "22:00" },
            wednesday: { open: "06:00", close: "22:00" },
            thursday: { open: "06:00", close: "22:00" },
            friday: { open: "06:00", close: "22:00" },
            saturday: { open: "06:00", close: "22:00" },
            sunday: { open: "06:00", close: "22:00" },
          },
          timezone: "America/New_York",
        },
      },
      {
        id: "st_004",
        name: "Times Square Station",
        location: {
          address: "Times Square, NYC",
          coordinates: { lat: 40.758, lng: -73.9855 },
          city: "New York",
          state: "NY",
          country: "USA",
          zipCode: "10036",
        },
        status: "maintenance",
        capacity: 10,
        availableSlots: 0,
        availablePowerBanks: 0,
        pricing: {
          baseFee: 1.0,
          ratePerMinute: 0.08,
          currency: "USD",
        },
        features: ["24/7", "high_traffic", "security_camera", "covered"],
        distance: lat && lng ? 3.8 : null,
        lastUpdated: "2024-01-21T12:00:00Z",
        qrCode: "QR_ST004_TS",
        operationalHours: {
          allDay: true,
          timezone: "America/New_York",
        },
        maintenanceInfo: {
          reason: "Scheduled maintenance",
          estimatedCompletion: "2024-01-22T09:00:00Z",
        },
      },
    ];

    // Filter by status if provided
    let filteredStations = status
      ? allStations.filter((station) => station.status === status)
      : allStations.filter((station) => station.status !== "offline"); // Hide offline stations from public

    // Filter by location if coordinates provided
    if (lat && lng && radius) {
      filteredStations = filteredStations.filter((station) => {
        if (!station.distance) return true; // Include if distance not calculated
        return station.distance <= radius;
      });
    }

    // Sort by distance if location provided, otherwise by availability
    if (lat && lng) {
      filteredStations.sort(
        (a, b) => (a.distance || 999) - (b.distance || 999),
      );
    } else {
      filteredStations.sort(
        (a, b) => b.availablePowerBanks - a.availablePowerBanks,
      );
    }

    const response = {
      success: true,
      data: {
        stations: filteredStations.slice((page - 1) * limit, page * limit),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredStations.length / limit),
          totalStations: filteredStations.length,
          hasNext: page * limit < filteredStations.length,
          hasPrev: page > 1,
        },
        summary: {
          totalOnlineStations: allStations.filter((s) => s.status === "online")
            .length,
          totalAvailablePowerBanks: allStations
            .filter((s) => s.status === "online")
            .reduce((sum, s) => sum + s.availablePowerBanks, 0),
          averageDistance:
            lat && lng
              ? Math.round(
                  (filteredStations.reduce(
                    (sum, s) => sum + (s.distance || 0),
                    0,
                  ) /
                    filteredStations.length) *
                    10,
                ) / 10
              : null,
        },
        filters: {
          location: lat && lng ? { lat, lng, radius } : null,
          status: status || "all",
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Public stations list error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
