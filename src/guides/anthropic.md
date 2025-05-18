
# Anthropic Integration Guide

This guide will walk you through the process of connecting your Anthropic account to TokenMeter.AI, allowing you to track and analyze your Claude API usage and costs.

## Prerequisites

- An active Anthropic account with API access
- Admin privileges for your Anthropic organization (if connecting an organization account)

## Step 1: Generate an Anthropic API Key

1. Log in to your Anthropic account at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to the "API Keys" section in your account settings
3. Click "Create new API key"
4. Give your key a name (e.g., "TokenMeter Integration")
5. Copy the generated API key (it will only be shown once)

## Step 2: Add API Key to TokenMeter.AI

1. Navigate to the Settings page in TokenMeter.AI
2. Go to the "API Keys" section
3. Click "Add Anthropic API Key"
4. Paste your Anthropic API key in the provided field
5. Click "Connect"

Your connection status should now show as "Connected" with a green indicator.

## Step 3: Configure Usage Data Access

For TokenMeter.AI to accurately track your Anthropic usage, we need access to the usage data API:

1. By default, Anthropic API keys can access usage data for their own requests
2. For organization-wide visibility, make sure the API key has "Usage" read permissions

## Step 4: Verify Connection

After connecting your API key:

1. Navigate to the Dashboard in TokenMeter.AI
2. You should start seeing data appear within 1-2 hours as our collectors retrieve your usage information
3. Historical data (up to 30 days for free accounts, 180+ days for paid plans) will be imported automatically

## Understanding Anthropic Pricing

Anthropic's Claude models are priced differently from OpenAI models:

- Claude is priced per 1,000 tokens
- Different Claude models have different input and output token prices
- TokenMeter.AI automatically accounts for these differences in tracking costs

## Usage Limits and Recommendations

- We recommend creating a dedicated API key specifically for TokenMeter.AI
- Rotate your API keys every 90 days for security best practices
- You can connect multiple Anthropic accounts or organizations to track all your usage in one place

## Anthropic-Specific Features

TokenMeter.AI offers several features specific to Anthropic models:

- Automatic tracking of different Claude model versions and their costs
- Comparative cost analysis between Claude and other provider models
- Specific optimization recommendations for Claude prompts

## Troubleshooting

If you're not seeing data after connecting your API key:

- Verify that your API key has the correct permissions
- Check that your API key is active and not expired
- Ensure you haven't hit rate limits on Anthropic's API
- Contact support@promptcost.io if issues persist

## Security Information

TokenMeter.AI takes the security of your API keys seriously:

- Your API key is encrypted using AES-256 encryption
- Only encrypted key identifiers are stored in our database
- The actual keys are stored in Google Secret Manager
- Your prompt contents are never stored or analyzed, only aggregate token usage metrics

For more information on our security practices, please visit our Security page.
