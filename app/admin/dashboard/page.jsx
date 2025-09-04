"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboardRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main admin page
    router.replace("/admin");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #22c55e",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 1rem",
          }}
        ></div>
        <p style={{ color: "#6b7280" }}>Redirecting to admin dashboard...</p>
      </div>
    </div>
  );
};

export default AdminDashboardRedirect;
