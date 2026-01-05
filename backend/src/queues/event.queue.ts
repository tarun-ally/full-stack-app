import { Queue } from "bullmq";
import { EventInput } from "../types/event";
import { redisConnection } from "../redis/connection";
import { EVENT_QUEUE_NAME } from "../workers/event.worker";



export type EventJob = EventInput&{
    id: string;
    createdAt:string;
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    attempts: number;
    maxAttempts: number;

};
export const eventQueue =new Queue<EventInput>(EVENT_QUEUE_NAME,{
    connection:redisConnection,
})



// this is used in initial stage for learning and now everything is being handled by bullmq
// class EventQueue{
//     private queue:EventJob[]=[];
//     private store = new Map<string,EventJob>();

//     enqueue(event:EventJob){
//         this.queue.push(event);
//         this.store.set(event.id,event);

//     }
//     dequeue():EventJob|undefined{
//         return this.queue.shift();
//     }
//     update(event:EventJob){
//         this.store.set(event.id,event);
//     }
//     getById(id:string):EventJob|undefined{
//         return this.store.get(id);
//     }
//     list():EventJob[]{
//         return Array.from(this.store.values());
//     }
//     size(){
//         return this.queue.length;
//     }
// }
// export const eventQueue = new EventQueue();

