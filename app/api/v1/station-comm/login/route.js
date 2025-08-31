import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { stationId, iotCardNum, signalValue, powerBanks, statusCode } = body;

    if (
      !stationId ||
      !iotCardNum ||
      signalValue === undefined ||
      !powerBanks ||
      statusCode === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: stationId, iotCardNum, signalValue, powerBanks, statusCode",
        },
        { status: 400 },
      );
    }

    // Validate powerBanks is an array
    if (!Array.isArray(powerBanks)) {
      return NextResponse.json(
        { error: "powerBanks must be an array" },
        { status: 400 },
      );
    }

    // Log station login attempt
    console.log(
      `Station login: ${stationId}, Signal: ${signalValue}%, PowerBanks: ${powerBanks.length}`,
    );

    // Process station login logic here
    // This would typically:
    // 1. Validate station credentials
    // 2. Update station status in database
    // 3. Register power banks inventory
    // 4. Record signal strength and connection time

    // Mock response for demonstration
    const response = {
      success: true,
      message: "Station logged in successfully",
      data: {
        stationId,
        loginTime: new Date().toISOString(),
        powerBanksRegistered: powerBanks.length,
        signalQuality:
          signalValue >= 70 ? "Good" : signalValue >= 40 ? "Fair" : "Poor",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Station login error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
