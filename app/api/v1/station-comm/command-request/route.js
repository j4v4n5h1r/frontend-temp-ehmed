import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { stationId, commandType, slotNum, powerBankId } = body;

    if (!stationId || !commandType || slotNum === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: stationId, commandType, slotNum" },
        { status: 400 },
      );
    }

    // Validate command type
    const validCommands = [
      "DISPENSE",
      "RETURN",
      "RESET",
      "EJECT",
      "LOCK",
      "UNLOCK",
    ];
    if (!validCommands.includes(commandType)) {
      return NextResponse.json(
        {
          error: `Invalid commandType. Must be one of: ${validCommands.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Validate slot number is positive
    if (slotNum < 1) {
      return NextResponse.json(
        { error: "slotNum must be a positive integer" },
        { status: 400 },
      );
    }

    // For DISPENSE command, powerBankId might be required
    if (commandType === "DISPENSE" && !powerBankId) {
      return NextResponse.json(
        { error: "powerBankId is required for DISPENSE command" },
        { status: 400 },
      );
    }

    // Log command request
    console.log(
      `Command request - Station: ${stationId}, Command: ${commandType}, Slot: ${slotNum}, PowerBank: ${powerBankId || "N/A"}`,
    );

    // Process command request logic here
    // This would typically:
    // 1. Queue command for station execution
    // 2. Validate station is online and operational
    // 3. Check slot availability/status
    // 4. Send command to station hardware
    // 5. Track command execution status

    // Mock response for demonstration
    const response = {
      success: true,
      message: "Command request processed successfully",
      data: {
        commandId: `cmd_${Date.now()}`,
        stationId,
        commandType,
        slotNum,
        powerBankId: powerBankId || null,
        timestamp: new Date().toISOString(),
        status: "QUEUED",
        estimatedExecutionTime: new Date(Date.now() + 5000).toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Command request error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
