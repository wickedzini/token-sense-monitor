
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface SavingsSuggestionsProps {
  className?: string;
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

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Savings Suggestions</CardTitle>
        <Link to="/analytics" className="text-sm text-brand-primary hover:underline flex items-center">
          View all suggestions
          <ExternalLink size={12} className="ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{suggestion.title}</h3>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                    {suggestion.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                <div className="text-sm text-brand-primary font-medium">
                  Potential savings: ${suggestion.impact.toFixed(2)}/{suggestion.impactType}
                </div>
              </div>
              <Button size="sm" variant="outline">Apply</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsSuggestions;
