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
    const { endStationId, slotNumber } = body;

    if (!endStationId || slotNumber === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: endStationId, slotNumber" },
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
      `Initiating return - Rental: ${rentalId}, EndStation: ${endStationId}, Slot: ${slotNumber}`,
    );

    // Process return initiation logic here
    // This would typically:
    // 1. Validate rental exists and is in active status
    // 2. Check if end station is available and has empty slots
    // 3. Verify the specified slot is available
    // 4. Calculate rental duration and cost
    // 5. Update rental record with return details
    // 6. Send return command to station
    // 7. Pre-calculate final charges

    // Mock rental data for calculation
    const mockRental = {
      id: rentalId,
      userId: "user_123",
      startStationId: "st_001",
      powerBankId: "pb_456",
      startTime: "2024-01-21T12:00:00Z",
      ratePerMinute: 0.08,
    };

    const startTime = new Date(mockRental.startTime);
    const returnTime = new Date();
    const durationMinutes = Math.floor((returnTime - startTime) / (1000 * 60));
    const calculatedAmount =
      Math.round(durationMinutes * mockRental.ratePerMinute * 100) / 100;

    const response = {
      success: true,
      data: {
        message: "Return initiated, awaiting confirmation",
        rentalId,
        endStationId,
        slotNumber,
        status: "pending_return",
        returnInitiatedAt: new Date().toISOString(),
        rentalSummary: {
          duration: durationMinutes,
          startTime: mockRental.startTime,
          endTime: returnTime.toISOString(),
          calculatedAmount,
          currency: "USD",
        },
        maxWaitTime: 30, // seconds to complete return
        expiresAt: new Date(Date.now() + 30 * 1000).toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Rental return error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
