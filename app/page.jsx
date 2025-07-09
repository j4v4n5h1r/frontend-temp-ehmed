'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Power Bank Kiralama Sistemi</h1>
      <p className="mb-8 max-w-xl text-center text-gray-700">
        Şehirdeki istasyonlardan kolayca power bank kiralayın, ödeme geçmişinizi görün ve cihazınızı şarj edin.
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Giriş Yap
          </button>
        </Link>
        <Link href="/register">
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
            Kayıt Ol
          </button>
        </Link>
      </div>
    </div>
  );
}
