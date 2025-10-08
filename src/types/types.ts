export interface ApplicationResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | undefined;
}

export interface ServerConfiguration {
  port: number;
  nodeEnv: string;
}

export interface Movement {
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

export interface List<T = any> {
  count: number;
  pages: number;
  page: number;
  items: T[];
}