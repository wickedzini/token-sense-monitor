
# TokenMeter.AI

TokenMeter is an analytics and optimization platform designed to help companies understand, optimize, and reduce their LLM (Large Language Model) spending without sacrificing quality.

## Features

- **Real-time Monitoring**: Track your LLM API usage and costs across providers
- **Cost Optimization**: Receive AI-generated suggestions to reduce costs
- **Quality Comparison**: A/B test different models to ensure quality is maintained
- **Usage Analytics**: Understand your spending patterns and identify opportunities for savings

## Getting Started

### Prerequisites

- Node.js 18+
- NPM or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tokenmeter.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables

TokenMeter requires the following environment variables:

```
# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...

# Database Connection
DB_CONNECTION_STRING=postgresql://...

# Auth
JWT_SECRET=your_jwt_secret
AUTH_ENABLED=true

# Features
ENABLE_AB_TESTING=true
SUGGESTION_ENGINE_VERSION=2
```

## API Endpoints

### Usage Tracking

- `GET /api/usage` - Get usage statistics
- `GET /api/usage/models` - Get model-specific usage
- `POST /api/usage/track` - Manually track usage

### Cost Optimization

- `GET /api/suggestions` - Get cost-saving suggestions
- `PUT /api/suggestions/:id/implement` - Mark a suggestion as implemented
- `DELETE /api/suggestions/:id` - Dismiss a suggestion

### A/B Testing

- `POST /api/ab-test` - Run an A/B test between two models

Example request:
```json
{
  "org_id": "org_123",
  "endpoint_tag": "summarize",
  "current_model": "gpt-4o",
  "candidate_model": "gpt-3.5-turbo-16k",
  "sample_size": 20
}
```

Example response:
```json
{
  "status": "success",
  "data": {
    "quality_delta_pct": 3.2,
    "avg_latency_delta_ms": -450,
    "success": true,
    "sample_count": 20
  }
}
```

## Smart Suggestion Engine v2

The Smart Suggestion Engine analyzes your LLM usage patterns and provides workload-aware cost-saving suggestions.

### Extended Usage Data

The engine uses these additional fields in usage tracking:
- `avg_latency_ms`: Average response time
- `temperature`: Model temperature setting
- `top_p`: Top P setting
- `endpoint_tag`: Purpose tag (e.g., "translate", "summarize")
- `reply_tokens_p95`: 95th percentile of response token count
- `task_intent`: Detected intent (sql, translate, summarize, code, chat)

### Rules

The engine implements specific optimization rules:

| ID | Condition | Recommendation |
|----|-----------|----------------|
| R5 | OpenAI, model=gpt-4*, intent≠sql, context_p50<4K | Switch to GPT-3.5-Turbo-16K |
| R6 | Anthropic Opus, context_p50>8K | Trim context / use embeddings |
| R7 | Llama3 GPU idle > 30 min | Auto-stop GPU |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
