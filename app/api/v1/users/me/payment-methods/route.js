import { NextResponse } from "next/server";

// POST /api/v1/users/me/payment-methods - Add payment method
export async function POST(request) {
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
    const body = await request.json();

    const { tokenizedCardData, isDefault } = body;

    if (!tokenizedCardData) {
      return NextResponse.json(
        { error: "Missing required field: tokenizedCardData" },
        { status: 400 },
      );
    }

    console.log(`Adding payment method - User: ${userId}`);

    // Process payment method addition logic here
    // This would typically:
    // 1. Validate JWT token and extract user ID
    // 2. Validate tokenized card data with payment processor
    // 3. Store payment method securely (only store tokenized data)
    // 4. Update default payment method if specified
    // 5. Return confirmation without sensitive card details

    // Mock tokenized card data validation
    let cardInfo;
    try {
      cardInfo = JSON.parse(tokenizedCardData);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid tokenized card data format" },
        { status: 400 },
      );
    }

    const { token, last4, brand, expiryMonth, expiryYear } = cardInfo;

    if (!token || !last4 || !brand || !expiryMonth || !expiryYear) {
      return NextResponse.json(
        { error: "Incomplete card data in token" },
        { status: 400 },
      );
    }

    // Validate expiry date
    const currentDate = new Date();
    const cardExpiry = new Date(expiryYear, expiryMonth - 1);
    if (cardExpiry < currentDate) {
      return NextResponse.json({ error: "Card has expired" }, { status: 400 });
    }

    // Generate payment method ID
    const paymentMethodId = `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Mock payment method creation
    const newPaymentMethod = {
      id: paymentMethodId,
      userId,
      type: "card",
      brand: brand.toLowerCase(),
      last4,
      expiryMonth,
      expiryYear,
      isDefault: isDefault || false,
      addedAt: new Date().toISOString(),
      status: "active",
      fingerprint: `fp_${Math.random().toString(36).substr(2, 16)}`,
    };

    const response = {
      success: true,
      message: "Payment method added successfully",
      data: {
        paymentMethod: newPaymentMethod,
        totalPaymentMethods: 2, // This would come from database count
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Payment method addition error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// GET /api/v1/users/me/payment-methods - Get user's payment methods
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

    console.log(`Fetching payment methods - User: ${userId}`);

    // Mock payment methods data
    const paymentMethods = [
      {
        id: "pm_001",
        type: "card",
        brand: "visa",
        last4: "4242",
        expiryMonth: 12,
        expiryYear: 2027,
        isDefault: true,
        addedAt: "2024-01-15T11:00:00Z",
        status: "active",
      },
      {
        id: "pm_002",
        type: "card",
        brand: "mastercard",
        last4: "5555",
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
        addedAt: "2024-01-18T09:30:00Z",
        status: "active",
      },
    ];

    const response = {
      success: true,
      data: {
        paymentMethods,
        totalCount: paymentMethods.length,
        defaultPaymentMethod: paymentMethods.find((pm) => pm.isDefault),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Payment methods GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
