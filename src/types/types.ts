export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  service: string;
}

export interface ApplicationResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | undefined;
}

export interface ServerConfiguration {
  port: number;
  env: string;
  hostUrl: string;
  allowOrigins: string[];
  allowMethods: string[];
}

export interface Movement {
  name: String;
  unlockLevel: number;
  combination: string;
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  archives: string[];
  maxLevel: number;
  movements: Movement[];
}

export interface Game {
  id: string;
  name: string;
  releaseYear: string;
  summary: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface FilterParams {
  searchCharacters: string;
  game: string;
  levelRankMin: number;
  levelRankMax: number;
}

export interface List<T = any> {
  count: number;
  pages: number;
  page: number;
  items: T[];
}