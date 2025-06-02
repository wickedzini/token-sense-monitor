import Queue from 'bull';
import Redis from 'ioredis';
import { UsageRaw } from '../schema/suggestionEngine';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create queues
const usageQueue = new Queue('usage-processing', {
  redis: {
    port: parseInt(process.env.REDIS_PORT || '6379'),
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD
  }
});

const suggestionQueue = new Queue('suggestion-generation', {
  redis: {
    port: parseInt(process.env.REDIS_PORT || '6379'),
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD
  }
});

// Process usage data
usageQueue.process(async (job) => {
  const usage: UsageRaw = job.data;
  
  // Store usage data in database
  // This would be implemented in a separate service
  
  // Trigger suggestion generation
  await suggestionQueue.add({
    orgId: usage.org_id,
    usageId: usage.id
  });
  
  return { success: true };
});

// Process suggestion generation
suggestionQueue.process(async (job) => {
  const { orgId, usageId } = job.data;
  
  // Generate suggestions based on usage data
  // This would be implemented in a separate service
  
  return { success: true };
});

// Error handling
usageQueue.on('error', (error) => {
  console.error('Usage queue error:', error);
});

suggestionQueue.on('error', (error) => {
  console.error('Suggestion queue error:', error);
});

export { usageQueue, suggestionQueue, redis }; 