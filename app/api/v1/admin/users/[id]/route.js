import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// GET /api/v1/admin/users/[id] - Get specific user
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Fetching user - ID: ${id}`);

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/users/${id}`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch user" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    // Transform backend data to match frontend expectations
    const transformedUser = {
      id: data.user_id,
      email: data.email,
      name: `${data.first_name} ${data.last_name}`,
      phone: data.phone_number,
      status: "active", // Backend doesn't have status field, defaulting to active
      registeredAt: data.created_at,
      lastLogin: data.last_login,
      role: data.role,
    };

    const responseData = {
      success: true,
      data: { user: transformedUser },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin user GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/admin/users/[id] - Update specific user
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Updating user - ID: ${id}`);

    // Transform frontend data to backend format
    const { email, name, phone, role, status } = body;
    
    const nameParts = name ? name.trim().split(" ") : [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      role: role || "USER",
    };

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to update user" },
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
      status: status || "active",
      registeredAt: data.created_at,
      lastLogin: data.last_login,
      role: data.role,
    };

    const responseData = {
      success: true,
      message: "User updated successfully",
      data: { user: transformedUser },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin user PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/admin/users/[id] - Delete specific user
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log(`Admin: Deleting user - ID: ${id}`);

    const response = await fetch(`${BACKEND_URL}/api/v1/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to delete user" },
        { status: response.status },
      );
    }

    const responseData = {
      success: true,
      message: "User deleted successfully",
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin user DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
