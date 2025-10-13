import { Request, Response } from 'express';
import { HealthCheckResponse } from '../types/types';

export const healthCheck = (req: Request, res: Response) => {

  const healthData: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    service: 'God of War Weapons API'
  };

  return res.status(200).json(healthData);

};

export default healthCheck;