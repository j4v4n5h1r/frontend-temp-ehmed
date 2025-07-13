import { NextResponse } from "next/server";

// GET /api/v1/admin/users/ - Get all users
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    console.log(
      `Admin: Fetching users - Page: ${page}, Limit: ${limit}, Search: ${search}`,
    );

    // Mock response for demonstration
    const users = [
      {
        id: "1",
        email: "user1@example.com",
        name: "John Doe",
        phone: "+1234567890",
        status: "active",
        registeredAt: "2024-01-15T10:30:00Z",
        lastLogin: "2024-01-20T14:22:00Z",
      },
      {
        id: "2",
        email: "user2@example.com",
        name: "Jane Smith",
        phone: "+1234567891",
        status: "suspended",
        registeredAt: "2024-01-10T09:15:00Z",
        lastLogin: "2024-01-18T16:45:00Z",
      },
    ];

    const response = {
      success: true,
      data: {
        users: users.slice((page - 1) * limit, page * limit),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(users.length / limit),
          totalUsers: users.length,
          hasNext: page * limit < users.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// POST /api/v1/admin/users/ - Create new user
export async function POST(request) {
  try {
    const body = await request.json();

    const { email, name, phone, password, role } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, password" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    console.log(`Admin: Creating user - Email: ${email}, Name: ${name}`);

    // Mock user creation logic
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      phone: phone || null,
      role: role || "user",
      status: "active",
      registeredAt: new Date().toISOString(),
      lastLogin: null,
    };

    const response = {
      success: true,
      message: "User created successfully",
      data: { user: newUser },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Admin users POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
