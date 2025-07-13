import { NextResponse } from "next/server";

// GET /api/v1/admin/powerbanks/ - Get all power banks
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "";
    const stationId = searchParams.get("stationId") || "";

    console.log(
      `Admin: Fetching power banks - Page: ${page}, Limit: ${limit}, Status: ${status}, Station: ${stationId}`,
    );

    // Mock power banks data
    const powerBanks = [
      {
        id: "pb_001",
        serialNumber: "PB2024001",
        batteryLevel: 85,
        status: "available",
        stationId: "st_001",
        slotNumber: 1,
        lastRentedAt: "2024-01-20T10:30:00Z",
        cycleCount: 245,
        health: "good",
        temperature: 22.5,
        voltage: 3.7,
        capacity: 10000,
      },
      {
        id: "pb_002",
        serialNumber: "PB2024002",
        batteryLevel: 45,
        status: "rented",
        stationId: null,
        slotNumber: null,
        lastRentedAt: "2024-01-21T14:15:00Z",
        cycleCount: 189,
        health: "good",
        temperature: 25.1,
        voltage: 3.6,
        capacity: 10000,
      },
      {
        id: "pb_003",
        serialNumber: "PB2024003",
        batteryLevel: 12,
        status: "maintenance",
        stationId: "st_002",
        slotNumber: 3,
        lastRentedAt: "2024-01-19T08:45:00Z",
        cycleCount: 892,
        health: "poor",
        temperature: 28.7,
        voltage: 3.4,
        capacity: 8500,
      },
    ];

    // Filter by status if provided
    let filteredPowerBanks = powerBanks;
    if (status) {
      filteredPowerBanks = powerBanks.filter((pb) => pb.status === status);
    }
    if (stationId) {
      filteredPowerBanks = filteredPowerBanks.filter(
        (pb) => pb.stationId === stationId,
      );
    }

    const response = {
      success: true,
      data: {
        powerBanks: filteredPowerBanks.slice((page - 1) * limit, page * limit),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredPowerBanks.length / limit),
          totalPowerBanks: filteredPowerBanks.length,
          hasNext: page * limit < filteredPowerBanks.length,
          hasPrev: page > 1,
        },
        stats: {
          total: powerBanks.length,
          available: powerBanks.filter((pb) => pb.status === "available")
            .length,
          rented: powerBanks.filter((pb) => pb.status === "rented").length,
          maintenance: powerBanks.filter((pb) => pb.status === "maintenance")
            .length,
          avgBatteryLevel: Math.round(
            powerBanks.reduce((sum, pb) => sum + pb.batteryLevel, 0) /
              powerBanks.length,
          ),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin powerbanks GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
