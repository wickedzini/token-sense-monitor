import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../services/queueService';
import { verifyFirebaseToken } from '../config/firebaseAdmin';

declare global {
  namespace Express {
    interface Request {
      orgId?: string;
    }
  }
}

// Rate limiting configuration
export const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (command: string, ...args: string[]) =>
      redis.send_command(command, ...args),
    prefix: 'rate-limit:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// API key validation middleware
export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }
  
  try {
    // In a real implementation, this would validate against a database
    // For now, we'll just check if it's a valid format
    if (typeof apiKey !== 'string' || apiKey.length < 32) {
      return res.status(401).json({ error: 'Invalid API key format' });
    }
    
    // Add organization ID to request for later use
    req.orgId = 'temp'; // This would be looked up from the database
    
    next();
  } catch (error) {
    console.error('API key validation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Organization access control middleware
export const checkOrgAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { orgId } = req.params;
  
  if (!req.orgId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // In a real implementation, this would check if the user has access to the organization
  if (req.orgId !== orgId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
};

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string | undefined;
    org_id: string | null;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyFirebaseToken(token);
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}; 