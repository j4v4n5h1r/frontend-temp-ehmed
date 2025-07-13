import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { paymentId } = params;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    console.log(`Fetching payment details - ID: ${paymentId}`);

    // Mock payment detail data
    const payment = {
      id: paymentId,
      rentalId: "rental_001",
      userId: "user_001",
      amount: 12.5,
      currency: "USD",
      status: "success",
      processedAt: "2024-01-21T14:30:00Z",
      authorizationId: "auth_1642781400123_abc123def",
      transactionId: "txn_1642781400456",
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
        expiryMonth: 12,
        expiryYear: 2027,
        fingerprint: "card_fingerprint_123",
      },
      fees: {
        processingFee: 0.36,
        currency: "USD",
      },
      rental: {
        id: "rental_001",
        stationId: "st_001",
        stationName: "Downtown Mall Station",
        powerBankId: "pb_001",
        startTime: "2024-01-21T12:00:00Z",
        endTime: "2024-01-21T14:30:00Z",
        duration: 150, // minutes
        ratePerMinute: 0.083,
      },
      refunds: [
        {
          id: "ref_001",
          amount: 2.5,
          reason: "Partial service issue",
          processedAt: "2024-01-21T15:00:00Z",
          status: "processed",
        },
      ],
      netAmount: 10.0, // Original amount minus refunds
      metadata: {
        ipAddress: "192.168.1.1",
        userAgent: "PowerBank Mobile App v1.2.0",
        location: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
    };

    const response = {
      success: true,
      data: { payment },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Payment detail error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
