import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mypobi.com";

// GET /api/v1/admin/stations/ - Get all stations
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    console.log(
      `Admin: Fetching stations - Page: ${page}, Limit: ${limit}, Search: ${search}`,
    );

    // Get authorization header from the request
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    // Forward the request to the backend
    const queryParams = new URLSearchParams({
      skip: ((page - 1) * limit).toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/stations/?${queryParams}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch stations" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
    const transformedStations = data.map(station => ({
      id: station.station_id,
      name: station.name,
      address: station.address,
      latitude: station.latitude,
      longitude: station.longitude,
      totalSlots: station.total_slots,
      availableSlots: station.available_slots,
      availableBanks: station.available_banks,
      status: station.status,
      lastHeartbeat: station.last_heartbeat,
      config: station.config || {},
    }));

    const responseData = {
      success: true,
      data: {
        stations: transformedStations,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(data.length / limit),
          totalStations: data.length,
          hasNext: page * limit < data.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(responseData, { status: 200 });
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
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    const { name, address, latitude, longitude, totalSlots, config } = body;

    if (!name || !address || latitude === undefined || longitude === undefined || !totalSlots) {
      return NextResponse.json(
        { error: "Missing required fields: name, address, latitude, longitude, totalSlots" },
        { status: 400 },
      );
    }

    console.log(`Admin: Creating station - Name: ${name}, Address: ${address}`);

    // Prepare data for backend
    const stationData = {
      name,
        address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      total_slots: parseInt(totalSlots),
      available_slots: parseInt(totalSlots), // Initially all slots are available
      available_banks: 0, // Initially no power banks
      status: "ONLINE",
      config: config || {},
    };

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/stations/`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to create station" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend response to match frontend expectations
    const transformedStation = {
      id: data.station_id,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      totalSlots: data.total_slots,
      availableSlots: data.available_slots,
      availableBanks: data.available_banks,
      status: data.status,
      lastHeartbeat: data.last_heartbeat,
      config: data.config || {},
    };

    const responseData = {
      success: true,
      message: "Station created successfully",
      data: { station: transformedStation },
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Admin stations POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
