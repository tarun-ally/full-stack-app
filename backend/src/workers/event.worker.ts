import { eventQueue } from "../queue/event.queue";

export function startEventWorker() {
  console.log("🟢 Event worker started");

  setInterval(async () => {
    const event = eventQueue.dequeue();
    if (!event) return;

    try {
      event.status = "PROCESSING";
      console.log("⚙️ Processing event:", event.type, event.id);

      for (const channel of event.channels) {
        await processChannel(channel, event);
      }

      event.status = "COMPLETED";
      console.log("✅ Event completed:", event.id);
    } catch (err) {
      event.status = "FAILED";
      console.error("❌ Event failed:", event.id, err);
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
