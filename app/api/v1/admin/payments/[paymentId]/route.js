import { NextResponse } from "next/server";

// GET /api/v1/admin/payments/{paymentId} - Get payment details (admin view)
export async function GET(request, { params }) {
  try {
    const { paymentId } = params;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Fetching payment details - ID: ${paymentId}`);

    // Mock detailed payment data for admin
    const payment = {
      id: paymentId,
      rentalId: "rental_001",
      userId: "user_001",
      userDetails: {
        email: "john.doe@example.com",
        name: "John Doe",
        phone: "+1234567890",
        registeredAt: "2024-01-15T10:30:00Z",
      },
      amount: 12.5,
      currency: "USD",
      status: "success",
      type: "rental_payment",
      processedAt: "2024-01-21T14:30:00Z",
      authorizationId: "auth_1642781400123_abc123def",
      transactionId: "txn_1642781400456",
      paymentMethod: {
        id: "pm_001",
        type: "card",
        last4: "4242",
        brand: "visa",
        expiryMonth: 12,
        expiryYear: 2027,
        country: "US",
        fingerprint: "card_fingerprint_123",
        issuer: "Chase Bank",
      },
      fees: {
        processingFee: 0.36,
        platformFee: 0.25,
        stripeFee: 0.3,
        netAmount: 11.59,
      },
      rental: {
        id: "rental_001",
        stationId: "st_001",
        stationName: "Downtown Mall Station",
        powerBankId: "pb_001",
        startTime: "2024-01-21T12:00:00Z",
        endTime: "2024-01-21T14:30:00Z",
        duration: 150,
        ratePerMinute: 0.083,
        baseFee: 1.0,
      },
      refunds: [
        {
          id: "ref_001",
          amount: 2.5,
          reason: "Partial service issue",
          processedAt: "2024-01-21T15:00:00Z",
          processedBy: "admin_user_id",
          status: "processed",
        },
      ],
      disputes: [],
      auditLog: [
        {
          timestamp: "2024-01-21T14:30:00Z",
          action: "payment_created",
          actor: "system",
          details: "Payment created from rental completion",
        },
        {
          timestamp: "2024-01-21T14:30:05Z",
          action: "payment_processed",
          actor: "stripe",
          details: "Payment successfully processed",
        },
        {
          timestamp: "2024-01-21T15:00:00Z",
          action: "refund_issued",
          actor: "admin_user_id",
          details: "Partial refund issued for service issue",
        },
      ],
      metadata: {
        ipAddress: "192.168.1.100",
        userAgent: "PowerBank Mobile App v1.2.0",
        location: {
          lat: 40.7128,
          lng: -74.006,
        },
        deviceId: "device_123456",
        sessionId: "session_789012",
      },
      riskAssessment: {
        score: 95,
        level: "low",
        factors: ["verified_user", "known_device", "normal_location"],
        fraudIndicators: [],
      },
    };

    const response = {
      success: true,
      data: { payment },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin payment detail error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/payments/{paymentId} - Update payment (admin only)
export async function PUT(request, { params }) {
  try {
    const { paymentId } = params;
    const body = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    const { status, notes, tags } = body;

    // Validate status if provided
    if (status) {
      const validStatuses = [
        "success",
        "failed",
        "pending",
        "disputed",
        "refunded",
        "cancelled",
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          },
          { status: 400 },
        );
      }
    }

    console.log(
      `Admin: Updating payment - ID: ${paymentId}, Status: ${status}`,
    );

    const updatedPayment = {
      id: paymentId,
      status: status || "success",
      adminNotes: notes || null,
      tags: tags || [],
      updatedAt: new Date().toISOString(),
      updatedBy: "admin_user_id",
      auditTrail: {
        action: "admin_update",
        timestamp: new Date().toISOString(),
        changes: { status, notes, tags },
      },
    };

    const response = {
      success: true,
      message: "Payment updated successfully",
      data: { payment: updatedPayment },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin payment PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/payments/{paymentId} - Delete/void payment (admin only)
export async function DELETE(request, { params }) {
  try {
    const { paymentId } = params;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const reason = searchParams.get("reason") || "Admin deletion";

    console.log(
      `Admin: Deleting payment - ID: ${paymentId}, Reason: ${reason}`,
    );

    // In a real implementation, this would:
    // 1. Check if payment can be deleted (not processed, no refunds, etc.)
    // 2. Void the payment with payment processor
    // 3. Update related rental records
    // 4. Log deletion for audit trail

    const response = {
      success: true,
      message: "Payment deleted successfully",
      data: {
        deletedPaymentId: paymentId,
        deletedAt: new Date().toISOString(),
        deletedBy: "admin_user_id",
        reason,
        refundIssued: false, // Depends on payment status
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin payment DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
