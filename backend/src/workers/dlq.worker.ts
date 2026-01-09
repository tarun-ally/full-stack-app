import { Worker } from "bullmq";
import { redisConnection } from "../redis/connection";
import { DLQ_QUEUE_NAME } from "../queues/dlq.queue";

export const dlqWorker = new Worker(
    DLQ_QUEUE_NAME,
    async (job) => {
        const deadEvent = job.data;
        console.log(`💀 Processing dead event: ${deadEvent.id}`);
        
        // Here you could:
        // - Send to monitoring system
        // - Log to external service
        // - Send alert to administrators
        // - Store in database for manual review
        
        console.log(`📝 Dead event logged: ${JSON.stringify(deadEvent, null, 2)}`);
    },
    {
        connection: redisConnection,
        concurrency: 1,
    }
);

dlqWorker.on("completed", (job) => {
    console.log(`🗂️ Dead event ${job.id} processed`);
});

console.log("💀 DLQ worker started");