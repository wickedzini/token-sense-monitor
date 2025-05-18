
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface SpendTrendProps {
  className?: string;
}

const SpendTrend = ({ className }: SpendTrendProps) => {
  // Mock data - would be replaced with real API data
  const data = [
    { date: "Apr 1", spend: 4.5 },
    { date: "Apr 2", spend: 3.8 },
    { date: "Apr 3", spend: 6.2 },
    { date: "Apr 4", spend: 5.7 },
    { date: "Apr 5", spend: 4.9 },
    { date: "Apr 6", spend: 7.3 },
    { date: "Apr 7", spend: 6.8 },
    { date: "Apr 8", spend: 8.1 },
    { date: "Apr 9", spend: 9.5 },
    { date: "Apr 10", spend: 8.7 },
    { date: "Apr 11", spend: 7.4 },
    { date: "Apr 12", spend: 9.2 },
    { date: "Apr 13", spend: 10.1 },
    { date: "Apr 14", spend: 9.8 },
  ];

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-700">Spend Trend</CardTitle>
          <Link 
            to="/analytics"
            className="text-sm text-brand-primary flex items-center hover:underline"
          >
            View details
            <ExternalLink size={12} className="ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6A4CFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6A4CFF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip formatter={(value) => [`$${value}`, "Daily Spend"]} />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="#6A4CFF"
                fillOpacity={1}
                fill="url(#spendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendTrend;
