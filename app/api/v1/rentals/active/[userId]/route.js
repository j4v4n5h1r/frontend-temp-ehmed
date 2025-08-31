import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    console.log(`Fetching active rental for user: ${userId}`);

    // Process active rental lookup logic here
    // This would typically:
    // 1. Query database for active rental by user ID
    // 2. Check rental status (active, pending_dispense, pending_return)
    // 3. Include real-time information about duration and costs
    // 4. Return null if no active rental exists

    // Mock active rental check
    const hasActiveRental = Math.random() > 0.5; // 50% chance for demo

    if (!hasActiveRental) {
      const response = {
        success: true,
        data: {
          activeRental: null,
          message: "No active rental found",
        },
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Mock active rental data
    const activeRental = {
      id: "rental_active_123",
      userId,
      status: "active",
      powerBankId: "pb_789",
      startStationId: "st_001",
      startStationName: "Downtown Mall Station",
      startTime: "2024-01-21T14:30:00Z",
      currentDuration: Math.floor(
        (new Date() - new Date("2024-01-21T14:30:00Z")) / (1000 * 60),
      ), // minutes
      ratePerMinute: 0.08,
      baseFee: 1.0,
      currentCharges: 0, // Will be calculated
      powerBankDetails: {
        id: "pb_789",
        batteryLevel: 85,
        capacity: 10000,
        model: "PowerBank Pro 10K",
      },
      realTimeInfo: {
        elapsedTime: 0, // Will be calculated
        estimatedCost: 0, // Will be calculated
        maxAllowedDuration: 1440, // 24 hours in minutes
        warningThreshold: 1200, // 20 hours
      },
    };

    // Calculate real-time values
    const currentTime = new Date();
    const startTime = new Date(activeRental.startTime);
    const elapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    const currentCost =
      Math.round(
        (activeRental.baseFee + elapsedMinutes * activeRental.ratePerMinute) *
          100,
      ) / 100;

    activeRental.currentDuration = elapsedMinutes;
    activeRental.currentCharges = currentCost;
    activeRental.realTimeInfo.elapsedTime = elapsedMinutes;
    activeRental.realTimeInfo.estimatedCost = currentCost;

    const response = {
      success: true,
      data: {
        activeRental,
        message: "Active rental found",
        warnings:
          elapsedMinutes > activeRental.realTimeInfo.warningThreshold
            ? ["Rental duration approaching maximum limit"]
            : [],
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Active rental lookup error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
