/**
 * Intent detection module for Smart Suggestion Engine v2
 */

type IntentType = 'sql' | 'translate' | 'summarize' | 'code' | 'general_chat';

/**
 * Detects task intent based on prompt content and endpoint tag
 */
export async function detectIntent(
  promptText: string,
  endpointTag?: string
): Promise<IntentType> {
  // First, check endpoint tag for explicit intent
  if (endpointTag) {
    if (endpointTag.toLowerCase().includes('sql')) return 'sql';
    if (endpointTag.toLowerCase().includes('translate')) return 'translate';
    if (endpointTag.toLowerCase().includes('summarize')) return 'summarize';
    if (endpointTag.toLowerCase().includes('code')) return 'code';
  }
  
  // Then use regex patterns to identify common intents
  if (promptText.match(/SELECT|INSERT|UPDATE|DELETE|CREATE TABLE|ALTER TABLE|JOIN|FROM|WHERE/i) && 
      promptText.match(/\b(sql|database|query)\b/i)) {
    return 'sql';
  }
  
  if (promptText.match(/translate|translation|convert to|in (spanish|french|german|chinese|russian)/i)) {
    return 'translate';
  }
  
  if (promptText.match(/summarize|summary|tldr|key points|briefly describe/i) || 
      (promptText.length > 2000 && promptText.match(/make (this|it) shorter|condense/i))) {
    return 'summarize';
  }
  
  if (promptText.match(/function|class|def |async|await|return|import|const|let|var|public class|def |func /i) || 
      promptText.match(/\b(javascript|typescript|python|java|c\+\+|ruby|go|rust|php)\b/i)) {
    return 'code';
  }
  
  // If no specific intent is detected, fall back to general chat
  return 'general_chat';
}

/**
 * Advanced intent detection using LLM (would require external API call)
 */
export async function detectIntentWithLLM(
  promptText: string,
  endpointTag?: string
): Promise<IntentType> {
  // First try with regex-based detection
  const regexIntent = await detectIntent(promptText, endpointTag);
  
  // If we have high confidence or the prompt is very short, use regex result
  if (regexIntent !== 'general_chat' || promptText.length < 100) {
    return regexIntent;
  }
  
  // For complex cases, we would call a small LLM to classify
  // This would be implemented with the chosen LLM provider
  // For now, we'll simulate this with a simple function
  
  // Mockup LLM classification (in real implementation, this would call an API)
  const keywords = {
    'sql': ['query', 'database', 'table', 'row', 'column', 'select', 'join'],
    'translate': ['translate', 'language', 'english', 'spanish', 'french'],
    'summarize': ['summarize', 'summary', 'shorten', 'brief', 'main points'],
    'code': ['function', 'code', 'algorithm', 'implement', 'bug', 'error'],
  };
  
  const intentCounts: Record<IntentType, number> = {
    sql: 0,
    translate: 0,
    summarize: 0,
    code: 0,
    general_chat: 1, // Bias toward general_chat
  };
  
  const lowerPrompt = promptText.toLowerCase();
  
  // Count keyword occurrences
  Object.entries(keywords).forEach(([intent, words]) => {
    words.forEach(word => {
      if (lowerPrompt.includes(word.toLowerCase())) {
        intentCounts[intent as IntentType] += 1;
      }
    });
  });
  
  // Find the intent with the highest count
  let maxIntent: IntentType = 'general_chat';
  let maxCount = 1;
  
  Object.entries(intentCounts).forEach(([intent, count]) => {
    if (count > maxCount) {
      maxIntent = intent as IntentType;
      maxCount = count;
    }
  });
  
  return maxIntent;
}

/**
 * Batch process for detecting intent on historical data
 */
export async function batchDetectIntent(prompts: { id: string, text: string, tag?: string }[]): Promise<{ id: string, intent: IntentType }[]> {
  const results = await Promise.all(
    prompts.map(async (prompt) => {
      const intent = await detectIntent(prompt.text, prompt.tag);
      return { id: prompt.id, intent };
    })
  );
  
  return results;
}
