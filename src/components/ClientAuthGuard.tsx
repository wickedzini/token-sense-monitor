'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/landing');
    }
  }, [auth.isAuthenticated, router]);

  if (!auth.isAuthenticated) return null; // lub loader

  return <>{children}</>;
}
