"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { useTranslation } from "../../utils/translations";
import { QrReader } from "react-qr-reader"; // Import the QR reader component

const BASE_URL = "https://mypobi.com";

const RentalPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // We'll use setValue to set the form value from the scanner
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(""); // State to store the scan result

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = cookie.get("token");
      const payload = {
        stationId: data.stationId,
        qrCodeData: data.qrCodeData, // The qrCodeData will now be populated by the scanner
      };

      const res = await axios.post(
        `${BASE_URL}/api/v1/rentals/initiate`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status === 201) {
        setSuccess(true);
        reset();
        setScanResult(""); // Reset the scan result as well
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error(t("errors.generic"));
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || err.message || t("errors.generic"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setValue("qrCodeData", data); // Set the form value
      setError(null); // Clear any previous errors
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Failed to access QR scanner.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "36rem",
          position: "relative",
          zIndex: 10,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "5rem",
              height: "5rem",
              background: "white",
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              marginBottom: "1.5rem",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <svg
              style={{ width: "2.5rem", height: "2.5rem", color: "#16a34a" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "800",
              color: "white",
              marginBottom: "0.75rem",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "-0.025em",
            }}
          >
            {t("nav.rental")}
          </h1>
          <p
            style={{
              color: "#dcfce7",
              fontSize: "1.125rem",
              fontWeight: "500",
            }}
          >
            {t("rental.subtitle")}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#16a34a",
              padding: "1rem",
              borderRadius: "0.75rem",
              animation: "fadeIn 0.3s ease-out",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  marginRight: "0.75rem",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div style={{ fontWeight: "600" }}>
                  {t("rental.success")}
                </div>
                <div style={{ fontSize: "0.875rem" }}>
                  {t("rental.successMessage")}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "1rem",
              borderRadius: "0.75rem",
              animation: "fadeIn 0.3s ease-out",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  marginRight: "0.75rem",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div style={{ fontWeight: "600" }}>{t("errors.generic")}</div>
                <div style={{ fontSize: "0.875rem" }}>{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Rental Form */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideUp 0.8s ease-out",
            backdropFilter: "blur(20px)",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="stationId"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.5rem",
                      color: "#16a34a",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {t("rental.stationId")}
                </span>
              </label>
              <input
                id="stationId"
                type="text"
                placeholder={t("rental.stationPlaceholder")}
                {...register("stationId", {
                  required: t("rental.stationRequired"),
                  minLength: {
                    value: 3,
                    message: t("rental.stationMinLength"),
                  },
                })}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "1rem",
                  border: errors.stationId
                    ? "2px solid #ef4444"
                    : "2px solid #dcfce7",
                  borderRadius: "0.75rem",
                  background: "white",
                  color: "#171717",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 4px rgba(34, 197, 94, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.stationId
                    ? "#ef4444"
                    : "#dcfce7";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.stationId && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.25rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.stationId.message}
                </p>
              )}
              <p
                style={{
                  color: "#525252",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                }}
              >
                {t("rental.stationHelp")}
              </p>
            </div>

            <div style={{ width: "100%", boxSizing: "border-box" }}>
              <label
                htmlFor="qrCodeData"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#404040",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.5rem",
                      color: "#16a34a",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t("rental.qrCodeData")}
                </span>
              </label>

              {/* The QR Scanner component is placed here */}
              <div
                style={{
                  border: "2px solid #dcfce7",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      handleScan(result?.text);
                    }
                    if (!!error) {
                      handleError(error);
                    }
                  }}
                  constraints={{ facingMode: "environment" }}
                  videoStyle={{ width: "100%" }}
                  containerStyle={{ width: "100%" }}
                />
              </div>
              {scanResult && (
                <p
                  style={{
                    color: "#16a34a",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.25rem",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  QR Code scanned successfully!
                </p>
              )}
              <input
                id="qrCodeData"
                type="hidden"
                {...register("qrCodeData", {
                  required: t("rental.qrRequired"),
                })}
                value={scanResult}
              />
              <p
                style={{
                  color: "#525252",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                }}
              >
                {t("rental.qrHelp")}
              </p>
            </div>

            <div
              style={{
                background: "#f0fdf4",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid #bbf7d0",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <svg
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#16a34a",
                    marginRight: "0.75rem",
                    marginTop: "0.125rem",
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div style={{ fontSize: "0.875rem", color: "#15803d" }}>
                  <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                    {t("rental.howToRent")}
                  </div>
                  <ol
                    style={{
                      listStyle: "decimal",
                      paddingLeft: "1.25rem",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    <li>
                      {t("rental.step1")}
                    </li>
                    <li>{t("rental.step2")}</li>
                    <li>{t("rental.step3")}</li>
                    <li>{t("rental.step4")}</li>
                  </ol>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 1.5rem",
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "white",
                background: loading
                  ? "linear-gradient(135deg, #a3a3a3 0%, #737373 100%)"
                  : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                borderRadius: "0.75rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                gap: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(34, 197, 94, 0.5)",
                boxSizing: "border-box",
                minWidth: 0,
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px) scale(1.02)";
                  e.target.style.boxShadow =
                    "0 20px 25px -5px rgba(34, 197, 94, 0.6)";
                  e.target.style.background =
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 10px 15px -3px rgba(34, 197, 94, 0.5)";
                  e.target.style.background =
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
                }
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {t("rental.starting")}
                </>
              ) : (
                <>
                  <svg
                    style={{ width: "1.25rem", height: "1.25rem" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  {t("rental.startButton")}
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                color: "#171717",
                marginBottom: "0.75rem",
                fontSize: "1rem",
              }}
            >
              {t("rental.importantInfo")}
            </h3>
            <div style={{ fontSize: "0.875rem", color: "#525252" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "0.5rem",
                    color: "#16a34a",
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t("rental.info1")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "0.5rem",
                    color: "#16a34a",
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t("rental.info2")}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "0.5rem",
                    color: "#16a34a",
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t("rental.info3")}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#16a34a",
              background: "white",
              border: "2px solid #22c55e",
              borderRadius: "0.75rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              gap: "0.5rem",
              boxSizing: "border-box",
              minWidth: 0,
              maxWidth: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f0fdf4";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            {t("nav.dashboard")}
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "white",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "0.75rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              gap: "0.5rem",
              boxSizing: "border-box",
              minWidth: 0,
              maxWidth: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {t("nav.home")}
          </button>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="/"
            style={{
              color: "#dcfce7",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "#dcfce7")}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("nav.home")}
          </a>
        </div>
      </div>

      {/* Required animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default RentalPage;