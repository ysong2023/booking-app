'use client';

import { Suspense } from 'react';
import HomePage from '@/components/HomePage';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
}
