"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
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
        const rentalRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me/rentals`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const paymentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRentals(rentalRes.data);
        setPayments(paymentRes.data.payments || []);
      } catch (err) {
        setError(err.response?.data?.detail || "Veriler alınamadı");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getStatusBadge = (rental) => {
    if (rental.end_time) {
      return <span className="badge-success">Tamamlandı</span>;
    }
    return <span className="badge-warning">Devam Ediyor</span>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container-primary">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner w-8 h-8 border-green-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Veriler yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-primary">
        <div className="container mx-auto px-6 py-16">
          <div className="alert-error max-w-md mx-auto">
            <div className="flex items-center">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Hata: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="heading-lg mb-2">Dashboard</h1>
          <p className="text-body">
            Kiralama geçmişinizi ve ödemelerinizi görüntüleyin
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
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
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {rentals.length}
            </div>
            <div className="text-neutral-600">Toplam Kiralama</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
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
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {payments.length}
            </div>
            <div className="text-neutral-600">Toplam Ödeme</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {rentals.filter((rental) => !rental.end_time).length}
            </div>
            <div className="text-neutral-600">Aktif Kiralama</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Rental History */}
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm">Kiralama Geçmişi</h2>
              <div className="flex items-center text-green-600">
                <svg
                  className="w-5 h-5 mr-1"
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
                  {rentals.length} Kiralama
                </span>
              </div>
            </div>

            {rentals.length === 0 ? (
              <div className="card text-center py-8">
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
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Henüz kiralama yok
                </h3>
                <p className="text-neutral-600 mb-4">
                  İlk power bank kiralamanızı yapın
                </p>
                <button
                  onClick={() => router.push("/rental")}
                  className="btn-primary"
                >
                  Hemen Kirala
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div key={rental.id} className="card-minimal">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-green-600"
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
                        <div>
                          <div className="font-semibold text-neutral-900">
                            İstasyon #{rental.station_id}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {formatDate(rental.start_time)}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(rental)}
                    </div>

                    {rental.end_time && (
                      <div className="text-sm text-neutral-600">
                        <strong>Bitiş:</strong> {formatDate(rental.end_time)}
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
              <h2 className="heading-sm">Ödeme Geçmişi</h2>
              <div className="flex items-center text-blue-600">
                <svg
                  className="w-5 h-5 mr-1"
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
                  {payments.length} Ödeme
                </span>
              </div>
            </div>

            {payments.length === 0 ? (
              <div className="card text-center py-8">
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
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Henüz ödeme yok
                </h3>
                <p className="text-neutral-600">
                  Ödemeleriniz burada görünecek
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="card-minimal">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
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
                        <div>
                          <div className="font-semibold text-neutral-900">
                            {formatCurrency(payment.amount)}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {formatDate(payment.timestamp)}
                          </div>
                        </div>
                      </div>
                      <span className="badge-success">Başarılı</span>
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
