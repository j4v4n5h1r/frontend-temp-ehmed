import { NextResponse } from "next/server";

// GET /api/v1/admin/reports/revenue - Get revenue reports
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const groupBy = searchParams.get("group_by") || "day"; // day, week, month
    const stationId = searchParams.get("station_id");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters: start_date and end_date" },
        { status: 400 },
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Generating revenue report - Start: ${startDate}, End: ${endDate}, GroupBy: ${groupBy}`,
    );

    // Mock revenue data
    const revenueData = [
      {
        date: "2024-01-20",
        totalRevenue: 245.5,
        totalRentals: 49,
        avgRevenuePerRental: 5.01,
        stationBreakdown: [
          {
            stationId: "st_001",
            stationName: "Downtown Mall",
            revenue: 125.75,
            rentals: 25,
          },
          {
            stationId: "st_002",
            stationName: "Airport Terminal 1",
            revenue: 119.75,
            rentals: 24,
          },
        ],
      },
      {
        date: "2024-01-21",
        totalRevenue: 312.25,
        totalRentals: 58,
        avgRevenuePerRental: 5.38,
        stationBreakdown: [
          {
            stationId: "st_001",
            stationName: "Downtown Mall",
            revenue: 165.5,
            rentals: 32,
          },
          {
            stationId: "st_002",
            stationName: "Airport Terminal 1",
            revenue: 146.75,
            rentals: 26,
          },
        ],
      },
    ];

    const summary = {
      totalRevenue: revenueData.reduce((sum, day) => sum + day.totalRevenue, 0),
      totalRentals: revenueData.reduce((sum, day) => sum + day.totalRentals, 0),
      avgDailyRevenue:
        revenueData.reduce((sum, day) => sum + day.totalRevenue, 0) /
        revenueData.length,
      periodStart: startDate,
      periodEnd: endDate,
      daysInPeriod: revenueData.length,
    };

    const response = {
      success: true,
      data: {
        summary,
        dailyData: revenueData,
        filters: {
          startDate,
          endDate,
          groupBy,
          stationId: stationId || "all",
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin revenue report error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
