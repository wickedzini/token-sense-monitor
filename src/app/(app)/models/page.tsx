'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ModelsPage = () => {
  // Mock data - would be replaced with real API data
  const modelsData = [
    { 
      id: 1,
      model: "gpt-4-turbo", 
      provider: "OpenAI", 
      totalSpend: 47.20, 
      tokensIn: 2453890, 
      tokensOut: 489520, 
      budgetPercent: 36.8,
    },
    { 
      id: 2,
      model: "claude-3-opus", 
      provider: "Anthropic", 
      totalSpend: 28.50, 
      tokensIn: 1345800, 
      tokensOut: 238450, 
      budgetPercent: 22.2,
    },
    { 
      id: 3,
      model: "gpt-3.5-turbo", 
      provider: "OpenAI", 
      totalSpend: 15.30, 
      tokensIn: 3450200, 
      tokensOut: 892300, 
      budgetPercent: 12.9,
    },
    { 
      id: 4,
      model: "llama-3-70b", 
      provider: "Self-hosted", 
      totalSpend: 10.45, 
      tokensIn: 1290500, 
      tokensOut: 321800, 
      budgetPercent: 8.1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">Models</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search models..." 
              className="pl-9 w-64" 
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-700">Models & Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Total Spend</TableHead>
                <TableHead className="text-right">Tokens In</TableHead>
                <TableHead className="text-right">Tokens Out</TableHead>
                <TableHead>Budget %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelsData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.model}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {row.provider}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${row.totalSpend.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{row.tokensIn.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.tokensOut.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-primary rounded-full" 
                          style={{ width: `${row.budgetPercent}%` }} 
                        />
                      </div>
                      <span className="text-sm text-gray-600">{row.budgetPercent}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelsPage;
