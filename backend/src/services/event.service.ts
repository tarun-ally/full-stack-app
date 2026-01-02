import { Event } from "../types/event";
import { randomUUID } from "crypto";

const events:Event[]=[];
export const createEvent=(
    type:Event["type"],
    payload:Event["payload"],
    channels:Event["channels"]
):Event =>{
    const event:Event={
        id:randomUUID(),
        type,
        payload,
        channels,
        status:"PENDING",
        createdAt:new Date().toISOString(),
    
    }
    events.push(event);
    return event;
}
export const listEvents=():Event[]=>{
    return events;
}