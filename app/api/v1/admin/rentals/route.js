import { NextResponse } from "next/server";

// GET /api/v1/admin/rentals/ - Get all rentals (admin view)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "";
    const userId = searchParams.get("userId") || "";
    const stationId = searchParams.get("stationId") || "";
    const startDate = searchParams.get("start_date") || "";
    const endDate = searchParams.get("end_date") || "";

    console.log(
      `Admin: Fetching rentals - Page: ${page}, Status: ${status}, User: ${userId}`,
    );

    // Mock rentals data for admin view
    const rentals = [
      {
        id: "rental_001",
        userId: "user_001",
        userDetails: {
          email: "john.doe@example.com",
          name: "John Doe",
          phone: "+1234567890",
        },
        powerBankId: "pb_123",
        status: "completed",
        startStationId: "st_001",
        endStationId: "st_001",
        stationDetails: {
          startStation: {
            name: "Downtown Mall Station",
            address: "123 Main St, Downtown",
          },
          endStation: {
            name: "Downtown Mall Station",
            address: "123 Main St, Downtown",
          },
        },
        startTime: "2024-01-21T14:30:00Z",
        endTime: "2024-01-21T16:45:00Z",
        duration: 135,
        cost: {
          amount: 12.5,
          currency: "USD",
          breakdown: {
            baseFee: 1.0,
            usageFee: 11.5,
            taxes: 0.0,
          },
        },
        payment: {
          id: "pay_001",
          status: "success",
          processedAt: "2024-01-21T16:45:00Z",
        },
        issues: [],
        adminNotes: null,
        createdAt: "2024-01-21T14:30:00Z",
        updatedAt: "2024-01-21T16:45:00Z",
      },
      {
        id: "rental_002",
        userId: "user_002",
        userDetails: {
          email: "jane.smith@example.com",
          name: "Jane Smith",
          phone: "+1234567891",
        },
        powerBankId: "pb_456",
        status: "active",
        startStationId: "st_002",
        endStationId: null,
        stationDetails: {
          startStation: {
            name: "Airport Terminal 1",
            address: "Terminal 1, JFK Airport",
          },
          endStation: null,
        },
        startTime: "2024-01-21T17:00:00Z",
        endTime: null,
        duration: Math.floor(
          (new Date() - new Date("2024-01-21T17:00:00Z")) / (1000 * 60),
        ),
        cost: {
          estimatedAmount: 5.25,
          currency: "USD",
        },
        payment: {
          id: null,
          status: "pending",
        },
        issues: [],
        adminNotes: null,
        createdAt: "2024-01-21T17:00:00Z",
        updatedAt: "2024-01-21T17:00:00Z",
      },
      {
        id: "rental_003",
        userId: "user_003",
        userDetails: {
          email: "mike.wilson@example.com",
          name: "Mike Wilson",
          phone: "+1234567892",
        },
        powerBankId: "pb_789",
        status: "failed",
        startStationId: "st_001",
        endStationId: null,
        stationDetails: {
          startStation: {
            name: "Downtown Mall Station",
            address: "123 Main St, Downtown",
          },
          endStation: null,
        },
        startTime: "2024-01-21T13:00:00Z",
        endTime: "2024-01-21T13:02:00Z",
        duration: 2,
        cost: {
          amount: 0,
          currency: "USD",
        },
        payment: {
          id: null,
          status: "not_required",
        },
        issues: [
          {
            type: "dispense_failed",
            description: "Power bank failed to dispense",
            reportedAt: "2024-01-21T13:01:00Z",
          },
        ],
        adminNotes: "Station maintenance required - slot 3 malfunction",
        createdAt: "2024-01-21T13:00:00Z",
        updatedAt: "2024-01-21T13:05:00Z",
      },
    ];

    // Apply filters
    let filteredRentals = rentals;

    if (status) {
      filteredRentals = filteredRentals.filter(
        (rental) => rental.status === status,
      );
    }

    if (userId) {
      filteredRentals = filteredRentals.filter(
        (rental) => rental.userId === userId,
      );
    }

    if (stationId) {
      filteredRentals = filteredRentals.filter(
        (rental) =>
          rental.startStationId === stationId ||
          rental.endStationId === stationId,
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredRentals = filteredRentals.filter((rental) => {
        const rentalDate = new Date(rental.startTime);
        return rentalDate >= start && rentalDate <= end;
      });
    }

    const response = {
      success: true,
      data: {
        rentals: filteredRentals.slice((page - 1) * limit, page * limit),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredRentals.length / limit),
          totalRentals: filteredRentals.length,
          hasNext: page * limit < filteredRentals.length,
          hasPrev: page > 1,
        },
        summary: {
          totalRentals: rentals.length,
          activeRentals: rentals.filter((r) => r.status === "active").length,
          completedRentals: rentals.filter((r) => r.status === "completed")
            .length,
          failedRentals: rentals.filter((r) => r.status === "failed").length,
          totalRevenue: rentals
            .filter((r) => r.status === "completed")
            .reduce((sum, r) => sum + (r.cost.amount || 0), 0),
          avgRentalDuration: Math.round(
            rentals
              .filter((r) => r.status === "completed")
              .reduce((sum, r) => sum + r.duration, 0) /
              rentals.filter((r) => r.status === "completed").length,
          ),
          issuesCount: rentals.reduce((sum, r) => sum + r.issues.length, 0),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin rentals GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/rentals/ - Create manual rental entry (admin only)
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userId,
      powerBankId,
      startStationId,
      startTime,
      endStationId,
      endTime,
      status,
      cost,
    } = body;

    if (!userId || !powerBankId || !startStationId || !startTime || !status) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: userId, powerBankId, startStationId, startTime, status",
        },
        { status: 400 },
      );
    }

    // Validate status
    const validStatuses = ["active", "completed", "failed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Creating manual rental - User: ${userId}, PowerBank: ${powerBankId}`,
    );

    const rentalId = `rental_admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newRental = {
      id: rentalId,
      userId,
      powerBankId,
      status,
      startStationId,
      endStationId: endStationId || null,
      startTime,
      endTime: endTime || null,
      duration: endTime
        ? Math.floor((new Date(endTime) - new Date(startTime)) / (1000 * 60))
        : null,
      cost: cost || { amount: 0, currency: "USD" },
      type: "manual_admin",
      createdBy: "admin_user_id",
      createdAt: new Date().toISOString(),
      adminNotes: "Manually created by admin",
      issues: [],
      payment: {
        id: null,
        status: status === "completed" ? "pending" : "not_required",
      },
    };

    const response = {
      success: true,
      message: "Manual rental created successfully",
      data: { rental: newRental },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Admin rentals POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
