import {Redis} from "ioredis";

export const redisConnection = {
    host:"redis",
    port:6379
}
export const redisClient = new Redis(redisConnection)