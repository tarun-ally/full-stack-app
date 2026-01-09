import { Worker } from "bullmq";
import { redisConnection } from "../redis/connection";
import { dlqQueue } from "../queues/dlq.queue";
import { isAlreadyProcessed, markProcessed } from "../redis/idempotency";
import { sendEmail, sendSMS, sendPush } from "../services/notification.service";

export const EVENT_QUEUE_NAME = "events";

export const eventWorker = new Worker(
    EVENT_QUEUE_NAME,
    async (job) => {
        const event = job.data;
        console.log(`⚙️ Processing ${event.type} ${event.id} | attempt ${job.attemptsMade + 1}`);

        for (const channel of event.channels) {
            const key = `event:${event.id}:${channel}`;
            
            if (await isAlreadyProcessed(key)) {
                console.log(`⏭️ Skipping ${channel} for ${event.id} (already processed)`);
                continue;
            }

            console.log(`📨 Sending ${channel} notification for ${event.id}`);
            
            try {
                // Send real notifications
                switch (channel) {
                    case 'EMAIL':
                        await sendEmail(event.type, event.payload);
                        break;
                    case 'SMS':
                        await sendSMS(event.type, event.payload);
                        break;
                    case 'PUSH':
                        await sendPush(event.type, event.payload);
                        break;
                    default:
                        console.log(`❓ Unknown channel: ${channel}`);
                }

                await markProcessed(key);
                console.log(`✅ ${channel} notification sent for ${event.id}`);
            } catch (error) {
                console.error(`❌ ${channel} failed for ${event.id}:`, error);
                throw error;
            }
        }

        console.log(`🎉 Event ${event.id} completed successfully`);
    },
    {
        connection: redisConnection,
        concurrency: 5,
    }
);

eventWorker.on("failed", async (job, err) => {
    if (!job) return;
    
    const maxAttempts = job.opts.attempts ?? 1;
    if (job.attemptsMade >= maxAttempts) {
        console.log(`☠️ Moving job ${job.id} to DLQ after ${job.attemptsMade} attempts`);
        await dlqQueue.add("dead-event", {
            ...job.data,
            failedReason: err.message,
            failedAt: new Date().toISOString(),
            originalJobId: job.id,
        });
    }
});

eventWorker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

console.log("🟢 Event worker started with REAL notifications");
