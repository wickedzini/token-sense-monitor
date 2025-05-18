
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface SpendRingChartProps {
  className?: string;
}

const COLORS = ["#6A4CFF", "#10B981", "#F59E0B", "#EF4444", "#A0AEC0"];

const SpendRingChart = ({ className }: SpendRingChartProps) => {
  // Mock data - would be replaced with real API data
  const data = [
    { name: "API Calls", value: 42 },
    { name: "Custom Models", value: 28 },
    { name: "Fine-tuning", value: 15 },
    { name: "Embeddings", value: 10 },
    { name: "Other", value: 5 },
  ];

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-gray-800">{`${data.name}: $${data.value}`}</p>
          <p className="text-gray-500">{`${percentage}% of spend`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Spend Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
