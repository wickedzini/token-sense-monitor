
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface SpendRingChartProps {
  className?: string;
}

const SpendRingChart = ({ className }: SpendRingChartProps) => {
  // Mock data - would be replaced with real API data
  const data = [
    { name: "GPT-4", value: 47, color: "#6A4CFF" },
    { name: "Claude 3", value: 28, color: "#10B981" },
    { name: "GPT-3.5", value: 15, color: "#F59E0B" },
    { name: "Llama 3", value: 10, color: "#EF4444" },
  ];

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Spend Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`$${(value * 1.28).toFixed(2)} (${value}%)`, name]}
                labelFormatter={() => "Model Distribution"}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
