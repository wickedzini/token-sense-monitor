'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mail } from "lucide-react";
import GuideModal from "@/components/guides/GuideModal";

const HelpPage = () => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [currentGuide, setCurrentGuide] = useState({
    title: "",
    content: "",
    path: ""
  });

  const handleGuideClick = (guide: string) => {
    if (guide === 'openai') {
      setCurrentGuide({
        title: "OpenAI Integration Guide",
        content: "",
        path: "/src/guides/openai.md"
      });
    } else if (guide === 'anthropic') {
      setCurrentGuide({
        title: "Anthropic Integration Guide",
        content: "",
        path: "/src/guides/anthropic.md"
      });
    } else if (guide === 'self-hosted') {
      setCurrentGuide({
        title: "Self-Hosted LLMs Integration Guide",
        content: "# Self-Hosted LLM Guide\n\nThis guide is coming soon. Please check back later.",
        path: ""
      });
    } else if (guide === 'slack') {
      setCurrentGuide({
        title: "Slack Integration Guide",
        content: "# Slack Integration Guide\n\nThis guide is coming soon. Please check back later.",
        path: ""
      });
    }
    setGuideModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">Help & FAQ</h2>
        <p className="text-gray-500 mt-1">Find answers or contact our support team</p>
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Setup Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about TokenMeter.AI features and functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How secure are my API keys?</AccordionTrigger>
                  <AccordionContent>
                    Your API keys are encrypted using AES-256 and stored in Google Secret Manager. 
                    Only key IDs are stored in the database. Our service has SOC2 compliance and 
                    follows industry best practices for key management.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can TokenMeter.AI automatically reduce my costs?</AccordionTrigger>
                  <AccordionContent>
                    TokenMeter.AI provides recommendations but doesn't automatically implement changes.
                    It identifies cost-saving opportunities like switching to more efficient models or 
                    detecting idle GPU instances. You retain full control over implementation decisions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How often is usage data refreshed?</AccordionTrigger>
                  <AccordionContent>
                    TokenMeter.AI fetches usage data hourly via API connectors to OpenAI, Anthropic, and 
                    your self-hosted LLMs. This ensures your dashboard shows near real-time information 
                    about your spending and usage patterns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Does TokenMeter.AI store my prompt data?</AccordionTrigger>
                  <AccordionContent>
                    No. TokenMeter.AI only collects aggregated usage metrics like token counts and costs. 
                    We never store or analyze the content of your prompts or completions, ensuring 
                    your data remains private and secure.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I export data for my own analysis?</AccordionTrigger>
                  <AccordionContent>
                    Yes. TokenMeter.AI provides export functionality for all your usage data in CSV or JSON 
                    formats. This allows you to perform additional analysis or integrate the data with your 
                    existing BI tools.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>OpenAI Integration</CardTitle>
                <CardDescription>
                  Connect your OpenAI account to TokenMeter.AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>
                    <span className="font-medium">Generate an API key</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Visit the OpenAI API dashboard and create a new secret key.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Add key to TokenMeter.AI</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Go to Settings → API Keys and paste your OpenAI key.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Verify connection</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      The status indicator will show "Connected" when successful.
                    </p>
                  </li>
                </ol>
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    onClick={() => handleGuideClick('openai')}
                  >
                    View Detailed Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anthropic Integration</CardTitle>
                <CardDescription>
                  Connect your Anthropic account to TokenMeter.AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>
                    <span className="font-medium">Create an Anthropic API key</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Log in to your Anthropic console and generate a new API key.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Add key to TokenMeter.AI</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Go to Settings → API Keys and paste your Anthropic API key.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Configure usage exports</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Enable usage data API access in your Anthropic account settings.
                    </p>
                  </li>
                </ol>
                <div className="mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => handleGuideClick('anthropic')}
                  >
                    View Detailed Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Self-Hosted LLMs</CardTitle>
                <CardDescription>
                  Connect Llama or other self-hosted models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>
                    <span className="font-medium">Set up Prometheus metrics</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Configure your LLM server to expose Prometheus metrics.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Add endpoint to TokenMeter.AI</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Go to Settings → API Keys and add your endpoint URL.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Add authentication</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Provide a bearer token for secure access to your metrics.
                    </p>
                  </li>
                </ol>
                <div className="mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => handleGuideClick('self-hosted')}
                  >
                    View Detailed Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slack Integration</CardTitle>
                <CardDescription>
                  Set up cost alerts via Slack
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>
                    <span className="font-medium">Create a Slack webhook</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Create an incoming webhook in your Slack workspace.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Configure in TokenMeter.AI</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Go to Settings → Notifications and add your webhook URL.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Set alert thresholds</span>
                    <p className="text-sm text-gray-500 ml-5 mt-1">
                      Configure when alerts should be triggered in Settings → Usage Limits.
                    </p>
                  </li>
                </ol>
                <div className="mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => handleGuideClick('slack')}
                  >
                    View Detailed Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Need help with TokenMeter.AI? Our team is here to assist you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Briefly describe your issue" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Please provide details about your question or issue"
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button className="gap-2">
                    <Send size={16} />
                    <span>Send Message</span>
                  </Button>
                </div>
                <div className="w-px bg-gray-200 hidden md:block" />
                <div className="md:w-72 space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <a href="mailto:support@promptcost.io" className="text-sm text-brand-primary">
                          support@promptcost.io
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Support Hours</h4>
                    <p className="text-sm text-gray-600">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Response time: Within 24 hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Priority Support</h4>
                    <p className="text-sm text-gray-600">
                      Available with Growth and Scale plans for faster response times.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        title={currentGuide.title}
        content={currentGuide.content}
        guidePath={currentGuide.path}
      />
    </div>
  );
};

export default HelpPage;
