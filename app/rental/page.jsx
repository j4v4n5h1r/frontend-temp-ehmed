"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const RentalPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = cookie.get("token");
      const payload = {
        stationId: data.stationId,
        qrCodeData: data.qrCodeData,
      };

      const res = await axios.post(
        `${BASE_URL}/api/v1/rentals/initiate`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status === 201) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error("Kiralama başlatılamadı");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Kiralama işlemi başarısız oldu",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-primary">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
          <h1 className="heading-lg mb-4">Power Bank Kirala</h1>
          <p className="text-body max-w-2xl mx-auto">
            QR kodunu tarayarak veya istasyon bilgilerini girerek power bank
            kiralama işlemini başlatın
          </p>
        </div>

        <div
          style={{
            maxWidth: "42rem",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Success Message */}
          {success && (
            <div className="alert-success mb-6 animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3"
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
                  <div className="font-semibold">Kiralama Başarılı!</div>
                  <div className="text-sm">
                    Power bank kiralamanız başlatıldı. Dashboard'dan takip
                    edebilirsiniz.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert-error mb-6 animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3"
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
                  <div className="font-semibold">Hata Oluştu</div>
                  <div className="text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Rental Form */}
          <div className="card animate-slide-up">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="stationId"
                  className="block text-sm font-semibold text-neutral-700 mb-3"
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-600"
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
                    İstasyon ID
                  </span>
                </label>
                <input
                  id="stationId"
                  type="text"
                  placeholder="Örn: STATION001"
                  {...register("stationId", {
                    required: "İstasyon ID gereklidir",
                    minLength: {
                      value: 3,
                      message: "İstasyon ID en az 3 karakter olmalıdır",
                    },
                  })}
                  className={errors.stationId ? "input-error" : "input-primary"}
                  style={{
                    boxSizing: "border-box",
                    minWidth: 0,
                    maxWidth: "100%",
                  }}
                />
                {errors.stationId && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
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
                <p className="text-neutral-600 text-sm mt-2">
                  Power bank istasyonunda bulunan istasyon kimlik numarasını
                  girin
                </p>
              </div>

              <div>
                <label
                  htmlFor="qrCodeData"
                  className="block text-sm font-semibold text-neutral-700 mb-3"
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-600"
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
                    QR Kod Verisi
                  </span>
                </label>
                <textarea
                  id="qrCodeData"
                  rows="3"
                  placeholder="QR kod taramasından elde edilen veriyi buraya yapıştırın"
                  {...register("qrCodeData", {
                    required: "QR kod verisi gereklidir",
                    minLength: {
                      value: 10,
                      message: "QR kod verisi en az 10 karakter olmalıdır",
                    },
                  })}
                  className={
                    errors.qrCodeData
                      ? "input-error resize-none"
                      : "input-primary resize-none"
                  }
                  style={{
                    boxSizing: "border-box",
                    minWidth: 0,
                    maxWidth: "100%",
                    resize: "none",
                  }}
                />
                {errors.qrCodeData && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    {errors.qrCodeData.message}
                  </p>
                )}
                <p className="text-neutral-600 text-sm mt-2">
                  Power bank üzerindeki QR kodu tarayarak veriyi elde edin
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5"
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
                  <div className="text-sm text-green-800">
                    <div className="font-semibold mb-1">
                      Kiralama Nasıl Yapılır?
                    </div>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>
                        İstasyon üzerindeki QR kodu mobil cihazınızla tarayın
                      </li>
                      <li>QR kod verisini yukarıdaki alana yapıştırın</li>
                      <li>
                        İstasyon ID'sini girin (istasyon üzerinde yazmaktadır)
                      </li>
                      <li>"Kiralama Başlat" butonuna tıklayın</li>
                    </ol>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-4 justify-center"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Kiralama işlemi başlatılıyor...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-6 h-6 mr-2"
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
                    Kiralama Başlat
                  </span>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">
                Önemli Bilgiler
              </h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  Kiralama ücreti kullanım süresine göre hesaplanır
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  Power bank'i herhangi bir istasyona iade edebilirsiniz
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  24 saat ücretsiz kullanım hakkınız vardır
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="btn-outline w-full justify-center"
            >
              <span className="flex items-center justify-center">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Dashboard'a Git
              </span>
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="btn-secondary w-full justify-center"
            >
              <span className="flex items-center justify-center">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ana Sayfa
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPage;
