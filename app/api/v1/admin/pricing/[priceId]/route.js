import { NextResponse } from "next/server";

// PUT /api/v1/admin/pricing/{priceId} - Update pricing tier
export async function PUT(request, { params }) {
  try {
    const { priceId } = params;
    const body = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    }

    // Validate required fields
    const { tierName, ratePerMinute, fixedRate, active } = body;

    if (!tierName) {
      return NextResponse.json(
        { error: "Missing required field: tierName" },
        { status: 400 },
      );
    }

    // Validate pricing values
    if (
      ratePerMinute !== undefined &&
      (ratePerMinute < 0 || ratePerMinute > 10)
    ) {
      return NextResponse.json(
        { error: "ratePerMinute must be between 0 and 10" },
        { status: 400 },
      );
    }

    if (fixedRate !== undefined && (fixedRate < 0 || fixedRate > 100)) {
      return NextResponse.json(
        { error: "fixedRate must be between 0 and 100" },
        { status: 400 },
      );
    }

    // Validate tier name
    const validTierNames = [
      "Basic",
      "Hourly",
      "Daily",
      "Weekly",
      "Premium",
      "Corporate",
    ];
    if (!validTierNames.includes(tierName)) {
      return NextResponse.json(
        {
          error: `Invalid tierName. Must be one of: ${validTierNames.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Updating pricing tier - ID: ${priceId}, Tier: ${tierName}`,
    );

    // Process pricing update logic here
    // This would typically:
    // 1. Validate admin permissions
    // 2. Check if pricing tier exists
    // 3. Validate pricing logic and business rules
    // 4. Update pricing configuration in database
    // 5. Notify affected systems of pricing changes
    // 6. Log pricing changes for audit trail

    // Mock updated pricing tier
    const updatedPricing = {
      id: priceId,
      tierName,
      ratePerMinute: ratePerMinute || 0.1,
      fixedRate: fixedRate || 0,
      active: active !== undefined ? active : true,
      currency: "USD",
      updatedAt: new Date().toISOString(),
      updatedBy: "admin_user_id",
      description: `${tierName} pricing tier`,
      applicableTo: tierName === "Corporate" ? "business_users" : "all_users",
      minimumCharge: Math.max(ratePerMinute * 5, fixedRate * 0.1),
      maximumCharge:
        tierName === "Daily" ? 25.0 : tierName === "Weekly" ? 150.0 : null,
      effectiveFrom: new Date().toISOString(),
      terms: {
        billingCycle: tierName.toLowerCase(),
        autoRenewal: tierName === "Weekly" || tierName === "Premium",
        refundPolicy: "24_hour_cancellation",
        overage: ratePerMinute > 0 ? "per_minute" : "flat_rate",
      },
    };

    const response = {
      success: true,
      message: "Pricing tier updated successfully",
      data: {
        pricing: updatedPricing,
        impact: {
          affectedUsers: tierName === "Corporate" ? 45 : 1230,
          estimatedRevenueChange: "+12.5%",
          effectiveDate: new Date().toISOString(),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin pricing PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// GET /api/v1/admin/pricing/{priceId} - Get pricing tier details
export async function GET(request, { params }) {
  try {
    const { priceId } = params;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Fetching pricing tier - ID: ${priceId}`);

    // Mock pricing tier data
    const pricingTier = {
      id: priceId,
      tierName: "Hourly",
      ratePerMinute: 0.1,
      fixedRate: 5.0,
      active: true,
      currency: "USD",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
      updatedBy: "admin_user_id",
      description: "Hourly pricing tier for regular users",
      applicableTo: "all_users",
      minimumCharge: 1.0,
      maximumCharge: null,
      effectiveFrom: "2024-01-15T10:00:00Z",
      terms: {
        billingCycle: "hourly",
        autoRenewal: false,
        refundPolicy: "24_hour_cancellation",
        overage: "per_minute",
      },
      usage: {
        activeUsers: 1230,
        totalRevenue: 15420.5,
        avgRentalValue: 8.75,
        popularityRank: 1,
      },
    };

    const response = {
      success: true,
      data: { pricing: pricingTier },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin pricing GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
