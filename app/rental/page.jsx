'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const BASE_URL = 'http://localhost:8000'; // Backend URL

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
      await axios.post(`${BASE_URL}/api/v1/rentals`, data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Rent a Power Bank</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Station</label>
          <input
            {...register('station', { required: 'Station is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.station && <p className="text-red-500">{errors.station.message}</p>}
        </div>
        <div>
          <label className="block mb-2">Power Bank</label>
          <input
            {...register('powerBank', { required: 'Power Bank is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.powerBank && <p className="text-red-500">{errors.powerBank.message}</p>}
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
