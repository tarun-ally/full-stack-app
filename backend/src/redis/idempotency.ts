import { redisClient, redisConnection } from "./connection";

export async function isAlreadyProcessed(key:string){
    const exist  = await redisClient.get(key);

    return Boolean(exist);

};
export async function markProcessed(key: string){
    await redisClient.set(key,"true", "EX", 60*24*24,)
}