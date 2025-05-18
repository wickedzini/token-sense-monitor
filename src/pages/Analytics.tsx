
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon, Download, ArrowUpDown, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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
    
    data.push({
      date: formattedDate,
      rawDate: date,
      spend: dailySpend,
      gpt4: gpt4Spend,
      gpt35: gpt35Spend,
      claude: claudeSpend,
      llama: llamaSpend,
      cumulative: 0 // Will calculate after
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

const Analytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartData, setChartData] = useState(generateDataForDaysBack(7));
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setDate(range);
      // If both from and to dates are set, update the chart data
      if (range.from && range.to) {
        const daysBack = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
        setChartData(generateDataForDaysBack(daysBack));
        toast.success(`Data updated for ${format(range.from, "PPP")} to ${format(range.to, "PPP")}`);
      }
    }
  };
  
  const handlePresetClick = (days: number) => {
    const to = new Date();
    const from = subDays(to, days);
    setDate({ from, to });
    setChartData(generateDataForDaysBack(days));
    toast.success(`Data updated for last ${days} days`);
  };
  
  const handleExportCSV = () => {
    const headers = ["Date", "Total Spend", "GPT-4", "GPT-3.5", "Claude", "Llama"];
    
    const csvData = chartData.map(day => [
      format(day.rawDate, "yyyy-MM-dd"),
      day.spend.toFixed(2),
      day.gpt4.toFixed(2),
      day.gpt35.toFixed(2),
      day.claude.toFixed(2),
      day.llama.toFixed(2),
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
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-500 mt-1">Deep dive into your API usage patterns and costs</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
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
        <TabsList>
          <TabsTrigger value="daily">Daily Spend</TabsTrigger>
          <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
          <TabsTrigger value="by-model">By Model</TabsTrigger>
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
                  <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="spend" fill="#3b82f6" name="Total Spend" />
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
              <CardDescription>Running total over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="cumulative" stroke="#8884d8" name="Cumulative Spend" strokeWidth={2} />
                  </LineChart>
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
                  <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Area type="monotone" dataKey="gpt4" stackId="1" stroke="#8884d8" fill="#8884d8" name="GPT-4" />
                    <Area type="monotone" dataKey="gpt35" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="GPT-3.5" />
                    <Area type="monotone" dataKey="claude" stackId="1" stroke="#ffc658" fill="#ffc658" name="Claude" />
                    <Area type="monotone" dataKey="llama" stackId="1" stroke="#ff8042" fill="#ff8042" name="Llama" />
                  </AreaChart>
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
                  <TableRow key={prompt.id}>
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
    </div>
  );
};

export default Analytics;
