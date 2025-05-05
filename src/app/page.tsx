'use client';

import { useAuth } from '@/hooks/useAuth';
import SignInForm from '@/components/auth/SignInForm';
import BookingTable from '@/components/booking/BookingTable';
import ChatInterface from '@/components/booking/ChatInterface';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-black">
      {user ? (
        <div className="w-full" style={{ maxWidth: 'var(--max-content-width)' }}>
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">Restaurant Booking System</h1>
              <p className="text-cyan-300">Welcome, {user.email}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-cyan-500 rounded text-cyan-400 hover:bg-gray-900"
              >
                Refresh Data
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 border border-red-500 rounded text-red-400 hover:bg-gray-900"
              >
                Sign Out
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 max-w-full">
            <div className="w-full">
              <BookingTable />
            </div>
            <div className="w-full">
              <ChatInterface />
            </div>
          </div>
        </div>
      ) : (
        <SignInForm />
      )}
    </div>
  );
}
