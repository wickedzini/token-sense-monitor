'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Key, UploadCloud, Slack, InfoIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const SettingsPage = () => {
  const [showKeys, setShowKeys] = useState(false);
  const [isApiUpdating, setIsApiUpdating] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [isSlackConnecting, setIsSlackConnecting] = useState(false);
  const [isSlackConnected, setIsSlackConnected] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    dailySummary: true,
    criticalAlerts: true,
    savingsOpportunities: true
  });
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast: uiToast } = useToast();

  const handleUpdateApi = () => {
    setIsApiUpdating(true);
    // Simulate API update
    setTimeout(() => {
      setIsApiUpdating(false);
      toast.success("API key updated successfully");
    }, 1500);
  };

  const handleConnectSlack = () => {
    if (!slackWebhook || !slackWebhook.includes('hooks.slack.com')) {
      toast.error("Please enter a valid Slack webhook URL");
      return;
    }
    
    setIsSlackConnecting(true);
    // Simulate connection
    setTimeout(() => {
      setIsSlackConnecting(false);
      setIsSlackConnected(true);
      toast.success("Successfully connected to Slack");
    }, 1500);
  };

  const handleEmailNotificationChange = (type: string) => {
    setEmailNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
    toast.success("Notification preferences updated");
  };

  const handleSavePreferences = () => {
    toast.success("Notification preferences saved");
  };

  const handleUpgradePlan = () => {
    if (!selectedPlan) {
      uiToast({
        title: "No plan selected",
        description: "Please select a subscription plan first",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically redirect to a payment provider
    // For this demo, we'll just show a success message
    toast.success(`Upgrading to ${selectedPlan} plan. Redirecting to payment...`);
    setTimeout(() => {
      setSubscriptionDialogOpen(false);
      toast.success("Subscription activated successfully!");
    }, 2000);
  };

  const handleSaveCap = () => {
    toast.success("Daily budget cap updated");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account and connections</p>
      </div>

      <Tabs defaultValue="api-keys">
        <TabsList className="mb-4">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage-limits">Usage Limits</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys Vault</CardTitle>
              <CardDescription>
                Manage your API connections securely. Keys are encrypted at rest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">OpenAI</h3>
                  <Badge>Connected</Badge>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="openai-key">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        id="openai-key" 
                        type={showKeys ? "text" : "password"} 
                        value="sk-**********************************" 
                        readOnly
                      />
                      <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => setShowKeys(!showKeys)}
                    >
                      {showKeys ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                    <Button onClick={handleUpdateApi} disabled={isApiUpdating}>
                      {isApiUpdating ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Anthropic</h3>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="anthropic-key">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input id="anthropic-key" type="password" placeholder="sk-ant-********" />
                      <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button onClick={() => {
                      toast.success("Connected to Anthropic API");
                    }}>Connect</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Self-hosted LLM</h3>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="endpoint-url">Endpoint URL</Label>
                  <Input id="endpoint-url" type="text" placeholder="https://llm-api.your-company.com/v1" />
                  
                  <Label htmlFor="bearer-token">Bearer Token</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input id="bearer-token" type="password" placeholder="Bearer token for authentication" />
                      <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button onClick={() => {
                      toast.success("Connected to self-hosted LLM");
                    }}>Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage-limits">
          <Card>
            <CardHeader>
              <CardTitle>Usage Limits</CardTitle>
              <CardDescription>
                Set spending caps and alerts for your API usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Daily Budget Cap</h3>
                <div className="grid gap-2">
                  <Label htmlFor="daily-cap">Maximum daily spend ($)</Label>
                  <Input id="daily-cap" type="number" defaultValue="50" />
                  <p className="text-sm text-gray-500">
                    When this limit is reached, you'll receive an alert. API access won't be restricted.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Thresholds</h3>
                <div className="grid gap-2">
                  <Label>Send alert when daily spend reaches</Label>
                  <RadioGroup defaultValue="80">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50" id="threshold-50" />
                      <Label htmlFor="threshold-50">50% of daily cap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="80" id="threshold-80" />
                      <Label htmlFor="threshold-80">80% of daily cap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100" id="threshold-100" />
                      <Label htmlFor="threshold-100">100% of daily cap</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleSaveCap}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to be notified about important events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Slack Integration</h3>
                  {isSlackConnected ? (
                    <Badge>Connected</Badge>
                  ) : (
                    <Badge variant="outline">Not Connected</Badge>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="slack-webhook" className="flex-1">Webhook URL</Label>
                    <button 
                      className="text-sm text-brand-primary hover:underline flex items-center gap-1"
                      onClick={() => window.open('https://api.slack.com/messaging/webhooks', '_blank')}
                    >
                      <InfoIcon size={14} />
                      <span>How to get a webhook URL</span>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        id="slack-webhook" 
                        type="text" 
                        placeholder="https://hooks.slack.com/services/..." 
                        value={slackWebhook}
                        onChange={(e) => setSlackWebhook(e.target.value)}
                      />
                      <Slack className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button 
                      onClick={handleConnectSlack} 
                      disabled={isSlackConnecting}
                    >
                      {isSlackConnecting ? "Connecting..." : (isSlackConnected ? "Reconnect" : "Connect")}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Connect Slack to receive real-time notifications about cost spikes and savings opportunities.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-summary">Daily summary report</Label>
                    <input 
                      type="checkbox" 
                      id="daily-summary"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={emailNotifications.dailySummary}
                      onChange={() => handleEmailNotificationChange('dailySummary')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alerts-only">Critical alerts only</Label>
                    <input 
                      type="checkbox" 
                      id="alerts-only"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={emailNotifications.criticalAlerts}
                      onChange={() => handleEmailNotificationChange('criticalAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="savings-opportunities">Savings opportunities</Label>
                    <input 
                      type="checkbox" 
                      id="savings-opportunities"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={emailNotifications.savingsOpportunities}
                      onChange={() => handleEmailNotificationChange('savingsOpportunities')}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your TokenMeter.AI subscription and billing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold">Free Trial</h3>
                      <p className="text-white/80 mt-1">25 days remaining</p>
                    </div>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white">Active</Badge>
                  </div>
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <span>3 API keys</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <span>30-day data history</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <span>1 Slack alert</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Button 
                      variant="secondary" 
                      className="bg-white text-brand-primary hover:bg-white/90"
                      onClick={() => setSubscriptionDialogOpen(true)}
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>

                <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Choose a plan</DialogTitle>
                      <DialogDescription>
                        Select the plan that best fits your needs. All plans include the core TokenMeter.AI features.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                      <Card 
                        className={`border-2 cursor-pointer transition-all ${selectedPlan === "Starter" ? "border-brand-primary/50 shadow-md" : "border-transparent hover:border-brand-primary/20"}`}
                        onClick={() => setSelectedPlan("Starter")}
                      >
                        <CardHeader>
                          <CardTitle>Starter</CardTitle>
                          <div className="mt-2">
                            <span className="text-2xl font-bold">$29</span>
                            <span className="text-gray-500">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>10 API keys</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>180-day history</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>3 seats</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card 
                        className={`border-2 transition-all ${selectedPlan === "Growth" ? "border-brand-primary/50 shadow-lg" : "border-brand-primary/30 shadow-md"}`}
                        onClick={() => setSelectedPlan("Growth")}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>Growth</CardTitle>
                            <Badge>Popular</Badge>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-bold">$99</span>
                            <span className="text-gray-500">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>25 API keys</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>1-year history</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>Unlimited seats</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>Google/Okta SSO</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card 
                        className={`border-2 cursor-pointer transition-all ${selectedPlan === "Scale" ? "border-brand-primary/50 shadow-md" : "border-transparent hover:border-brand-primary/20"}`}
                        onClick={() => setSelectedPlan("Scale")}
                      >
                        <CardHeader>
                          <CardTitle>Scale</CardTitle>
                          <div className="mt-2">
                            <span className="text-2xl font-bold">$399</span>
                            <span className="text-gray-500">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>100 API keys</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>3-year history</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>AI benchmarking sandbox</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span>SOC2 report</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSubscriptionDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleUpgradePlan} disabled={!selectedPlan}>
                        Subscribe to {selectedPlan || "Selected"} Plan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
