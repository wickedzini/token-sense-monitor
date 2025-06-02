// Updates to add adaptive radius to bars based on width
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDateRange } from '@/contexts/DateRangeContext';
import { cn } from "@/lib/utils";
import { format, subDays, startOfMonth, endOfMonth, isSameDay } from "date-fns";

interface DateRange {
  from: Date;
  to: Date;
}

// Custom bar shape that adapts to width and applies top-only rounding for the top segment
const AdaptiveRoundedBar = (props: any) => {
  const { x, y, width, height, fill, stackGroups, dataKey, payload } = props;
  
  // Zidentyfikowanie górnego segmentu w stosie
  let isTopSegment = false;
  if (stackGroups && stackGroups.a && payload) { // 'a' to stackId
    const stack = stackGroups.a.stacks.find((s: any) =>
        // Znajdź stos, który zawiera wpis odpowiadający aktualnemu segmentowi
        s.entries.some((entry: any) => entry.dataKey === dataKey && entry.payload === payload)
    );

    if (stack) {
      // Znajdź wpis w stosie odpowiadający aktualnemu punktowi danych
      const entriesForPayload = stack.entries.filter((entry: any) => entry.payload === payload);

      if (entriesForPayload.length > 0) {
        // Znajdź wpis z najniższą wartością Y (górny segment)
        const topEntry = entriesForPayload.reduce((minEntry: any, currentEntry: any) => {
            return currentEntry.y < minEntry.y ? currentEntry : minEntry;
        }, entriesForPayload[0]);

        // Sprawdź, czy aktualny dataKey jest tym samym co dataKey górnego wpisu
        isTopSegment = topEntry.dataKey === dataKey;
      }
    }
  }

  // Define radius - adjust as needed
  const radius = Math.min(width / 2, 6); // Max radius is half the bar width or 6px

  // Generate SVG path string
  let path = "";
  if (isTopSegment) {
    // Path for rectangle with rounded top-left and top-right corners
    path = `M ${x + radius}, ${y} L ${x + width - radius}, ${y} Q ${x + width}, ${y}, ${x + width}, ${y + radius} L ${x + width}, ${y + height} L ${x}, ${y + height} L ${x}, ${y + radius} Q ${x}, ${y}, ${x + radius}, ${y} Z`;
  } else {
    // Path for standard rectangle
    path = `M ${x}, ${y} L ${x + width}, ${y} L ${x + width}, ${y + height} L ${x}, ${y + height} Z`;
  }

  return (
    <path d={path} fill={fill} className="drop-shadow-sm" />
  );
};

// Simulated data for the chart
const generateDailyData = (dateRange: DateRange) => {
  const data = [];
  if (!dateRange?.from || !dateRange?.to) return [];

  const currentDate = new Date(dateRange.from);
  const endDate = new Date(dateRange.to);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Randomize daily spend with higher values on weekdays
    const baseValue = isWeekend ? 20 + Math.random() * 25 : 40 + Math.random() * 60;
    
    data.push({
      date: format(currentDate, "MMM d"),
      GPT4: Math.round(baseValue * 0.6),
      GPT3: Math.round(baseValue * 0.3),
      Claude: Math.round(baseValue * 0.1),
      total: Math.round(baseValue),
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

interface SpendTrendProps {
  className?: string;
}

const SpendTrend = ({ className }: SpendTrendProps) => {
  const { dateRange } = useDateRange();
  const [chartData, setChartData] = useState(() => generateDailyData(dateRange));

  useEffect(() => {
    setChartData(generateDailyData(dateRange));
  }, [dateRange]);

  // Get total spend for the period
  const totalSpend = chartData.reduce((sum, day) => sum + day.total, 0);

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Daily Spend</CardTitle>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last 30 days</span>
          <span className="font-medium">Total: ${totalSpend}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
              stackOffset="sign"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value, name) => [`$${value}`, name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Bar
                dataKey="GPT4"
                stackId="a"
                fill="#6A4CFF"
                shape={<AdaptiveRoundedBar />}
              />
              <Bar
                dataKey="GPT3"
                stackId="a"
                fill="#9A7BFF"
                shape={<AdaptiveRoundedBar />}
              />
              <Bar
                dataKey="Claude"
                stackId="a"
                fill="#C4B5FF"
                shape={<AdaptiveRoundedBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendTrend;
