
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ArrowRight, ChevronDown, BellRing, Search, Clock, Gauge, BarChart3, ZapIcon, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Landing = () => {
  // State for the savings counter animation
  const [savings, setSavings] = useState(0);
  const savingsRef = useRef(null);
  const targetSavings = 4860;
  const [isVisible, setIsVisible] = useState(false);

  // For pricing toggle
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Animate the savings counter when it becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (savingsRef.current) {
      observer.observe(savingsRef.current);
    }

    return () => {
      if (savingsRef.current) {
        observer.unobserve(savingsRef.current);
      }
    };
  }, []);

  // Animation for the savings counter
  useEffect(() => {
    if (isVisible) {
      const animationDuration = 2000; // 2 seconds
      const frameRate = 20; // Update every 20ms
      const totalFrames = animationDuration / frameRate;
      const increment = targetSavings / totalFrames;
      let currentFrame = 0;

      const timer = setInterval(() => {
        currentFrame++;
        setSavings(Math.min(Math.floor(increment * currentFrame), targetSavings));

        if (currentFrame >= totalFrames) {
          clearInterval(timer);
        }
      }, frameRate);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const integrationLogos = [
    { name: "OpenAI", logo: "https://lovable.dev/opengraph-image-p98pqg.png", tooltip: "Track GPT-3.5 and GPT-4 usage costs" },
    { name: "Anthropic", logo: "https://lovable.dev/opengraph-image-p98pqg.png", tooltip: "Monitor Claude-3 Opus and Sonnet costs" },
    { name: "Vertex AI", logo: "https://lovable.dev/opengraph-image-p98pqg.png", tooltip: "Track Google Gemini and PaLM costs" },
    { name: "Ollama", logo: "https://lovable.dev/opengraph-image-p98pqg.png", tooltip: "Monitor self-hosted Llama and Mistral costs" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? "$29" : "$290",
      period: billingCycle === "monthly" ? "per month" : "per year",
      savings: billingCycle === "yearly" ? "Save $58" : null,
      description: "For startups and small teams",
      features: ["Up to 10 API keys", "30-day history", "Email alerts", "Basic recommendations"],
      cta: "Start free trial",
      popular: false
    },
    {
      name: "Growth",
      price: billingCycle === "monthly" ? "$99" : "$990",
      period: billingCycle === "monthly" ? "per month" : "per year",
      savings: billingCycle === "yearly" ? "Save $198" : null,
      description: "For growing companies",
      features: ["Up to 25 API keys", "180-day history", "Slack + Email alerts", "Advanced recommendations", "Team collaboration"],
      cta: "Start free trial",
      popular: true
    },
    {
      name: "Scale",
      price: billingCycle === "monthly" ? "$299" : "$2,990",
      period: billingCycle === "monthly" ? "per month" : "per year",
      savings: billingCycle === "yearly" ? "Save $598" : null,
      description: "For large enterprises",
      features: ["Unlimited API keys", "Full history", "Custom alerts", "Enterprise SSO", "Dedicated support", "Custom integrations"],
      cta: "Contact sales",
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-display font-bold text-lg">TokenMeter.AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
            <Link to="/signup">
              <Button>Start free trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Know exactly what <span className="text-brand-primary">every prompt</span> costs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Track, analyze, and optimize your AI model costs across OpenAI, Anthropic, and self-hosted LLMs.
            Cut waste and maximize value.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Start your free trial
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch demo
            </Button>
          </div>

          {/* Hero image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://lovable.dev/opengraph-image-p98pqg.png" 
                alt="TokenMeter Dashboard" 
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
              Pick the right plan for your needs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with a 14-day free trial, no credit card required
            </p>
            
            <div className="flex items-center justify-center mt-6 mb-8">
              <div className="border border-gray-200 rounded-full p-1 flex items-center">
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    billingCycle === "monthly" ? "bg-brand-primary text-white" : "text-gray-600"
                  }`}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    billingCycle === "yearly" ? "bg-brand-primary text-white" : "text-gray-600"
                  }`}
                  onClick={() => setBillingCycle("yearly")}
                >
                  Yearly (20% off)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`relative transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-brand-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 mt-2">
                      {plan.savings}
                    </Badge>
                  )}
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/signup" className="w-full">
                    <Button className={`w-full ${plan.popular ? 'bg-brand-primary hover:bg-brand-primary/90' : ''}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="#pricing">
              <Button variant="link" className="text-brand-primary">
                Compare all plans <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              How TokenMeter.AI works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get complete visibility into your AI costs in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Paste your API key",
                description: "Connect your OpenAI, Anthropic, or other model provider with a single API key. Takes just 10 seconds.",
                icon: <Key className="h-10 w-10 text-brand-primary" />,
                animation: "https://lovable.dev/opengraph-image-p98pqg.png"
              },
              {
                title: "Dashboard lights up",
                description: "We start collecting your usage data and within 60 minutes your dashboard shows complete spend analytics.",
                icon: <Gauge className="h-10 w-10 text-brand-primary" />,
                animation: "https://lovable.dev/opengraph-image-p98pqg.png"
              },
              {
                title: "Get smart suggestions",
                description: "Our AI analyzes your usage patterns and suggests optimization opportunities, potentially saving up to 40%.",
                icon: <Bot className="h-10 w-10 text-brand-primary" />,
                animation: "https://lovable.dev/opengraph-image-p98pqg.png"
              },
              {
                title: "Set up alerts",
                description: "Configure Slack, email or webhook alerts to get notified when costs spike or thresholds are exceeded.",
                icon: <BellRing className="h-10 w-10 text-brand-primary" />,
                animation: "https://lovable.dev/opengraph-image-p98pqg.png"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 p-4 rounded-full bg-brand-primary/10">
                  {step.icon}
                </div>
                <div className="relative h-40 w-full mb-6 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img 
                    src={step.animation} 
                    alt={step.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Works with all major AI providers
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {integrationLogos.map((integration, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div className="transition-all hover:scale-110 duration-300">
                    <div className="bg-white p-4 w-24 h-24 rounded-lg flex items-center justify-center shadow-sm">
                      <img src={integration.logo} alt={integration.name} className="max-h-12" />
                    </div>
                    <p className="text-xs mt-2 text-center font-medium">{integration.name}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{integration.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Counter */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand-primary/90 to-brand-secondary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Join companies saving millions on AI costs
          </h2>
          
          <div ref={savingsRef} className="inline-flex flex-col items-center mb-8">
            <span className="text-6xl md:text-8xl font-display font-bold tabular-nums mb-2">
              ${savings.toLocaleString()}
            </span>
            <span className="text-xl opacity-90">saved this month by our customers</span>
          </div>

          <Link to="/signup">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Start saving today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why TokenMeter.AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gain complete visibility into your AI costs and make data-driven decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete cost visibility",
                description: "See exactly what every API call costs across all your models in real-time."
              },
              {
                title: "Smart alerts",
                description: "Get notified when costs spike or when usage patterns change unexpectedly."
              },
              {
                title: "Safe model switching",
                description: "Our A/B quality tests help you switch to cheaper models without sacrificing quality."
              },
              {
                title: "Detect idle resources",
                description: "Identify and shut down idle GPUs to save on infrastructure costs."
              },
              {
                title: "Token optimization",
                description: "Identify overly verbose prompts and optimize context lengths."
              },
              {
                title: "Multi-provider support",
                description: "Track costs across OpenAI, Anthropic, and your self-hosted models."
              }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl text-gray-500 mb-10">
            Trusted by innovative teams
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Acme Inc", "TechCorp", "BuildAI", "Innovate Labs", "PromptPro"].map((company, i) => (
              <div key={i} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                <div className="bg-gray-100 px-6 py-3 rounded-md">
                  <p className="font-bold">{company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free Trial",
                price: "$0",
                period: "for 30 days",
                description: "Perfect for evaluating TokenMeter",
                features: [
                  "3 API keys",
                  "30-day history",
                  "1 Slack alert",
                  "Basic recommendations"
                ],
                cta: "Start free trial",
                popular: false
              },
              {
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
                cta: "Get started",
                popular: true
              },
              {
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
                cta: "Contact sales",
                popular: false
              }
            ].map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-brand-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/signup" className="w-full">
                    <Button className={`w-full ${plan.popular ? 'bg-brand-primary hover:bg-brand-primary/90' : ''}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How secure are my API keys with TokenMeter.AI?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  Your API keys are encrypted using AES-256 and stored in Google Secret Manager. Only key IDs are stored in our database.
                </p>
                <p>Our service has SOC2 compliance and follows industry best practices for key management.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can TokenMeter.AI automatically reduce my costs?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  TokenMeter.AI provides recommendations but doesn't automatically implement changes. It identifies cost-saving opportunities like switching to more efficient models or detecting idle GPU instances.
                </p>
                <p>You retain full control over implementation decisions.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How often is usage data refreshed?</AccordionTrigger>
              <AccordionContent>
                TokenMeter.AI fetches usage data hourly via API connectors to OpenAI, Anthropic, and your self-hosted LLMs. This ensures your dashboard shows near real-time information about your spending and usage patterns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Does TokenMeter.AI store my prompt data?</AccordionTrigger>
              <AccordionContent>
                <p>No. TokenMeter.AI only collects aggregated usage metrics like token counts and costs. We never store or analyze the content of your prompts or completions, ensuring your data remains private and secure.</p>
                <Alert className="mt-3 bg-brand-primary/5 border-brand-primary/30">
                  <AlertDescription>
                    Your data privacy is our top priority. We only track metrics, never content.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I export data for my own analysis?</AccordionTrigger>
              <AccordionContent>
                Yes. TokenMeter.AI provides export functionality for all your usage data in CSV or JSON formats. This allows you to perform additional analysis or integrate the data with your existing BI tools.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand-primary/90 to-brand-secondary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Start optimizing your AI costs today
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join hundreds of companies using TokenMeter.AI to get visibility into their LLM spending and optimize costs.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="font-display font-bold text-lg text-white">TokenMeter.AI</span>
              </div>
              <p className="text-sm">
                Know exactly what every prompt costs—and cut the waste.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-6 text-sm">
            <p>© {new Date().getFullYear()} TokenMeter.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Key = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export default Landing;
