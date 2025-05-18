
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface SpendOverviewProps {
  className?: string;
}

const SpendOverview = ({ className }: SpendOverviewProps) => {
  // Mock data - would be replaced with real API data
  const data = {
    totalSpend: 128.45,
    trend: 12.3,
    trendType: "up", // or "down"
    period: "Last 30 Days",
  };

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
          <span className="text-3xl font-display font-bold">${data.totalSpend.toFixed(2)}</span>
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
            to="/analytics"
            className="mt-4 text-sm text-brand-primary flex items-center hover:underline"
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
