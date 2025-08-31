import { NextResponse } from "next/server";

// GET /api/v1/admin/stations/{stationId} - Get specific station
export async function GET(request, { params }) {
  try {
    const { stationId } = params;

    if (!stationId) {
      return NextResponse.json(
        { error: "Station ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Fetching station details - ID: ${stationId}`);

    // Mock station data
    const station = {
      id: stationId,
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
      powerBanks: [
        { id: "pb_001", slotNumber: 1, batteryLevel: 85, status: "available" },
        { id: "pb_004", slotNumber: 2, batteryLevel: 92, status: "available" },
        { id: "pb_007", slotNumber: 4, batteryLevel: 78, status: "available" },
      ],
      createdAt: "2024-01-01T00:00:00Z",
      lastSeen: "2024-01-21T15:30:00Z",
      signalStrength: 85,
      revenue: 1250.75,
      totalRentals: 342,
      maintenanceHistory: [
        {
          date: "2024-01-15T10:00:00Z",
          type: "routine",
          notes: "Regular cleaning and inspection",
        },
        {
          date: "2024-01-10T14:30:00Z",
          type: "repair",
          notes: "Fixed slot 3 mechanism",
        },
      ],
    };

    const response = {
      success: true,
      data: { station },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin station GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/stations/{stationId} - Update station
export async function PUT(request, { params }) {
  try {
    const { stationId } = params;
    const body = await request.json();

    if (!stationId) {
      return NextResponse.json(
        { error: "Station ID is required" },
        { status: 400 },
      );
    }

    const { name, address, coordinates, capacity, status } = body;

    console.log(`Admin: Updating station - ID: ${stationId}`);

    const updatedStation = {
      id: stationId,
      name: name || "Downtown Mall Station",
      location: {
        address: address || "123 Main St, Downtown",
        coordinates: coordinates || { lat: 40.7128, lng: -74.006 },
        city: body.city || "New York",
        country: body.country || "USA",
      },
      status: status || "online",
      capacity: capacity || 8,
      updatedAt: new Date().toISOString(),
    };

    const response = {
      success: true,
      message: "Station updated successfully",
      data: { station: updatedStation },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin station PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/stations/{stationId} - Delete station
export async function DELETE(request, { params }) {
  try {
    const { stationId } = params;

    if (!stationId) {
      return NextResponse.json(
        { error: "Station ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Deleting station - ID: ${stationId}`);

    const response = {
      success: true,
      message: "Station deleted successfully",
      data: {
        deletedStationId: stationId,
        deletedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin station DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
