import { NextResponse } from "next/server";

// GET /api/v1/admin/payments/ - Get all payments (admin view)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "";
    const userId = searchParams.get("userId") || "";
    const startDate = searchParams.get("start_date") || "";
    const endDate = searchParams.get("end_date") || "";
    const minAmount = parseFloat(searchParams.get("min_amount") || "0");
    const maxAmount = parseFloat(searchParams.get("max_amount") || "0");

    console.log(
      `Admin: Fetching payments - Page: ${page}, Status: ${status}, User: ${userId}`,
    );

    // Mock payments data for admin view
    const payments = [
      {
        id: "pay_001",
        rentalId: "rental_001",
        userId: "user_001",
        userEmail: "john.doe@example.com",
        amount: 12.5,
        currency: "USD",
        status: "success",
        processedAt: "2024-01-21T14:30:00Z",
        paymentMethod: {
          type: "card",
          last4: "4242",
          brand: "visa",
          country: "US",
        },
        fees: {
          processingFee: 0.36,
          platformFee: 0.25,
        },
        refunds: [],
        metadata: {
          ipAddress: "192.168.1.100",
          userAgent: "PowerBank Mobile App v1.2.0",
        },
      },
      {
        id: "pay_002",
        rentalId: "rental_002",
        userId: "user_002",
        userEmail: "jane.smith@example.com",
        amount: 8.75,
        currency: "USD",
        status: "success",
        processedAt: "2024-01-20T16:45:00Z",
        paymentMethod: {
          type: "card",
          last4: "5555",
          brand: "mastercard",
          country: "US",
        },
        fees: {
          processingFee: 0.25,
          platformFee: 0.18,
        },
        refunds: [
          {
            id: "ref_001",
            amount: 2.0,
            reason: "Service issue",
            processedAt: "2024-01-20T17:00:00Z",
          },
        ],
        metadata: {
          ipAddress: "192.168.1.101",
          userAgent: "PowerBank Web App v2.1.0",
        },
      },
      {
        id: "pay_003",
        rentalId: "rental_003",
        userId: "user_003",
        userEmail: "mike.wilson@example.com",
        amount: 15.25,
        currency: "USD",
        status: "failed",
        processedAt: "2024-01-19T10:15:00Z",
        paymentMethod: {
          type: "card",
          last4: "4000",
          brand: "visa",
          country: "US",
        },
        failureReason: "Insufficient funds",
        failureCode: "insufficient_funds",
        fees: {
          processingFee: 0,
          platformFee: 0,
        },
        refunds: [],
        metadata: {
          ipAddress: "192.168.1.102",
          userAgent: "PowerBank Mobile App v1.1.0",
        },
      },
    ];

    // Apply filters
    let filteredPayments = payments;

    if (status) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.status === status,
      );
    }

    if (userId) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.userId === userId,
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredPayments = filteredPayments.filter((payment) => {
        const paymentDate = new Date(payment.processedAt);
        return paymentDate >= start && paymentDate <= end;
      });
    }

    if (minAmount > 0) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.amount >= minAmount,
      );
    }

    if (maxAmount > 0) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.amount <= maxAmount,
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
          totalFees: payments.reduce(
            (sum, p) =>
              p.status === "success"
                ? sum + p.fees.processingFee + p.fees.platformFee
                : sum,
            0,
          ),
          successfulPayments: payments.filter((p) => p.status === "success")
            .length,
          failedPayments: payments.filter((p) => p.status === "failed").length,
          refundedAmount: payments.reduce(
            (sum, p) =>
              sum + p.refunds.reduce((refundSum, r) => refundSum + r.amount, 0),
            0,
          ),
          avgPaymentAmount:
            Math.round(
              (payments
                .filter((p) => p.status === "success")
                .reduce((sum, p) => sum + p.amount, 0) /
                payments.filter((p) => p.status === "success").length) *
                100,
            ) / 100,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin payments GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/payments/ - Create manual payment entry (admin only)
export async function POST(request) {
  try {
    const body = await request.json();

    const { userId, rentalId, amount, currency, reason, paymentMethodId } =
      body;

    if (!userId || !amount || !currency || !reason) {
      return NextResponse.json(
        { error: "Missing required fields: userId, amount, currency, reason" },
        { status: 400 },
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Creating manual payment - User: ${userId}, Amount: ${amount} ${currency}`,
    );

    // Generate payment ID
    const paymentId = `pay_admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newPayment = {
      id: paymentId,
      rentalId: rentalId || null,
      userId,
      amount,
      currency,
      status: "success",
      type: "manual_admin",
      reason,
      processedAt: new Date().toISOString(),
      processedBy: "admin_user_id",
      paymentMethod: paymentMethodId
        ? {
            id: paymentMethodId,
            type: "admin_manual",
            description: "Manual admin payment",
          }
        : null,
      fees: {
        processingFee: 0,
        platformFee: 0,
      },
      metadata: {
        createdByAdmin: true,
        adminReason: reason,
      },
    };

    const response = {
      success: true,
      message: "Manual payment created successfully",
      data: { payment: newPayment },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Admin payments POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
