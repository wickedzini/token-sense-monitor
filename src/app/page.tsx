import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for fallback

// Dynamically import the LandingPage component with SSR disabled
const LandingPage = dynamic(() => import('@/components/landing/LandingPage'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-screen" />, // Optional loading fallback
});

const HomePage = () => {
  return <LandingPage />;
};

export default HomePage;
