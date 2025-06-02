'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, Clock, DollarSign, TrendingDown, ArrowRight, AlertCircle, Trash2, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Alert {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'budget' | 'saving' | 'system';
  read: boolean;
  active: boolean;
  details?: string;
}

interface AlertRule {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

const Alerts = () => {
  // Mock data - would be replaced with real API data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "Daily budget threshold reached",
      description: "Your spending has reached 80% of your daily budget ($50).",
      date: "Today, 10:23 AM",
      type: "budget",
      read: false,
      active: true,
      details: "You have spent $42.30 of your $50 daily budget. Based on current usage patterns, you'll exceed your daily budget by approximately 20% ($10) if usage continues at the current rate."
    },
    {
      id: 2,
      title: "Cost-saving opportunity detected",
      description: "Switch from GPT-4 to GPT-3.5 Turbo for 40% of your queries with minimal quality impact.",
      date: "Yesterday, 2:15 PM",
      type: "saving",
      read: false,
      active: true,
      details: "Our analysis shows that 40% of your GPT-4 queries are simple tasks that could be handled by GPT-3.5 Turbo with minimal quality impact. This could save you approximately $120/month based on your current usage patterns."
    },
    {
      id: 3,
      title: "Anthropic API successfully connected",
      description: "Your Anthropic API connection is now active and TokenMeter.AI is collecting usage data.",
      date: "May 16, 2025",
      type: "system",
      read: true,
      active: true,
      details: "Your Anthropic API connection is now successfully configured and collecting usage data. You can view Claude Opus and Claude Sonnet usage metrics in the Models dashboard."
    },
    {
      id: 4,
      title: "Idle GPU instances detected",
      description: "Your self-hosted Llama instances have been idle for 4.5 hours. Consider auto-scaling.",
      date: "May 15, 2025",
      type: "saving",
      read: true,
      active: true,
      details: "Your g4dn.xlarge instance running Llama 3 has been idle for 4.5 hours, costing approximately $1.17 in wasted resources. Consider implementing auto-scaling to automatically shut down idle instances."
    },
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: 1,
      name: "Daily Budget Alert",
      description: "Notify when daily spending reaches 80% of budget",
      active: true,
    },
    {
      id: 2,
      name: "Model Inefficiency",
      description: "Detect when a cheaper model could be used without quality loss",
      active: true,
    },
    {
      id: 3,
      name: "Idle GPU Resources",
      description: "Alert when self-hosted GPU instances are idle for >1 hour",
      active: true,
    },
    {
      id: 4,
      name: "Context Length",
      description: "Identify prompts with excessive context length",
      active: false,
    },
  ]);

  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [addRuleModalOpen, setAddRuleModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDetailOpen, setAlertDetailOpen] = useState(false);

  const [slackWebhook, setSlackWebhook] = useState("");
  const [emailNotifications, setEmailNotifications] = useState("daily");
  const [emailRecipients, setEmailRecipients] = useState("admin@company.com");

  const [newRuleMetric, setNewRuleMetric] = useState("daily_spend");
  const [newRuleOperator, setNewRuleOperator] = useState("greater_than");
  const [newRuleThreshold, setNewRuleThreshold] = useState("");
  const [newRuleAction, setNewRuleAction] = useState("email");
  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleDescription, setNewRuleDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  // Toggle alerts rule active state
  const toggleAlertRule = (id: number) => {
    setAlertRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    toast.success("Alert rule status updated");
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    toast.success("Alert marked as read");
  };

  const viewAlertDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    if (!alert.read) {
      markAsRead(alert.id);
    }
    setAlertDetailOpen(true);
  };

  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved");
    setConfigureModalOpen(false);
  };

  const handleAddNewRule = () => {
    if (!newRuleName || !newRuleThreshold) {
      toast.error("Please fill out all required fields");
      return;
    }

    const newRule = {
      id: alertRules.length + 5,
      name: newRuleName,
      description: newRuleDescription || `${getMetricLabel(newRuleMetric)} ${getOperatorLabel(newRuleOperator)} ${newRuleThreshold}`,
      active: true
    };

    setAlertRules([...alertRules, newRule]);
    toast.success("New alert rule added");
    setAddRuleModalOpen(false);
    
    // Reset form
    setNewRuleName("");
    setNewRuleDescription("");
    setNewRuleMetric("daily_spend");
    setNewRuleOperator("greater_than");
    setNewRuleThreshold("");
    setNewRuleAction("email");
  };

  const deleteRule = (id: number) => {
    setAlertRules(alertRules.filter(rule => rule.id !== id));
    toast.success("Alert rule deleted");
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "daily_spend": return "Daily Spend";
      case "model_usage": return "Model Usage";
      case "token_usage": return "Token Usage";
      case "error_rate": return "Error Rate";
      case "latency": return "Latency";
      default: return metric;
    }
  };

  const getOperatorLabel = (operator: string) => {
    switch (operator) {
      case "greater_than": return "Greater Than";
      case "less_than": return "Less Than";
      case "equal_to": return "Equal To";
      case "not_equal_to": return "Not Equal To";
      default: return operator;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "email": return "Send Email";
      case "slack": return "Slack Notification";
      case "webhook": return "Trigger Webhook";
      default: return action;
    }
  };
  
  // Filter alerts based on tab and search query
  const filterAlerts = (alerts: Alert[], tab: string) => {
    return alerts.filter(alert => {
      // Filter by tab
      if (tab === 'unread' && alert.read) return false;
      if (tab === 'budget' && alert.type !== 'budget') return false;
      if (tab === 'savings' && alert.type !== 'saving') return false;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          alert.title.toLowerCase().includes(query) ||
          alert.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Alerts</h2>
          <p className="text-gray-500 mt-1">Manage alerts and notification preferences</p>
        </div>
        <Button onClick={() => setConfigureModalOpen(true)}>Configure Notifications</Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Input 
              placeholder="Search alerts..." 
              className="max-w-xs pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Notifications about your API usage and potential cost-saving opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterAlerts(alerts, 'all').map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 border rounded-lg flex ${alert.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <div className="mr-4 mt-0.5">
                      {alert.type === 'budget' && (
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                      {alert.type === 'saving' && (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      {alert.type === 'system' && (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <BellRing className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            <Clock className="h-3 w-3" />
                            <span>{alert.date}</span>
                          </Badge>
                          {!alert.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(alert.id)}
                              className="h-6 text-xs"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-brand-primary font-medium mt-2 flex items-center gap-1"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filterAlerts(alerts, 'all').length === 0 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <AlertCircle className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900">No alerts found</h3>
                  <p className="text-gray-500 mt-1">
                    No alerts match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Unread Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterAlerts(alerts, 'unread').map((alert) => (
                  <div 
                    key={alert.id}
                    className="p-4 border rounded-lg flex bg-blue-50 border-blue-200"
                  >
                    <div className="mr-4 mt-0.5">
                      {alert.type === 'budget' && (
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                      {alert.type === 'saving' && (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      {alert.type === 'system' && (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <BellRing className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            <Clock className="h-3 w-3" />
                            <span>{alert.date}</span>
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(alert.id)}
                            className="h-6 text-xs"
                          >
                            Mark read
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-brand-primary font-medium mt-2 flex items-center gap-1"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filterAlerts(alerts, 'unread').length === 0 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <BellRing className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900">No unread alerts</h3>
                  <p className="text-gray-500 mt-1">
                    You're all caught up! No unread alerts at this time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Budget Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterAlerts(alerts, 'budget').map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 border rounded-lg flex ${alert.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <div className="mr-4 mt-0.5">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            <Clock className="h-3 w-3" />
                            <span>{alert.date}</span>
                          </Badge>
                          {!alert.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(alert.id)}
                              className="h-6 text-xs"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-brand-primary font-medium mt-2 flex items-center gap-1"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filterAlerts(alerts, 'budget').length === 0 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <DollarSign className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900">No budget alerts</h3>
                  <p className="text-gray-500 mt-1">
                    No budget-related alerts at this time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Savings Opportunity Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterAlerts(alerts, 'savings').map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 border rounded-lg flex ${alert.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <div className="mr-4 mt-0.5">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            <Clock className="h-3 w-3" />
                            <span>{alert.date}</span>
                          </Badge>
                          {!alert.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(alert.id)}
                              className="h-6 text-xs"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-brand-primary font-medium mt-2 flex items-center gap-1"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filterAlerts(alerts, 'savings').length === 0 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <TrendingDown className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900">No savings alerts</h3>
                  <p className="text-gray-500 mt-1">
                    No cost-saving opportunities detected at this time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Alert Rules</CardTitle>
            <CardDescription>
              Configure when and how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {alertRules.map((rule) => (
                <li key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={rule.active} 
                      onCheckedChange={() => toggleAlertRule(rule.id)} 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setAddRuleModalOpen(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Custom Rule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Configure Notifications Modal */}
      <Dialog open={configureModalOpen} onOpenChange={setConfigureModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure Notifications</DialogTitle>
            <DialogDescription>
              Set up how and when you want to receive notifications.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
              <Input 
                id="slack-webhook" 
                placeholder="https://hooks.slack.com/services/..." 
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
              />
              <p className="text-sm text-gray-500">Paste your Slack webhook URL to receive alerts in your workspace.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-frequency">Email Notification Frequency</Label>
              <Select value={emailNotifications} onValueChange={setEmailNotifications}>
                <SelectTrigger id="email-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-recipients">Email Recipients</Label>
              <Input 
                id="email-recipients" 
                placeholder="email@example.com, another@example.com" 
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
              <p className="text-sm text-gray-500">Separate multiple email addresses with commas.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigureModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Custom Rule Modal */}
      <Dialog open={addRuleModalOpen} onOpenChange={setAddRuleModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Alert Rule</DialogTitle>
            <DialogDescription>
              Create a custom alert rule based on metrics, thresholds, and actions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input 
                id="rule-name" 
                placeholder="E.g., High Token Usage Alert" 
                value={newRuleName}
                onChange={(e) => setNewRuleName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-metric">When this metric</Label>
              <Select value={newRuleMetric} onValueChange={setNewRuleMetric}>
                <SelectTrigger id="rule-metric">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily_spend">Daily Spend</SelectItem>
                  <SelectItem value="model_usage">Model Usage</SelectItem>
                  <SelectItem value="token_usage">Token Usage</SelectItem>
                  <SelectItem value="error_rate">Error Rate</SelectItem>
                  <SelectItem value="latency">Latency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-operator">Is</Label>
              <Select value={newRuleOperator} onValueChange={setNewRuleOperator}>
                <SelectTrigger id="rule-operator">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="equal_to">Equal To</SelectItem>
                  <SelectItem value="not_equal_to">Not Equal To</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-threshold">Threshold</Label>
              <Input 
                id="rule-threshold" 
                placeholder="E.g., 100 or 50%" 
                value={newRuleThreshold}
                onChange={(e) => setNewRuleThreshold(e.target.value)}
              />
              <p className="text-sm text-gray-500">Enter a numeric value, with % if applicable.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-action">Then</Label>
              <Select value={newRuleAction} onValueChange={setNewRuleAction}>
                <SelectTrigger id="rule-action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Send Email</SelectItem>
                  <SelectItem value="slack">Slack Notification</SelectItem>
                  <SelectItem value="webhook">Trigger Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-description">Description (optional)</Label>
              <Textarea 
                id="rule-description" 
                placeholder="Optional description for your team" 
                value={newRuleDescription}
                onChange={(e) => setNewRuleDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRuleModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewRule}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Alert Details Modal */}
      <Drawer open={alertDetailOpen} onOpenChange={setAlertDetailOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{selectedAlert?.title}</DrawerTitle>
            <DrawerDescription>{selectedAlert?.description}</DrawerDescription>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="flex gap-1 items-center">
                <Clock className="h-3 w-3" />
                <span>{selectedAlert?.date}</span>
              </Badge>
              {selectedAlert?.type === 'budget' && (
                <Badge className="bg-red-50 text-red-700 border-0">Budget</Badge>
              )}
              {selectedAlert?.type === 'saving' && (
                <Badge className="bg-green-50 text-green-700 border-0">Savings</Badge>
              )}
              {selectedAlert?.type === 'system' && (
                <Badge className="bg-blue-50 text-blue-700 border-0">System</Badge>
              )}
            </div>
          </DrawerHeader>
          
          <div className="p-4 pt-0">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{selectedAlert?.details}</p>
            </div>
            
            {selectedAlert?.type === 'saving' && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Recommended Action</h4>
                <p className="text-gray-700">
                  Review the saving suggestion and implement the recommended changes to reduce costs.
                </p>
                <div className="mt-4">
                  <Button className="bg-brand-primary hover:bg-brand-dark text-white w-full">
                    View Detailed Suggestion
                  </Button>
                </div>
              </div>
            )}
            
            {selectedAlert?.type === 'budget' && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Recommended Action</h4>
                <p className="text-gray-700">
                  Consider increasing your budget or implementing cost-saving measures to avoid exceeding your limit.
                </p>
                <div className="mt-4 flex gap-2 flex-col sm:flex-row">
                  <Button 
                    className="bg-brand-primary hover:bg-brand-dark text-white flex-1 sm:flex-none sm:w-auto"
                    onClick={() => {
                      router.push('/billing');
                      setAlertDetailOpen(false);
                    }}
                  >
                    Adjust Budget
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 sm:flex-none sm:w-auto"
                    onClick={() => {
                      router.push('/suggestions');
                      setAlertDetailOpen(false);
                    }}
                  >
                    View Cost-Saving Tips
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DrawerFooter className="flex flex-row justify-end pt-2">
            <Button variant="outline" onClick={() => setAlertDetailOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Alerts;
