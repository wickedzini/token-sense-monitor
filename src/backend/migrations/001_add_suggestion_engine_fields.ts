
/**
 * Database migration to add fields required for Smart Suggestion Engine v2
 */

export const up = async (db: any) => {
  // Add new columns to usage_raw table
  await db.query(`
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS avg_latency_ms INTEGER;
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS temperature FLOAT;
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS top_p FLOAT;
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS endpoint_tag VARCHAR(50);
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS reply_tokens_p95 INTEGER;
    ALTER TABLE usage_raw ADD COLUMN IF NOT EXISTS task_intent VARCHAR(20);
  `);
  
  // Update materialized views
  await db.query(`
    DROP MATERIALIZED VIEW IF EXISTS usage_daily;
    CREATE MATERIALIZED VIEW usage_daily AS
    SELECT 
      DATE_TRUNC('day', timestamp) as date,
      provider,
      model,
      endpoint_tag,
      task_intent,
      SUM(prompt_tokens) as prompt_tokens,
      SUM(completion_tokens) as completion_tokens,
      SUM(total_tokens) as total_tokens,
      SUM(cost) as cost,
      AVG(avg_latency_ms) as avg_latency_ms,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY prompt_tokens) as context_p50,
      PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY completion_tokens) as reply_tokens_p95
    FROM usage_raw
    GROUP BY DATE_TRUNC('day', timestamp), provider, model, endpoint_tag, task_intent;
  `);
  
  // Create task_intent detection function
  await db.query(`
    CREATE OR REPLACE FUNCTION detect_task_intent(prompt TEXT) RETURNS VARCHAR(20) AS $$
    BEGIN
      -- Simple regex-based detection, in production this would be more sophisticated
      IF prompt LIKE 'SELECT%' OR prompt LIKE '%SQL%query%' THEN
        RETURN 'sql';
      ELSIF prompt LIKE '%Translate%' OR prompt LIKE '%translation%' THEN
        RETURN 'translate';
      ELSIF prompt LIKE '%Summarize%' OR prompt LIKE '%summary%' OR LENGTH(prompt) > 2000 THEN
        RETURN 'summarize';
      ELSIF prompt LIKE '%function%' OR prompt LIKE '%class%' OR prompt LIKE '%def %' THEN
        RETURN 'code';
      ELSE
        RETURN 'general_chat';
      END IF;
    END;
    $$ LANGUAGE plpgsql;
  `);
  
  // Create trigger to automatically detect task_intent on insert
  await db.query(`
    CREATE OR REPLACE TRIGGER detect_intent_trigger
    BEFORE INSERT ON usage_raw
    FOR EACH ROW
    WHEN (NEW.task_intent IS NULL)
    EXECUTE FUNCTION update_task_intent();
    
    CREATE OR REPLACE FUNCTION update_task_intent() RETURNS TRIGGER AS $$
    BEGIN
      NEW.task_intent := detect_task_intent(NEW.prompt_text);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
  
  // Create suggestions table
  await db.query(`
    CREATE TABLE IF NOT EXISTS suggestions (
      id SERIAL PRIMARY KEY,
      org_id VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      impact FLOAT NOT NULL,
      impact_type VARCHAR(20) NOT NULL,
      quality_delta_pct FLOAT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) DEFAULT 'active',
      implemented_at TIMESTAMP,
      dismissed_at TIMESTAMP,
      details JSONB
    );
    
    CREATE INDEX IF NOT EXISTS idx_suggestions_org_id ON suggestions(org_id);
    CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions(status);
  `);
  
  // Create AB Test table
  await db.query(`
    CREATE TABLE IF NOT EXISTS ab_tests (
      id SERIAL PRIMARY KEY,
      org_id VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      current_model VARCHAR(50) NOT NULL,
      candidate_model VARCHAR(50) NOT NULL,
      endpoint_tag VARCHAR(50),
      sample_size INTEGER NOT NULL,
      quality_delta_pct FLOAT NOT NULL,
      avg_latency_delta_ms INTEGER NOT NULL,
      success BOOLEAN NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_ab_tests_org_id ON ab_tests(org_id);
  `);
};

export const down = async (db: any) => {
  // Remove columns from usage_raw table
  await db.query(`
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS avg_latency_ms;
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS temperature;
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS top_p;
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS endpoint_tag;
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS reply_tokens_p95;
    ALTER TABLE usage_raw DROP COLUMN IF EXISTS task_intent;
  `);
  
  // Revert materialized views
  await db.query(`
    DROP MATERIALIZED VIEW IF EXISTS usage_daily;
    CREATE MATERIALIZED VIEW usage_daily AS
    SELECT 
      DATE_TRUNC('day', timestamp) as date,
      provider,
      model,
      SUM(prompt_tokens) as prompt_tokens,
      SUM(completion_tokens) as completion_tokens,
      SUM(total_tokens) as total_tokens,
      SUM(cost) as cost
    FROM usage_raw
    GROUP BY DATE_TRUNC('day', timestamp), provider, model;
  `);
  
  // Drop functions and triggers
  await db.query(`
    DROP TRIGGER IF EXISTS detect_intent_trigger ON usage_raw;
    DROP FUNCTION IF EXISTS update_task_intent();
    DROP FUNCTION IF EXISTS detect_task_intent(TEXT);
  `);
  
  // Drop suggestions table
  await db.query(`
    DROP TABLE IF EXISTS suggestions;
  `);
  
  // Drop AB Test table
  await db.query(`
    DROP TABLE IF EXISTS ab_tests;
  `);
};
