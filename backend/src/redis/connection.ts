import { RedisOptions } from "bullmq";
import Redis from "ioredis";

export const redisConnection:RedisOptions = {
    host:"redis",
    port:6379
}