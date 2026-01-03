// import { eventQueue } from "../queue/event.queue";
import { eventQueue } from "./../queues/event.queue";


export function startEventWorker() {
  console.log("🟢 Event worker started");

  setInterval(async () => {
    const event = eventQueue.dequeue();
    if (!event) return;

    try {
      event.status = "PROCESSING";
      console.log("⚙️ Processing event:", event.type, event.id);

      for (const channel of event.channels) {
        // await processChannel(channel, event);
        simulateSend(channel);

      }

      event.status = "COMPLETED";
      console.log("✅ Event completed:", event.id);
    } catch (error) {
      // event.status = "FAILED";
      // console.error("❌ Event failed:", event.id, error);
      event.attempts+=1;
      console.log( `❌ Attempt ${event.attempts} failed for ${event.id}:`,
      (error as Error).message);
      if(event.attempts>= event.maxAttempts){
        event.status = "FAILED";
      console.log(`🚫 Event permanently failed: ${event.id}`);
      }else{
         event.status = "PENDING";
      console.log(`🔁 Retrying event: ${event.id}`);
      setTimeout(()=>{
        eventQueue.enqueue(event);
      },2000)
      }
      

      
    }
  }, 1000);
}

async function processChannel(channel: string, event: any) {
  switch (channel) {
    case "EMAIL":
      console.log(`📧 Sending EMAIL for ${event.type}`);
      break;
    case "PUSH":
      console.log(`📲 Sending PUSH for ${event.type}`);
      break;
    case "SMS":
      console.log(`📨 Sending SMS for ${event.type}`);
      break;
    default:
      throw new Error(`Unknown channel: ${channel}`);
  }

  // simulate latency
  await new Promise((r) => setTimeout(r, 500));
}

function simulateSend(channel: string){
  if(Math.random()<0.4){
    throw new Error(`Failed to send ${channel}`)
  }
 console.log(`📨 Sent ${channel}`);
  
}
