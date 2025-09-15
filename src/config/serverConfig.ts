import dotenv from 'dotenv';
import { Config } from '../types/types';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;