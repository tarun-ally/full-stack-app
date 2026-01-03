import { Router } from "express";
import { createEvent, listEvents } from "../services/event.service";
import { EventSchema } from "../types/event";
import { uuidv4 } from "zod";
import { eventQueue } from "../queues/event.queue";
import { randomUUID } from "crypto";




const router =Router();
router.post("/",(req,res)=>{

    const result = EventSchema.safeParse(req.body);

 
    if(!result.success ){
        return res.status(400).json({message:"Invalid event payload",errors:result.error.format(),

        });

    }
    const event ={
        id:randomUUID(),
        ...result.data,
        status:"PENDING" as const,
       createdAt: new Date().toISOString(),
       attempts:0,
       maxAttempts:3
    }
    eventQueue.enqueue(event);
    res.status(202).json({
         message: "Event accepted for processing",
    eventId: event.id,
    });
});
router.get("/",(req,res)=>{
    res.json(listEvents())
})

export default router;