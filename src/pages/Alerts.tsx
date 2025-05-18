
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BellRing, Clock, DollarSign, TrendingDown, ArrowRight, AlertCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface Alert {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'budget' | 'saving' | 'system';
  read: boolean;
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
    },
    {
      id: 2,
      title: "Cost-saving opportunity detected",
      description: "Switch from GPT-4 to GPT-3.5 Turbo for 40% of your queries with minimal quality impact.",
      date: "Yesterday, 2:15 PM",
      type: "saving",
      read: false,
      active: true,
    },
    {
      id: 3,
      title: "Anthropic API successfully connected",
      description: "Your Anthropic API connection is now active and TokenMeter.AI is collecting usage data.",
      date: "May 16, 2025",
      type: "system",
      read: true,
      active: true,
    },
    {
      id: 4,
      title: "Idle GPU instances detected",
      description: "Your self-hosted Llama instances have been idle for 4.5 hours. Consider auto-scaling.",
      date: "May 15, 2025",
      type: "saving",
      read: true,
      active: true,
    },
  ]);

  const alertRules = [
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
  ];

  const toggleAlertRule = (id: number) => {
    // Mock function - would update the backend in a real implementation
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Alerts</h2>
          <p className="text-gray-500 mt-1">Manage alerts and notification preferences</p>
        </div>
        <Button>Configure Notifications</Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <Input placeholder="Search alerts..." className="max-w-xs" />
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
                {alerts.map((alert) => (
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
                      <div className="flex items-center gap-1 text-sm text-brand-primary font-medium mt-2">
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {alerts.length === 0 && (
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
                {alerts.filter(a => !a.read).map((alert) => (
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
                      <div className="flex items-center gap-1 text-sm text-brand-primary font-medium mt-2">
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {alerts.filter(a => !a.read).length === 0 && (
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
                {alerts.filter(a => a.type === 'budget').map((alert) => (
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
                      <div className="flex items-center gap-1 text-sm text-brand-primary font-medium mt-2">
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {alerts.filter(a => a.type === 'budget').length === 0 && (
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
                {alerts.filter(a => a.type === 'saving').map((alert) => (
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
                      <div className="flex items-center gap-1 text-sm text-brand-primary font-medium mt-2">
                        <span>View details</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {alerts.filter(a => a.type === 'saving').length === 0 && (
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
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="outline">Add Custom Rule</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;
