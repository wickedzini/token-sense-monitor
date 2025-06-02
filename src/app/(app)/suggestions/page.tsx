'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Filter, Search } from "lucide-react";
import SuggestionDrawer from "@/components/dashboard/SuggestionDrawer";

// Mock suggestion data
const activeSuggestions = [
  {
    id: 1,
    type: "model_switch",
    title: "Switch from GPT-4 to GPT-3.5 Turbo",
    description: "A/B test shows similar quality with 70% cost reduction for simple tasks.",
    impact: 37.50,
    impactType: "monthly",
    badge: "Safe Switch",
    createdAt: new Date(2025, 4, 15)
  },
  {
    id: 2,
    type: "idle_resource",
    title: "Idle GPU instance detected",
    description: "Your 'development' instance has been idle for 26 hours.",
    impact: 2.34,
    impactType: "daily",
    badge: "Quick Win",
    createdAt: new Date(2025, 4, 17)
  },
  {
    id: 3,
    type: "context_length",
    title: "Optimize prompt context length",
    description: "Your prompts average 6,500 tokens but only use 70% of context.",
    impact: 18.20,
    impactType: "monthly",
    badge: "Optimization",
    createdAt: new Date(2025, 4, 16)
  },
  {
    id: 4,
    type: "nlp_intent",
    title: "Use GPT-3.5-Turbo-16K for summarization tasks",
    description: "Detected summarization intent patterns. Similar quality for 65% less cost.",
    impact: 22.75,
    impactType: "monthly",
    badge: "NLP Intent",
    createdAt: new Date(2025, 4, 18)
  },
  {
    id: 5,
    type: "sql_optimization",
    title: "Use Claude Haiku for SQL queries",
    description: "SQL queries with >5s latency can be optimized with Claude Haiku.",
    impact: 15.40,
    impactType: "monthly",
    badge: "Performance",
    createdAt: new Date(2025, 4, 18)
  }
];

const historicalSuggestions = [
  {
    id: 101,
    type: "model_switch",
    title: "Switch from GPT-4 to Claude 3 Haiku",
    description: "Simple queries can be handled by Claude 3 Haiku at 80% lower cost.",
    impact: 45.30,
    impactType: "monthly",
    status: "implemented",
    implementedAt: new Date(2025, 4, 10),
    badge: "Safe Switch",
    createdAt: new Date(2025, 4, 8)
  },
  {
    id: 102,
    type: "prompt_optimization",
    title: "Remove redundant instructions in system prompts",
    description: "System prompts contain duplicate instructions adding 25% token overhead.",
    impact: 12.80,
    impactType: "monthly",
    status: "implemented",
    implementedAt: new Date(2025, 4, 12),
    badge: "Optimization",
    createdAt: new Date(2025, 4, 11)
  },
  {
    id: 103,
    type: "context_length",
    title: "Reduce API call frequency for static content",
    description: "Cache responses for non-dynamic content to reduce API calls by 30%.",
    impact: 28.50,
    impactType: "monthly",
    status: "dismissed",
    dismissedAt: new Date(2025, 4, 9),
    badge: "Architecture",
    createdAt: new Date(2025, 4, 7)
  }
];

