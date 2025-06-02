'use client';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimpleHeaderProps {
  title: string;
  backLink?: string;
}

const SimpleHeader = ({ title, backLink = "/" }: SimpleHeaderProps) => {
  return (
    <header className="border-b py-4 bg-white">
      <div className="container mx-auto px-4 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href={backLink}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-display font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default SimpleHeader;
