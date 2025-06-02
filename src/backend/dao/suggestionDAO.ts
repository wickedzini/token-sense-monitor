import { SuggestionRecord, SuggestionDAO } from '../schema/suggestionEngine';
import pool from '../config/database';

export class PostgresSuggestionDAO implements SuggestionDAO {
  async getSuggestions(orgId: string, status?: string): Promise<SuggestionRecord[]> {
    const query = `
      SELECT * FROM suggestions 
      WHERE org_id = $1 
      ${status ? 'AND status = $2' : ''}
      ORDER BY created_at DESC
    `;
    
    const params = status ? [orgId, status] : [orgId];
    const result = await pool.query(query, params);
    return result.rows;
  }

  async getSuggestionById(id: number): Promise<SuggestionRecord | null> {
    const result = await pool.query(
      'SELECT * FROM suggestions WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async createSuggestion(suggestion: Omit<SuggestionRecord, 'id' | 'created_at'>): Promise<SuggestionRecord> {
    const query = `
      INSERT INTO suggestions (
        org_id, type, title, description, impact, impact_type,
        quality_delta_pct, status, details
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [
      suggestion.org_id,
      suggestion.type,
      suggestion.title,
      suggestion.description,
      suggestion.impact,
      suggestion.impact_type,
      suggestion.quality_delta_pct,
      suggestion.status,
      suggestion.details
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async markImplemented(id: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE suggestions 
       SET status = 'implemented', implemented_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  async dismissSuggestion(id: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE suggestions 
       SET status = 'dismissed', dismissed_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
} 