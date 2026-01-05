import { Worker } from "bullmq";
import { redisConnection } from "../redis/connection";

console.log("🟣 DLQ worker started");
export const dlqWorker = new Worker("dlq",
    async (job)=>{
         console.log("☠️ DLQ EVENT RECEIVED");
         console.log({
            eventId:job.data.id,
            type:job.data.type,
            failedReason: job.data.failedReason,
            failedAt: job.data.failedAt,
         });
         
    },
    {
        connection:redisConnection
    }
)