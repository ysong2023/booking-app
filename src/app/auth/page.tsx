'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    
    // Handle sign-in with OAuth
    const handleOAuthSignIn = async () => {
      if (hash) {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during OAuth sign-in:', error);
        }
        
        if (data?.session) {
          // Redirect to home page after successful sign-in
          router.push('/');
        }
      }
    };
    
    handleOAuthSignIn();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Completing authentication...
        </h2>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
} 