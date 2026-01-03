import { processorEvent } from "./processors/event.processor";
import { eventQueue } from "./queues/event.queue";

console.log(`🟢 Event worker starting`);
async function startWorker(){
    while(true){
        const event = eventQueue.dequeue();
        if(!event){
            await sleep(500);
            continue;
        }
        event.status ="PROCESSING";
        event.attempts+=1;
        try {
            await processorEvent(event);
            event.status = "COMPLETED";
            console.log(`✅ Event completed: ${event.id}`);
            
        } catch (error) {
             console.log(`❌ Attempt ${event.attempts} failed for ${event.id}`);

      if (event.attempts < event.maxAttempts) {
        event.status = "PENDING";
        eventQueue.enqueue(event);
      } else {
        event.status = "FAILED";
      }
        }
    }
    function sleep(ms:number){
        return new Promise((r)=> setTimeout(r,ms));
    }
}
startWorker();
