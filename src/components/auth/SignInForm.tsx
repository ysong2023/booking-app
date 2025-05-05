'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function SignInForm() {
  const [email, setEmail] = useState('admin@google.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { signIn, signInWithGoogle, loading } = useAuth();

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Apply theme class
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000); // Hide message after 5 seconds
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    
    try {
      await signInWithGoogle();
      // User will be redirected to Google
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  // Google icon in cyberpunk style
  const googleIcon = (
    <div className="inline-block mr-3 relative">
      <div className="grid grid-cols-6 gap-0.5">
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-black"></div>
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-black"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-red-500"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        <div className="w-1 h-1 bg-green-500"></div>
        <div className="w-1 h-1 bg-green-500"></div>
        
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        <div className="w-1 h-1 bg-green-500"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        
        <div className="w-1 h-1 bg-yellow-400"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
        <div className="w-1 h-1 bg-green-500"></div>
        <div className="w-1 h-1 bg-green-500"></div>
        <div className="w-1 h-1 bg-blue-500"></div>
      </div>
    </div>
  );

  // Pixel art login icon
  const pixelLoginIcon = (
    <div className="inline-block mr-2">
      <div className="grid grid-cols-5 gap-0.5">
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-cyan-600"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-transparent"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
        <div className="w-1 h-1 bg-cyan-400"></div>
      </div>
    </div>
  );

  return (
    <>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      {showMessage && (
        <div className="absolute top-16 right-4 bg-black border border-cyan-500 p-3 text-cyan-400 max-w-xs font-mono text-xs animate-pulse">
          <div className="mb-1 text-sm font-bold">ERROR: LIGHT MODE DETECTED</div>
          <div className="glitch-text">EMBRACE THE DARKNESS, HUMAN.</div>
          <div className="mt-1">CYBERPUNK PROTOCOL ACTIVATED.</div>
        </div>
      )}
      
      <div className="container">
        <h1>Restaurant Booking System</h1>
        <p className="mb-6">Please sign in to continue</p>
        
        <h2>Welcome Back</h2>
        
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex items-center justify-center border-2 border-purple-500 rounded-md px-4 py-3 mb-6 w-full bg-black hover:bg-gray-900 relative group overflow-hidden"
          style={{
            boxShadow: "0 0 5px #9900ff, 0 0 10px #9900ff",
            textShadow: "0 0 3px #ffffff, 0 0 5px #ffffff"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
          {googleIcon}
          <span className="text-white font-bold tracking-wide">
            LOGIN WITH GOOGLE
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500"></div>
        </button>
        
        <div className="text-sm my-3 border-b border-cyan-800 pb-2">Or continue with</div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-cyan-700 rounded px-3 py-2 w-full mb-1 bg-black text-cyan-400"
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-cyan-700 rounded px-3 py-2 w-full mb-1 bg-black text-cyan-400"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="border border-cyan-500 rounded px-3 py-2 mb-6 w-full bg-black text-cyan-400 hover:bg-gray-900"
            style={{
              boxShadow: "0 0 5px #00ffff, 0 0 10px #00ffff"
            }}
          >
            {pixelLoginIcon}
            Login
          </button>
        </form>
        
        <div className="text-sm text-center text-cyan-400">
          New account? <Link href="#" className="underline">Sign up</Link>
        </div>
      </div>
    </>
  );
}