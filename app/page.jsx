"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="container-primary">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="heading-xl mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Power Bank Kiralama Sistemi
            </h1>
            <p className="text-body text-xl mb-8 max-w-2xl mx-auto">
              Şehirdeki istasyonlardan kolayca power bank kiralayın, ödeme
              geçmişinizi görün ve cihazınızı şarj edin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link href="/login">
              <button className="btn-secondary w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Giriş Yap
                </span>
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-primary w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Kayıt Ol
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-body max-w-2xl mx-auto">
              Modern teknoloji ile güvenli ve hızlı power bank kiralama deneyimi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="heading-sm mb-3">Hızlı Şarj</h3>
              <p className="text-body">
                Yüksek kapasiteli power bank'ler ile cihazlarınızı hızla şarj
                edin
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="heading-sm mb-3">Kolay Erişim</h3>
              <p className="text-body">
                Şehrin her yerinde bulunan istasyonlardan kolayca kiralayın
              </p>
            </div>

            <div className="card text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Güvenli Ödeme</h3>
              <p className="text-body">
                Güvenli ödeme sistemi ile endişesiz kullanım deneyimi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-bounce-gentle">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100">Aktif Kullanıcı</div>
            </div>
            <div
              className="animate-bounce-gentle"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">İstasyon Noktası</div>
            </div>
            <div
              className="animate-bounce-gentle"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Başarılı Kiralama</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-md mb-4">Hemen Başlayın</h2>
          <p className="text-body mb-8 max-w-2xl mx-auto">
            Dakikalar içinde kayıt olun ve power bank kiralama deneyiminizi
            başlatın
          </p>
          <Link href="/register">
            <button className="btn-primary text-lg px-8 py-4">
              <span className="flex items-center justify-center gap-2">
                Ücretsiz Kayıt Ol
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
