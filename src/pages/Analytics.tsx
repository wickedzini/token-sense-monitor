
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from "recharts";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon, Download, ArrowUpDown, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Custom bar shape for rounded corners
const RoundedBar = (props: any) => {
  const { x, y, width, height, radius = 12, fill } = props;

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
        className="drop-shadow-sm"
      />
    </g>
  );
};

// Sample data for charts
const generateDataForDaysBack = (daysBack: number) => {
  const data = [];
  for (let i = daysBack; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const formattedDate = format(date, "MMM dd");
    
    // Generate random spend data between $5-$50
    const dailySpend = Math.floor(Math.random() * 45) + 5;
    
    // Split spend between models in a somewhat realistic way
    const gpt4Spend = Math.floor(dailySpend * (0.4 + Math.random() * 0.2));
    const gpt35Spend = Math.floor(dailySpend * (0.2 + Math.random() * 0.15));
    const claudeSpend = Math.floor(dailySpend * (0.1 + Math.random() * 0.15));
    const llamaSpend = dailySpend - gpt4Spend - gpt35Spend - claudeSpend;

    // Generate token count (roughly correlated with spend)
    const tokenCount = dailySpend * (1000 + Math.floor(Math.random() * 500));
    
    data.push({
      date: formattedDate,
      rawDate: date,
      spend: dailySpend,
      gpt4: gpt4Spend,
      gpt35: gpt35Spend,
      claude: claudeSpend,
      llama: llamaSpend,
      cumulative: 0, // Will calculate after
      tokens: tokenCount
    });
  }
  
  // Calculate cumulative spend
  let cumulativeSpend = 0;
  for (const day of data) {
    cumulativeSpend += day.spend;
    day.cumulative = cumulativeSpend;
  }
  
  return data;
};

// Sample data for expensive prompts
const expensivePrompts = [
  { id: 1, timestamp: "2023-05-17 14:32:15", model: "GPT-4", tokens: 8742, cost: 0.98, prompt: "Generate a comprehensive business plan for a sustainable fashion brand..." },
  { id: 2, timestamp: "2023-05-16 09:17:22", model: "Claude-2", tokens: 12385, cost: 0.85, prompt: "Analyze and summarize the key findings from these quarterly reports..." },
  { id: 3, timestamp: "2023-05-17 11:05:43", model: "GPT-4", tokens: 7103, cost: 0.77, prompt: "Create a detailed technical specification for a cloud migration..." },
  { id: 4, timestamp: "2023-05-15 16:48:10", model: "GPT-4", tokens: 6891, cost: 0.71, prompt: "Draft a comprehensive legal agreement for a software licensing..." },
  { id: 5, timestamp: "2023-05-16 13:22:55", model: "Claude-2", tokens: 9287, cost: 0.64, prompt: "Provide an in-depth competitive analysis of the top 5 companies..." },
  { id: 6, timestamp: "2023-05-17 08:39:16", model: "GPT-3.5", tokens: 14592, cost: 0.59, prompt: "Generate a detailed marketing campaign strategy for a product launch..." },
  { id: 7, timestamp: "2023-05-15 10:11:38", model: "GPT-4", tokens: 5217, cost: 0.57, prompt: "Create an academic literature review on recent advancements..." },
  { id: 8, timestamp: "2023-05-16 15:07:29", model: "Llama-2", tokens: 18236, cost: 0.46, prompt: "Analyze these customer feedback surveys and provide detailed insights..." },
  { id: 9, timestamp: "2023-05-15 14:53:02", model: "GPT-3.5", tokens: 11058, cost: 0.42, prompt: "Generate comprehensive documentation for this JavaScript library..." },
  { id: 10, timestamp: "2023-05-17 12:41:37", model: "Claude-2", tokens: 6104, cost: 0.39, prompt: "Draft an employee handbook covering all HR policies..." }
];

// Chart color palette - dark-mode friendly
const chartColors = {
  gpt4: "#6A4CFF",
  gpt35: "#FFC46A",
  claude: "#FF6A8A",
  llama: "#4CAF50",
  total: "#6A4CFF"
};

const Analytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartData, setChartData] = useState(generateDataForDaysBack(7));
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setDate(range);
      // If both from and to dates are set, update the chart data
      if (range.from && range.to) {
        const daysBack = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
        setIsLoading(true);
        
        // Simulate loading delay
        setTimeout(() => {
          setChartData(generateDataForDaysBack(daysBack));
          setIsLoading(false);
          toast.success(`Data updated for ${format(range.from!, "PPP")} to ${format(range.to!, "PPP")}`);
        }, 800);
      }
    }
  };
  
  const handlePresetClick = (days: number) => {
    const to = new Date();
    const from = subDays(to, days);
    setDate({ from, to });
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setChartData(generateDataForDaysBack(days));
      setIsLoading(false);
      toast.success(`Data updated for last ${days} days`);
    }, 800);
  };
  
  const handleExportCSV = () => {
    const headers = ["Date", "Total Spend", "GPT-4", "GPT-3.5", "Claude", "Llama", "Token Count"];
    
    const csvData = chartData.map(day => [
      format(day.rawDate, "yyyy-MM-dd"),
      day.spend.toFixed(2),
      day.gpt4.toFixed(2),
      day.gpt35.toFixed(2),
      day.claude.toFixed(2),
      day.llama.toFixed(2),
      day.tokens.toString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `tokenmeter_analytics_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV file downloaded successfully");
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl"
    >
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-500 mt-1">Deep dive into your API usage patterns and costs</p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handlePresetClick(7)}>Last 7 days</Button>
          <Button variant="outline" size="sm" onClick={() => handlePresetClick(30)}>Last 30 days</Button>
          <Button variant="outline" size="sm" onClick={() => handlePresetClick(90)}>Last 90 days</Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                size="sm"
                className={cn(
                  "justify-start text-left font-normal w-[260px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => {
                  // Create a new object with from and to set to the selected dates
                  const typeSafeDate = newDate ? {
                    from: newDate.from || new Date(),
                    to: newDate.to || new Date()
                  } : undefined;
                  handleDateRangeChange(typeSafeDate);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
      
      <Tabs defaultValue="daily">
        <TabsList className="mb-4">
          <TabsTrigger value="daily">Daily Spend</TabsTrigger>
          <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
          <TabsTrigger value="by-model">By Model</TabsTrigger>
          <TabsTrigger value="tokens">Token Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Spend</CardTitle>
              <CardDescription>Cost breakdown by day</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading data...</div>
                    </div>
                  ) : (
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, "Total Spend"]}
                        contentStyle={{ 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #f0f0f0" 
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="spend" 
                        fill={chartColors.total} 
                        name="Total Spend" 
                        shape={<RoundedBar />} 
                        radius={12} 
                        className="drop-shadow-sm"
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cumulative">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Spend</CardTitle>
              <CardDescription>Running total over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading data...</div>
                    </div>
                  ) : (
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, "Cumulative Spend"]}
                        contentStyle={{ 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #f0f0f0" 
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="cumulative" 
                        stroke={chartColors.total} 
                        name="Cumulative Spend" 
                        strokeWidth={3}
                        dot={{ stroke: chartColors.total, strokeWidth: 2, r: 4, fill: 'white' }}
                        activeDot={{ stroke: chartColors.total, strokeWidth: 2, r: 6, fill: 'white' }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="by-model">
          <Card>
            <CardHeader>
              <CardTitle>Spend By Model</CardTitle>
              <CardDescription>Cost breakdown per AI model</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading data...</div>
                    </div>
                  ) : (
                    <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, ""]}
                        contentStyle={{ 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #f0f0f0" 
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="gpt4" 
                        stackId="1" 
                        stroke={chartColors.gpt4} 
                        fill={chartColors.gpt4} 
                        name="GPT-4" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gpt35" 
                        stackId="1" 
                        stroke={chartColors.gpt35} 
                        fill={chartColors.gpt35} 
                        name="GPT-3.5" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="claude" 
                        stackId="1" 
                        stroke={chartColors.claude} 
                        fill={chartColors.claude} 
                        name="Claude" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="llama" 
                        stackId="1" 
                        stroke={chartColors.llama} 
                        fill={chartColors.llama} 
                        name="Llama" 
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle>Token Usage Trend</CardTitle>
              <CardDescription>Token consumption over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading data...</div>
                    </div>
                  ) : (
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis
                        tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                        domain={['dataMin', 'dataMax']}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} tokens`, "Usage"]}
                        contentStyle={{ 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #f0f0f0" 
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="tokens" 
                        stroke="#6A4CFF" 
                        name="Token Usage" 
                        strokeWidth={3} 
                        dot={{ stroke: '#6A4CFF', strokeWidth: 2, r: 4, fill: 'white' }}
                        activeDot={{ stroke: '#6A4CFF', strokeWidth: 2, r: 6, fill: 'white' }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top 10 Most Expensive Prompts</CardTitle>
            <CardDescription>Prompts with highest token usage and cost</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Sorted by cost (highest first)")}>
                Cost (highest first)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Sorted by tokens (highest first)")}>
                Token count (highest first)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Sorted by date (newest first)")}>
                Date (newest first)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="w-[40%]">Prompt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expensivePrompts.map((prompt) => (
                  <TableRow key={prompt.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-mono">{prompt.timestamp}</TableCell>
                    <TableCell>{prompt.model}</TableCell>
                    <TableCell>{prompt.tokens.toLocaleString()}</TableCell>
                    <TableCell>${prompt.cost.toFixed(2)}</TableCell>
                    <TableCell className="truncate max-w-xs" title={prompt.prompt}>
                      {prompt.prompt.slice(0, 60)}...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Separator />
      
      <div className="text-sm text-gray-500">
        <p>Note: Analytics data is available for the past 180 days on the Growth plan and higher.</p>
      </div>
    </motion.div>
  );
};

export default Analytics;
