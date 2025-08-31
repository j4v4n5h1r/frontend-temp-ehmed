import { NextResponse } from "next/server";

// GET /api/v1/admin/reports/utilization - Get utilization reports
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
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
      `Admin: Generating utilization report - Start: ${startDate}, End: ${endDate}, Station: ${stationId || "all"}`,
    );

    // Mock utilization data
    const utilizationData = [
      {
        date: "2024-01-20",
        averageUtilization: 68.5,
        peakUtilization: 95.2,
        peakHour: "18:00",
        lowUtilization: 12.8,
        lowHour: "04:00",
        stationData: [
          {
            stationId: "st_001",
            stationName: "Downtown Mall",
            utilization: 72.3,
            totalSlots: 8,
            avgOccupiedSlots: 5.8,
            peakOccupancy: 8,
            rentalsCount: 25,
            avgRentalDuration: 125,
          },
          {
            stationId: "st_002",
            stationName: "Airport Terminal 1",
            utilization: 64.7,
            totalSlots: 12,
            avgOccupiedSlots: 7.8,
            peakOccupancy: 11,
            rentalsCount: 24,
            avgRentalDuration: 98,
          },
        ],
      },
      {
        date: "2024-01-21",
        averageUtilization: 75.2,
        peakUtilization: 98.1,
        peakHour: "19:30",
        lowUtilization: 18.4,
        lowHour: "03:30",
        stationData: [
          {
            stationId: "st_001",
            stationName: "Downtown Mall",
            utilization: 78.9,
            totalSlots: 8,
            avgOccupiedSlots: 6.3,
            peakOccupancy: 8,
            rentalsCount: 32,
            avgRentalDuration: 110,
          },
          {
            stationId: "st_002",
            stationName: "Airport Terminal 1",
            utilization: 71.5,
            totalSlots: 12,
            avgOccupiedSlots: 8.6,
            peakOccupancy: 12,
            rentalsCount: 26,
            avgRentalDuration: 89,
          },
        ],
      },
    ];

    const summary = {
      avgUtilization:
        utilizationData.reduce((sum, day) => sum + day.averageUtilization, 0) /
        utilizationData.length,
      maxPeakUtilization: Math.max(
        ...utilizationData.map((day) => day.peakUtilization),
      ),
      minLowUtilization: Math.min(
        ...utilizationData.map((day) => day.lowUtilization),
      ),
      totalRentals: utilizationData.reduce(
        (sum, day) =>
          sum +
          day.stationData.reduce(
            (stationSum, station) => stationSum + station.rentalsCount,
            0,
          ),
        0,
      ),
      avgRentalDuration: Math.round(
        utilizationData.reduce(
          (sum, day) =>
            sum +
            day.stationData.reduce(
              (stationSum, station) =>
                stationSum + station.avgRentalDuration * station.rentalsCount,
              0,
            ),
          0,
        ) /
          utilizationData.reduce(
            (sum, day) =>
              sum +
              day.stationData.reduce(
                (stationSum, station) => stationSum + station.rentalsCount,
                0,
              ),
            0,
          ),
      ),
      periodStart: startDate,
      periodEnd: endDate,
    };

    const response = {
      success: true,
      data: {
        summary,
        dailyData: utilizationData,
        filters: {
          startDate,
          endDate,
          stationId: stationId || "all",
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin utilization report error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
