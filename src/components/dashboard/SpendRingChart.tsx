
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";

const data = [
  { name: "GPT-4", value: 1540, color: "#6A4CFF" },
  { name: "GPT-3.5 Turbo", value: 890, color: "#9A7BFF" },
  { name: "Claude 3 Opus", value: 650, color: "#C4B5FF" },
  { name: "Claude 3 Haiku", value: 320, color: "#A78BFF" },
  { name: "PaLM 2", value: 210, color: "#4A2CB0" },
];

// Custom label component with more space for text
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  // Increase the radius to position labels further away from the pie
  const radius = outerRadius * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text 
      x={x} 
      y={y} 
      fill={data[index].color}
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="500"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SpendRingChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Spend Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              cornerRadius={6}
              dataKey="value"
              labelLine={true}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Spend"]}
              labelFormatter={(name) => `${name}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">Total spend: ${total}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
