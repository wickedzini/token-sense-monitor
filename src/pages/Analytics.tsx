import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: thirtyDaysAgo,
    to: today
  });
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  
  // Mock data for charts
  const dailySpendData = [
    { date: "May 1", spend: 4.5 },
    { date: "May 2", spend: 3.8 },
    { date: "May 3", spend: 6.2 },
    { date: "May 4", spend: 5.7 },
    { date: "May 5", spend: 4.9 },
    { date: "May 6", spend: 7.3 },
    { date: "May 7", spend: 6.8 },
    { date: "May 8", spend: 8.1 },
    { date: "May 9", spend: 9.5 },
    { date: "May 10", spend: 8.7 },
    { date: "May 11", spend: 7.4 },
    { date: "May 12", spend: 9.2 },
    { date: "May 13", spend: 10.1 },
    { date: "May 14", spend: 9.8 },
  ];

  // Calculate cumulative spend for line chart
  const cumulativeData = dailySpendData.map((day, index) => {
    const cumulativeSpend = dailySpendData
      .slice(0, index + 1)
      .reduce((sum, current) => sum + current.spend, 0);
    return { ...day, cumulativeSpend };
  });

  // Model spend data for stacked area chart
  const modelSpendData = [
    { date: "May 1", gpt4: 2.5, gpt3: 1.2, claude: 0.8 },
    { date: "May 2", gpt4: 2.0, gpt3: 1.0, claude: 0.8 },
    { date: "May 3", gpt4: 3.2, gpt3: 2.1, claude: 0.9 },
    { date: "May 4", gpt4: 2.8, gpt3: 1.9, claude: 1.0 },
    { date: "May 5", gpt4: 2.3, gpt3: 1.7, claude: 0.9 },
    { date: "May 6", gpt4: 3.5, gpt3: 2.5, claude: 1.3 },
    { date: "May 7", gpt4: 3.1, gpt3: 2.4, claude: 1.3 },
    { date: "May 8", gpt4: 4.0, gpt3: 2.6, claude: 1.5 },
    { date: "May 9", gpt4: 4.8, gpt3: 2.9, claude: 1.8 },
    { date: "May 10", gpt4: 4.2, gpt3: 2.8, claude: 1.7 },
    { date: "May 11", gpt4: 3.6, gpt3: 2.3, claude: 1.5 },
    { date: "May 12", gpt4: 4.5, gpt3: 2.9, claude: 1.8 },
    { date: "May 13", gpt4: 5.1, gpt3: 3.1, claude: 1.9 },
    { date: "May 14", gpt4: 4.9, gpt3: 3.0, claude: 1.9 },
  ];

  // Mock data for expensive prompts table
  const expensivePrompts = [
    {
      id: 1,
      endpoint: "/api/completion",
      model: "gpt-4",
      promptTokens: 3254,
      completionTokens: 1857,
      cost: 0.98,
      timestamp: "May 18, 2025 10:32 AM"
    },
    {
      id: 2,
      endpoint: "/api/chat/completions",
      model: "gpt-4",
      promptTokens: 2988,
      completionTokens: 1342,
      cost: 0.87,
      timestamp: "May 18, 2025 09:45 AM"
    },
    {
      id: 3,
      endpoint: "/api/completion",
      model: "claude-3-opus",
      promptTokens: 4125,
      completionTokens: 976,
      cost: 0.85,
      timestamp: "May 17, 2025 04:15 PM"
    },
    {
      id: 4,
      endpoint: "/api/chat/completions",
      model: "gpt-4",
      promptTokens: 2546,
      completionTokens: 1453,
      cost: 0.72,
      timestamp: "May 17, 2025 02:23 PM"
    },
    {
      id: 5,
      endpoint: "/api/completion",
      model: "claude-3-opus",
      promptTokens: 3245,
      completionTokens: 765,
      cost: 0.69,
      timestamp: "May 17, 2025 11:08 AM"
    },
    {
      id: 6,
      endpoint: "/api/chat/completions",
      model: "gpt-4",
      promptTokens: 1980,
      completionTokens: 1240,
      cost: 0.57,
      timestamp: "May 16, 2025 05:34 PM"
    },
    {
      id: 7,
      endpoint: "/api/completion",
      model: "gpt-3.5-turbo",
      promptTokens: 5432,
      completionTokens: 2301,
      cost: 0.51,
      timestamp: "May 16, 2025 02:11 PM"
    },
    {
      id: 8,
      endpoint: "/api/chat/completions",
      model: "claude-3-haiku",
      promptTokens: 2876,
      completionTokens: 1123,
      cost: 0.48,
      timestamp: "May 16, 2025 11:45 AM"
    },
    {
      id: 9,
      endpoint: "/api/completion",
      model: "gpt-3.5-turbo",
      promptTokens: 3542,
      completionTokens: 1654,
      cost: 0.42,
      timestamp: "May 15, 2025 04:20 PM"
    },
    {
      id: 10,
      endpoint: "/api/chat/completions",
      model: "gpt-4",
      promptTokens: 1234,
      completionTokens: 987,
      cost: 0.39,
      timestamp: "May 15, 2025 02:14 PM"
    },
  ];

  const handleDateRangeSelect = (period: string) => {
    setSelectedPeriod(period);
    
    const today = new Date();
    let fromDate = new Date();
    
    switch(period) {
      case "7d":
        fromDate.setDate(today.getDate() - 7);
        break;
      case "30d":
        fromDate.setDate(today.getDate() - 30);
        break;
      case "90d":
        fromDate.setDate(today.getDate() - 90);
        break;
      case "ytd":
        fromDate = new Date(today.getFullYear(), 0, 1); // Jan 1st of current year
        break;
      default:
        // Keep custom range
        return;
    }
    
    setDateRange({ from: fromDate, to: today });
  };

  const exportDataAsCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert("Data would be exported as CSV");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">Analytics Deep-Dive</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={exportDataAsCSV}
            className="flex items-center gap-1"
          >
            <Download size={16} />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedPeriod === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateRangeSelect("7d")}
          >
            Last 7 days
          </Button>
          <Button
            variant={selectedPeriod === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateRangeSelect("30d")}
          >
            Last 30 days
          </Button>
          <Button
            variant={selectedPeriod === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateRangeSelect("90d")}
          >
            Last 90 days
          </Button>
          <Button
            variant={selectedPeriod === "ytd" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateRangeSelect("ytd")}
          >
            Year to date
          </Button>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto flex items-center gap-1"
            >
              <CalendarIcon size={14} />
              <span>
                {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange(range);
                  setSelectedPeriod("custom");
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily Spend</TabsTrigger>
          <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
          <TabsTrigger value="byModel">By Model</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
                    <Bar dataKey="spend" fill="#6A4CFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cumulative">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cumulativeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Cumulative Spend"]} />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeSpend" 
                      stroke="#6A4CFF"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="byModel">
          <Card>
            <CardHeader>
              <CardTitle>Spend By Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={modelSpendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
                    <Legend />
                    <defs>
                      <linearGradient id="colorGpt4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6A4CFF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6A4CFF" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorGpt3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="gpt4" 
                      stackId="1"
                      stroke="#6A4CFF" 
                      fillOpacity={1}
                      fill="url(#colorGpt4)"
                      name="GPT-4"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="gpt3" 
                      stackId="1"
                      stroke="#10B981" 
                      fillOpacity={1}
                      fill="url(#colorGpt3)"
                      name="GPT-3.5"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="claude" 
                      stackId="1"
                      stroke="#F59E0B" 
                      fillOpacity={1}
                      fill="url(#colorClaude)"
                      name="Claude"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
          <CardTitle>Top 10 Most Expensive Prompts</CardTitle>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Select defaultValue="cost">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost">Cost (Highest first)</SelectItem>
                <SelectItem value="timestamp">Most recent</SelectItem>
                <SelectItem value="promptTokens">Prompt tokens</SelectItem>
                <SelectItem value="completionTokens">Completion tokens</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={14} />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Endpoint</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-3">Model</th>
                  <th className="text-right text-sm font-medium text-gray-500 pb-3">Prompt Tokens</th>
                  <th className="text-right text-sm font-medium text-gray-500 pb-3">Completion Tokens</th>
                  <th className="text-right text-sm font-medium text-gray-500 pb-3">Cost</th>
                  <th className="text-right text-sm font-medium text-gray-500 pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {expensivePrompts.map((prompt) => (
                  <tr key={prompt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm">{prompt.endpoint}</td>
                    <td className="py-3 text-sm">{prompt.model}</td>
                    <td className="py-3 text-sm text-right">{prompt.promptTokens.toLocaleString()}</td>
                    <td className="py-3 text-sm text-right">{prompt.completionTokens.toLocaleString()}</td>
                    <td className="py-3 text-sm text-right font-medium">${prompt.cost.toFixed(2)}</td>
                    <td className="py-3 text-sm text-right">{prompt.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
