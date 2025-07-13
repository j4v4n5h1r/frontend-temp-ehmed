import { NextResponse } from "next/server";

// GET /api/v1/admin/stations/ - Get all stations
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";

    console.log(
      `Admin: Fetching stations - Page: ${page}, Limit: ${limit}, Status: ${status}`,
    );

    // Mock stations data
    const stations = [
      {
        id: "st_001",
        name: "Downtown Mall Station",
        location: {
          address: "123 Main St, Downtown",
          coordinates: { lat: 40.7128, lng: -74.006 },
          city: "New York",
          country: "USA",
        },
        status: "online",
        capacity: 8,
        availableSlots: 5,
        powerBanks: ["pb_001", "pb_004", "pb_007"],
        lastSeen: "2024-01-21T15:30:00Z",
        signalStrength: 85,
        revenue: 1250.75,
        totalRentals: 342,
      },
      {
        id: "st_002",
        name: "Airport Terminal 1",
        location: {
          address: "Terminal 1, JFK Airport",
          coordinates: { lat: 40.6413, lng: -73.7781 },
          city: "New York",
          country: "USA",
        },
        status: "maintenance",
        capacity: 12,
        availableSlots: 0,
        powerBanks: ["pb_003", "pb_008"],
        lastSeen: "2024-01-21T12:15:00Z",
        signalStrength: 92,
        revenue: 2180.5,
        totalRentals: 589,
      },
    ];

    // Filter by status if provided
    let filteredStations = stations;
    if (status) {
      filteredStations = stations.filter(
        (station) => station.status === status,
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
        stats: {
          total: stations.length,
          online: stations.filter((s) => s.status === "online").length,
          offline: stations.filter((s) => s.status === "offline").length,
          maintenance: stations.filter((s) => s.status === "maintenance")
            .length,
          totalRevenue: stations.reduce((sum, s) => sum + s.revenue, 0),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin stations GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/stations/ - Create new station
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, address, coordinates, capacity } = body;

    if (!name || !address || !coordinates || !capacity) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, address, coordinates, capacity",
        },
        { status: 400 },
      );
    }

    if (capacity < 1 || capacity > 20) {
      return NextResponse.json(
        { error: "Capacity must be between 1 and 20" },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Creating station - Name: ${name}, Capacity: ${capacity}`,
    );

    const newStation = {
      id: `st_${Date.now()}`,
      name,
      location: {
        address,
        coordinates,
        city: body.city || "",
        country: body.country || "",
      },
      status: "offline",
      capacity,
      availableSlots: capacity,
      powerBanks: [],
      createdAt: new Date().toISOString(),
      lastSeen: null,
      signalStrength: 0,
      revenue: 0,
      totalRentals: 0,
    };

    const response = {
      success: true,
      message: "Station created successfully",
      data: { station: newStation },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Admin stations POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
