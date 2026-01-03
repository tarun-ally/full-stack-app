import app from "./app";
import { startEventWorker } from "./workers/event.worker";

const PORT =  5000;
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`🚀 Backend running on port ${PORT}`);
     startEventWorker();
})