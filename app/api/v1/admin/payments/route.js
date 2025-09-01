import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mypobi.com";

// GET /api/v1/admin/payments/ - Get all payments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    console.log(
      `Admin: Fetching payments - Page: ${page}, Limit: ${limit}, Search: ${search}, Status: ${status}`,
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

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/payments/?${queryParams}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch payments" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
    const transformedPayments = data.map(payment => ({
      id: payment.payment_id,
      rentalId: payment.rental_id,
      userId: payment.user_id,
      amount: parseFloat(payment.amount),
      currency: payment.currency,
      paymentMethod: payment.payment_method,
      gatewayRefId: payment.gateway_ref_id,
      status: payment.status,
      timestamp: payment.timestamp,
      // Include related data if available
      rental: payment.rental ? {
        id: payment.rental.rental_id,
        startTime: payment.rental.start_time,
        endTime: payment.rental.end_time,
        durationMinutes: payment.rental.duration_minutes,
        totalCost: parseFloat(payment.rental.total_cost),
      } : null,
      user: payment.user ? {
        id: payment.user.user_id,
        name: `${payment.user.first_name} ${payment.user.last_name}`,
        email: payment.user.email,
      } : null,
    }));

    // Filter by status if provided
    let filteredPayments = transformedPayments;
    if (status) {
      filteredPayments = transformedPayments.filter(payment => payment.status === status);
    }

    const responseData = {
      success: true,
      data: {
        payments: filteredPayments,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredPayments.length / limit),
          totalPayments: filteredPayments.length,
          hasNext: page * limit < filteredPayments.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin payments GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/payments/ - Create new payment
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

    const { rentalId, userId, amount, currency, paymentMethod, gatewayRefId, status } = body;

    if (!rentalId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields: rentalId, amount, paymentMethod" },
        { status: 400 },
      );
    }

    console.log(`Admin: Creating payment - Rental: ${rentalId}, Amount: ${amount}`);

    // Prepare data for backend
    const paymentData = {
      rental_id: rentalId,
      user_id: userId || null,
      amount: parseFloat(amount),
      currency: currency || "USD",
      payment_method: paymentMethod,
      gateway_ref_id: gatewayRefId || null,
      status: status || "SUCCESS",
    };

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/payments/`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to create payment" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend response to match frontend expectations
    const transformedPayment = {
      id: data.payment_id,
      rentalId: data.rental_id,
      userId: data.user_id,
      amount: parseFloat(data.amount),
      currency: data.currency,
      paymentMethod: data.payment_method,
      gatewayRefId: data.gateway_ref_id,
      status: data.status,
      timestamp: data.timestamp,
    };

    const responseData = {
      success: true,
      message: "Payment created successfully",
      data: { payment: transformedPayment },
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Admin payments POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
