import { EventJob } from "../queues/event.queue";

export async function processorEvent(event:EventJob){
    console.log(`⚙️ Processing event: ${event.type} ${event.id}`);

    for(const channel of event.channels){
        if(Math.random() <0.3){
            throw new Error(`Failed to send ${channel}`);
        }
        console.log(`⚙️ Sent ${channel}`);
        
    }
    
}