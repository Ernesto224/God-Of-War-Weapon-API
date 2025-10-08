import dotenv from 'dotenv';
import { ServerConfiguration } from '../types/types';

dotenv.config();

const config: ServerConfiguration = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;