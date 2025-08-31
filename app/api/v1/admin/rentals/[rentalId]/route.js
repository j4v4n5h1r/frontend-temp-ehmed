import { NextResponse } from "next/server";

// GET /api/v1/admin/rentals/{rentalId} - Get rental details (admin view)
export async function GET(request, { params }) {
  try {
    const { rentalId } = params;

    if (!rentalId) {
      return NextResponse.json(
        { error: "Rental ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Fetching rental details - ID: ${rentalId}`);

    // Mock detailed rental data for admin
    const rental = {
      id: rentalId,
      userId: "user_001",
      userDetails: {
        id: "user_001",
        email: "john.doe@example.com",
        name: "John Doe",
        phone: "+1234567890",
        registeredAt: "2024-01-15T10:30:00Z",
        totalRentals: 25,
        averageRating: 4.8,
      },
      powerBankId: "pb_123",
      powerBankDetails: {
        id: "pb_123",
        serialNumber: "PB2024001",
        model: "PowerBank Pro 10K",
        capacity: 10000,
        batteryLevel: 85,
        cycleCount: 245,
        health: "good",
      },
      status: "completed",
      startStationId: "st_001",
      endStationId: "st_001",
      stationDetails: {
        startStation: {
          id: "st_001",
          name: "Downtown Mall Station",
          address: "123 Main St, Downtown",
          coordinates: { lat: 40.7128, lng: -74.006 },
        },
        endStation: {
          id: "st_001",
          name: "Downtown Mall Station",
          address: "123 Main St, Downtown",
          coordinates: { lat: 40.7128, lng: -74.006 },
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
          discounts: 0.0,
        },
        ratePerMinute: 0.085,
      },
      payment: {
        id: "pay_001",
        status: "success",
        amount: 12.5,
        processedAt: "2024-01-21T16:45:00Z",
        paymentMethod: {
          type: "card",
          last4: "4242",
          brand: "visa",
        },
      },
      timeline: [
        {
          timestamp: "2024-01-21T14:30:00Z",
          event: "rental_initiated",
          description: "Rental initiated via QR scan",
          actor: "user",
        },
        {
          timestamp: "2024-01-21T14:30:05Z",
          event: "dispense_confirmed",
          description: "Power bank successfully dispensed from slot 3",
          actor: "station",
        },
        {
          timestamp: "2024-01-21T16:44:30Z",
          event: "return_initiated",
          description: "User initiated return process",
          actor: "user",
        },
        {
          timestamp: "2024-01-21T16:45:00Z",
          event: "return_confirmed",
          description: "Power bank returned to slot 5",
          actor: "station",
        },
        {
          timestamp: "2024-01-21T16:45:05Z",
          event: "payment_processed",
          description: "Payment of $12.50 processed successfully",
          actor: "system",
        },
      ],
      issues: [],
      adminActions: [
        {
          timestamp: "2024-01-21T16:50:00Z",
          action: "rental_reviewed",
          adminId: "admin_001",
          notes: "Standard rental completion - no issues",
        },
      ],
      adminNotes: null,
      tags: ["completed", "no_issues"],
      metadata: {
        userLocation: {
          lat: 40.7128,
          lng: -74.006,
        },
        deviceInfo: {
          type: "mobile",
          os: "iOS",
          app_version: "1.2.0",
        },
        qrCodeData: "QR_ST001_SLOT3",
        ipAddress: "192.168.1.100",
      },
      rating: {
        score: 5,
        comment: "Great service, easy to use!",
        ratedAt: "2024-01-21T17:00:00Z",
      },
      createdAt: "2024-01-21T14:30:00Z",
      updatedAt: "2024-01-21T16:45:05Z",
    };

    const response = {
      success: true,
      data: { rental },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin rental detail error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/rentals/{rentalId} - Update rental (admin only)
export async function PUT(request, { params }) {
  try {
    const { rentalId } = params;
    const body = await request.json();

    if (!rentalId) {
      return NextResponse.json(
        { error: "Rental ID is required" },
        { status: 400 },
      );
    }

    const { status, endTime, cost, adminNotes, tags } = body;

    // Validate status if provided
    if (status) {
      const validStatuses = [
        "active",
        "completed",
        "failed",
        "cancelled",
        "disputed",
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          },
          { status: 400 },
        );
      }
    }

    console.log(`Admin: Updating rental - ID: ${rentalId}, Status: ${status}`);

    const updatedRental = {
      id: rentalId,
      status: status || "active",
      endTime: endTime || null,
      cost: cost || null,
      adminNotes: adminNotes || null,
      tags: tags || [],
      updatedAt: new Date().toISOString(),
      updatedBy: "admin_user_id",
      adminActions: [
        {
          timestamp: new Date().toISOString(),
          action: "admin_update",
          adminId: "admin_user_id",
          changes: { status, endTime, cost, adminNotes, tags },
        },
      ],
    };

    const response = {
      success: true,
      message: "Rental updated successfully",
      data: { rental: updatedRental },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin rental PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/rentals/{rentalId} - Delete rental (admin only)
export async function DELETE(request, { params }) {
  try {
    const { rentalId } = params;

    if (!rentalId) {
      return NextResponse.json(
        { error: "Rental ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const reason = searchParams.get("reason") || "Admin deletion";
    const forceDelete = searchParams.get("force") === "true";

    console.log(`Admin: Deleting rental - ID: ${rentalId}, Reason: ${reason}`);

    // In a real implementation, this would:
    // 1. Check if rental can be deleted (not active, payments processed, etc.)
    // 2. Handle associated payment refunds if needed
    // 3. Update power bank and station status
    // 4. Log deletion for audit trail

    const response = {
      success: true,
      message: "Rental deleted successfully",
      data: {
        deletedRentalId: rentalId,
        deletedAt: new Date().toISOString(),
        deletedBy: "admin_user_id",
        reason,
        forceDelete,
        affectedRecords: {
          payments: 1,
          powerBanks: 1,
          stations: 1,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin rental DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
