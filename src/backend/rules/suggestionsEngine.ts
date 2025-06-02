import { UsageRaw, SuggestionRecord } from '../schema/suggestionEngine';

export interface Rule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: (usage: UsageRaw) => boolean;
  suggestion: (usage: UsageRaw) => Partial<SuggestionRecord>;
}

export interface RuleResult {
  ruleId: string;
  triggered: boolean;
  suggestion?: Partial<SuggestionRecord>;
}

/**
 * Predefined rules for the Smart Suggestion Engine v2
 */
export const predefinedRules: Rule[] = [
  // Rule R5: Switch from GPT-4 to GPT-3.5-Turbo for non-SQL tasks with small context
  {
    id: 'R5',
    name: 'Use cheaper model for simple tasks',
    description: 'Switch from GPT-4 to GPT-3.5-Turbo for non-SQL tasks with small context',
    enabled: true,
    condition: (usage: UsageRaw) => {
      return usage.provider.toLowerCase() === 'openai' && 
             usage.model.toLowerCase().includes('gpt-4') &&
             usage.task_intent !== 'sql' &&
             usage.prompt_tokens < 4000;
    },
    suggestion: (usage: UsageRaw) => {
      const currentCost = usage.cost;
      const estimatedNewCost = currentCost * 0.35; // ~65% cost reduction
      const savingsPerCall = currentCost - estimatedNewCost;
      
      // Estimate monthly impact based on this single call
      const estimatedMonthlyCalls = 30; // Assume similar usage pattern daily for a month
      const monthlyImpact = savingsPerCall * estimatedMonthlyCalls;
      
      return {
        type: 'model_switch',
        title: 'Switch from GPT-4 to GPT-3.5 Turbo',
        description: 'A/B test shows similar quality with 70% cost reduction for simple tasks.',
        impact: monthlyImpact,
        impact_type: 'monthly',
        quality_delta_pct: 5,
        details: {
          before: {
            model: usage.model,
            costPerCall: usage.cost.toFixed(4),
            contextLength: `${usage.prompt_tokens} tokens`
          },
          after: {
            model: 'gpt-3.5-turbo',
            costPerCall: estimatedNewCost.toFixed(4),
            contextLength: `${usage.prompt_tokens} tokens`
          },
          snippet: {
            language: 'javascript',
            code: `// Current implementation
const response = await openai.chat.completions.create({
  model: "${usage.model}",
  messages: messages,
  temperature: ${usage.temperature || 0.7}
});

// Proposed change
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: messages,
  temperature: ${usage.temperature || 0.7}
});`
          }
        }
      };
    }
  },
  
  // Rule R6: Trim context length for Anthropic Opus
  {
    id: 'R6',
    name: 'Optimize context length for Anthropic Opus',
    description: 'Trim context window or use embeddings for large contexts',
    enabled: true,
    condition: (usage: UsageRaw) => {
      return usage.provider.toLowerCase() === 'anthropic' && 
             usage.model.toLowerCase().includes('opus') &&
             usage.prompt_tokens > 8000;
    },
    suggestion: (usage: UsageRaw) => {
      const currentCost = usage.cost;
      const optimizedTokens = usage.prompt_tokens * 0.7; // 30% reduction target
      const estimatedNewCost = currentCost * 0.7; // ~30% cost reduction
      const savingsPerCall = currentCost - estimatedNewCost;
      
      // Estimate monthly impact
      const estimatedMonthlyCalls = 20; // Assume similar usage pattern for a month
      const monthlyImpact = savingsPerCall * estimatedMonthlyCalls;
      
      return {
        type: 'context_length',
        title: 'Optimize prompt context length',
        description: 'Your prompts average high token usage but could be trimmed without quality loss.',
        impact: monthlyImpact,
        impact_type: 'monthly',
        quality_delta_pct: 2,
        details: {
          before: {
            averageContextLength: `${usage.prompt_tokens} tokens`,
            usableContext: `${Math.floor(usage.prompt_tokens * 0.7)} tokens (70%)`,
            modelLimit: "100,000 tokens",
            wastedTokens: `${Math.floor(usage.prompt_tokens * 0.3)} tokens`
          },
          after: {
            recommendedLength: `${Math.floor(optimizedTokens)} tokens`,
            savingsPerCall: `${Math.floor(usage.prompt_tokens - optimizedTokens)} tokens`,
            implementation: "Context window trimming"
          },
          snippet: {
            language: 'javascript',
            code: `// Before: Sending full context
const response = await anthropic.messages.create({
  model: "${usage.model}",
  messages: fullContextMessages, // ${usage.prompt_tokens} tokens on average
  max_tokens: 1024
});

// After: Using more efficient context
function trimContext(messages, maxTokens = ${Math.floor(optimizedTokens)}) {
  // Keep system prompt and last N messages
  const systemPrompt = messages.find(m => m.role === 'system');
  const recentMessages = messages.filter(m => m.role !== 'system')
    .slice(-10); // Keep last 10 messages
  
  return [systemPrompt, ...recentMessages];
}

const response = await anthropic.messages.create({
  model: "${usage.model}",
  messages: trimContext(fullContextMessages),
  max_tokens: 1024
});`
          }
        }
      };
    }
  },
  
  // Rule R7: Auto-stop idle GPU for Llama3
  {
    id: 'R7',
    name: 'Auto-stop idle Llama3 GPU',
    description: 'Automatically shut down GPU instances that are idle for more than 30 minutes',
    enabled: true,
    condition: (usage: UsageRaw) => {
      // This condition would typically be evaluated differently,
      // checking a separate resource monitoring system
      // For demo purposes, we'll assume we can detect this from usage patterns
      return usage.provider.toLowerCase() === 'meta' && 
             usage.model.toLowerCase().includes('llama3') &&
             (usage?.endpoint_tag?.includes('development') ?? false);
    },
    suggestion: (usage: UsageRaw) => {
      // GPU instance cost assumptions
      const hourlyInstanceCost = 0.09; // $0.09 per hour for GPU instance
      const idleHours = 26; // Assume 26 hours of idle time detected
      const dailyWaste = hourlyInstanceCost * 24; // Daily cost if left running
      
      return {
        type: 'idle_resource',
        title: 'Idle GPU instance detected',
        description: 'Your development instance has been idle for 26 hours.',
        impact: dailyWaste,
        impact_type: 'daily',
        quality_delta_pct: 0,
        details: {
          before: {
            instanceType: "g4dn.xlarge",
            region: "us-west-2",
            hourlyRate: `$${hourlyInstanceCost}`,
            idleTime: `${idleHours} hours`
          },
          after: {
            action: "Shutdown instance",
            potentialAction: "Auto-scaling group with min=0"
          },
          script: `# AWS CLI command to stop the instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# To enable auto-scaling (recommended)
aws autoscaling create-auto-scaling-group --auto-scaling-group-name dev-llm-asg \\
  --min-size 0 --max-size 2 --desired-capacity 1 \\
  --launch-template LaunchTemplateId=lt-0123456789abcdef0,Version='$Latest'`
        }
      };
    }
  }
];

