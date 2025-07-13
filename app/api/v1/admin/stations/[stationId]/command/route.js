import { NextResponse } from "next/server";

// POST /api/v1/admin/stations/{stationId}/command - Send command to station
export async function POST(request, { params }) {
  try {
    const { stationId } = params;
    const body = await request.json();

    if (!stationId) {
      return NextResponse.json(
        { error: "Station ID is required" },
        { status: 400 },
      );
    }

    const { command, slotNumber, powerBankId } = body;

    if (!command) {
      return NextResponse.json(
        { error: "Missing required field: command" },
        { status: 400 },
      );
    }

    // Validate command types
    const validCommands = [
      "RESET",
      "DISPENSE",
      "RETURN",
      "EJECT",
      "LOCK_SLOT",
      "UNLOCK_SLOT",
      "REBOOT",
      "DIAGNOSTICS",
    ];
    if (!validCommands.includes(command)) {
      return NextResponse.json(
        {
          error: `Invalid command. Must be one of: ${validCommands.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Validate slot number for slot-specific commands
    const slotSpecificCommands = [
      "DISPENSE",
      "RETURN",
      "EJECT",
      "LOCK_SLOT",
      "UNLOCK_SLOT",
    ];
    if (slotSpecificCommands.includes(command)) {
      if (!slotNumber || slotNumber < 1) {
        return NextResponse.json(
          { error: "Valid slotNumber is required for slot-specific commands" },
          { status: 400 },
        );
      }
    }

    // Validate power bank ID for dispense commands
    if (command === "DISPENSE" && !powerBankId) {
      return NextResponse.json(
        { error: "powerBankId is required for DISPENSE command" },
        { status: 400 },
      );
    }

    console.log(
      `Admin: Sending command to station - ID: ${stationId}, Command: ${command}, Slot: ${slotNumber || "N/A"}`,
    );

    // Process admin command logic here
    // This would typically:
    // 1. Validate admin permissions
    // 2. Check station availability and status
    // 3. Queue command for station execution
    // 4. Log admin action for audit trail
    // 5. Send command to station hardware

    const response = {
      success: true,
      message: "Command sent successfully",
      data: {
        commandId: `cmd_admin_${Date.now()}`,
        stationId,
        command,
        slotNumber: slotNumber || null,
        powerBankId: powerBankId || null,
        timestamp: new Date().toISOString(),
        status: "QUEUED",
        issuedBy: "admin_user_id",
        estimatedExecutionTime: new Date(Date.now() + 5000).toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin station command POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
