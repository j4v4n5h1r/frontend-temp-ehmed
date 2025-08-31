import { NextResponse } from "next/server";

// PUT /api/v1/admin/stations/{stationId}/status - Update station status
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

    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Missing required field: status" },
        { status: 400 },
      );
    }

    // Validate status values
    const validStatuses = [
      "ONLINE",
      "OFFLINE",
      "MAINTENANCE",
      "OUT_OF_SERVICE",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Updating station status - ID: ${stationId}, Status: ${status}`,
    );

    // Process station status update logic here
    // This would typically:
    // 1. Update station status in database
    // 2. Send status change command to station hardware
    // 3. Log status change for audit trail
    // 4. Trigger notifications if status change affects operations

    const response = {
      success: true,
      message: "Station status updated successfully",
      data: {
        stationId,
        previousStatus: "ONLINE",
        newStatus: status,
        updatedAt: new Date().toISOString(),
        updatedBy: "admin_user_id",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin station status PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
