import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { UsageRaw } from '../schema/suggestionEngine';

export interface LLMProviderConfig {
  openai?: {
    apiKey: string;
    organization?: string;
  };
  anthropic?: {
    apiKey: string;
  };
}

export class LLMProviderService {
  private openai?: OpenAI;
  private anthropic?: Anthropic;
  
  constructor(config: LLMProviderConfig) {
    if (config.openai) {
      this.openai = new OpenAI({
        apiKey: config.openai.apiKey,
        organization: config.openai.organization
      });
    }
    
    if (config.anthropic) {
      this.anthropic = new Anthropic({
        apiKey: config.anthropic.apiKey
      });
    }
  }
  
  async generateCompletion(
    provider: string,
    model: string,
    prompt: string,
    options: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
    } = {}
  ): Promise<{
    completion: string;
    usage: UsageRaw;
  }> {
    const startTime = Date.now();
    
    if (provider.toLowerCase() === 'openai' && this.openai) {
      const response = await this.openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        top_p: options.topP
      });
      
      const endTime = Date.now();
      
      return {
        completion: response.choices[0].message.content || '',
        usage: {
          id: response.id,
          org_id: 'temp', // Will be set by the caller
          timestamp: new Date(),
          provider: 'openai',
          model,
          prompt_text: prompt,
          prompt_tokens: response.usage?.prompt_tokens || 0,
          completion_tokens: response.usage?.completion_tokens || 0,
          total_tokens: response.usage?.total_tokens || 0,
          cost: this.calculateOpenAICost(model, response.usage),
          avg_latency_ms: endTime - startTime,
          temperature: options.temperature,
          top_p: options.topP
        }
      };
    }
    
    if (provider.toLowerCase() === 'anthropic' && this.anthropic) {
      const response = await this.anthropic.messages.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature,
        max_tokens: options.maxTokens || 4096,
        top_p: options.topP
      });
      
      const endTime = Date.now();
      
      const textBlock = response.content.find(block => block.type === 'text');
      
      if (!textBlock) {
        throw new Error('No text content received from Anthropic API');
      }
      
      return {
        completion: textBlock.text,
        usage: {
          id: response.id,
          org_id: 'temp', // Will be set by the caller
          timestamp: new Date(),
          provider: 'anthropic',
          model,
          prompt_text: prompt,
          prompt_tokens: response.usage.input_tokens,
          completion_tokens: response.usage.output_tokens,
          total_tokens: response.usage.input_tokens + response.usage.output_tokens,
          cost: this.calculateAnthropicCost(model, response.usage),
          avg_latency_ms: endTime - startTime,
          temperature: options.temperature,
          top_p: options.topP
        }
      };
    }
    
    throw new Error(`Unsupported provider: ${provider}`);
  }
  
  private calculateOpenAICost(model: string, usage: any): number {
    // OpenAI pricing per 1K tokens
    const pricing = {
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-4-32k': { input: 0.06, output: 0.12 },
      'gpt-3.5-turbo': { input: 0.0015, output: 0.002 }
    };
    
    const modelPricing = pricing[model as keyof typeof pricing] || pricing['gpt-3.5-turbo'];
    return (
      (usage.prompt_tokens * modelPricing.input) +
      (usage.completion_tokens * modelPricing.output)
    ) / 1000;
  }
  
  private calculateAnthropicCost(model: string, usage: any): number {
    // Anthropic pricing per 1K tokens
    const pricing = {
      'claude-3-opus': { input: 0.015, output: 0.075 },
      'claude-3-sonnet': { input: 0.003, output: 0.015 },
      'claude-3-haiku': { input: 0.00025, output: 0.00125 }
    };
    
    const modelPricing = pricing[model as keyof typeof pricing] || pricing['claude-3-sonnet'];
    return (
      (usage.input_tokens * modelPricing.input) +
      (usage.output_tokens * modelPricing.output)
    ) / 1000;
  }
} 