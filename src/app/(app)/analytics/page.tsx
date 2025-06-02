
'use client';
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
import { CalendarIcon, Download, ArrowUpDown, ChevronDown, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Custom bar shape for rounded corners that adapts to width
const AdaptiveRoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  
  // Calculate radius based on width - thinner bars get smaller radius
  // Cap the maximum radius to avoid over-rounding
  const radius = Math.min(width * 0.25, 12);

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

// Sample data for charts with models breakdown
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

    // Generate token count for each model (roughly correlated with spend)
    const gpt4Tokens = gpt4Spend * (800 + Math.floor(Math.random() * 300));
    const gpt35Tokens = gpt35Spend * (2000 + Math.floor(Math.random() * 500));
    const claudeTokens = claudeSpend * (1500 + Math.floor(Math.random() * 400));
    const llamaTokens = llamaSpend * (3000 + Math.floor(Math.random() * 800));
    const totalTokens = gpt4Tokens + gpt35Tokens + claudeTokens + llamaTokens;
    
    data.push({
      date: formattedDate,
      rawDate: date,
      spend: dailySpend,
      gpt4: gpt4Spend,
      gpt35: gpt35Spend,
      claude: claudeSpend,
      llama: llamaSpend,
      cumulative: 0, // Will calculate after
      tokens: totalTokens,
      gpt4Tokens,
      gpt35Tokens,
      claudeTokens,
      llamaTokens
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

// Sample data for expensive prompts with full text
const expensivePrompts = [
  { id: 1, timestamp: "2023-05-17 14:32:15", model: "GPT-4", tokens: 8742, cost: 0.98, prompt: "Generate a comprehensive business plan for a sustainable fashion brand targeting Gen Z consumers. Include market analysis, competitive landscape, marketing strategy, financial projections for 3 years, and sustainable sourcing practices. The brand should focus on upcycled materials and ethical manufacturing. Include specific strategies for social media presence, influencer partnerships, and direct-to-consumer sales channels." },
  { id: 2, timestamp: "2023-05-16 09:17:22", model: "Claude-2", tokens: 12385, cost: 0.85, prompt: "Analyze and summarize the key findings from these quarterly reports for our tech company. Identify trends in revenue growth, user acquisition costs, and churn rate. Compare performance against industry benchmarks and highlight anomalies. Provide specific recommendations for improving our unit economics based on these findings. Create a SWOT analysis based on the financial data and market conditions." },
  { id: 3, timestamp: "2023-05-17 11:05:43", model: "GPT-4", tokens: 7103, cost: 0.77, prompt: "Create a detailed technical specification for a cloud migration of our on-premises CRM system to AWS. Include architecture diagrams, security considerations, data migration strategy, timeline, and resource requirements. The current system uses SQL Server databases, .NET backend, and Angular frontend. Ensure minimal downtime during migration and account for GDPR compliance requirements for European customers." },
  { id: 4, timestamp: "2023-05-15 16:48:10", model: "GPT-4", tokens: 6891, cost: 0.71, prompt: "Draft a comprehensive legal agreement for a software licensing partnership between our AI company and a healthcare provider. Include terms for data usage, model training, intellectual property rights, liability limitations, compliance with healthcare regulations (HIPAA), and termination conditions. The agreement should protect both parties while allowing for collaborative innovation in medical AI applications." },
  { id: 5, timestamp: "2023-05-16 13:22:55", model: "Claude-2", tokens: 9287, cost: 0.64, prompt: "Provide an in-depth competitive analysis of the top 5 companies in the electric vehicle charging infrastructure market. Compare business models, technology, market share, expansion strategies, and funding. Identify key differentiators and vulnerabilities for each company. Include recommendations for how a new entrant could disrupt this space, focusing on innovative technology and business models." },
  { id: 6, timestamp: "2023-05-17 08:39:16", model: "GPT-3.5", tokens: 14592, cost: 0.59, prompt: "Generate a detailed marketing campaign strategy for a product launch of a smart home security system. Include target audience segmentation, messaging frameworks, channel strategy across paid and organic, budget allocation, timeline for pre-launch and post-launch activities, and KPI framework for measuring success. The product has unique AI capabilities for family recognition and unusual behavior detection." },
  { id: 7, timestamp: "2023-05-15 10:11:38", model: "GPT-4", tokens: 5217, cost: 0.57, prompt: "Create an academic literature review on recent advancements in protein folding prediction using machine learning, particularly focusing on developments since AlphaFold. Analyze methodological innovations, performance benchmarks, and remaining challenges. Include discussion of applications in drug discovery and limitations of current approaches. Format as a scholarly article with proper citations to key papers in the field." },
  { id: 8, timestamp: "2023-05-16 15:07:29", model: "Llama-2", tokens: 18236, cost: 0.46, prompt: "Analyze these customer feedback surveys and provide detailed insights on product satisfaction, feature requests, and churn reasons. Identify common themes, prioritize issues based on frequency and severity, and suggest specific product improvements that would address the top concerns. Include quantitative analysis of sentiment trends over the past 3 quarters and correlate with product update timeline." },
  { id: 9, timestamp: "2023-05-15 14:53:02", model: "GPT-3.5", tokens: 11058, cost: 0.42, prompt: "Generate comprehensive documentation for this JavaScript library focused on image processing and manipulation. Include installation instructions, API reference with examples for each function, common usage patterns, integration guides for React/Vue/Angular, performance optimization tips, and troubleshooting section. The library uses WebAssembly for core processing functions and has browser and Node.js versions." },
  { id: 10, timestamp: "2023-05-17 12:41:37", model: "Claude-2", tokens: 6104, cost: 0.39, prompt: "Draft an employee handbook covering all HR policies for our remote-first tech startup. Include sections on compensation philosophy, benefits, PTO policy, home office stipends, communication norms, performance reviews, career progression, and company values. The handbook should be comprehensive yet engaging, reflecting our informal culture while providing clear guidelines." }
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
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  
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

  // Handler to view full prompt details
  const handleViewFullPrompt = (prompt: any) => {
    setSelectedPrompt(prompt);
    setPromptDialogOpen(true);
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
                      Custom range: {format(date.from, "d MMM")} – {format(date.to, "d MMM yyyy")}
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
                        shape={<AdaptiveRoundedBar />}
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
              <CardDescription>Token consumption over time by model</CardDescription>
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
                      <YAxis
                        tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                        domain={['dataMin', 'dataMax']}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} tokens`, ""]}
                        contentStyle={{ 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #f0f0f0" 
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="gpt4Tokens" 
                        stackId="1"
                        stroke={chartColors.gpt4} 
                        fill={chartColors.gpt4}
                        name="GPT-4" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gpt35Tokens" 
                        stackId="1"
                        stroke={chartColors.gpt35} 
                        fill={chartColors.gpt35}
                        name="GPT-3.5" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="claudeTokens" 
                        stackId="1"
                        stroke={chartColors.claude} 
                        fill={chartColors.claude}
                        name="Claude" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="llamaTokens" 
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
                  <TableHead className="w-[100px]">Actions</TableHead>
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
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewFullPrompt(prompt)}
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">View full prompt</span>
                      </Button>
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

      {/* Full Prompt Dialog */}
      <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prompt Details</DialogTitle>
            <DialogDescription>
              Complete prompt text and metadata
            </DialogDescription>
          </DialogHeader>
          
          {selectedPrompt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-500">Model</h4>
                  <p>{selectedPrompt.model}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-500">Timestamp</h4>
                  <p>{selectedPrompt.timestamp}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-500">Tokens</h4>
                  <p>{selectedPrompt.tokens.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-500">Cost</h4>
                  <p>${selectedPrompt.cost.toFixed(2)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-500">Full Prompt</h4>
                <div className="bg-gray-50 p-4 rounded-lg border text-sm whitespace-pre-wrap">
                  {selectedPrompt.prompt}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setPromptDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Analytics;
