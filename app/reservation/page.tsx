'use client';

import dynamic from 'next/dynamic';

// Disable SSR completely
const ReservationClient = dynamic(() => import('./ReservationClient'), { ssr: false });

export default function ReservationPage() {
  return <ReservationClient />;
}
