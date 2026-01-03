import { EventInput } from "../types/event";



export type EventJob = EventInput&{
    id: string;
    createdAt:string;
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    attempts: number;
    maxAttempts: number;

};

class EventQueue{
    private queue:EventJob[]=[];
    enqueue(event:EventJob){
        this.queue.push(event);

    }
    dequeue():EventJob|undefined{
        return this.queue.shift();
    }
    size(){
        return this.size.length;
    }
}
export const eventQueue = new EventQueue();