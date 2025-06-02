'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, ChevronDown, ChevronUp, TrendingDown, ChevronLeft, TrendingUp, CircleDollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const LandingPage = () => {
  const router = useRouter();
  const [videoOpen, setVideoOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "AI Lead at TechVision",
      company: "TechVision",
      image: "/placeholder.svg",
      text: "TokenMeter helped us reduce our AI costs by 32% in the first month while maintaining quality. The suggestions engine is brilliant."
    },
    {
      name: "Michael Chang",
      role: "CTO",
      company: "DataFlow AI",
      image: "/placeholder.svg",
      text: "The insights TokenMeter provides have transformed our approach to LLM usage. We've optimized our most expensive endpoints without sacrificing performance."
    },
    {
      name: "Rebecca Torres",
      role: "Engineering Manager",
      company: "NexGen Solutions",
      image: "/placeholder.svg",
      text: "We were shocked to discover how much we could save by implementing TokenMeter's suggestions. The ROI was immediate and significant."
    }
  ];

  const suggestions = [
    {
      title: "Optimize ChatBot Endpoint",
      description: "Switch from gpt-4 to gpt-3.5-turbo for initial user interactions",
      savings: "65% cost reduction",
      icon: <TrendingDown className="h-8 w-8 text-savings-green" />,
      tags: ["chat", "cost-optimization"]
    },
    {
      title: "Reduce Token Usage",
      description: "Trim context window for summarization tasks from 16k to 8k tokens",
      savings: "48% token reduction",
      icon: <CircleDollarSign className="h-8 w-8 text-savings-green" />,
      tags: ["summarize", "context-optimization"]
    },
    {
      title: "Model Selection Improvement",
      description: "Use Claude Instant instead of GPT-4 for data extraction tasks",
      savings: "72% cost savings",
      icon: <TrendingDown className="h-8 w-8 text-savings-green" />,
      tags: ["extraction", "model-switch"]
    }
  ];

  const clients = [
    { name: "Acme Corp", logo: "/placeholder.svg" },
    { name: "TechGiant", logo: "/placeholder.svg" },
    { name: "Innovate AI", logo: "/placeholder.svg" },
    { name: "DataStream", logo: "/placeholder.svg" },
    { name: "FutureScale", logo: "/placeholder.svg" },
    { name: "CodeNexus", logo: "/placeholder.svg" }
  ];
  
  return (
    <>
      <Header />
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">TokenMeter.AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Documentation</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="bg-brand-primary hover:bg-brand-dark text-white" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 pt-32 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900 animate-fade-in">
                Monitor and Optimize Your LLM Costs
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                TokenMeter helps you track, analyze, and reduce your spend across OpenAI, Anthropic, and other LLM providers—without sacrificing quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-primary hover:bg-brand-dark text-white text-lg py-6 px-8 animate-enter" size="lg" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" className="text-lg py-6 px-8 animate-enter" style={{ animationDelay: "0.2s" }} size="lg" onClick={() => setVideoOpen(true)}>
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required. Free 14-day trial.
              </p>
            </div>
            <div className="max-w-xl w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 transform transition-all hover:scale-105 duration-300">
                <img 
                  src="/placeholder.svg" 
                  alt="TokenMeter Dashboard" 
                  className="rounded-md w-full h-auto" 
                  width="550"
                  height="400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Shapes */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-brand-light/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-brand-light/20 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg text-gray-600 font-medium">Trusted by innovative teams</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={client.logo} alt={client.name} className="h-12 md:h-16 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Suggestions Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-primary text-white px-3 py-1">Smart Engine</Badge>
            <h2 className="text-3xl font-display font-bold mb-4">AI-Powered Cost Optimization</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Smart Suggestions Engine continuously analyzes your LLM usage and recommends ways to reduce costs without sacrificing quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200 overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50 border-b">
                  <div className="flex items-center justify-between mb-2">
                    {suggestion.icon}
                    <Badge variant="outline" className="text-savings-green border-savings-green">
                      {suggestion.savings}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{suggestion.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600">{suggestion.description}</p>
                  <div className="flex gap-2 mt-3">
                    {suggestion.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-brand-light/20 text-brand-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 bg-gray-50">
                  <Button variant="link" className="text-brand-primary p-0" asChild>
                    <Link href="/suggestions">View detail <ChevronRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Screenshots Carousel */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">See TokenMeter in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our intuitive dashboards and powerful analytics tools
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3].map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                        <img 
                          src="/placeholder.svg" 
                          alt={`TokenMeter Dashboard ${index + 1}`}
                          className="w-full h-auto aspect-video object-cover" 
                        />
                        <div className="p-4 bg-white">
                          <h3 className="font-medium text-lg">
                            {index === 0 && "Cost Analytics Dashboard"}
                            {index === 1 && "Model Performance Comparison"}
                            {index === 2 && "Smart Suggestions Panel"}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {index === 0 && "Track spending across different models and endpoints in real-time"}
                            {index === 1 && "Compare performance metrics and costs between different LLM providers"}
                            {index === 2 && "Get actionable recommendations to optimize your LLM usage"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static transform-none mx-2" />
                <CarouselNext className="static transform-none mx-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Teams using TokenMeter are seeing significant cost reductions while maintaining LLM quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-light overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How TokenMeter Helps You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get detailed insight into your LLM spending and actionable recommendations to optimize costs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <CardTitle className="text-xl">Usage Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track token usage, costs, and performance metrics across all your LLM providers in one unified dashboard.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <CardTitle className="text-xl">Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Receive AI-generated suggestions to reduce costs by switching models, optimizing prompts, and eliminating waste.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <CardTitle className="text-xl">Budget Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Set up customizable alerts to notify your team when spending exceeds thresholds or anomalies are detected.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                </div>
                <CardTitle className="text-xl">Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gain insights into usage patterns, model performance, and cost-efficiency metrics across your organization.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <CardTitle className="text-xl">Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Leverage our AI to identify cost-saving opportunities specific to your usage patterns and application needs.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                </div>
                <CardTitle className="text-xl">Multi-Provider Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Integrate with all major LLM providers including OpenAI, Anthropic, Cohere, and self-hosted models.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plans that grow with your needs. Save up to 20% with annual billing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="flex flex-col relative">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For individuals and small projects</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Up to 5 models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>30-day data retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Basic cost analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>1 user seat</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button variant="outline" className="w-full text-brand-primary">Start saving today</Button>
              </CardFooter>
            </Card>

            {/* Growth Plan */}
            <Card className="flex flex-col relative border-brand-primary">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <Badge className="bg-brand-primary text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Growth</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For growing teams and businesses</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Up to 20 models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>90-day data retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced cost analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>5 user seats</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button className="w-full bg-brand-primary hover:bg-brand-dark text-white">Start saving today</Button>
              </CardFooter>
            </Card>

            {/* Scale Plan */}
            <Card className="flex flex-col relative">
              <CardHeader>
                <CardTitle className="text-xl">Scale</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$249</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For larger teams and enterprises</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Unlimited models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>12-month data retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Enterprise-grade security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>10+ user seats</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button variant="outline" className="w-full text-brand-primary">Contact sales</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => setCompareOpen(!compareOpen)}
              variant="link" 
              className="text-brand-primary"
            >
              Compare all plans {compareOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </Button>
            
            {compareOpen && (
              <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left">Feature</th>
                      <th className="p-4 text-center">Starter</th>
                      <th className="p-4 text-center">Growth</th>
                      <th className="p-4 text-center">Scale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-4 font-medium">Models Monitored</td>
                      <td className="p-4 text-center">5 models</td>
                      <td className="p-4 text-center">20 models</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Data Retention</td>
                      <td className="p-4 text-center">30 days</td>
                      <td className="p-4 text-center">90 days</td>
                      <td className="p-4 text-center">12 months</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">User Seats</td>
                      <td className="p-4 text-center">1</td>
                      <td className="p-4 text-center">5</td>
                      <td className="p-4 text-center">10+</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Analytics</td>
                      <td className="p-4 text-center">Basic</td>
                      <td className="p-4 text-center">Advanced</td>
                      <td className="p-4 text-center">Custom</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">API Access</td>
                      <td className="p-4 text-center">❌</td>
                      <td className="p-4 text-center">✅</td>
                      <td className="p-4 text-center">✅</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Support</td>
                      <td className="p-4 text-center">Email</td>
                      <td className="p-4 text-center">Priority Email</td>
                      <td className="p-4 text-center">Dedicated Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500">
              Need a custom plan? <Link href="/contact" className="text-brand-primary font-medium">Contact us</Link> for enterprise pricing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about TokenMeter
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">How does TokenMeter track my LLM usage?</AccordionTrigger>
                <AccordionContent>
                  TokenMeter offers multiple integration options: API proxying, SDK wrappers for popular languages, log parsing, or direct API integrations. Most customers use our simple SDK that wraps your existing LLM provider client with just 2 lines of code.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Does TokenMeter store my prompts or completions?</AccordionTrigger>
                <AccordionContent>
                  No, TokenMeter does not store the content of your prompts or completions. We only collect metadata like token counts, model used, and performance metrics. Your data stays private and secure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Which LLM providers are supported?</AccordionTrigger>
                <AccordionContent>
                  TokenMeter supports all major providers including OpenAI, Anthropic, Cohere, AI21, Google Gemini, and self-hosted models like Llama. We're constantly adding support for new providers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">How accurate are the cost savings estimates?</AccordionTrigger>
                <AccordionContent>
                  Our cost savings estimates are based on your actual usage patterns and the current pricing of each LLM provider. For model-switching recommendations, we also run A/B quality tests to ensure the suggested model performs adequately for your specific use case.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Do you offer a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Ready to optimize your LLM costs?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join hundreds of companies using TokenMeter to gain visibility and reduce their AI spending.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-brand-primary hover:bg-brand-dark text-white" size="lg" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>TokenMeter Product Demo</DialogTitle>
            <DialogDescription>
              See how TokenMeter helps you monitor and optimize your LLM costs
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="TokenMeter Product Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default LandingPage;
