'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowRight, CreditCard, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  
  // Mock billing data
  const subscriptionDetails = {
    plan: "Free Trial",
    status: "active",
    billingCycle: "monthly",
    nextBillingDate: "June 18, 2025",
    daysRemaining: 25
  };
  
  const invoices = [
    { id: "INV-001", date: "May 18, 2025", amount: 0.00, status: "paid", downloadUrl: "#" },
    { id: "INV-002", date: "June 18, 2025", amount: 29.00, status: "upcoming" },
  ];
  
  const paymentMethods = [
    { id: "card_1", type: "card", brand: "visa", last4: "4242", expMonth: 12, expYear: 2025, isDefault: true }
  ];
  
  const formatCardExpiry = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };
  
  const plans = [
    {
      id: "free",
      name: "Free Trial",
      price: "$0",
      period: "limited time",
      description: "Perfect for evaluating TokenMeter",
      features: [
        "3 API keys",
        "30-day history",
        "1 Slack alert",
        "Basic recommendations"
      ],
      buttonText: "Current Plan",
      disabled: true
    },
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "For startups and small teams",
      features: [
        "10 API keys",
        "180-day history",
        "3 team seats",
        "Email + Slack alerts",
        "Full recommendation engine"
      ],
      buttonText: "Upgrade",
      primary: currentPlan === "free"
    },
    {
      id: "growth",
      name: "Growth",
      price: "$99",
      period: "per month",
      description: "For growing companies",
      features: [
        "25 API keys",
        "1-year history",
        "Unlimited team seats",
        "Custom alerts",
        "Batch recommendations",
        "Google/Okta SSO"
      ],
      buttonText: "Upgrade",
    }
  ];
  
  const handleCancelSubscription = () => {
    toast.success("Your subscription has been canceled");
    // In a real app, this would call an API to cancel the subscription
  };
  
  const handleUpdatePaymentMethod = () => {
    toast.info("Redirecting to payment method update");
    // This would redirect to Stripe Customer Portal in a real app
  };
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Billing Center</h2>
        <p className="text-gray-500 mt-1">Manage your subscription and payment methods</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current plan and billing details</CardDescription>
            </div>
            <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary">
              {subscriptionDetails.plan}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="capitalize">{subscriptionDetails.status}</span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Billing Cycle</p>
              <p className="font-medium capitalize">{subscriptionDetails.billingCycle}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Next Billing Date</p>
              <p className="font-medium">{subscriptionDetails.nextBillingDate}</p>
            </div>
          </div>
          
          {subscriptionDetails.plan === "Free Trial" && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start gap-2 mt-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Your free trial ends in {subscriptionDetails.daysRemaining} days</p>
                <p className="text-sm mt-1">Select a plan below to continue using TokenMeter.AI after your trial.</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Cancel subscription</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Canceling your subscription will allow you to continue using TokenMeter.AI until the end of your current billing period, but will not renew.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep subscription</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelSubscription}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Yes, cancel subscription
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button variant="outline" onClick={handleUpdatePaymentMethod}>
            <CreditCard className="mr-2 h-4 w-4" />
            Update payment method
          </Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="plans">
        <TabsList className="mb-4">
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`border ${currentPlan === plan.id ? 'border-brand-primary shadow-md' : ''}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-2xl font-display font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={currentPlan === plan.id ? "#" : "/billing/checkout"} className="w-full">
                    <Button 
                      className={`w-full ${plan.primary ? 'bg-brand-primary hover:bg-brand-primary/90' : ''}`}
                      disabled={plan.disabled}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment options</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {method.brand === 'visa' ? (
                          <div className="h-8 w-12 bg-blue-100 rounded flex items-center justify-center text-blue-700 font-bold">
                            VISA
                          </div>
                        ) : (
                          <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-700 font-bold">
                            CARD
                          </div>
                        )}
                        <div>
                          <p className="font-medium">•••• {method.last4}</p>
                          <p className="text-xs text-gray-500">Expires {formatCardExpiry(method.expMonth, method.expYear)}</p>
                        </div>
                        {method.isDefault && (
                          <Badge variant="outline" className="ml-2">Default</Badge>
                        )}
                      </div>
                      <Button size="sm" variant="ghost" onClick={handleUpdatePaymentMethod}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No payment methods found</p>
                  <Button className="mt-4" onClick={handleUpdatePaymentMethod}>
                    Add payment method
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your past and upcoming invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'outline' : 'secondary'} className={
                          invoice.status === 'paid' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-amber-50 text-amber-700'
                        }>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {invoice.downloadUrl && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={invoice.downloadUrl}>
                              <FileText className="h-4 w-4 mr-1" />
                              PDF
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
