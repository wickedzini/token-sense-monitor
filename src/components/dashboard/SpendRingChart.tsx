
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
    { name: "API", value: 42 },
    { name: "Custom", value: 28 },
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
  
  // Custom renderer for the labels to ensure they fit
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Short names that will fit inside the chart
    const shortName = name.length > 8 ? `${name.substring(0, 7)}...` : name;
    
    // Only show labels for segments with enough area (more than 5% of total)
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${shortName}`}
      </text>
    );
  };

  // Custom legend that provides more space for text
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-sm mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}: ${data[index].value}</span>
          </li>
        ))}
      </ul>
    );
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
                labelLine={false}
                label={renderCustomizedLabel}
                cornerRadius={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
