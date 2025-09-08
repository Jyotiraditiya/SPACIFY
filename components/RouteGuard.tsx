'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading, isFirstVisit } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // If it's the user's first visit and they're not on auth pages, redirect to login
      if (isFirstVisit && !isAuthenticated && !pathname.startsWith('/auth')) {
        router.push('/auth/login');
        return;
      }

      // If user is authenticated and on auth pages, redirect to home
      if (isAuthenticated && pathname.startsWith('/auth')) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, isFirstVisit, pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If first visit and not authenticated, show login (handled by redirect above)
  if (isFirstVisit && !isAuthenticated && !pathname.startsWith('/auth')) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
