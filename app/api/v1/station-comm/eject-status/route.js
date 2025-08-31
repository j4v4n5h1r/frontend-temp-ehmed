import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { stationId, slotNum, statusCode } = body;

    if (!stationId || slotNum === undefined || statusCode === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: stationId, slotNum, statusCode" },
        { status: 400 },
      );
    }

    // Validate slot number is positive
    if (slotNum < 1) {
      return NextResponse.json(
        { error: "slotNum must be a positive integer" },
        { status: 400 },
      );
    }

    // Log eject status update
    console.log(
      `Eject status update - Station: ${stationId}, Slot: ${slotNum}, Status: ${statusCode}`,
    );

    // Process eject status logic here
    // This would typically:
    // 1. Update slot eject mechanism status
    // 2. Record mechanical operation result
    // 3. Handle eject success/failure scenarios
    // 4. Trigger alerts for maintenance if needed

    // Mock response for demonstration
    const response = {
      success: true,
      message: "Eject status updated successfully",
      data: {
        stationId,
        slotNum,
        statusCode,
        timestamp: new Date().toISOString(),
        ejectStatus:
          statusCode === 0
            ? "Eject Successful"
            : statusCode === 1
              ? "Eject Failed"
              : statusCode === 2
                ? "Mechanical Error"
                : "Unknown",
        slotOperational: statusCode === 0,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Eject status error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
