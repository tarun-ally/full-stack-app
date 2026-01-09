import { redisClient } from "./connection";

export async function isAlreadyProcessed(key: string): Promise<boolean> {
    const exists = await redisClient.get(key);
    return Boolean(exists);
}

export async function markProcessed(key: string): Promise<void> {
    await redisClient.set(key, "true", "EX", 60 * 60 * 24); // 24 hours
}