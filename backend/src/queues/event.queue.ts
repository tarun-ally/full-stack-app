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
    private store = new Map<string,EventJob>();

    enqueue(event:EventJob){
        this.queue.push(event);
        this.store.set(event.id,event);

    }
    dequeue():EventJob|undefined{
        return this.queue.shift();
    }
    update(event:EventJob){
        this.store.set(event.id,event);
    }
    getById(id:string):EventJob|undefined{
        return this.store.get(id);
    }
    list():EventJob[]{
        return Array.from(this.store.values());
    }
    size(){
        return this.queue.length;
    }
}
export const eventQueue = new EventQueue();