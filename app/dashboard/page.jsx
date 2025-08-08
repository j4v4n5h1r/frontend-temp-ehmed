"use client";

import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../context/TranslationContext";
import { apiCallWithAuth } from "../../utils/api";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [rentals, setRentals] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [rentalRes, paymentRes] = await Promise.all([
          apiCallWithAuth("/api/v1/users/me/rentals", token),
          apiCallWithAuth("/api/v1/payments", token)
        ]);

        setRentals(rentalRes || []);
        setPayments(paymentRes || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        // Show user-friendly error message
        if (err.isNetworkError) {
          setError(t("errors.networkTimeout"));
        } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          setError(t("errors.sessionExpired"));
        } else {
          setError(err.message || t("errors.generic"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, t]);

  const getStatusBadge = (rental) => {
    if (rental.end_time) {
      return <span className="badge-success">{t("rentals.completed")}</span>;
    }
    return <span className="badge-warning">{t("rentals.active")}</span>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-600 text-lg">{t("common.loading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl max-w-md">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 flex-shrink-0"
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
                  <h3 className="font-semibold">{t("errors.generic")}</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 mb-2 tracking-tight">
            {t("nav.dashboard")}
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 animate-slide-up">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-neutral-200 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600"
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
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
              {rentals.length}
            </div>
            <div className="text-neutral-600 text-sm sm:text-base">
              {t("rentals.totalRentals")}
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-neutral-200 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
              {payments.length}
            </div>
            <div className="text-neutral-600 text-sm sm:text-base">
              {t("payments.title")}
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-neutral-200 text-center hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600"
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
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
              {rentals.filter((rental) => !rental.end_time).length}
            </div>
            <div className="text-neutral-600 text-sm sm:text-base">
              {t("rentals.activeRentals")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Rental History */}
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {t("rentals.history")}
              </h2>
              <div className="flex items-center text-primary-600">
                <svg
                  className="w-5 h-5 mr-2"
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
                <span className="text-sm font-medium">
                  {rentals.length} {t("rentals.title")}
                </span>
              </div>
            </div>

            {rentals.length === 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-neutral-200 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-neutral-400"
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
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {t("rentals.noRentalsFound")}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {t("rentals.startFirstRental")}
                </p>
                <button
                  onClick={() => router.push("/rental")}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t("common.getStarted")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-neutral-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-primary-600"
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
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-neutral-900 truncate">
                            {t("rentals.station")} #{rental.station_id}
                          </div>
                          <div className="text-xs sm:text-sm text-neutral-600">
                            {formatDate(rental.start_time)}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(rental)}
                      </div>
                    </div>

                    {rental.end_time && (
                      <div className="text-xs sm:text-sm text-neutral-600 pl-13">
                        <strong>{t("rentals.ended")}:</strong> {formatDate(rental.end_time)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Payment History */}
          <section
            className="animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {t("payments.history")}
              </h2>
              <div className="flex items-center text-blue-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {payments.length} {t("payments.title")}
                </span>
              </div>
            </div>

            {payments.length === 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-neutral-200 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {t("payments.noPaymentsYet")}
                </h3>
                <p className="text-neutral-600">
                  {t("payments.viewAndManageTransactions")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-neutral-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-neutral-900">
                            {formatCurrency(payment.amount)}
                          </div>
                          <div className="text-xs sm:text-sm text-neutral-600">
                            {formatDate(payment.timestamp)}
                          </div>
                        </div>
                      </div>
                      <span className="badge-success ml-2 flex-shrink-0">
                        {t("payments.completed")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
