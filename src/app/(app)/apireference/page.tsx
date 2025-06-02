'use client';
import SimpleHeader from "@/components/layout/SimpleHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ApiReference = () => {
  return (
    <div>
      <SimpleHeader title="API Reference" />
      <div className="container py-12 px-4 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">TokenMeter API Reference</h1>
          <p className="text-lg text-gray-600">
            Complete documentation for the TokenMeter REST API.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="sticky top-6">
              <h3 className="text-lg font-medium mb-4">API Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#authentication" className="text-brand-primary hover:underline">Authentication</a>
                </li>
                <li>
                  <a href="#usage" className="text-brand-primary hover:underline">Usage Data</a>
                </li>
                <li>
                  <a href="#models" className="text-brand-primary hover:underline">Models</a>
                </li>
                <li>
                  <a href="#suggestions" className="text-brand-primary hover:underline">Suggestions</a>
                </li>
                <li>
                  <a href="#alerts" className="text-brand-primary hover:underline">Alerts</a>
                </li>
                <li>
                  <a href="#webhooks" className="text-brand-primary hover:underline">Webhooks</a>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-8 mb-4">SDKs</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#python" className="text-brand-primary hover:underline">Python</a>
                </li>
                <li>
                  <a href="#javascript" className="text-brand-primary hover:underline">JavaScript/TypeScript</a>
                </li>
                <li>
                  <a href="#go" className="text-brand-primary hover:underline">Go</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <section id="authentication" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Authentication
                    <Badge variant="outline">Required</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    The TokenMeter API uses API keys to authenticate requests. You can manage your API keys from the TokenMeter dashboard.
                  </p>
                  
                  <h3>Authorization Header</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                  
                  <h3>Example Request</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`curl -X GET "https://api.tokenmeter.ai/v1/usage" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                  </pre>
                </CardContent>
              </Card>
            </section>
            
            <section id="usage" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Data</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Retrieve usage statistics for your LLM models.
                  </p>
                  
                  <h3>Get Usage Stats</h3>
                  <p><code>GET /v1/usage</code></p>
                  
                  <h4>Query Parameters</h4>
                  <ul>
                    <li><code>start_date</code> (required) - Start date in ISO 8601 format</li>
                    <li><code>end_date</code> (required) - End date in ISO 8601 format</li>
                    <li><code>model</code> (optional) - Filter by model name</li>
                    <li><code>granularity</code> (optional) - Data granularity: hourly, daily, weekly, monthly</li>
                  </ul>
                  
                  <h4>Response</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`{
  "data": [
    {
      "date": "2025-05-01",
      "model": "gpt-4",
      "requests": 1240,
      "tokens": {
        "prompt": 35600,
        "completion": 12400,
        "total": 48000
      },
      "cost": 9.60,
      "avg_latency_ms": 850
    },
    // Additional data points...
  ],
  "meta": {
    "total_cost": 245.80,
    "total_tokens": 1245000
  }
}`}</code>
                  </pre>
                </CardContent>
              </Card>
            </section>
            
            <section id="models" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Models</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Manage and retrieve information about LLM models.
                  </p>
                  
                  <h3>List Models</h3>
                  <p><code>GET /v1/models</code></p>
                  
                  <h4>Response</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`{
  "data": [
    {
      "id": "gpt-4",
      "provider": "openai",
      "cost_per_1k_tokens": {
        "prompt": 0.03,
        "completion": 0.06
      },
      "context_window": 8192
    },
    // Additional models...
  ]
}`}</code>
                  </pre>
                  
                  <h3>Get Model Details</h3>
                  <p><code>GET /v1/models/{'{model_id}'}</code></p>
                  
                  <h4>Response</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`{
  "id": "gpt-4",
  "provider": "openai",
  "cost_per_1k_tokens": {
    "prompt": 0.03,
    "completion": 0.06
  },
  "context_window": 8192,
  "average_latency_ms": 850,
  "capabilities": ["text", "code", "reasoning", "creativity"],
  "recommended_for": ["complex tasks", "reasoning", "instruction following"],
  "usage_stats": {
    "last_30_days": {
      "requests": 28500,
      "cost": 1240.80
    }
  }
}`}</code>
                  </pre>
                </CardContent>
              </Card>
            </section>
            
            <section id="suggestions" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Suggestions API</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>Endpoints for retrieving and managing cost-saving suggestions.</p>
                  
                  <h3>List Suggestions</h3>
                  <p><code>GET /v1/suggestions</code></p>
                  
                  <h4>Query Parameters</h4>
                  <ul>
                    <li><code>status</code> (optional) - Filter by status: active, implemented, dismissed</li>
                    <li><code>type</code> (optional) - Filter by suggestion type</li>
                  </ul>
                  
                  <h4>Response</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`{
  "data": [
    {
      "id": "sugg_123456",
      "type": "model_switch",
      "title": "Switch GPT-4 to GPT-3.5-Turbo for summarization tasks",
      "description": "Based on your usage patterns, we detected summarization tasks that could use GPT-3.5-Turbo without quality impact.",
      "impact": 120.50,
      "impact_type": "monthly",
      "quality_delta": "≤5%",
      "status": "active",
      "created_at": "2025-05-10T14:30:45Z"
    },
    // Additional suggestions...
  ]
}`}</code>
                  </pre>
                  
                  <h3>Update Suggestion Status</h3>
                  <p><code>PATCH /v1/suggestions/{'{suggestion_id}'}</code></p>
                  
                  <h4>Request Body</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`{
  "status": "implemented",
  "notes": "Implemented on May 15, 2025"
}`}</code>
                  </pre>
                </CardContent>
              </Card>
            </section>
            
            {/* Placeholder for additional API sections */}
            <div className="space-y-4 mt-12 text-center">
              <Badge className="bg-amber-100 text-amber-800 border-0 mb-2">Coming Soon</Badge>
              <h3 className="text-xl font-medium">OpenAPI Specification</h3>
              <p className="text-gray-600">
                Our complete API documentation with OpenAPI specification will be available soon.
                Subscribe to our developer newsletter to be notified when it's ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReference;
