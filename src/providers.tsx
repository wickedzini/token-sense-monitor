'use client';
import { useState, useEffect } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { TooltipProvider } from '@/components/ui/tooltip';
// import { Toaster } from '@/components/ui/toaster';
// import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';

// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null or a loading spinner on the server/initial render
    return null;
  }

  return (
    // <QueryClientProvider client={queryClient}>
      // <TooltipProvider>
        // <Toaster />
        // <Sonner />
        <AuthProvider>
          {children}
        </AuthProvider>
      // </TooltipProvider>
    // </QueryClientProvider>
  );
}
