
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900">
                Monitor and Optimize Your LLM Costs
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                TokenMeter helps you track, analyze, and reduce your spend across OpenAI, Anthropic, and other LLM providers—without sacrificing quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-primary hover:bg-brand-dark text-white text-lg py-6 px-8" size="lg" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" className="text-lg py-6 px-8" size="lg" onClick={() => setVideoOpen(true)}>
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required. Free 14-day trial.
              </p>
            </div>
            <div className="max-w-xl w-full">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4">
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
            <Card className="shadow-sm">
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

            <Card className="shadow-sm">
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

            <Card className="shadow-sm">
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

            <Card className="shadow-sm">
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

            <Card className="shadow-sm">
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

            <Card className="shadow-sm">
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
              Need a custom plan? <Link to="/contact" className="text-brand-primary font-medium">Contact us</Link> for enterprise pricing.
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
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Talk to Sales</Link>
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
    </>
  );
};

export default Landing;
