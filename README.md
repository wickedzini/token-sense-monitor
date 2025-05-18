
# TokenMeter.AI

A cost analytics platform for AI API usage tracking.

## Features

- **Dashboard**: View your AI API spend at a glance
- **Models**: Compare usage across different models and providers
- **Alerts**: Set up notifications for cost thresholds
- **Analytics**: Deep-dive into spending patterns
- **Settings**: Configure API connections and preferences

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:8080` to see the app.

## Backend Setup

TokenMeter.AI uses [Supabase](https://supabase.com) for authentication, database, and storage.

### Step 1: Create a Supabase Project

1. Sign up for a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Once your project is created, go to Settings > API to find your project URL and anon key

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Set Up the Database Schema

Run the migration script to set up the TimescaleDB schema:

```bash
npm run db:migrate
```

### Step 4: Configure Cron Jobs

To automatically fetch API usage data, set up a cron job:

#### Using Google Cloud Scheduler:

```bash
gcloud scheduler jobs create http tokenmeter-daily-sync \
  --schedule="0 0 * * *" \
  --uri="https://your-app-url.com/api/sync" \
  --http-method=POST \
  --headers="Authorization=Bearer your-secret-key"
```

#### Using Terraform:

```hcl
resource "google_cloud_scheduler_job" "tokenmeter_daily_sync" {
  name        = "tokenmeter-daily-sync"
  description = "Daily sync of API usage data"
  schedule    = "0 0 * * *"
  
  http_target {
    uri         = "https://your-app-url.com/api/sync"
    http_method = "POST"
    headers     = {
      "Authorization" = "Bearer your-secret-key"
    }
  }
}
```

## Environment Variables

For preview deployments, ensure these environment variables are set:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_OPENAI_API_KEY`: OpenAI API key for testing (optional)
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key for payments
- `VITE_SLACK_CLIENT_ID`: Slack client ID for integration

## License

[MIT](LICENSE)
