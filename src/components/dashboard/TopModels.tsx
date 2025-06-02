
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TopModelsProps {
  className?: string;
}

const TopModels = ({ className }: TopModelsProps) => {
  // Mock data - would be replaced with real API data
  const data = [
    { name: "GPT-4", spend: 47.20, color: "#6A4CFF" },
    { name: "Claude 3", spend: 28.50, color: "#10B981" },
    { name: "GPT-3.5", spend: 15.30, color: "#F59E0B" },
    { name: "Llama 3", spend: 10.45, color: "#EF4444" },
    { name: "Other", spend: 7.00, color: "#A0AEC0" },
  ];

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Top Models</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 5,
                left: 50,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
              <Bar dataKey="spend" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopModels;
