import dotenv from 'dotenv';
import { ServerConfiguration } from '../types/types';

dotenv.config();

const config: ServerConfiguration = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  hostUrl: process.env.VERCEL_URL || 'http://localhost:3000',
  allowOrigins: process.env.CORS_ALLOWED_ORIGIN.split(',') || ['http://localhost:3000'],
  allowMethods: process.env.CORS_ALLOWED_METHODS.split(',') || ['GET', 'POST', 'PUT', 'DELETE'],
};

export default config;