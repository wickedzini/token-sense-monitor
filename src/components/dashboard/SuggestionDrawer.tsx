import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Copy, AlertCircle, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { markImplemented, dismissSuggestion } from "@/backend/api/suggestions";

interface SuggestionDrawerProps {
  open: boolean;
  onClose: () => void;
  suggestion?: {
    id: number;
    type: string;
    title: string;
    description: string;
    impact: number;
    impactType: string;
    details?: {
      before?: Record<string, any>;
      after?: Record<string, any>;
      snippet?: {
        language: string;
        code: string;
      };
      script?: string;
    };
  } | null;
  onSuggestionChange?: () => void;
}

const SuggestionDrawer = ({ open, onClose, suggestion, onSuggestionChange }: SuggestionDrawerProps) => {
  const [copied, setCopied] = useState(false);
  const [implementing, setImplementing] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  if (!suggestion) return null;

  // Based on suggestion type, show different content
  let currentConfig: Record<string, string> = {};
  let proposedChange: Record<string, string> = {};
  let pros: string[] = [];
  let cons: string[] = [];
  let migrationCode = "";
  let curlSnippet = "";
  let qualityDelta = "≤5%"; // Default quality impact

  // Extract configuration data from suggestion details if available
  if (suggestion.details) {
    if (suggestion.details.before) {
      currentConfig = Object.entries(suggestion.details.before).reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {}
      );
    }

    if (suggestion.details.after) {
      proposedChange = Object.entries(suggestion.details.after).reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {}
      );
    }

    if (suggestion.details.snippet?.code) {
      migrationCode = suggestion.details.snippet.code;
    }

    if (suggestion.details.script) {
      curlSnippet = suggestion.details.script;
    }
  }

  switch (suggestion.type) {
    case "model_switch":
      pros = ["Cost reduction", "Similar quality for simple tasks", "Same context length"];
      cons = ["Lower reasoning ability", "Slightly higher error rate", "Not recommended for complex tasks"];
      qualityDelta = "≤5%";
      break;

    case "idle_resource":
      pros = ["Immediate cost savings", "Easy to implement", "No downtime"];
      cons = ["Need to restart manually when needed", "Lose GPU availability"];
      qualityDelta = "0%";
      break;

    case "context_length":
      pros = ["Reduced token usage", "Lower latency", "Cost savings without quality impact"];
      cons = ["Requires code changes", "May need testing to ensure quality"];
      qualityDelta = "≤2%";
      break;

    case "nlp_intent":
      pros = ["Cost reduction", "Larger context window", "Better for specific tasks"];
      cons = ["May have lower quality for complex tasks", "Less capability for reasoning"];
      qualityDelta = "≤3%";
      break;

    case "sql_optimization":
      pros = ["Cost reduction", "Faster response time", "Similar SQL output quality"];
      cons = ["Different API integration required", "Less complex reasoning capabilities"];
      qualityDelta = "≤2%";
      break;

    default:
      pros = ["Cost savings", "Easy implementation"];
      cons = ["May require testing"];
  }

  const handleCopyCode = (code: string, type: 'migration' | 'curl') => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`${type === 'migration' ? 'Code' : 'Script'} copied to clipboard`);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleMarkImplemented = async () => {
    setImplementing(true);

    try {
      // Call the backend API to mark as implemented
      const success = await markImplemented(suggestion.id);

      if (success) {
        toast.success("Suggestion marked as implemented");
        if (onSuggestionChange) {
          onSuggestionChange();
        }
        onClose();
      } else {
        toast.error("Failed to update suggestion status");
      }
    } catch (error) {
      console.error("Error marking suggestion as implemented:", error);
      toast.error("An error occurred while updating");
    } finally {
      setImplementing(false);
    }
  };

  const handleDismiss = async () => {
    setDismissing(true);
    try {
      const success = await dismissSuggestion(suggestion.id);
      if (success) {
        toast.success("Suggestion dismissed");
        if (onSuggestionChange) onSuggestionChange();
        onClose(); // <- to musi być tu
      } else {
        toast.error("Failed to update suggestion status");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
    } finally {
      setDismissing(false);
    }
  };

  // Calculate savings impact
  const dailySavings = suggestion.impactType === 'daily' ? suggestion.impact : suggestion.impact / 30;
  const monthlySavings = suggestion.impactType === 'monthly' ? suggestion.impact : suggestion.impact * (suggestion.impactType === 'daily' ? 30 : 1 / 12);
  const annualSavings = suggestion.impactType === 'annual' ? suggestion.impact : suggestion.impact * (suggestion.impactType === 'monthly' ? 12 : 365);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[550px] overflow-y-auto pb-20">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <span>{suggestion.title}</span>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              {suggestion.impactType === "monthly" ? "$" + suggestion.impact + "/mo" : "$" + suggestion.impact + "/day"}
            </Badge>
          </SheetTitle>
          <SheetDescription className="text-base">
            {suggestion.description}
          </SheetDescription>
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Quality impact: {qualityDelta}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Current vs Proposed */}
          <section>
            <h3 className="text-lg font-medium mb-4">Configuration Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium text-gray-700">Current Configuration</h4>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    {Object.entries(currentConfig).length > 0 ? (
                      Object.entries(currentConfig).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                          <span className="font-medium">{value as ReactNode}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No data available</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium text-brand-primary">Proposed Change</h4>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    {Object.entries(proposedChange).length > 0 ? (
                      Object.entries(proposedChange).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                          <span className="font-medium">{value as ReactNode}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No data available</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Impact Table */}
          <section>
            <h3 className="text-lg font-medium mb-4">Financial Impact</h3>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Timeframe</TableHead>
                    <TableHead>Savings</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Daily</TableCell>
                    <TableCell>${dailySavings.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-500 text-sm">Based on current usage</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Monthly</TableCell>
                    <TableCell>${monthlySavings.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-500 text-sm">Projected for 30 days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Annually</TableCell>
                    <TableCell className="text-green-600 font-bold">${annualSavings.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-500 text-sm">Projected for 12 months</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Pros & Cons */}
          <section>
            <h3 className="text-lg font-medium mb-4">Considerations</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    <span>Pros</span>
                  </h4>
                  <ul className="space-y-2">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-amber-600" />
                    <span>Cons</span>
                  </h4>
                  <ul className="space-y-2">
                    {cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Sample */}
          {migrationCode && (
            <section>
              <h3 className="text-lg font-medium mb-4">Implementation</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-700">Code Example</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-300"
                      onClick={() => handleCopyCode(migrationCode, 'migration')}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <code>{migrationCode}</code>
                  </pre>
                </div>
              </div>

              {/* Script/Command */}
              {curlSnippet && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">Script Example</h4>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-300"
                        onClick={() => handleCopyCode(curlSnippet, 'curl')}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <code>{curlSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Implementation Notes */}
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Always test changes in a non-production environment before implementing.
            </AlertDescription>
          </Alert>
        </div>

        {/* Sticky bottom button container */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-end">
            <div className="ml-auto flex w-full max-w-[500px] justify-end gap-2 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleDismiss}
                disabled={dismissing}
                className="px-4"
              >
                {dismissing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Dismissing...
                  </>
                ) : (
                  "Dismiss"
                )}
              </Button>
              <Button
                onClick={handleMarkImplemented}
                disabled={implementing}
                className="px-4"
              >
                {implementing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Implementing...
                  </>
                ) : (
                  "Mark as Implemented"
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SuggestionDrawer;
