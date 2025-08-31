import { NextResponse } from "next/server";

// POST /api/v1/payments - Process payment
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { rentalId, amount, currency, paymentMethodToken, authorizationId } =
      body;

    if (
      !rentalId ||
      !amount ||
      !currency ||
      !paymentMethodToken ||
      !authorizationId
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: rentalId, amount, currency, paymentMethodToken, authorizationId",
        },
        { status: 400 },
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 },
      );
    }

    // Validate currency
    const supportedCurrencies = ["USD", "EUR", "GBP", "CAD"];
    if (!supportedCurrencies.includes(currency)) {
      return NextResponse.json(
        {
          error: `Unsupported currency. Supported: ${supportedCurrencies.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log(
      `Processing payment - Rental: ${rentalId}, Amount: ${amount} ${currency}, Auth: ${authorizationId}`,
    );

    // Process payment logic here
    // This would typically:
    // 1. Validate authorization exists and not expired
    // 2. Validate rental exists and belongs to authorized user
    // 3. Capture the pre-authorized amount
    // 4. Update rental record with payment status
    // 5. Send payment confirmation
    // 6. Handle payment failure scenarios

    // Mock payment processing
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response = {
      success: true,
      data: {
        paymentId,
        status: "success",
        rentalId,
        amount,
        currency,
        authorizationId,
        processedAt: new Date().toISOString(),
        transactionId: `txn_${Date.now()}`,
        paymentMethod: {
          type: "card",
          last4: "4242",
          brand: "visa",
        },
        fees: {
          processingFee: Math.round(amount * 0.029 * 100) / 100, // 2.9%
          currency,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// GET /api/v1/payments - Get payment history
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";
    const userId = searchParams.get("userId") || "";

    console.log(
      `Fetching payments - Page: ${page}, Limit: ${limit}, Status: ${status}, User: ${userId}`,
    );

    // Mock payment history
    const payments = [
      {
        id: "pay_001",
        rentalId: "rental_001",
        userId: "user_001",
        amount: 12.5,
        currency: "USD",
        status: "success",
        processedAt: "2024-01-21T14:30:00Z",
        paymentMethod: { type: "card", last4: "4242", brand: "visa" },
      },
      {
        id: "pay_002",
        rentalId: "rental_002",
        userId: "user_001",
        amount: 8.75,
        currency: "USD",
        status: "success",
        processedAt: "2024-01-20T16:45:00Z",
        paymentMethod: { type: "card", last4: "5555", brand: "mastercard" },
      },
      {
        id: "pay_003",
        rentalId: "rental_003",
        userId: "user_002",
        amount: 15.25,
        currency: "USD",
        status: "failed",
        processedAt: "2024-01-19T10:15:00Z",
        paymentMethod: { type: "card", last4: "4000", brand: "visa" },
        failureReason: "Insufficient funds",
      },
    ];

    // Filter by status and userId if provided
    let filteredPayments = payments;
    if (status) {
      filteredPayments = payments.filter(
        (payment) => payment.status === status,
      );
    }
    if (userId) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.userId === userId,
      );
    }

    const response = {
      success: true,
      data: {
        payments: filteredPayments.slice((page - 1) * limit, page * limit),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredPayments.length / limit),
          totalPayments: filteredPayments.length,
          hasNext: page * limit < filteredPayments.length,
          hasPrev: page > 1,
        },
        summary: {
          totalAmount: payments.reduce(
            (sum, p) => (p.status === "success" ? sum + p.amount : sum),
            0,
          ),
          successfulPayments: payments.filter((p) => p.status === "success")
            .length,
          failedPayments: payments.filter((p) => p.status === "failed").length,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Payment list error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
