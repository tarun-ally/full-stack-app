import { http } from "../services/http";

export interface Event {
    id: string;
    type: string;
    payload: Record<string, unknown>;
    channels: string[];
    status: string;
    createdAt: string;
    attempts?: number;
    processedAt?: string | null;
    error?: string;
}

export const createEvent = async (eventData: {
    type: string;
    payload: Record<string, unknown>;
    channels: string[];
}) => {
    const response = await http.post("/events", eventData);
    return response.data;
};

export const getEvents = async (): Promise<Event[]> => {
    const response = await http.get("/events");
    return response.data;
};

export const getEvent = async (id: string): Promise<Event> => {
    const response = await http.get(`/events/${id}`);
    return response.data;
};