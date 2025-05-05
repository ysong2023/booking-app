import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh the session if it exists
  await supabase.auth.getSession();
  
  return res;
}

// Apply this middleware to all routes except public assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 