const SuggestionsPage = () => {
  const [activeSearch, setActiveSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter functions
  const filterActive = (suggestion: any) => {
    const matchesSearch = suggestion.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesModel = modelFilter === "all" || suggestion.type.includes(modelFilter);
    const matchesType = typeFilter === "all" || suggestion.badge.toLowerCase() === typeFilter.toLowerCase();
    const matchesDate = (!dateFrom || suggestion.createdAt >= dateFrom) &&
      (!dateTo || suggestion.createdAt <= dateTo);
    return matchesSearch && matchesModel && matchesType && matchesDate;
  };

  const filterHistory = (suggestion: any) => {
    const matchesSearch = suggestion.title.toLowerCase().includes(historySearch.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(historySearch.toLowerCase());
    const matchesModel = modelFilter === "all" || suggestion.type.includes(modelFilter);
    const matchesType = typeFilter === "all" || suggestion.badge.toLowerCase() === typeFilter.toLowerCase();
    const matchesDate = (!dateFrom || suggestion.createdAt >= dateFrom) &&
      (!dateTo || suggestion.createdAt <= dateTo);
    return matchesSearch && matchesModel && matchesType && matchesDate;
  };

  const handleViewDetails = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">Suggestions</h2>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="active">Active Suggestions</TabsTrigger>
          <TabsTrigger value="history">Implementation History</TabsTrigger>
        </TabsList>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-4 mt-6">
          <div className="flex-1 min-w-[240px] relative">
            <Input
              placeholder="Search suggestions..."
              value={activeSearch}
              onChange={(e) => setActiveSearch(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Date Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">From</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {dateFrom ? (
                              format(dateFrom, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={setDateFrom}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">To</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {dateTo ? (
                              format(dateTo, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={setDateTo}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="model-filter" className="text-sm font-medium">Model</label>
                  <Select value={modelFilter} onValueChange={setModelFilter}>
                    <SelectTrigger id="model-filter">
                      <SelectValue placeholder="All models" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All models</SelectItem>
                      <SelectItem value="model_switch">Model switch</SelectItem>
                      <SelectItem value="idle_resource">Idle resources</SelectItem>
                      <SelectItem value="context_length">Context length</SelectItem>
                      <SelectItem value="nlp_intent">NLP intent</SelectItem>
                      <SelectItem value="sql_optimization">SQL optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="type-filter" className="text-sm font-medium">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type-filter">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="safe switch">Safe Switch</SelectItem>
                      <SelectItem value="quick win">Quick Win</SelectItem>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="nlp intent">NLP Intent</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                      setModelFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <TabsContent value="active" className="space-y-4">
          {activeSuggestions.filter(filterActive).length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No suggestions match your filters</p>
              </CardContent>
            </Card>
          ) : (
            activeSuggestions.filter(filterActive).map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-6">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <h3 className="text-lg font-medium">{suggestion.title}</h3>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          {suggestion.badge}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      <div className="flex items-center justify-between px-0 pb-0 mt-2">
                        <div className="text-sm font-medium text-green-700">
                          Potential savings: ${suggestion.impact.toFixed(2)}/{suggestion.impactType}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">
                            Created {format(suggestion.createdAt, "MMM d, yyyy")}
                          </span>
                          <Button onClick={() => handleViewDetails(suggestion)} variant="outline" size="sm">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {historicalSuggestions.filter(filterHistory).length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No historical suggestions match your filters</p>
              </CardContent>
            </Card>
          ) : (
            historicalSuggestions.filter(filterHistory).map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-6">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <h3 className="text-lg font-medium">{suggestion.title}</h3>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          {suggestion.badge}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={suggestion.status === "implemented" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200"}
                        >
                          {suggestion.status === "implemented" ? "Implemented" : "Dismissed"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      <div className="text-brand-primary font-medium">
                        {suggestion.status === "implemented"
                          ? `Saved: $${suggestion.impact.toFixed(2)}/${suggestion.impactType}`
                          : `Potential savings: $${suggestion.impact.toFixed(2)}/${suggestion.impactType}`
                        }
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {suggestion.status === "implemented"
                          ? suggestion.implementedAt
                            ? `Implemented on ${format(suggestion.implementedAt, "MMMM d, yyyy")}`
                            : "Implemented"
                          : suggestion.dismissedAt
                            ? `Dismissed on ${format(suggestion.dismissedAt, "MMMM d, yyyy")}`
                            : "Dismissed"
                        }
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => handleViewDetails(suggestion)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <SuggestionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        suggestion={selectedSuggestion}
        onSuggestionChange={() => {
          // Handle suggestion change
        }}
      />
    </div>
  );
};

export default SuggestionsPage;
