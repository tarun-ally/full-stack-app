// import { eventQueue } from "../queue/event.queue";
import { Worker } from "bullmq";
import { redisConnection } from "../redis/connection";
import { dlqQueue } from "../queues/dlq.queue";

console.log("🟢 Redis Event worker started");
export const EVENT_QUEUE_NAME = "events";
export const eventWorker =  new Worker(
  EVENT_QUEUE_NAME,
  async(job)=>{
    const event = job.data;
    console.log(`⚙️ processing ${event.type} ${event.id} | atempt ${job.attemptsMade+1}`);
  
    for(const channel of event.channels){
      console.log(`📨  sending ${channel} for ${event.id}`);
        if(channel =="EMAIL"){
      throw new Error("Random failure");
    }
      
    }
     console.log(`✅ Event completed ${event.id}`);
    
  },
  {
    connection:redisConnection,
  },

);
  eventWorker.on("failed",async(Job,err)=>{
    if(!Job)return;
     const maxAttempts = Job.opts.attempts ?? 1;
    if(Job.attemptsMade>= maxAttempts){
       console.log(`☠️ Moving job ${Job.id} to DLQ`);
       await dlqQueue.add("dead-event",{
        ...Job.data,
        failedReason: err.message,
        failedAt: new Date().toISOString(),
       })
    }
  })


