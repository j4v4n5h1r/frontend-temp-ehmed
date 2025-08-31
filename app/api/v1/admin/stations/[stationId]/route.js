import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// GET /api/v1/admin/stations/[stationId] - Get specific station
export async function GET(request, { params }) {
  try {
    const { stationId } = params;
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Fetching station - ID: ${stationId}`);

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/stations/${stationId}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch station" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
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
      data: { station: transformedStation },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin station GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/stations/[stationId] - Update specific station
export async function PUT(request, { params }) {
  try {
    const { stationId } = params;
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Updating station - ID: ${stationId}`);

    // Transform frontend data to backend format
    const { name, address, latitude, longitude, totalSlots, status, config } = body;

    const stationData = {
      name,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      total_slots: parseInt(totalSlots),
      status: status || "ONLINE",
      config: config || {},
    };

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/stations/${stationId}`, {
      method: "PUT",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to update station" },
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
      message: "Station updated successfully",
      data: { station: transformedStation },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin station PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/stations/[stationId] - Delete specific station
export async function DELETE(request, { params }) {
  try {
    const { stationId } = params;
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Deleting station - ID: ${stationId}`);

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/stations/${stationId}`, {
      method: "DELETE",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to delete station" },
        { status: response.status },
      );
    }

    const responseData = {
      success: true,
      message: "Station deleted successfully",
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin station DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
