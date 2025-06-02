
# OpenAI Integration Guide

This guide will walk you through the process of connecting your OpenAI account to TokenMeter.AI, allowing you to track and analyze your OpenAI API usage and costs.

## Prerequisites

- An active OpenAI account with API access
- Admin privileges for your OpenAI organization (if connecting an organization account)

## Step 1: Generate an OpenAI API Key

1. Log in to your OpenAI account at [platform.openai.com](https://platform.openai.com)
2. Navigate to the API section
3. Click on "API keys" in the sidebar
4. Click "Create new secret key"
5. Give your key a name (e.g., "TokenMeter Integration")
6. Copy the generated API key (it will only be shown once)

## Step 2: Add API Key to TokenMeter.AI

1. Navigate to the Settings page in TokenMeter.AI
2. Go to the "API Keys" section
3. Click "Add OpenAI API Key"
4. Paste your OpenAI API key in the provided field
5. Click "Connect"

Your connection status should now show as "Connected" with a green indicator.

## Step 3: Configure Usage Data Access

For TokenMeter.AI to accurately track your OpenAI usage, we need access to the billing and usage data:

1. Ensure your OpenAI API key has permissions to access usage data
2. For organization accounts, make sure the key has the "Usage" read permission

## Step 4: Verify Connection

After connecting your API key:

1. Navigate to the Dashboard in TokenMeter.AI
2. You should start seeing data appear within 1-2 hours as our collectors retrieve your usage information
3. Historical data (up to 30 days for free accounts, 180+ days for paid plans) will be imported automatically

## Usage Limits and Recommendations

- We recommend creating a dedicated API key specifically for TokenMeter.AI
- Rotate your API keys every 90 days for security best practices
- You can connect multiple OpenAI accounts or organizations to track all your usage in one place

## Troubleshooting

If you're not seeing data after connecting your API key:

- Verify that your API key has the correct permissions
- Check that your API key is active and not expired
- Ensure you haven't hit rate limits on OpenAI's API
- Contact support@promptcost.io if issues persist

## Security Information

TokenMeter.AI takes the security of your API keys seriously:

- Your API key is encrypted using AES-256 encryption
- Only encrypted key identifiers are stored in our database
- The actual keys are stored in Google Secret Manager
- Your prompt contents are never stored or analyzed, only aggregate token usage metrics

For more information on our security practices, please visit our Security page.
