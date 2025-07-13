"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const DebugPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [clientInfo, setClientInfo] = useState({
    hasToken: false,
    currentUrl: "Loading...",
    nodeEnv: "unknown",
  });

  useEffect(() => {
    // Set client-side only information
    setClientInfo({
      hasToken: !!cookie.get("token"),
      currentUrl: window.location.origin,
      nodeEnv: process.env.NODE_ENV || "unknown",
    });
  }, []);

  const testEndpoint = async (name, url, options = {}) => {
    setLoading((prev) => ({ ...prev, [name]: true }));
    try {
      const response = await axios({
        method: "GET",
        url,
        timeout: 5000,
        ...options,
      });
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: true,
          status: response.status,
          data: response.data,
          message: "Success",
        },
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: false,
          status: err.response?.status || "Network Error",
          error: err.message,
          details: {
            code: err.code,
            response: err.response?.data,
            request: err.request
              ? "Request sent but no response"
              : "Request not sent",
          },
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [name]: false }));
    }
  };

  const testEndpoints = () => {
    const token = cookie.get("token");

    // Test basic connection
    testEndpoint("stations", `${BASE_URL}/api/v1/stations`);

    // Test authenticated endpoints if token exists
    if (token) {
      testEndpoint("user_profile", `${BASE_URL}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      testEndpoint("payments", `${BASE_URL}/api/v1/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      testEndpoint("user_rentals", `${BASE_URL}/api/v1/users/me/rentals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  const clearResults = () => {
    setResults({});
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2rem 1rem",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#1f2937",
          }}
        >
          API Debug Console
        </h1>

        {/* Environment Info */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Environment Configuration
          </h2>
          <div style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
            <p>
              <strong>BASE_URL:</strong> {BASE_URL || "❌ Not set"}
            </p>
            <p>
              <strong>Node Environment:</strong> {clientInfo.nodeEnv}
            </p>
            <p>
              <strong>Token Present:</strong>{" "}
              {clientInfo.hasToken ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Current URL:</strong> {clientInfo.currentUrl}
            </p>
          </div>
        </div>

        {/* Test Controls */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Test Controls
          </h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={testEndpoints}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Test All Endpoints
            </button>
            <button
              onClick={clearResults}
              style={{
                background: "#6b7280",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Test Results
          </h2>

          {Object.keys(results).length === 0 && (
            <p style={{ color: "#6b7280", fontStyle: "italic" }}>
              No tests run yet. Click "Test All Endpoints" to start.
            </p>
          )}

          {Object.entries(results).map(([name, result]) => (
            <div
              key={name}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: result.success ? "#f0fdf4" : "#fef2f2",
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: result.success ? "#166534" : "#991b1b",
                  }}
                >
                  {name.replace(/_/g, " ").toUpperCase()}
                  {loading[name] && <span> (Loading...)</span>}
                </h3>
                <span
                  style={{
                    background: result.success ? "#22c55e" : "#ef4444",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {result.status}
                </span>
              </div>

              <div style={{ padding: "1rem", fontSize: "0.875rem" }}>
                {result.success ? (
                  <div>
                    <p style={{ color: "#166534", marginBottom: "0.5rem" }}>
                      ✅ {result.message}
                    </p>
                    <details>
                      <summary style={{ cursor: "pointer", color: "#6b7280" }}>
                        View Response Data
                      </summary>
                      <pre
                        style={{
                          background: "#f9fafb",
                          padding: "1rem",
                          borderRadius: "0.25rem",
                          overflow: "auto",
                          marginTop: "0.5rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: "#991b1b", marginBottom: "0.5rem" }}>
                      ❌ {result.error}
                    </p>
                    <details>
                      <summary style={{ cursor: "pointer", color: "#6b7280" }}>
                        View Error Details
                      </summary>
                      <pre
                        style={{
                          background: "#f9fafb",
                          padding: "1rem",
                          borderRadius: "0.25rem",
                          overflow: "auto",
                          marginTop: "0.5rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#1e40af",
            }}
          >
            Troubleshooting Steps
          </h3>
          <ol
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.5",
              color: "#1e40af",
              paddingLeft: "1.5rem",
            }}
          >
            <li>Check if your backend server is running</li>
            <li>
              Verify the NEXT_PUBLIC_API_URL in .env.local matches your backend
              URL
            </li>
            <li>Check for CORS configuration on your backend</li>
            <li>Ensure your backend accepts the request headers being sent</li>
            <li>Try logging in first if testing authenticated endpoints</li>
            <li>Check browser developer tools Network tab for more details</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
