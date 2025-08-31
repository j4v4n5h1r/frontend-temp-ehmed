import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { stationId, slotNum, powerBankId, statusCode } = body;

    if (
      !stationId ||
      slotNum === undefined ||
      !powerBankId ||
      statusCode === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: stationId, slotNum, powerBankId, statusCode",
        },
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

    // Log rental status update
    console.log(
      `Rental status update - Station: ${stationId}, Slot: ${slotNum}, PowerBank: ${powerBankId}, Status: ${statusCode}`,
    );

    // Process rental status logic here
    // This would typically:
    // 1. Update power bank rental status in database
    // 2. Record slot occupancy status
    // 3. Update rental transaction records
    // 4. Trigger notifications if needed

    // Mock response for demonstration
    const response = {
      success: true,
      message: "Rental status updated successfully",
      data: {
        stationId,
        slotNum,
        powerBankId,
        statusCode,
        timestamp: new Date().toISOString(),
        rentalStatus:
          statusCode === 0
            ? "Available"
            : statusCode === 1
              ? "Rented"
              : statusCode === 2
                ? "Reserved"
                : "Unknown",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Rental status error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
