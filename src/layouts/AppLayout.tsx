import React from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
