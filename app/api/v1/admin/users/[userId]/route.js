import { NextResponse } from "next/server";

// GET /api/v1/admin/users/{userId} - Get specific user
export async function GET(request, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Fetching user details - ID: ${userId}`);

    // Mock user data
    const user = {
      id: userId,
      email: "user@example.com",
      name: "John Doe",
      phone: "+1234567890",
      role: "user",
      status: "active",
      registeredAt: "2024-01-15T10:30:00Z",
      lastLogin: "2024-01-20T14:22:00Z",
      profile: {
        avatar: null,
        address: "123 Main St, City, Country",
        dateOfBirth: "1990-05-15",
        verified: true,
      },
      stats: {
        totalRentals: 25,
        totalSpent: 125.5,
        avgRentalDuration: 120,
      },
    };

    const response = {
      success: true,
      data: { user },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin user GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/users/{userId} - Update user
export async function PUT(request, { params }) {
  try {
    const { userId } = params;
    const body = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const { name, email, phone, status, role } = body;

    console.log(`Admin: Updating user - ID: ${userId}`);

    // Mock updated user
    const updatedUser = {
      id: userId,
      email: email || "user@example.com",
      name: name || "John Doe",
      phone: phone || "+1234567890",
      role: role || "user",
      status: status || "active",
      updatedAt: new Date().toISOString(),
    };

    const response = {
      success: true,
      message: "User updated successfully",
      data: { user: updatedUser },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin user PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/users/{userId} - Delete user
export async function DELETE(request, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    console.log(`Admin: Deleting user - ID: ${userId}`);

    // Mock deletion logic
    const response = {
      success: true,
      message: "User deleted successfully",
      data: {
        deletedUserId: userId,
        deletedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin user DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
