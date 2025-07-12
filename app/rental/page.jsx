'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import cookie from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Backend URL

const RentalPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = cookie.get('token');
      const payload = {
        stationId: data.stationId,
        qrCodeData: data.qrCodeData,
      };
      const res = await axios.post(
        `${BASE_URL}/api/v1/rentals/initiate`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setSuccess(true);
      } else {
        throw new Error('Rental initiation failed');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Rent a Power Bank</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="stationId" className="block mb-2">Station ID</label>
          <input
            id="stationId"
            {...register('stationId', { required: 'Station ID is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.stationId && <p className="text-red-500">{errors.stationId.message}</p>}
        </div>
        <div>
          <label htmlFor="qrCodeData" className="block mb-2">QR Code Data</label>
          <input
            id="qrCodeData"
            {...register('qrCodeData', { required: 'QR code is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.qrCodeData && <p className="text-red-500">{errors.qrCodeData.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Rent'}
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">Rental successful!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default RentalPage;
