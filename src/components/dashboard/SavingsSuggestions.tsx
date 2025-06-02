'use client';
import Link from 'next/link';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import SuggestionDrawer from "./SuggestionDrawer";
import { motion } from "framer-motion";

interface SavingsSuggestionsProps {
  className?: string;
}

interface Suggestion {
  id: number;
  type: string;
  title: string;
  description: string;
  impact: number;
  impactType: string;
  badge: string;
}

const SavingsSuggestions = ({ className }: SavingsSuggestionsProps) => {
  // Mock data - would be replaced with real API data
  const suggestions = [
    {
      id: 1,
      type: "model_switch",
      title: "Switch from GPT-4 to GPT-3.5 Turbo",
      description: "A/B test shows similar quality with 70% cost reduction for simple tasks.",
      impact: 37.50,
      impactType: "monthly",
      badge: "Safe Switch",
    },
    {
      id: 2,
      type: "idle_resource",
      title: "Idle GPU instance detected",
      description: "Your 'development' instance has been idle for 26 hours.",
      impact: 2.34,
      impactType: "daily",
      badge: "Quick Win",
    },
    {
      id: 3,
      type: "context_length",
      title: "Optimize prompt context length",
      description: "Your prompts average 6,500 tokens but only use 70% of context.",
      impact: 18.20,
      impactType: "monthly",
      badge: "Optimization",
    },
  ];

  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleApplySuggestion = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setDrawerOpen(true);
  };

  return (
    <>
      <Card className={cn("shadow-card", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-700">Savings Suggestions</CardTitle>
          <Link href="/suggestions" className="text-sm text-brand-primary hover:underline flex items-center transition-colors">
            View all suggestions
            <ExternalLink size={12} className="ml-1" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div 
                key={suggestion.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                      {suggestion.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="text-sm font-medium text-green-700">
                    Potential savings: ${suggestion.impact.toFixed(2)}/{suggestion.impactType}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-4">
                  <span className="text-xs text-gray-500">Created May 16, 2025</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplySuggestion(suggestion)}
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SuggestionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        suggestion={selectedSuggestion}
        onSuggestionChange={() => {
          // Handle suggestion change
        }}
      />
    </>
  );
};

export default SavingsSuggestions;
