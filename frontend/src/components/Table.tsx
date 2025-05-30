'use client';
import { useCountryStore } from '@/store/zustand';
import React, { useEffect } from 'react';

// Component to display country visit statistics
const Table = () => {
  const country = useCountryStore((stats) => stats.countryStats); // Access country stats
  const fetch = useCountryStore((stats) => stats.fetch); // Fetch function

  // Fetch stats on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  // Display loading message if stats are not available
  if (!country) return <div>Loading...</div>;

  return (
    <>
      <h2 className='text-xl font-medium mt-6 mb-2'>Stats</h2>
      <table className='w-full text-left border'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-2'>Country</th>
            <th className='p-2'>Visits</th>
          </tr>
        </thead>
        <tbody>
          {country &&
            Object.entries(country).map(([countryCode, count]) => (
              <tr key={countryCode + count}>
                <td className='p-2'>{countryCode.toUpperCase()}</td>
                <td className='p-2'>{count}</td>
              </tr>
            ))}
          {country && !Object.keys(country).length && (
            <tr>
              <td colSpan={2} className='p-2 text-center'>
                No data yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
