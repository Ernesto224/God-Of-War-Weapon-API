// Basic api response structure
export interface ApplicationResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | undefined;
}

// Object config
export interface Config {
  port: number;
  nodeEnv: string;
}

// DTO's
export interface Movement {
  unlockLevel: number;
  combination: string;
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  movements: Movement[];
}

export interface Game {
  id: string;
  name: string;
  releaseYear: Date;
  summary: string;
}

export interface List <T = any> {
  count: number;
  pages: number;
  page: number;
  items: T[];
}