'use client';
import React, { useState } from 'react';
import { useCountryStore } from '@/store/zustand';
import { updateCountry } from '@/utils/api';

// Component for inputting country code and updating visit stats
const CountryInput = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('US');
  const updateCountryStats = useCountryStore(
    (state) => state.updateCountryStats
  );

  // Submits the country code to update stats
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateCountry(code); // API call to update country stats
      updateCountryStats(code); // Update local store
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        try {
          setError(JSON.parse(e.message).errors[0].msg); // Parse error message
        } catch {
          setError(e.message);
        }
      } else {
        setError('An unknown error occured');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <label className='block mb-2'>
        Country&nbsp;
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())} // Update code state
          maxLength={2}
          className='border px-2 py-1 w-16 text-center'
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        {loading ? 'Sending…' : 'Add visit'}
      </button>
      {error && <p className='text-red-600 mt-2'>{error}</p>} 
    </>
  );
};

export default CountryInput;
