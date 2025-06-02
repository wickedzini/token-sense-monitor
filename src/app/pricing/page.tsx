'use client';

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SimpleHeader from "@/components/layout/SimpleHeader";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  
  const plans = [
    {
      name: "Starter",
      description: "For small projects and individual developers",
      monthlyPrice: 49,
      annualPrice: 39, // per month when billed annually
      features: [
        "Monitor up to 5 models",
        "30 days data retention",
        "Basic cost analytics",
        "Email support",
        "1 user seat"
      ],
      popular: false,
      buttonText: "Start saving today"
    },
    {
      name: "Growth",
      description: "For growing teams with multiple models",
      monthlyPrice: 99,
      annualPrice: 89,
      features: [
        "Monitor up to 20 models",
        "90 days data retention",
        "Cost & performance analytics",
        "API access",
        "Slack notifications",
        "Priority email support",
        "5 user seats"
      ],
      popular: true,
      buttonText: "Start saving today"
    },
    {
      name: "Scale",
      description: "For large teams with advanced needs",
      monthlyPrice: 249,
      annualPrice: 199,
      features: [
        "Unlimited models",
        "12 months data retention",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated slack channel",
        "Dedicated account manager",
        "10+ user seats"
      ],
      popular: false,
      buttonText: "Contact sales"
    }
  ];

  const features = [
    {
      name: "Models Monitored",
      starter: "5 models",
      growth: "20 models",
      scale: "Unlimited"
    },
    {
      name: "Data Retention",
      starter: "30 days",
      growth: "90 days",
      scale: "12 months"
    },
    {
      name: "User Seats",
      starter: "1",
      growth: "5",
      scale: "10+"
    },
    {
      name: "Analytics Dashboard",
      starter: "Basic",
      growth: "Advanced",
      scale: "Custom"
    },
    {
      name: "Cost Optimization",
      starter: "Basic suggestions",
      growth: "Advanced suggestions",
      scale: "Custom optimization"
    },
    {
      name: "API Access",
      starter: "Limited",
      growth: "Full access",
      scale: "Unlimited"
    },
    {
      name: "Integrations",
      starter: "Email",
      growth: "Email, Slack",
      scale: "Email, Slack, Custom"
    },
    {
      name: "Support",
      starter: "Email",
      growth: "Priority email",
      scale: "Dedicated manager"
    }
  ];

  return (
    <div>
      <SimpleHeader title="Pricing Plans" />
      <div className="container py-12 px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold mb-4">Transparent Pricing for Every Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Save up to 20% with annual billing.
          </p>
          
          <div className="flex items-center justify-center mt-6">
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
              <Button
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                onClick={() => setBillingCycle("monthly")}
                className={billingCycle === "monthly" ? "" : "text-gray-600"}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === "annual" ? "default" : "ghost"}
                onClick={() => setBillingCycle("annual")}
                className={billingCycle === "annual" ? "" : "text-gray-600"}
              >
                Annual <Badge className="ml-2 bg-green-100 text-green-800 border-0">Save 20%</Badge>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col ${plan.popular ? 'border-brand-primary shadow-lg relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-gray-500">/mo</span>
                  {billingCycle === "annual" && (
                    <div className="text-green-600 text-sm font-medium mt-1">
                      Billed annually (${plan.annualPrice * 12}/year)
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 mt-auto">
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Compare plans accordion */}
        <div className="mt-12 mb-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="compare">
              <AccordionTrigger className="text-xl font-display font-bold">
                Compare all plans
              </AccordionTrigger>
              <AccordionContent>
                <div id="compare" className="mt-8">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-4 px-6 text-left">Feature</th>
                          <th className="py-4 px-6 text-center">Starter</th>
                          <th className="py-4 px-6 text-center">Growth</th>
                          <th className="py-4 px-6 text-center">Scale</th>
                        </tr>
                      </thead>
                      <tbody>
                        {features.map((feature, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-4 px-6 font-medium">{feature.name}</td>
                            <td className="py-4 px-6 text-center">{feature.starter}</td>
                            <td className="py-4 px-6 text-center font-medium text-brand-primary">{feature.growth}</td>
                            <td className="py-4 px-6 text-center">{feature.scale}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* FAQs */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be effective immediately.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">How does the free trial work?</h3>
                <p className="text-gray-600">All plans include a 14-day free trial with full access to all features. No credit card required.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Can I add more user seats?</h3>
                <p className="text-gray-600">Yes, additional seats can be purchased for $19/month per seat on any plan.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Start Optimizing Your LLM Costs?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies saving up to 40% on their AI model usage with TokenMeter.
          </p>
          <Button size="lg" className="bg-brand-primary hover:bg-brand-dark text-white">
            Start your free trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
