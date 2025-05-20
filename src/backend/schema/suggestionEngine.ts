
/**
 * Database schema definitions for the Smart Suggestion Engine v2
 */

export interface UsageRaw {
  id: string;
  org_id: string;
  timestamp: Date;
  provider: string;
  model: string;
  prompt_text?: string; // Optional as we may not store actual prompts
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  
  // New fields for Smart Suggestion Engine v2
  avg_latency_ms?: number;
  temperature?: number;
  top_p?: number;
  endpoint_tag?: string;
  reply_tokens_p95?: number;
  task_intent?: 'sql' | 'translate' | 'summarize' | 'code' | 'general_chat';
}

export interface UsageDaily {
  date: Date;
  provider: string;
  model: string;
  endpoint_tag?: string;
  task_intent?: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  avg_latency_ms?: number;
  context_p50?: number; // 50th percentile of prompt tokens
  reply_tokens_p95?: number; // 95th percentile of completion tokens
}

export interface SuggestionRecord {
  id: number;
  org_id: string;
  type: string;
  title: string;
  description: string;
  impact: number; // Monetary value
  impact_type: 'daily' | 'monthly' | 'annual';
  quality_delta_pct?: number;
  created_at: Date;
  status: 'active' | 'implemented' | 'dismissed';
  implemented_at?: Date;
  dismissed_at?: Date;
  details?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
    snippet?: {
      language: string;
      code: string;
    };
    script?: string;
  };
}

export interface ABTestRecord {
  id: number;
  org_id: string;
  created_at: Date;
  current_model: string;
  candidate_model: string;
  endpoint_tag?: string;
  sample_size: number;
  quality_delta_pct: number;
  avg_latency_delta_ms: number;
  success: boolean;
}

// DAO interface for suggestion operations
export interface SuggestionDAO {
  getSuggestions(orgId: string, status?: string): Promise<SuggestionRecord[]>;
  getSuggestionById(id: number): Promise<SuggestionRecord | null>;
  createSuggestion(suggestion: Omit<SuggestionRecord, 'id' | 'created_at'>): Promise<SuggestionRecord>;
  markImplemented(id: number): Promise<boolean>;
  dismissSuggestion(id: number): Promise<boolean>;
}

// DAO interface for AB Testing operations
export interface ABTestDAO {
  createTest(test: Omit<ABTestRecord, 'id' | 'created_at'>): Promise<ABTestRecord>;
  getTestsByOrgId(orgId: string): Promise<ABTestRecord[]>;
}
