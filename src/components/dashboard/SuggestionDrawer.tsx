
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
import { Check, Copy, AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

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
  } | null;
}

const SuggestionDrawer = ({ open, onClose, suggestion }: SuggestionDrawerProps) => {
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
  
  switch (suggestion.type) {
    case "model_switch":
      currentConfig = {
        model: "GPT-4",
        contextLength: "8,192 tokens",
        costPerCall: "$0.12",
        callsPerDay: "342"
      };
      proposedChange = {
        model: "GPT-3.5 Turbo",
        contextLength: "8,192 tokens",
        costPerCall: "$0.04",
        callsPerDay: "342"
      };
      pros = ["67% cost reduction", "Similar quality for simple tasks", "Same context length"];
      cons = ["Lower reasoning ability", "Slightly higher error rate", "Not recommended for complex tasks"];
      migrationCode = `// Current implementation
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: messages,
  temperature: 0.7
});

// Proposed change
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: messages,
  temperature: 0.7
});`;
      curlSnippet = `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}],
    "temperature": 0.7
  }'`;
      qualityDelta = "≤5%";
      break;
    
    case "idle_resource":
      currentConfig = {
        instanceType: "g4dn.xlarge",
        region: "us-west-2",
        hourlyRate: "$0.09",
        idleTime: "26 hours"
      };
      proposedChange = {
        action: "Shutdown instance",
        potentialAction: "Auto-scaling group with min=0"
      };
      pros = ["Immediate cost savings", "Easy to implement", "No downtime"];
      cons = ["Need to restart manually when needed", "Lose GPU availability"];
      migrationCode = `# AWS CLI command to stop the instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# To enable auto-scaling (recommended)
aws autoscaling create-auto-scaling-group --auto-scaling-group-name dev-llm-asg \\
  --min-size 0 --max-size 2 --desired-capacity 1 \\
  --launch-template LaunchTemplateId=lt-0123456789abcdef0,Version='$Latest'`;
      curlSnippet = `# AWS API call via curl
curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $AWS_TOKEN" \\
  -d '{"InstanceIds": ["i-1234567890abcdef0"]}' \\
  https://ec2.us-west-2.amazonaws.com/api/v1/instances/stop`;
      qualityDelta = "0%";
      break;
      
    case "context_length":
      currentConfig = {
        averageContextLength: "6,500 tokens",
        usableContext: "4,550 tokens (70%)",
        modelLimit: "8,192 tokens",
        wastedTokens: "1,950 tokens"
      };
      proposedChange = {
        recommendedLength: "4,800 tokens",
        savingsPerCall: "1,700 tokens",
        implementation: "Context window trimming"
      };
      pros = ["Reduced token usage", "Lower latency", "Cost savings without quality impact"];
      cons = ["Requires code changes", "May need testing to ensure quality"];
      migrationCode = `// Before: Sending full context
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: fullContextMessages, // 6,500 tokens on average
  temperature: 0.7
});

// After: Using more efficient context
function trimContext(messages, maxTokens = 4800) {
  // Keep system prompt and last N messages
  const systemPrompt = messages.find(m => m.role === 'system');
  const recentMessages = messages.filter(m => m.role !== 'system')
    .slice(-10); // Keep last 10 messages
  
  return [systemPrompt, ...recentMessages];
}

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: trimContext(fullContextMessages),
  temperature: 0.7
});`;
      curlSnippet = `# No direct curl equivalent for this optimization
# This is a code-level change to your application`;
      qualityDelta = "≤2%";
      break;
      
    default:
      currentConfig = {};
      proposedChange = {};
      pros = [];
      cons = [];
      migrationCode = "";
      curlSnippet = "";
  }
  
  const handleCopyCode = (code: string, type: 'migration' | 'curl') => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`${type === 'migration' ? 'Code' : 'cURL snippet'} copied to clipboard`);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleMarkImplemented = () => {
    setImplementing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Suggestion marked as implemented");
      setImplementing(false);
      onClose();
    }, 1000);
  };
  
  const handleDismiss = () => {
    setDismissing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Suggestion dismissed");
      setDismissing(false);
      onClose();
    }, 1000);
  };
  
  // Calculate savings impact
  const dailySavings = suggestion.impact;
  const monthlySavings = dailySavings * 30;
  const annualSavings = dailySavings * 365;
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[550px] overflow-y-auto">
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
                    {Object.entries(currentConfig).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span className="font-medium">{value as ReactNode}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium text-brand-primary">Proposed Change</h4>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    {Object.entries(proposedChange).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span className="font-medium">{value as ReactNode}</span>
                      </div>
                    ))}
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

              {/* cURL Snippet */}
              {curlSnippet && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">cURL Example</h4>
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
          
          <div className="flex items-center justify-end gap-4 pt-4 sticky bottom-0 bg-white border-t py-4">
            <Button variant="outline" onClick={handleDismiss} disabled={dismissing} className="min-w-[100px]">
              {dismissing ? "Processing..." : "Dismiss"}
            </Button>
            <Button 
              onClick={handleMarkImplemented} 
              disabled={implementing}
              className="bg-brand-primary hover:bg-brand-dark text-white min-w-[160px]"
            >
              {implementing ? "Processing..." : "Mark as implemented"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SuggestionDrawer;
