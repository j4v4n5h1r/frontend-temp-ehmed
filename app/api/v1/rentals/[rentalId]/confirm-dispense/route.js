import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { rentalId } = params;
    const body = await request.json();

    if (!rentalId) {
      return NextResponse.json(
        { error: "Rental ID is required" },
        { status: 400 },
      );
    }

    // Validate required fields
    const { powerBankId, slotNumber, statusCode } = body;

    if (!powerBankId || slotNumber === undefined || statusCode === undefined) {
      return NextResponse.json(
        {
          error: "Missing required fields: powerBankId, slotNumber, statusCode",
        },
        { status: 400 },
      );
    }

    // Validate slot number is positive
    if (slotNumber < 1) {
      return NextResponse.json(
        { error: "slotNumber must be a positive integer" },
        { status: 400 },
      );
    }

    console.log(
      `Confirming dispense - Rental: ${rentalId}, PowerBank: ${powerBankId}, Slot: ${slotNumber}, Status: ${statusCode}`,
    );

    // Process dispense confirmation logic here
    // This would typically:
    // 1. Validate rental exists and is in pending_dispense status
    // 2. Check if dispense was successful (statusCode === 0)
    // 3. Update rental record with power bank and slot details
    // 4. Start rental timer for billing
    // 5. Update power bank status to 'rented'
    // 6. Send confirmation to user

    let message, rentalStatus;

    if (statusCode === 0) {
      message = "Dispense confirmed";
      rentalStatus = "active";
    } else {
      message = "Dispense failed";
      rentalStatus = "failed";
    }

    const response = {
      success: statusCode === 0,
      data: {
        message,
        rentalId,
        powerBankId: statusCode === 0 ? powerBankId : null,
        slotNumber: statusCode === 0 ? slotNumber : null,
        status: rentalStatus,
        confirmedAt: new Date().toISOString(),
        startTime: statusCode === 0 ? new Date().toISOString() : null,
        statusCode,
        statusMessage:
          statusCode === 0
            ? "Success"
            : statusCode === 1
              ? "Slot Empty"
              : statusCode === 2
                ? "Mechanical Error"
                : statusCode === 3
                  ? "Power Bank Malfunction"
                  : "Unknown Error",
      },
    };

    return NextResponse.json(response, {
      status: statusCode === 0 ? 200 : 400,
    });
  } catch (error) {
    console.error("Rental confirm-dispense error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
