
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

interface SpendRingChartProps {
  className?: string;
}

const SpendRingChart = ({ className }: SpendRingChartProps) => {
  // Mock data - would be replaced with real API data
  const data = [
    { name: "GPT-4", value: 47.20, percentage: 43.5, color: "#6A4CFF" },
    { name: "Claude 3", value: 28.50, percentage: 26.3, color: "#FFC46A" },
    { name: "GPT-3.5", value: 15.30, percentage: 14.1, color: "#FF6A8A" },
    { name: "Llama 3", value: 10.45, percentage: 9.7, color: "#4CAF50" },
    { name: "Other", value: 7.00, percentage: 6.4, color: "#A0AEC0" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border shadow-md rounded-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">${data.value.toFixed(2)} ({data.percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend with percentage and dollar amount
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-item-${index}`} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <div className="text-sm">
              <span className="font-medium">{entry.payload.name}</span>
              <span className="text-gray-500 ml-1 text-xs">
                ({entry.payload.percentage}% · ${entry.payload.value.toFixed(2)})
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-700">Spend Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderCustomLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
