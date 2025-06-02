// src/app/(app)/layout.tsx
import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DateRangeProvider } from '@/contexts/DateRangeContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <DateRangeProvider>
          <main className="flex-1 p-6">{children}</main>
        </DateRangeProvider>
      </div>
      <Footer />
    </div>
  );
}