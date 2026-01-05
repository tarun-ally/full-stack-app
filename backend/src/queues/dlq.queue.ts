import { Queue } from "bullmq";
import { redisConnection } from "../redis/connection";

export const DLQ_QUEUE_NAME = "dead-events";

export const dlqQueue = new Queue(DLQ_QUEUE_NAME,{
    connection:redisConnection,
})