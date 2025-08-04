"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const AdminPricing = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && (!user || user.profile?.data?.user?.role !== "admin")) {
  //     router.push("/");
  //   }
  // }, [user, loading, router]);

  // if (loading || !user || user.profile?.data?.user?.role !== "admin") {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link
          href="/admin"
          style={{
            color: "#6b7280",
            textDecoration: "none",
            fontSize: "0.875rem",
            marginBottom: "0.5rem",
            display: "inline-block",
          }}
        >
          ← Back to Admin Dashboard
        </Link>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "2rem",
          }}
        >
          Pricing Management
        </h1>
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Pricing management functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPricing;
