import z from "zod";

export type NotificationChannel = "EMAIL"|"SMS";

export interface Event {
    id:string;
    type: string;
    payload:Record<string,unknown>;
    channels:NotificationChannel[];
    status:"PENDING"|"PROCESSED"|"FAILED";
    createdAt:string;
}
export const EventSchema = z.object({
type: z.enum([
    "USER_SIGNUP",
    "ORDER_CREATED",
    "PASSWORD_RESET"
]),
payload:z.record(z.string(),z.unknown()),
channels: z.array(
    z.enum(["EMAIL","PUSH","SMS"])
),
});
export type EventInput = z.infer<typeof EventSchema>;