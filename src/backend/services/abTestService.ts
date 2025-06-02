import { ABTestRecord } from '../schema/suggestionEngine';

/**
 * Parameters for running an A/B test between two models
 */
export interface ABTestParams {
  org_id: string;
  current_model: string;
  candidate_model: string;
  endpoint_tag?: string;
  sample_size?: number;
  prompts?: string[]; // Optional set of prompts to test with
}

/**
 * Results of an A/B test
 */
export interface ABTestResults {
  quality_delta_pct: number;
  avg_latency_delta_ms: number;
  success: boolean;
  sample_count: number;
  details?: {
    quality_scores: number[];
    latency_ms: number[];
  };
}

type OpenAIModelKey = 'gpt-4' | 'gpt-4o';
type AnthropicModelKey = 'claude-3-opus';
type BaseModelKey = OpenAIModelKey | AnthropicModelKey;

type OpenAIComparisonKeys = 'gpt-3.5-turbo' | 'claude-3-haiku' | 'claude-3-sonnet';
type AnthropicComparisonKeys = 'claude-3-sonnet' | 'claude-3-haiku';

type ModelComparison = {
  qualityDeltaRange: [number, number];
  latencyDeltaRange: [number, number];
};

type ModelDiffMatrixType = {
  'gpt-4': Record<OpenAIComparisonKeys, ModelComparison>;
  'gpt-4o': Record<OpenAIComparisonKeys, ModelComparison>;
  'claude-3-opus': Record<AnthropicComparisonKeys, ModelComparison>;
};

/**
 * Service for running A/B tests between models
 */
export class ABTestService {
  /**
   * Run an A/B test between two models
   */
  async runTest(params: ABTestParams): Promise<ABTestResults> {
    const sampleSize = params.sample_size || 10;
    
    // In a real implementation, this would:
    // 1. Fetch sample prompts from history matching endpoint_tag or use provided prompts
    // 2. Run the same prompts through both models
    // 3. Compare the results for quality and latency
    
    // This is a simulated test
    const results = this.simulateTest(params.current_model, params.candidate_model, sampleSize);
    
    // Save test record to database
    const testRecord: Omit<ABTestRecord, 'id' | 'created_at'> = {
      org_id: params.org_id,
      current_model: params.current_model,
      candidate_model: params.candidate_model,
      endpoint_tag: params.endpoint_tag,
      sample_size: sampleSize,
      quality_delta_pct: results.quality_delta_pct,
      avg_latency_delta_ms: results.avg_latency_delta_ms,
      success: results.success
    };
    
    // In a real implementation, this would save to database
    // await this.abTestDAO.createTest(testRecord);
    
    return results;
  }
  
  /**
   * Simulate an A/B test (in production this would call actual LLM APIs)
   */
  private simulateTest(currentModel: string, candidateModel: string, sampleSize: number): ABTestResults {
    const modelDiffMatrix: ModelDiffMatrixType = {
      // [currentModel][candidateModel] = { qualityDelta, latencyDelta }
      'gpt-4': {
        'gpt-3.5-turbo': { qualityDeltaRange: [-8, -2], latencyDeltaRange: [-400, -200] },
        'claude-3-haiku': { qualityDeltaRange: [-10, -5], latencyDeltaRange: [-600, -300] },
        'claude-3-sonnet': { qualityDeltaRange: [-10, -5], latencyDeltaRange: [-600, -300] } // Added sonnet for completeness based on type
      },
      'gpt-4o': {
        'gpt-3.5-turbo': { qualityDeltaRange: [-6, -1], latencyDeltaRange: [-350, -150] },
        'claude-3-sonnet': { qualityDeltaRange: [-4, 1], latencyDeltaRange: [-200, 0] },
        'claude-3-haiku': { qualityDeltaRange: [-4, 1], latencyDeltaRange: [-200, 0] } // Added haiku for completeness based on type
      },
      'claude-3-opus': {
        'claude-3-sonnet': { qualityDeltaRange: [-5, -1], latencyDeltaRange: [-300, -100] },
        'claude-3-haiku': { qualityDeltaRange: [-12, -6], latencyDeltaRange: [-800, -500] }
      }
    };
    
    // Default values if specific model comparison not found
    let qualityDeltaRange = [-5, 0];
    let latencyDeltaRange = [-300, -100];
    
    // Look up specific model comparison if available
    const current = (Object.keys(modelDiffMatrix) as (keyof ModelDiffMatrixType)[]).find(m => 
      currentModel.toLowerCase().includes(m.toLowerCase())
    );
    
    if (current) {
      const candidateKeys = Object.keys(modelDiffMatrix[current]);
      const candidate = (candidateKeys as (keyof typeof modelDiffMatrix[typeof current])[]).find(m => 
        candidateModel.toLowerCase().includes(m.toLowerCase())
      );
      
      if (candidate) {
        // Use type assertion to tell TypeScript the candidate key is valid for the current model's nested object
        const currentModelMatrix = modelDiffMatrix[current] as Record<typeof candidate, ModelComparison>;
        qualityDeltaRange = currentModelMatrix[candidate].qualityDeltaRange;
        latencyDeltaRange = currentModelMatrix[candidate].latencyDeltaRange;
      }
    }
    
    // Generate simulated scores
    const getRandomInRange = (min: number, max: number) => 
      Math.round((Math.random() * (max - min) + min) * 10) / 10;
    
    const quality_delta_pct = getRandomInRange(qualityDeltaRange[0], qualityDeltaRange[1]);
    const avg_latency_delta_ms = getRandomInRange(latencyDeltaRange[0], latencyDeltaRange[1]);
    
    // Success defined as quality delta within acceptable range (-5% or better)
    const success = quality_delta_pct >= -5;
    
    return {
      quality_delta_pct,
      avg_latency_delta_ms,
      success,
      sample_count: sampleSize
    };
  }
}

/**
 * Factory function to create the AB test service
 */
export function createABTestService(): ABTestService {
  return new ABTestService();
}
