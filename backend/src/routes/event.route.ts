import { Router } from "express";
import { EventSchema } from "../types/event";
import { eventQueue } from "../queues/event.queue";
import { randomUUID } from "crypto";

const router = Router();

router.post("/", async (req, res) => {
    const result = EventSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid event payload",
            errors: result.error.format(),
        });
    }

    const event = {
        id: randomUUID(),
        ...result.data,
        status: "PENDING" as const,
        createdAt: new Date().toISOString(),
    };

    await eventQueue.add("process-event", event, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000
        }
    });

    res.status(202).json({
        message: "Event accepted for processing",
        eventId: event.id,
    });
});

router.get("/", async (req, res) => {
    const jobs = await eventQueue.getJobs(['waiting', 'active', 'completed', 'failed']);
    const events = jobs.map(job => ({
        id: job.id,
        ...job.data,
        status: job.finishedOn ? 'COMPLETED' : job.failedReason ? 'FAILED' : 'PROCESSING',
        attempts: job.attemptsMade,
        processedAt: job.finishedOn ? new Date(job.finishedOn).toISOString() : null
    }));
    res.json(events);
});

router.get("/:id", async (req, res) => {
    const job = await eventQueue.getJob(req.params.id);
    if (!job) {
        return res.status(404).json({ message: "Event not found" });
    }
    
    res.json({
        id: job.id,
        ...job.data,
        status: job.finishedOn ? 'COMPLETED' : job.failedReason ? 'FAILED' : 'PROCESSING',
        attempts: job.attemptsMade,
        processedAt: job.finishedOn ? new Date(job.finishedOn).toISOString() : null,
        error: job.failedReason
    });
});

export default router;