'use client';
import CountryInput from '@/components/CountryInput';
import Table from '@/components/Table';

// Main entry point for the application
export default function Home() {
  return (
    <main className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Visit Tracker</h1>
      <CountryInput />
      <Table />
    </main>
  );
}
