import { UsageRaw } from '../schema/suggestionEngine';
import { detectIntent } from '../utils/intentDetector';

export interface UsageEvent {
  org_id: string;
  user_id?: string;
  provider: string;
  model: string;
  prompt_text?: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  timestamp?: Date;
  avg_latency_ms?: number;
  temperature?: number;
  top_p?: number;
  endpoint_tag?: string;
  task_intent?: 'sql' | 'translate' | 'summarize' | 'code' | 'general_chat';
}

type Provider = 'openai' | 'anthropic';
type OpenAIModel = 'gpt-4' | 'gpt-4o' | 'gpt-3.5-turbo';
type AnthropicModel = 'claude-3-opus' | 'claude-3-sonnet' | 'claude-3-haiku';
type Model = OpenAIModel | AnthropicModel;

const baseCostPerToken = {
  openai: {
    'gpt-4': 0.03,
    'gpt-4o': 0.03,
    'gpt-3.5-turbo': 0.0015,
  } as Record<OpenAIModel, number>,
  anthropic: {
    'claude-3-opus': 0.015,
    'claude-3-sonnet': 0.003,
    'claude-3-haiku': 0.00025,
  } as Record<AnthropicModel, number>,
} as const;

/**
 * Validates an incoming usage event and ensures it has all required fields
 */
export function validateUsageEvent(event: Partial<UsageEvent>): boolean {
  if (!event.org_id || !event.provider || !event.model) {
    console.warn('Missing required fields in usage event');
    return false;
  }

  if (!event.prompt_tokens || !event.total_tokens) {
    console.warn('Invalid token counts in usage event');
    return false;
  }

  return true;
}

/**
 * Processes a usage event, detecting intent if not provided and calculating costs
 */
export async function processUsageEvent(event: UsageEvent): Promise<UsageRaw> {
  const now = new Date();
  
  // Calculate cost if not provided
  if (!event.cost) {
    event.cost = await calculateCostFromUsage(event);
  }

  // Detect intent if not provided
  let task_intent = event.task_intent;
  if (!task_intent && event.prompt_text) {
    task_intent = await detectIntent(event.prompt_text, event.endpoint_tag);
  }

  const usageRecord: UsageRaw = {
    id: `${event.org_id}-${now.getTime()}`,
    org_id: event.org_id,
    timestamp: event.timestamp || now,
    provider: event.provider,
    model: event.model,
    prompt_text: event.prompt_text,
    prompt_tokens: event.prompt_tokens,
    completion_tokens: event.completion_tokens,
    total_tokens: event.total_tokens,
    cost: event.cost,
    avg_latency_ms: event.avg_latency_ms,
    temperature: event.temperature,
    top_p: event.top_p,
    endpoint_tag: event.endpoint_tag,
    task_intent
  };

  return usageRecord;
}

/**
 * Calculates the cost based on provider pricing and usage details
 */
async function calculateCostFromUsage(event: UsageEvent): Promise<number> {
  const provider = event.provider.toLowerCase() as Provider;
  let modelBase = event.model.toLowerCase();
  
  // Handle model variations
  if (modelBase.includes('gpt-4o')) modelBase = 'gpt-4o';
  else if (modelBase.includes('gpt-4')) modelBase = 'gpt-4';
  else if (modelBase.includes('gpt-3.5')) modelBase = 'gpt-3.5-turbo';
  else if (modelBase.includes('opus')) modelBase = 'claude-3-opus';
  else if (modelBase.includes('sonnet')) modelBase = 'claude-3-sonnet';
  else if (modelBase.includes('haiku')) modelBase = 'claude-3-haiku';
  
  const costPerInputToken = provider === 'openai' 
    ? (baseCostPerToken.openai[modelBase as OpenAIModel] || 0.00001)
    : (baseCostPerToken.anthropic[modelBase as AnthropicModel] || 0.00001);

  const costPerOutputToken = costPerInputToken * 2; // Output tokens typically cost more

  const cost = (event.prompt_tokens * costPerInputToken) + 
               (event.completion_tokens * costPerOutputToken);
  
  return Math.round(cost * 10000) / 10000; // Round to 4 decimal places
}

/**
 * Main function to collect and process usage events
 */
export async function collectUsage(event: UsageEvent): Promise<UsageRaw | null> {
  if (!validateUsageEvent(event)) {
    return null;
  }

  const processedEvent = await processUsageEvent(event);
  
  // Here we would persist to database
  // For now, just return the processed event
  return processedEvent;
}

/**
 * Batch process multiple usage events
 */
export async function batchProcessUsage(events: UsageEvent[]): Promise<UsageRaw[]> {
  const validEvents = events.filter(validateUsageEvent);
  const processedEvents = await Promise.all(validEvents.map(processUsageEvent));
  
  return processedEvents;
}
