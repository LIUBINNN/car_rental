'use client';

import Link from 'next/link';

export default function StoresPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stores Location</h1>
      <p>This is a test</p>

      <Link
        href="/"
        className="inline-block mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded shadow"
      >
        Back to Home
      </Link>
    </main>
  );
}