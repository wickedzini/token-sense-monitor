import { SuggestionRecord } from '@/backend/schema/suggestionEngine';
import { SmartSuggestionEngine, createSuggestionEngine } from '@/backend/rules/suggestionsEngine';

// Singleton instance of the suggestion engine
const suggestionEngine = createSuggestionEngine();

// In-memory mock database for demo purposes
let mockSuggestions: SuggestionRecord[] = [];

/**
 * Get all suggestions for an organization
 */
export async function getSuggestions(orgId: string, status?: string): Promise<SuggestionRecord[]> {
  // Filter by org and optionally by status
  let filteredSuggestions = mockSuggestions.filter(s => s.org_id === orgId);
  
  if (status) {
    filteredSuggestions = filteredSuggestions.filter(s => s.status === status);
  }
  
  return filteredSuggestions;
}

/**
 * Get a single suggestion by ID
 */
export async function getSuggestionById(id: number): Promise<SuggestionRecord | null> {
  const suggestion = mockSuggestions.find(s => s.id === id);
  return suggestion || null;
}

/**
 * Create a new suggestion
 */
export async function createSuggestion(suggestion: Omit<SuggestionRecord, 'id' | 'created_at'>): Promise<SuggestionRecord> {
  const newSuggestion: SuggestionRecord = {
    id: Date.now(), // Use timestamp as ID for demo
    created_at: new Date(),
    ...suggestion,
  };
  
  mockSuggestions.push(newSuggestion);
  return newSuggestion;
}

/**
 * Mark a suggestion as implemented
 */
export async function markImplemented(id: number): Promise<boolean> {
  const index = mockSuggestions.findIndex(s => s.id === id);
  if (index >= 0) {
    mockSuggestions[index] = {
      ...mockSuggestions[index],
      status: 'implemented',
      implemented_at: new Date()
    };
    return true;
  }
  return false;
}

/**
 * Dismiss a suggestion
 */
export async function dismissSuggestion(id: number): Promise<boolean> {
  const index = mockSuggestions.findIndex(s => s.id === id);
  if (index >= 0) {
    mockSuggestions[index] = {
      ...mockSuggestions[index],
      status: 'dismissed',
      dismissed_at: new Date()
    };
    return true;
  }
  return false;
}

/**
 * Get available suggestion rules
 */
export function getRules() {
  return suggestionEngine.getRules();
}

/**
 * Update a rule's enabled status
 */
export function updateRuleStatus(ruleId: string, enabled: boolean): boolean {
  return suggestionEngine.setRuleStatus(ruleId, enabled);
}

/**
 * Generate suggestions from sample data (for demo/testing)
 */
export function generateSampleSuggestions(orgId: string): SuggestionRecord[] {
  // Generate sample usage data
  const sampleUsage = [
    {
      id: "sample1",
      org_id: orgId,
      timestamp: new Date(),
      provider: "openai",
      model: "gpt-4",
      prompt_tokens: 2500,
      completion_tokens: 500,
      total_tokens: 3000,
      cost: 0.12,
      task_intent: "general_chat" as const
    },
    {
      id: "sample2",
      org_id: orgId,
      timestamp: new Date(),
      provider: "anthropic",
      model: "claude-3-opus",
      prompt_tokens: 10000,
      completion_tokens: 1500,
      total_tokens: 11500,
      cost: 0.35,
      task_intent: "summarize" as const
    },
    {
      id: "sample3",
      org_id: orgId,
      timestamp: new Date(),
      provider: "meta",
      model: "llama3-70b",
      prompt_tokens: 3000,
      completion_tokens: 800,
      total_tokens: 3800,
      cost: 0.08,
      endpoint_tag: "development",
      task_intent: "code" as const
    }
  ];
  
  // Process sample usage through the engine
  const promises = sampleUsage.map(usage => suggestionEngine.processUsage(usage, orgId));
  
  // Wait for all processing to complete
  const suggestionArrays = Promise.all(promises)
    .then(results => {
      // Flatten array of arrays
      const flattened = results.flat();
      
      // Add generated suggestions to mock database
      mockSuggestions = [...mockSuggestions, ...flattened];
      
      return flattened;
    });
  
  // Return empty array for now - in real app we'd await the promise
  return [];
}

// Initialize with some sample suggestions
generateSampleSuggestions("org_demo");
