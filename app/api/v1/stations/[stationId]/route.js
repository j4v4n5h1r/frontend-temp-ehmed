import { NextResponse } from "next/server";

// GET /api/v1/stations/{stationId} - Get specific station details
export async function GET(request, { params }) {
  try {
    const { stationId } = params;

    if (!stationId) {
      return NextResponse.json(
        { error: "Station ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const userLat = parseFloat(searchParams.get("lat") || "0");
    const userLng = parseFloat(searchParams.get("lng") || "0");

    console.log(
      `Fetching station details - ID: ${stationId}, User location: ${userLat},${userLng}`,
    );

    // Process station detail retrieval logic here
    // This would typically:
    // 1. Query specific station from database
    // 2. Include real-time slot and power bank availability
    // 3. Calculate distance from user location if provided
    // 4. Include recent reviews and ratings
    // 5. Return detailed station information

    // Mock station detail data
    const stationDetails = {
      id: stationId,
      name: "Downtown Mall Station",
      description:
        "Convenient power bank station located at the main entrance of Downtown Mall. Available 24/7 with secure, well-lit location.",
      location: {
        address: "123 Main St, Downtown",
        coordinates: { lat: 40.7128, lng: -74.006 },
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
        landmark: "Downtown Mall - Main Entrance",
      },
      status: "online",
      capacity: 8,
      availableSlots: 5,
      availablePowerBanks: 3,
      occupiedSlots: 3,
      pricing: {
        baseFee: 1.0,
        ratePerMinute: 0.08,
        currency: "USD",
        estimatedCostPerHour: 5.8,
        maxDailyCharge: 25.0,
      },
      features: [
        "24/7",
        "covered",
        "security_camera",
        "lighting",
        "wheelchair_accessible",
      ],
      distance: userLat && userLng ? 2.3 : null, // km from user location
      estimatedWalkTime: userLat && userLng ? 28 : null, // minutes
      lastUpdated: "2024-01-21T15:30:00Z",
      qrCode: "QR_ST001_MAIN",
      operationalHours: {
        allDay: true,
        timezone: "America/New_York",
        lastMaintenanceCheck: "2024-01-20T08:00:00Z",
        nextMaintenanceScheduled: "2024-01-27T08:00:00Z",
      },
      powerBankDetails: [
        {
          slotNumber: 1,
          powerBankId: "pb_001",
          batteryLevel: 100,
          status: "available",
          model: "PowerBank Pro 10K",
          capacity: 10000,
          lastCharged: "2024-01-21T14:00:00Z",
        },
        {
          slotNumber: 2,
          powerBankId: "pb_002",
          batteryLevel: 95,
          status: "available",
          model: "PowerBank Pro 10K",
          capacity: 10000,
          lastCharged: "2024-01-21T13:30:00Z",
        },
        {
          slotNumber: 3,
          powerBankId: "pb_003",
          batteryLevel: 88,
          status: "available",
          model: "PowerBank Pro 10K",
          capacity: 10000,
          lastCharged: "2024-01-21T13:00:00Z",
        },
        {
          slotNumber: 4,
          powerBankId: null,
          batteryLevel: null,
          status: "rented",
          rentalId: "rental_active_001",
          rentedAt: "2024-01-21T14:30:00Z",
        },
        {
          slotNumber: 5,
          powerBankId: null,
          batteryLevel: null,
          status: "rented",
          rentalId: "rental_active_002",
          rentedAt: "2024-01-21T15:15:00Z",
        },
        {
          slotNumber: 6,
          powerBankId: null,
          batteryLevel: null,
          status: "rented",
          rentalId: "rental_active_003",
          rentedAt: "2024-01-21T15:00:00Z",
        },
        {
          slotNumber: 7,
          powerBankId: null,
          batteryLevel: null,
          status: "empty",
          lastRental: "2024-01-21T14:45:00Z",
        },
        {
          slotNumber: 8,
          powerBankId: null,
          batteryLevel: null,
          status: "empty",
          lastRental: "2024-01-21T14:20:00Z",
        },
      ],
      statistics: {
        totalRentals: 1247,
        avgRentalDuration: 125, // minutes
        totalRevenue: 6235.5,
        rating: {
          average: 4.6,
          totalReviews: 89,
          distribution: {
            5: 54,
            4: 21,
            3: 8,
            2: 4,
            1: 2,
          },
        },
        peakHours: [
          { hour: "08:00", utilization: 85 },
          { hour: "12:00", utilization: 92 },
          { hour: "17:00", utilization: 88 },
          { hour: "19:00", utilization: 95 },
        ],
        weeklyPattern: {
          monday: 78,
          tuesday: 82,
          wednesday: 85,
          thursday: 88,
          friday: 95,
          saturday: 92,
          sunday: 76,
        },
      },
      recentReviews: [
        {
          id: "review_001",
          userId: "user_123",
          userName: "John D.",
          rating: 5,
          comment: "Great location and always has power banks available!",
          createdAt: "2024-01-20T16:30:00Z",
        },
        {
          id: "review_002",
          userId: "user_456",
          userName: "Sarah M.",
          rating: 4,
          comment: "Convenient spot, easy to use.",
          createdAt: "2024-01-19T14:15:00Z",
        },
        {
          id: "review_003",
          userId: "user_789",
          userName: "Mike R.",
          rating: 5,
          comment: "Perfect for shopping trips. Quick and reliable.",
          createdAt: "2024-01-18T11:45:00Z",
        },
      ],
      nearbyStations: [
        {
          id: "st_005",
          name: "City Center Station",
          distance: 1.2,
          availablePowerBanks: 2,
          walkTime: 15,
        },
        {
          id: "st_006",
          name: "Metro Station Hub",
          distance: 1.8,
          availablePowerBanks: 5,
          walkTime: 22,
        },
      ],
      instructions: {
        howToRent: [
          "Scan the QR code on the station",
          "Select an available power bank slot",
          "Confirm your rental in the app",
          "Remove the power bank when dispensed",
        ],
        howToReturn: [
          "Find any available return slot",
          "Insert the power bank firmly",
          "Wait for confirmation light",
          "Check your app for rental completion",
        ],
      },
    };

    const response = {
      success: true,
      data: { station: stationDetails },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Station detail error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
