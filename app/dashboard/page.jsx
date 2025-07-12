'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [rentals, setRentals] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
const rentalRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me/rentals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const paymentRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRentals(rentalRes.data);
        setPayments(paymentRes.data.payments || []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Veriler alınamadı');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Kiralama Geçmişi</h2>
        {rentals.length === 0 ? (
          <p>Henüz kiralama yapılmamış.</p>
        ) : (
          <ul className="space-y-2">
            {rentals.map((rental) => (
              <li key={rental.id} className="p-3 border rounded bg-gray-50">
                <div><strong>İstasyon:</strong> {rental.station_id}</div>
                <div><strong>Başlangıç:</strong> {new Date(rental.start_time).toLocaleString()}</div>
                <div><strong>Bitiş:</strong> {rental.end_time ? new Date(rental.end_time).toLocaleString() : 'Devam ediyor'}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ödemeler</h2>
        {payments.length === 0 ? (
          <p>Henüz ödeme yapılmamış.</p>
        ) : (
          <ul className="space-y-2">
            {payments.map((payment) => (
              <li key={payment.id} className="p-3 border rounded bg-gray-50">
                <div><strong>Tutar:</strong> {payment.amount} ₺</div>
                <div><strong>Tarih:</strong> {new Date(payment.timestamp).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
