'use client';

import SimpleHeader from "@/components/layout/SimpleHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentationPage = () => {
  return (
    <div>
      <SimpleHeader title="Documentation" />
      <div className="container py-12 px-4 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">TokenMeter Documentation</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about integrating, monitoring, and optimizing your LLM costs.
          </p>
        </div>
        
        <Tabs defaultValue="quickstart" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="quickstart">Quickstart</TabsTrigger>
            <TabsTrigger value="setup">Setup Guides</TabsTrigger>
            <TabsTrigger value="cron">Cron Jobs</TabsTrigger>
            <TabsTrigger value="collectors">Data Collectors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quickstart">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with TokenMeter</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Welcome to TokenMeter</h3>
                <p>
                  TokenMeter helps you monitor, analyze, and optimize your LLM costs across various providers. 
                  Follow this guide to get started in minutes.
                </p>
                
                <h3>Step 1: Create an account</h3>
                <p>
                  Sign up for TokenMeter with your work email or SSO. Each account comes with a free trial.
                </p>
                
                <h3>Step 2: Connect your LLM providers</h3>
                <p>
                  Navigate to Settings → Integrations and connect your OpenAI, Anthropic, or other LLM provider accounts.
                  We'll need read-only API keys to start collecting usage data.
                </p>
                
                <h3>Step 3: Start monitoring</h3>
                <p>
                  Once connected, TokenMeter will automatically start collecting and analyzing your API usage.
                  You'll see data appearing on your dashboard within minutes.
                </p>
                
                <h3>Step 4: Set up alerts</h3>
                <p>
                  Set budget thresholds and alerts to get notified when your spending exceeds expected limits.
                </p>
                
                <h3>Need help?</h3>
                <p>
                  Check our extensive documentation or contact support for personalized assistance.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="setup">
            <Card>
              <CardHeader>
                <CardTitle>Integration Setup Guides</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>OpenAI Integration</h3>
                <p>
                  To connect your OpenAI account, you'll need to create an API key with usage permissions.
                </p>
                <ol>
                  <li>Log in to your OpenAI account and navigate to API keys</li>
                  <li>Create a new API key with read-only permissions</li>
                  <li>Copy the key and enter it in TokenMeter → Settings → Integrations → OpenAI</li>
                </ol>
                
                <h3>Anthropic Integration</h3>
                <p>
                  Connect your Anthropic account for Claude model monitoring:
                </p>
                <ol>
                  <li>Generate an Anthropic API key from your Anthropic console</li>
                  <li>Enter the API key in TokenMeter → Settings → Integrations → Anthropic</li>
                </ol>
                
                <h3>Custom Integration</h3>
                <p>
                  For custom integrations or non-standard LLM providers, we offer a flexible REST API:
                </p>
                <ol>
                  <li>Generate a TokenMeter API key from Settings → API Access</li>
                  <li>Use our SDKs or REST API to send usage data</li>
                </ol>
                
                <h3>Setting up SSO (Enterprise only)</h3>
                <p>
                  Enterprise customers can configure Single Sign-On for team access:
                </p>
                <ol>
                  <li>Contact your account representative to enable SSO</li>
                  <li>Configure your identity provider (Okta, Google Workspace, etc.)</li>
                  <li>Set up role-based access control for your team</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cron">
            <Card>
              <CardHeader>
                <CardTitle>Scheduling and Cron Jobs</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Automated Report Generation</h3>
                <p>
                  Set up scheduled reports to be delivered to your inbox:
                </p>
                <ol>
                  <li>Navigate to Reports → Schedule</li>
                  <li>Configure report type and frequency (daily, weekly, monthly)</li>
                  <li>Add recipients and customize the report format</li>
                </ol>
                
                <h3>Usage Data Collection</h3>
                <p>
                  By default, TokenMeter collects usage data every 15 minutes. You can adjust this frequency:
                </p>
                <ol>
                  <li>Go to Settings → Data Collection</li>
                  <li>Adjust the collection frequency (5 min to 24 hours)</li>
                  <li>Save your settings</li>
                </ol>
                
                <h3>Alert Monitoring Schedule</h3>
                <p>
                  Configure when and how often alerts are evaluated:
                </p>
                <ol>
                  <li>Go to Alerts → Settings</li>
                  <li>Set evaluation frequency and quiet hours</li>
                  <li>Configure notification channels (email, Slack, webhook)</li>
                </ol>
                
                <h3>Data Retention Policies</h3>
                <p>
                  Manage how long TokenMeter keeps your historical data:
                </p>
                <ol>
                  <li>Navigate to Settings → Data Management</li>
                  <li>Configure retention periods for different data types</li>
                  <li>Set up optional data export to your own storage</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="collectors">
            <Card>
              <CardHeader>
                <CardTitle>Data Collectors</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>How Data Collection Works</h3>
                <p>
                  TokenMeter uses secure, read-only connections to your LLM providers to collect usage data:
                </p>
                <ul>
                  <li>API usage statistics (calls, tokens, latency)</li>
                  <li>Cost information per model and feature</li>
                  <li>Error rates and performance metrics</li>
                </ul>
                
                <h3>OpenAI Collector</h3>
                <p>
                  The OpenAI collector accesses the following endpoints:
                </p>
                <ul>
                  <li><code>/v1/usage</code> - For aggregated usage statistics</li>
                  <li><code>/v1/dashboard/billing/usage</code> - For cost data</li>
                  <li>No access to prompt/completion content</li>
                </ul>
                
                <h3>Anthropic Collector</h3>
                <p>
                  The Anthropic collector accesses:
                </p>
                <ul>
                  <li><code>/v1/usage_statistics</code> - For usage metrics</li>
                  <li><code>/v1/billing</code> - For cost information</li>
                </ul>
                
                <h3>Custom SDK Integration</h3>
                <p>
                  For applications using our SDK, you can configure privacy settings:
                </p>
                <ul>
                  <li>Prompt/completion logging (disabled by default)</li>
                  <li>Metadata collection (enabled by default)</li>
                  <li>PII scrubbing options</li>
                </ul>
                
                <h3>Self-hosted Collectors (Enterprise)</h3>
                <p>
                  Enterprise customers can deploy collectors in their own infrastructure:
                </p>
                <ul>
                  <li>Docker images for all major collectors</li>
                  <li>Kubernetes deployment manifests</li>
                  <li>Secure token-based communication with TokenMeter cloud</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-16">
          <Card className="w-full max-w-2xl bg-gray-50">
            <CardContent className="p-6 flex gap-4 items-center">
              <div>
                <h3 className="text-lg font-medium mb-2">Need more help?</h3>
                <p className="text-gray-600">
                  Our support team is available to assist you with any questions or issues.
                </p>
              </div>
              <div className="ml-auto">
                <a href="/contact" className="bg-brand-primary hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm font-medium">
                  Contact Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
