import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { stationId, statusCode } = body;

    if (!stationId || statusCode === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: stationId, statusCode" },
        { status: 400 },
      );
    }

    // Log station offline event
    console.log(`Station going offline: ${stationId}, Status: ${statusCode}`);

    // Process station offline logic here
    // This would typically:
    // 1. Update station status to offline in database
    // 2. Record offline timestamp
    // 3. Trigger any necessary cleanup or alerts
    // 4. Handle graceful disconnection

    // Mock response for demonstration
    const response = {
      success: true,
      message: "Station offline status recorded successfully",
      data: {
        stationId,
        offlineTime: new Date().toISOString(),
        statusCode,
        acknowledged: true,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Station offline error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
