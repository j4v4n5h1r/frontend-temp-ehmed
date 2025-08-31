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
      `Confirming return - Rental: ${rentalId}, PowerBank: ${powerBankId}, Slot: ${slotNumber}, Status: ${statusCode}`,
    );

    // Process return confirmation logic here
    // This would typically:
    // 1. Validate rental exists and is in pending_return status
    // 2. Check if return was successful (statusCode === 0)
    // 3. Finalize rental with end time and final charges
    // 4. Process payment for the rental
    // 5. Update power bank status to 'available'
    // 6. Update station inventory
    // 7. Send receipt and confirmation to user

    let message,
      rentalStatus,
      finalAmount = 0;

    if (statusCode === 0) {
      message = "Return confirmed and rental finalized";
      rentalStatus = "completed";

      // Mock final calculation
      const mockRental = {
        startTime: "2024-01-21T12:00:00Z",
        ratePerMinute: 0.08,
        baseFee: 1.0,
      };

      const startTime = new Date(mockRental.startTime);
      const endTime = new Date();
      const durationMinutes = Math.floor((endTime - startTime) / (1000 * 60));
      finalAmount =
        Math.round(
          (mockRental.baseFee + durationMinutes * mockRental.ratePerMinute) *
            100,
        ) / 100;
    } else {
      message = "Return failed";
      rentalStatus = "return_failed";
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
        endTime: statusCode === 0 ? new Date().toISOString() : null,
        statusCode,
        statusMessage:
          statusCode === 0
            ? "Success"
            : statusCode === 1
              ? "Slot Occupied"
              : statusCode === 2
                ? "Mechanical Error"
                : statusCode === 3
                  ? "Power Bank Detection Failed"
                  : "Unknown Error",
        finalCharges:
          statusCode === 0
            ? {
                amount: finalAmount,
                currency: "USD",
                breakdown: {
                  baseFee: 1.0,
                  usageFee: finalAmount - 1.0,
                  totalDuration: Math.floor(
                    (new Date() - new Date("2024-01-21T12:00:00Z")) /
                      (1000 * 60),
                  ),
                },
              }
            : null,
        receiptId: statusCode === 0 ? `receipt_${Date.now()}` : null,
      },
    };

    return NextResponse.json(response, {
      status: statusCode === 0 ? 200 : 400,
    });
  } catch (error) {
    console.error("Rental confirm-return error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
