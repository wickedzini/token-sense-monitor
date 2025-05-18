
# TokenMeter.AI

Know exactly what every prompt costs—and cut the waste.

## About this Project

TokenMeter.AI is a SaaS tool that helps businesses track and optimize their spending on AI models. By connecting to providers like OpenAI, Anthropic, and self-hosted LLMs, TokenMeter.AI provides real-time visibility into costs, identifies opportunities for savings, and sends alerts when spending thresholds are crossed.

## Features

- **Cost Tracking**: Monitor spending across all your AI providers in real-time
- **Smart Alerts**: Get notified about unusual spending patterns or when you approach budget limits
- **Cost Optimization**: Receive recommendations to switch to cheaper models without sacrificing quality
- **Idle Resource Detection**: Find and shut down unused GPU instances
- **Multi-provider Support**: Works with OpenAI, Anthropic, and self-hosted LLMs

## Project Structure

- `/frontend`: Next.js front-end application
- `/backend`: NestJS API and Cloud Functions
- `/infra`: Terraform infrastructure as code

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (for backend functionality)

### Local Development

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/tokenmeter-ai.git
   cd tokenmeter-ai
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Backend Setup

TokenMeter.AI uses Supabase for authentication, database, and storage. Here's how to set up the backend:

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.io) and sign up for an account
2. Create a new project
3. Note your project's URL and anonymous key

### 2. Set Environment Variables

Create a `.env` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_api_key (optional)
ANTHROPIC_API_KEY=your_anthropic_api_key (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key (optional)
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret (optional)
SLACK_CLIENT_ID=your_slack_client_id (optional)
SLACK_CLIENT_SECRET=your_slack_client_secret (optional)
```

### 3. Set Up the Database Schema

Run the database migration script to set up the TimescaleDB schema:

```sh
npm run db:migrate
```

This will create the necessary tables and extensions in your Supabase database.

### 4. Set Up Cron Jobs (For Production)

For production deployment, set up the data collection cron jobs:

Using Google Cloud Scheduler:

```sh
gcloud scheduler jobs create http tokenmeter-collector \
  --schedule="0 * * * *" \
  --uri="https://your-deployed-app.com/api/collect" \
  --http-method=POST \
  --headers="Authorization=Bearer your_secret_token"
```

Or using Terraform:

```sh
cd infra
terraform init
terraform apply
```

## Deployment

When you're ready to deploy:

```sh
npm run build
```

Then deploy the `/frontend` folder to your hosting provider of choice.

## Tech Stack

- **Frontend**: React, Next.js, shadcn/ui, Recharts
- **Backend**: NestJS, Google Cloud Functions
- **Database**: PostgreSQL with TimescaleDB extension
- **Authentication**: Supabase Auth
- **Infrastructure**: Terraform, Google Cloud Platform

## License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or any use of this material other than as intended is strictly prohibited.

## Contact

For support or questions, contact support@promptcost.io.