/**
 * Smart Suggestion Engine class
 */
export class SmartSuggestionEngine {
  private rules: Rule[] = [];
  
  constructor(customRules?: Rule[]) {
    // Start with predefined rules
    this.rules = [...predefinedRules];
    
    // Add any custom rules
    if (customRules) {
      this.rules.push(...customRules);
    }
  }
  
  /**
   * Add a new rule to the engine
   */
  addRule(rule: Rule): void {
    this.rules.push(rule);
  }
  
  /**
   * Process a single usage record against all rules
   */
  async processUsage(usage: UsageRaw, orgId: string): Promise<SuggestionRecord[]> {
    const results: SuggestionRecord[] = [];
    const enabledRules = this.rules.filter(rule => rule.enabled);
    
    for (const rule of enabledRules) {
      try {
        if (rule.condition(usage)) {
          const suggestionData = rule.suggestion(usage);
          
          // Create a complete suggestion record
          const suggestion: SuggestionRecord = {
            id: Math.floor(Math.random() * 1000000), // Would be replaced with DB-generated ID
            org_id: orgId,
            created_at: new Date(),
            status: 'active',
            ...suggestionData
          } as SuggestionRecord;
          
          results.push(suggestion);
        }
      } catch (error) {
        console.error(`Error processing rule ${rule.id}:`, error);
      }
    }
    
    return results;
  }
  
  /**
   * Process multiple usage records in batch
   */
  async batchProcess(records: UsageRaw[]): Promise<SuggestionRecord[]> {
    const allSuggestions: SuggestionRecord[] = [];
    
    for (const record of records) {
      const suggestions = await this.processUsage(record, record.org_id);
      allSuggestions.push(...suggestions);
    }
    
    return allSuggestions;
  }
  
  /**
   * Get all available rules
   */
  getRules(): Rule[] {
    return this.rules;
  }
  
  /**
   * Enable or disable a rule by ID
   */
  setRuleStatus(ruleId: string, enabled: boolean): boolean {
    const ruleIndex = this.rules.findIndex(r => r.id === ruleId);
    if (ruleIndex >= 0) {
      this.rules[ruleIndex].enabled = enabled;
      return true;
    }
    return false;
  }
}

/**
 * Factory function to create the default suggestion engine
 */
export function createSuggestionEngine(): SmartSuggestionEngine {
  return new SmartSuggestionEngine();
}
