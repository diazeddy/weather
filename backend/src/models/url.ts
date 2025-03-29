// src/models/url.ts
export interface Url {
    originalUrl: string;
    shortUrl: string;
    visits: number;
    createdAt: Date;
  }
  
  export const UrlStore: Map<string, Url> = new Map();