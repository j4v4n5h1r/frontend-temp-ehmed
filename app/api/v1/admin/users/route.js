import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mypobi.com";

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

    // Get authorization header from the request
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    // Forward the request to the backend
    const queryParams = new URLSearchParams({
      skip: ((page - 1) * limit).toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/users/?${queryParams}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch users" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
    const transformedUsers = data.map(user => ({
      id: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      phone: user.phone_number,
      status: "active", // Backend doesn't have status field, defaulting to active
      registeredAt: user.created_at,
      lastLogin: user.last_login,
      role: user.role,
    }));

    const responseData = {
      success: true,
      data: {
        users: transformedUsers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(data.length / limit),
          totalUsers: data.length,
          hasNext: page * limit < data.length,
          hasPrev: page > 1,
        },
      },
    };

    return NextResponse.json(responseData, { status: 200 });
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
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

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

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Prepare data for backend
    const userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      phone_number: phone || null,
      role: role || "USER",
    };

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/v1/admin/users/`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to create user" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend response to match frontend expectations
    const transformedUser = {
      id: data.user_id,
      email: data.email,
      name: `${data.first_name} ${data.last_name}`,
      phone: data.phone_number,
      status: "active",
      registeredAt: data.created_at,
      lastLogin: data.last_login,
      role: data.role,
    };

    const responseData = {
      success: true,
      message: "User created successfully",
      data: { user: transformedUser },
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Admin users POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
