
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight, TrendingDown, Zap, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SavingsSuggestionsProps {
  className?: string;
}

const SavingsSuggestion = ({ title, description, potentialSavings, quality, actionIcon }: {
  title: string;
  description: string;
  potentialSavings: string;
  quality?: number;
  actionIcon: React.ReactNode;
}) => (
  <div className="p-4 border rounded-lg flex items-start gap-3 bg-white shadow-sm hover:shadow-card-hover transition-shadow cursor-pointer">
    <div className="mt-0.5">
      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
        <TrendingDown className="h-4 w-4 text-green-600" />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="flex items-center gap-2">
          {quality !== undefined && (
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 flex gap-1 items-center">
              <Zap className="h-3 w-3" />
              {quality}% Quality
            </Badge>
          )}
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
            Save {potentialSavings}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1 mb-2">{description}</p>
      <div className="flex items-center gap-1 text-sm text-brand-primary font-medium">
        <span>View details</span>
        {actionIcon}
      </div>
    </div>
  </div>
);

const SavingsSuggestions = ({ className }: SavingsSuggestionsProps) => {
  const navigate = useNavigate();
  
  // Mock data - would be replaced with real API data
  const suggestions = [
    {
      id: 1,
      title: "Switch from GPT-4 to GPT-3.5 Turbo",
      description: "Most of your GPT-4 prompts have simple context (< 2048 tokens). Similar results possible with 3.5.",
      potentialSavings: "$41.30/mo",
      quality: 96,
      actionIcon: <ChevronRight size={16} />,
    },
    {
      id: 2,
      title: "Auto-stop idle GPU instances",
      description: "Your self-hosted Llama instances have 8.3 hrs/day of idle time. Implement auto-scaling.",
      potentialSavings: "$137.50/mo",
      actionIcon: <Settings size={16} />,
    }
  ];

  const handleViewAllSuggestions = () => {
    navigate("/alerts");
  };

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Savings Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <SavingsSuggestion 
              key={suggestion.id}
              title={suggestion.title}
              description={suggestion.description}
              potentialSavings={suggestion.potentialSavings}
              quality={suggestion.quality}
              actionIcon={suggestion.actionIcon}
            />
          ))}
        </div>
        <div className="mt-3 text-right">
          <button 
            onClick={handleViewAllSuggestions}
            className="text-sm text-brand-primary font-medium inline-flex items-center gap-1 hover:underline"
          >
            <span>View all suggestions</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsSuggestions;
