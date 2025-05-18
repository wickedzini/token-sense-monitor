
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
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
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://lovable.dev/opengraph-image-p98pqg.png" 
                alt="TokenMeter Dashboard" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
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
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
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
      <section className="py-16 md:py-24 bg-gray-50">
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
                Your API keys are encrypted using AES-256 and stored in Google Secret Manager. Only key IDs are stored in our database. Our service has SOC2 compliance and follows industry best practices for key management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can TokenMeter.AI automatically reduce my costs?</AccordionTrigger>
              <AccordionContent>
                TokenMeter.AI provides recommendations but doesn't automatically implement changes. It identifies cost-saving opportunities like switching to more efficient models or detecting idle GPU instances. You retain full control over implementation decisions.
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
                No. TokenMeter.AI only collects aggregated usage metrics like token counts and costs. We never store or analyze the content of your prompts or completions, ensuring your data remains private and secure.
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

export default Landing;
