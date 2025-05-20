
// Updates to add adaptive radius to bars based on width
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, subDays, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DateRange {
  from: Date;
  to: Date;
}

// Custom bar shape that adapts to width
const AdaptiveRoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  
  // Calculate radius based on width - thinner bars get smaller radius
  const radius = Math.min(width * 0.3, 6);
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={fill}
      />
    </g>
  );
};

// Simulated data for the chart
const generateDailyData = (dateRange: DateRange) => {
  const data = [];
  const currentDate = new Date(dateRange.from);
  
  while (currentDate <= dateRange.to) {
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
  const [date, setDate] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  const [chartData, setChartData] = useState(() => generateDailyData(date));
  
  const [selectedPreset, setSelectedPreset] = useState<string>("30d");
  
  const handleRangeSelect = (newRange: DateRange) => {
    setDate(newRange);
    setChartData(generateDailyData(newRange));
  };
  
  const setPreset = (preset: string) => {
    setSelectedPreset(preset);
    const now = new Date();
    
    let from: Date;
    let to: Date = now;
    
    switch (preset) {
      case "7d":
        from = subDays(now, 7);
        break;
      case "30d":
        from = subDays(now, 30);
        break;
      case "mtd":
        from = startOfMonth(now);
        break;
      case "custom":
        // Keep current range for custom
        return;
      default:
        from = subDays(now, 30);
    }
    
    const newRange = { from, to };
    handleRangeSelect(newRange);
  };
  
  // Get total spend for the period
  const totalSpend = chartData.reduce((sum, day) => sum + day.total, 0);
  
  // Custom date display
  const dateRangeText = selectedPreset === "custom" 
    ? `Custom range: ${format(date.from, "d MMM")} – ${format(date.to, "d MMM yyyy")}`
    : selectedPreset === "7d" 
      ? "Last 7 days" 
      : selectedPreset === "30d" 
        ? "Last 30 days"
        : "Month to date";
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <CardTitle className="text-lg font-medium">Daily Spend</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex">
              <Button 
                variant={selectedPreset === "7d" ? "default" : "outline"} 
                size="sm" 
                className="h-8 rounded-r-none"
                onClick={() => setPreset("7d")}
              >
                7d
              </Button>
              <Button 
                variant={selectedPreset === "30d" ? "default" : "outline"} 
                size="sm" 
                className="h-8 rounded-none border-x-0"
                onClick={() => setPreset("30d")}
              >
                30d
              </Button>
              <Button 
                variant={selectedPreset === "mtd" ? "default" : "outline"} 
                size="sm" 
                className="h-8 rounded-l-none"
                onClick={() => setPreset("mtd")}
              >
                MTD
              </Button>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant={selectedPreset === "custom" ? "default" : "outline"} 
                  size="sm" 
                  className="h-8 flex gap-1"
                  onClick={() => setSelectedPreset("custom")}
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Custom</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: date.from, to: date.to }}
                  onSelect={(selected) => {
                    if (selected?.from && selected?.to) {
                      handleRangeSelect({ from: selected.from, to: selected.to });
                      setSelectedPreset("custom");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{dateRangeText}</span>
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
                formatter={(value) => [`$${value}`, ""]}
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
