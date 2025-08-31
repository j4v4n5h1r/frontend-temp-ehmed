import { NextResponse } from "next/server";

// GET /api/v1/users/me/rentals - Get user's rental history
export async function GET(request) {
  try {
    // Extract user ID from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 },
      );
    }

    const userId = "user_from_token"; // This would be extracted from JWT token

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || ""; // active, completed, failed
    const startDate = searchParams.get("start_date") || "";
    const endDate = searchParams.get("end_date") || "";

    console.log(
      `Fetching rental history - User: ${userId}, Page: ${page}, Status: ${status}`,
    );

    // Process rental history retrieval logic here
    // This would typically:
    // 1. Validate JWT token and extract user ID
    // 2. Query rental records from database filtered by user ID
    // 3. Include station information and payment details
    // 4. Apply filters for status, date range, pagination
    // 5. Return formatted rental history

    // Mock rental history data
    const rentals = [
      {
        id: "rental_001",
        userId,
        powerBankId: "pb_123",
        status: "completed",
        startStationId: "st_001",
        endStationId: "st_001",
        startTime: "2024-01-21T14:30:00Z",
        endTime: "2024-01-21T16:45:00Z",
        duration: 135, // minutes
        cost: {
          amount: 12.5,
          currency: "USD",
          breakdown: {
            baseFee: 1.0,
            usageFee: 11.5,
            taxes: 0.0,
          },
        },
        station: {
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
        payment: {
          id: "pay_001",
          status: "success",
          method: { type: "card", last4: "4242", brand: "visa" },
        },
        rating: {
          score: 5,
          comment: "Great service!",
        },
      },
      {
        id: "rental_002",
        userId,
        powerBankId: "pb_456",
        status: "completed",
        startStationId: "st_002",
        endStationId: "st_003",
        startTime: "2024-01-20T10:15:00Z",
        endTime: "2024-01-20T12:30:00Z",
        duration: 135, // minutes
        cost: {
          amount: 8.75,
          currency: "USD",
          breakdown: {
            baseFee: 1.0,
            usageFee: 7.75,
            taxes: 0.0,
          },
        },
        station: {
          startStation: {
            id: "st_002",
            name: "Airport Terminal 1",
            address: "Terminal 1, JFK Airport",
            coordinates: { lat: 40.6413, lng: -73.7781 },
          },
          endStation: {
            id: "st_003",
            name: "Central Park Station",
            address: "Central Park, NYC",
            coordinates: { lat: 40.7829, lng: -73.9654 },
          },
        },
        payment: {
          id: "pay_002",
          status: "success",
          method: { type: "card", last4: "5555", brand: "mastercard" },
        },
        rating: {
          score: 4,
          comment: "Good experience",
        },
      },
      {
        id: "rental_003",
        userId,
        powerBankId: "pb_789",
        status: "active",
        startStationId: "st_001",
        endStationId: null,
        startTime: "2024-01-21T17:00:00Z",
        endTime: null,
        duration: Math.floor(
          (new Date() - new Date("2024-01-21T17:00:00Z")) / (1000 * 60),
        ),
        cost: {
          amount: 0, // Will be calculated at end
          currency: "USD",
          estimatedAmount: 5.25,
        },
        station: {
          startStation: {
            id: "st_001",
            name: "Downtown Mall Station",
            address: "123 Main St, Downtown",
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
          endStation: null,
        },
        payment: {
          id: null,
          status: "pending",
          method: { type: "card", last4: "4242", brand: "visa" },
        },
        rating: null,
      },
    ];

    // Filter by status if provided
    let filteredRentals = rentals;
    if (status) {
      filteredRentals = rentals.filter((rental) => rental.status === status);
    }

    // Filter by date range if provided
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
          completedRentals: rentals.filter((r) => r.status === "completed")
            .length,
          activeRentals: rentals.filter((r) => r.status === "active").length,
          totalSpent: rentals
            .filter((r) => r.status === "completed")
            .reduce((sum, r) => sum + r.cost.amount, 0),
          avgRentalDuration: Math.round(
            rentals
              .filter((r) => r.status === "completed")
              .reduce((sum, r) => sum + r.duration, 0) /
              rentals.filter((r) => r.status === "completed").length,
          ),
          favoriteStations: [
            { stationId: "st_001", count: 2 },
            { stationId: "st_002", count: 1 },
          ],
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("User rental history error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
