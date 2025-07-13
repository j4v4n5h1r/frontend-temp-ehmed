import { NextResponse } from "next/server";

// GET /api/v1/users/me - Get current user profile
export async function GET(request) {
  try {
    // Extract user ID from Authorization header (in real implementation)
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 },
      );
    }

    // Mock user ID extraction from JWT token
    const userId = "user_from_token"; // This would be extracted from JWT token

    console.log(`Fetching user profile - User: ${userId}`);

    // Process user profile retrieval logic here
    // This would typically:
    // 1. Validate JWT token and extract user ID
    // 2. Query user data from database
    // 3. Include payment methods and preferences
    // 4. Return sanitized user information (no sensitive data)

    // Mock user profile data
    const userProfile = {
      userId,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      phoneNumber: "+1234567890",
      role: "user",
      language: "en",
      currency: "USD",
      status: "active",
      emailVerified: true,
      phoneVerified: true,
      registeredAt: "2024-01-15T10:30:00Z",
      lastLogin: "2024-01-21T14:22:00Z",
      profile: {
        avatar: null,
        dateOfBirth: "1990-05-15",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          theme: "light",
          language: "en",
          currency: "USD",
        },
      },
      paymentMethods: [
        {
          id: "pm_001",
          type: "card",
          brand: "visa",
          last4: "4242",
          expiryMonth: 12,
          expiryYear: 2027,
          isDefault: true,
          addedAt: "2024-01-15T11:00:00Z",
        },
        {
          id: "pm_002",
          type: "card",
          brand: "mastercard",
          last4: "5555",
          expiryMonth: 8,
          expiryYear: 2026,
          isDefault: false,
          addedAt: "2024-01-18T09:30:00Z",
        },
      ],
      stats: {
        totalRentals: 25,
        totalSpent: 125.5,
        memberSince: "2024-01-15T10:30:00Z",
        avgRentalDuration: 120,
        favoriteStations: ["st_001", "st_003"],
      },
    };

    const response = {
      success: true,
      data: { user: userProfile },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("User profile GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

// PUT /api/v1/users/me - Update current user profile
export async function PUT(request) {
  try {
    // Extract user ID from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 },
      );
    }

    const userId = "user_from_token"; // This would be extracted from JWT token
    const body = await request.json();

    const {
      phoneNumber,
      firstName,
      lastName,
      language,
      currency,
      preferences,
      address,
    } = body;

    console.log(`Updating user profile - User: ${userId}`);

    // Process user profile update logic here
    // This would typically:
    // 1. Validate JWT token and extract user ID
    // 2. Validate input data (phone format, language codes, etc.)
    // 3. Update user record in database
    // 4. Return updated profile information

    // Validate phone number format if provided
    if (phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 },
      );
    }

    // Validate language code if provided
    const supportedLanguages = ["en", "es", "fr", "de", "it", "pt", "zh", "ja"];
    if (language && !supportedLanguages.includes(language)) {
      return NextResponse.json(
        {
          error: `Unsupported language. Supported: ${supportedLanguages.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Mock updated user profile
    const updatedProfile = {
      userId,
      email: "john.doe@example.com", // Email typically can't be changed via this endpoint
      firstName: firstName || "John",
      lastName: lastName || "Doe",
      name: `${firstName || "John"} ${lastName || "Doe"}`,
      phoneNumber: phoneNumber || "+1234567890",
      role: "user",
      language: language || "en",
      currency: currency || "USD",
      status: "active",
      emailVerified: true,
      phoneVerified: phoneNumber ? false : true, // Requires re-verification if phone changed
      updatedAt: new Date().toISOString(),
      profile: {
        avatar: null,
        dateOfBirth: "1990-05-15",
        address: address || {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        preferences: preferences || {
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          theme: "light",
          language: language || "en",
          currency: currency || "USD",
        },
      },
    };

    const response = {
      success: true,
      message: "Profile updated successfully",
      data: { user: updatedProfile },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("User profile PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
