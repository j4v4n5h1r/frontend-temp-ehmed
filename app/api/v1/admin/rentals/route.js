import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// GET /api/v1/admin/rentals/ - Get all rentals
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    console.log(
      `Admin: Fetching rentals - Page: ${page}, Limit: ${limit}, Search: ${search}, Status: ${status}`,
    );

    // Get authorization header from the request
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    // Forward the request to the backend
    const queryParams = new URLSearchParams({
      skip: ((page - 1) * limit).toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/rentals/?${queryParams}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch rentals" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
    const transformedRentals = data.map(rental => ({
      id: rental.rental_id,
      userId: rental.user_id,
      powerBankId: rental.power_bank_id,
      startStationId: rental.start_station_id,
      endStationId: rental.end_station_id,
      startTime: rental.start_time,
      endTime: rental.end_time,
      durationMinutes: rental.duration_minutes,
      totalCost: parseFloat(rental.total_cost),
      currency: rental.currency,
      paymentStatus: rental.payment_status,
      transactionId: rental.transaction_id,
      // Include related data if available
      user: rental.user ? {
        id: rental.user.user_id,
        name: `${rental.user.first_name} ${rental.user.last_name}`,
        email: rental.user.email,
      } : null,
      powerBank: rental.power_bank ? {
        id: rental.power_bank.power_bank_id,
        serialNumber: rental.power_bank.serial_number,
        batteryLevel: rental.power_bank.battery_level,
      } : null,
      startStation: rental.start_station ? {
        id: rental.start_station.station_id,
        name: rental.start_station.name,
        address: rental.start_station.address,
      } : null,
      endStation: rental.end_station ? {
        id: rental.end_station.station_id,
        name: rental.end_station.name,
        address: rental.end_station.address,
      } : null,
    }));

    // Filter by status if provided
    let filteredRentals = transformedRentals;
    if (status) {
      filteredRentals = transformedRentals.filter(rental => rental.paymentStatus === status);
    }

    const responseData = {
      success: true,
      data: {
        rentals: filteredRentals,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredRentals.length / limit),
          totalRentals: filteredRentals.length,
          hasNext: page * limit < filteredRentals.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin rentals GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/rentals/ - Create new rental
export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    const { userId, powerBankId, startStationId, endStationId, totalCost, currency } = body;

    if (!powerBankId || !startStationId) {
      return NextResponse.json(
        { error: "Missing required fields: powerBankId, startStationId" },
        { status: 400 },
      );
    }

    console.log(`Admin: Creating rental - PowerBank: ${powerBankId}, StartStation: ${startStationId}`);

    // Prepare data for backend
    const rentalData = {
      user_id: userId || null,
      power_bank_id: powerBankId,
      start_station_id: startStationId,
      end_station_id: endStationId || null,
      total_cost: totalCost || 0,
      currency: currency || "USD",
      payment_status: "PENDING",
    };

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/rentals/`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to create rental" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend response to match frontend expectations
    const transformedRental = {
      id: data.rental_id,
      userId: data.user_id,
      powerBankId: data.power_bank_id,
      startStationId: data.start_station_id,
      endStationId: data.end_station_id,
      startTime: data.start_time,
      endTime: data.end_time,
      durationMinutes: data.duration_minutes,
      totalCost: parseFloat(data.total_cost),
      currency: data.currency,
      paymentStatus: data.payment_status,
      transactionId: data.transaction_id,
    };

    const responseData = {
      success: true,
      message: "Rental created successfully",
      data: { rental: transformedRental },
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Admin rentals POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
