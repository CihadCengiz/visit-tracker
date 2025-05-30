import { redisClient } from '../redis/redis.js';

const HASH = 'visits';

// Increment the visit count for a given country code
export async function incrCountry(code: string): Promise<number> {
  const c = code.toLowerCase();
  return redisClient.hIncrBy(HASH, c, 1);
}

// Retrieve all visit statistics from Redis
export async function getAllStats(): Promise<Record<string, number>> {
  const raw = await redisClient.hGetAll(HASH);

  // Build a fresh Record<string, number>
  const stats: Record<string, number> = {};
  for (const [key, value] of Object.entries(raw)) {
    stats[key] = Number(value);
  }

  return stats;
}
