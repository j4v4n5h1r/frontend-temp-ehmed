import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// GET /api/v1/admin/dashboard - Get dashboard statistics
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 },
      );
    }

    console.log("Admin: Fetching dashboard stats");

    // Fetch data from multiple backend endpoints
    const [usersResponse, stationsResponse, rentalsResponse, paymentsResponse] = await Promise.all([
      fetch(`${BACKEND_URL}/api/v1/admin/users/?limit=1000`, {
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
      }),
      fetch(`${BACKEND_URL}/api/v1/admin/stations/?limit=1000`, {
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
      }),
      fetch(`${BACKEND_URL}/api/v1/admin/rentals/?limit=1000`, {
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
      }),
      fetch(`${BACKEND_URL}/api/v1/admin/payments/?limit=1000`, {
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
      }),
    ]);

    // Check if all responses are successful
    if (!usersResponse.ok || !stationsResponse.ok || !rentalsResponse.ok || !paymentsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch dashboard data" },
        { status: 500 },
      );
    }

    const [users, stations, rentals, payments] = await Promise.all([
      usersResponse.json(),
      stationsResponse.json(),
      rentalsResponse.json(),
      paymentsResponse.json(),
    ]);

    // Calculate statistics
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Users stats
    const totalUsers = users.length;
    const newUsersThisWeek = users.filter(user => 
      new Date(user.created_at) >= oneWeekAgo
    ).length;
    const activeUsers = totalUsers; // Assuming all users are active for now

    // Stations stats
    const totalStations = stations.length;
    const onlineStations = stations.filter(station => station.status === "ONLINE").length;
    const offlineStations = totalStations - onlineStations;

    // Rentals stats
    const totalRentals = rentals.length;
    const activeRentals = rentals.filter(rental => !rental.end_time).length;
    const completedRentals = rentals.filter(rental => rental.end_time && rental.payment_status === "SUCCESS").length;
    const failedRentals = rentals.filter(rental => rental.payment_status === "FAILED").length;

    // Revenue stats
    const successfulPayments = payments.filter(payment => payment.status === "SUCCESS");
    const totalRevenue = successfulPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
    
    const todayRevenue = successfulPayments.filter(payment => {
      const paymentDate = new Date(payment.timestamp);
      return paymentDate >= today;
    }).reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

    const monthRevenue = successfulPayments.filter(payment => {
      const paymentDate = new Date(payment.timestamp);
      return paymentDate >= oneMonthAgo;
    }).reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

    const dashboardStats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        new: newUsersThisWeek,
      },
      stations: {
        total: totalStations,
        online: onlineStations,
        offline: offlineStations,
      },
      rentals: {
        active: activeRentals,
        completed: completedRentals,
        failed: failedRentals,
      },
      revenue: {
        today: todayRevenue,
        month: monthRevenue,
        total: totalRevenue,
      },
    };

    const responseData = {
      success: true,
      data: dashboardStats,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Admin dashboard GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
