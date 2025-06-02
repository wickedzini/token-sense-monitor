'use client';
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useDateRange } from '@/contexts/DateRangeContext';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';

interface SpendOverviewProps {
  className?: string;
}

const generateOverviewData = (dateRange: DateRange) => {
  if (!dateRange?.from || !dateRange?.to) {
    return {
      totalSpend: 0,
      trend: 0,
      trendType: "up",
      period: "Select a range",
    };
  }

  const daysInRange = differenceInDays(dateRange.to, dateRange.from) + 1;
  const factor = daysInRange / 30;

  const simulatedSpend = 128.45 * factor * (0.8 + Math.random() * 0.4);
  const simulatedTrend = 10 + Math.random() * 15;

  return {
    totalSpend: simulatedSpend,
    trend: parseFloat(simulatedTrend.toFixed(1)),
    trendType: simulatedTrend > 12 ? "up" : "down",
    period: `${daysInRange} Days`,
  };
};

const SpendOverview = ({ className }: SpendOverviewProps) => {
  const { dateRange } = useDateRange();
  const [data, setData] = useState(() => generateOverviewData(dateRange));

  useEffect(() => {
    setData(generateOverviewData(dateRange));
  }, [dateRange]);

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-1.5">
          <DollarSign size={18} className="text-gray-500" />
          Total Spend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <motion.span 
            className="text-3xl font-display font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ${data.totalSpend.toFixed(2)}
          </motion.span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={cn(
              "flex items-center text-sm",
              data.trendType === "up" ? "text-red-500" : "text-green-500"
            )}>
              {data.trendType === "up" ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="font-medium">{data.trend}%</span>
            </div>
            <span className="text-sm text-gray-500">{data.period}</span>
          </div>
          
          <Link 
            href="/analytics"
            className="mt-4 text-sm text-brand-primary flex items-center hover:underline transition-colors"
          >
            View details
            <ExternalLink size={12} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendOverview;
